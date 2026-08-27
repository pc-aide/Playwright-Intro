import { readFile, rename, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

const REPORT_PATH = resolve('playwright-report/index.html');
const SCREENSHOT_BLOCK = /(children:\[)(\(0,V\.jsx\)\(`a`,\{href:Ua\(e\.path\),children:\(0,V\.jsx\)\(`img`,\{className:`screenshot`,src:Ua\(e\.path\)\}\)\}\)),(\(0,V\.jsx\)\(\n?Qa,\{attachment:e,result:n\}\))(\])/;

function toVideoFileName(test: TestCase): string {
  const titlePath = test.titlePath().filter(Boolean);
  const title = titlePath.length > 1 ? titlePath[titlePath.length - 2] : titlePath[0];
  const slug = title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

  return `${slug || 'playwright-test'}.webm`;
}

// Post-process the generated Playwright HTML report so screenshot labels appear before images.
class ReportScreenshotOrderReporter implements Reporter {
  async onTestEnd(test: TestCase, result: TestResult): Promise<void> {
    const videoFileName = toVideoFileName(test);

    for (const attachment of result.attachments) {
      if (attachment.contentType !== 'video/webm' || !attachment.path) {
        continue;
      }

      const renamedVideoPath = resolve(attachment.path, '..', videoFileName);
      await rename(attachment.path, renamedVideoPath);
      attachment.path = renamedVideoPath;
    }
  }

  async onEnd(): Promise<void> {
    const report = await readFile(REPORT_PATH, 'utf8');
    const updatedReport = report.replace(SCREENSHOT_BLOCK, '$1$3,$2$4');

    if (updatedReport !== report) {
      await writeFile(REPORT_PATH, updatedReport, 'utf8');
    }
  }
}

export default ReportScreenshotOrderReporter;