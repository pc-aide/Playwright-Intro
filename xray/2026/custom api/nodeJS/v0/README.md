# strategie
````txt
Test principal (20s)
        |
        |-- fin du test -> *push info vers queue ou promise non bloquante*
        |
        |-- continue le run / exit
````

# Architecture
````lua
Playwright Test ------------------> Xray Reporter Module (Node.js)
        |                                     |
        |                                     |-- check si Test Case existe (GET /search)
        |                                     |-- sinon create Test Case (POST /issue)
        |                                     |-- POST import execution
        v
(continues run sans attendre Xray)
````

# upload-xray.ts
````ts
import axios from 'axios';

const jira = axios.create({
  baseURL: 'https://your-domain.atlassian.net',
  headers: {
    Authorization: `Bearer ${process.env.JIRA_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Fonction asynchrone fire-and-forget
export async function sendResultToXrayAsync(summary: string, status: 'PASS'|'FAIL', params?: any) {
  (async () => {
    try {
      // 1️⃣ Cherche si le Test Case existe
      const search = await jira.get('/rest/api/2/search', {
        params: {
          jql: `project=PROJKEY AND summary="${summary}"`,
        },
      });

      let testKey: string;
      if (search.data.issues.length > 0) {
        testKey = search.data.issues[0].key;
      } else {
        // 2️⃣ Crée Test Case si inexistant
        const create = await jira.post('/rest/api/2/issue', {
          fields: {
            project: { key: 'PROJKEY' },
            summary,
            issuetype: { name: 'Test' },
            description: JSON.stringify(params || {}),
          },
        });
        testKey = create.data.key;
      }

      // 3️⃣ Envoi du résultat
      await jira.post('/rest/raven/1.0/import/execution', {
        testExecutionKey: 'EX-123', // ou dynamique
        tests: [{ testKey, status }],
      });

    } catch (err) {
      console.error('Xray reporting failed', err);
    }
  })(); // IIFE pour fire-and-forget
}
````

# tests/rds.spec.ts
````ts
import { test } from '@playwright/test';
import { sendResultToXrayAsync } from './xrayReporter';

test('aller sur rds.ca', async ({ page }) => {
  await page.goto('https://rds.ca');
  // ... autres steps

  // fire-and-forget → pas de blocage
  sendResultToXrayAsync('Test RDS', 'PASS', { url: 'rds.ca', env: 'prod' });
});
````
