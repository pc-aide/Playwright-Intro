# plugins 

## Allure Report
* https://allurereport.org/docs/v3/
* overview :
<img src="https://i.imgur.com/sEUw0qr.png">
* suites :
<img src="https://i.imgur.com/UR5PcE1.png">

### install
````shell
npm i -D @playwright/test allure-playwright

npm i -D allure-commandline

allure generate allure-results --clean -o allure-report

# Open the generated report in a browser
allure open allure-report
````
