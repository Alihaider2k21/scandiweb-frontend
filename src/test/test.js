const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const options = new chrome.Options();

describe("My Selenium tests", () => {
  let driver;

  before(async () => {
    driver = new webdriver.Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .usingServer("http://localhost:4444/wd/hub")
      .build();
  });

  after(async () => {
    await driver.quit();
  });

  it("should navigate to Google", async () => {
    await driver.get("https://www.google.com");
    const title = await driver.getTitle();
    expect(title).to.equal("Google");
  });
});
