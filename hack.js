// external imports
const schedule = require("node-schedule");
const puppeteer = require("puppeteer");
const dotenv = require("dotenv");

// .env
dotenv.config();
const WAIT_FOR_PAGE = 5000;
const DELAY_USER_INPUT = 2000;
const DELAY_PW_INPUT = 1000;

// delay some events
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

// A function to hack chymall

async function hackChymall() {
  schedule.scheduleJob("* * * * *", async function () {
    const browser = await puppeteer.launch({ headless: false });
    const context = browser.defaultBrowserContext();
    await context.overridePermissions("https://chymall.net/Mall/Login", [
      "notifications",
    ]);
    const page = await browser.newPage();

    // Handle login
    // await page.goto("https://chymall.net/Mall/Login");
    // await page.type("#Code", "Bonifaceoj3", {
    //   delay: DELAY_USER_INPUT,
    // });
    // await page.type("#LoginPwd", "Boniface00", { delay: DELAY_PW_INPUT });
    // await page.click(".loginBtn");
    // await page.waitForSelector(".container");

    // await delay(WAIT_FOR_PAGE);

    // Handle change password
    await page.goto(
      "https://chymall.net/mall/Login/ForgetLoginPwd?Code=Bonifaceoj3"
    );
    await page.type("#OldPwd", "Boniface00", {
      delay: DELAY_USER_INPUT,
    });
    await page.type("#LoginPwd", "Boniface00", {
      delay: DELAY_USER_INPUT,
    });
    await page.type("#SureLoginPwd", "Boniface00", { delay: DELAY_PW_INPUT });
    await page.click(".loginBtn");
    await page.waitForSelector(".container");

    await delay(WAIT_FOR_PAGE);

    const elems = await page.evaluate(() => {
      const infos = Array.from(document.querySelectorAll(".container"));

      return infos.map((info) => {
        const array = info.innerText.split("\n");
        return array.slice(3, 4);
      });
    });

    // Console result
    console.log("Done", elems);

    // Close the browser
    browser.close();
  });
}

// export the module to be used somewhere else
module.exports = hackChymall;
