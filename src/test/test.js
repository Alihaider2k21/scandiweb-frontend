import { WebDriver } from "selenium-webdriver";
import { chrome } from "selenium-webdriver/chrome";
const options = new chrome.Options();
const driver = new WebDriver.Builder()
  .forBrowser("chrome")
  .setChromeOptions(options)
  .usingServer("http://localhost:4444/wd/hub")
  .build();
