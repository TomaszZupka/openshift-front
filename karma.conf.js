// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

// process.env.CHROME_BIN = require('puppeteer').executablePath();
// require('puppeteer').connect({ browserWSEndpoint: 'ws://localhost:3000' });
const webdriver = require('selenium-webdriver');

module.exports = function (config) {
  config.set({
    customLaunchers: {
      ChromeHeadless: {
        base: 'SeleniumWebdriver',
        browserName: 'Chrome',
        getDriver: function () {
          return new webdriver.Builder()
            .forBrowser('chrome')
            .usingServer('http://hostname:3000') // /wd/hub Docker is run using docker run -d -p 4444:4444 -v /dev/shm:/dev/shm selenium/standalone-chrome
            .build()
        }
// flags: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-software-rasterizer', '--disable-dev-shm-usage', '--remote-debugging-port=9222']
      }
    },
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-selenium-webdriver-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/openshift-front'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
