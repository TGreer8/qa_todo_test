import {Builder, By, Capabilities, until, WebDriver} from "selenium-webdriver"
const chromedriver = require("chromedriver")

const driver: WebDriver = new Builder()
.withCapabilities(Capabilities.chrome())
.build()

class TodoPage {
  todoInput: By = By.className("new-todo")
  todos: By = By.xpath('//li[@class="todo"]')
  todoLabel: By = By.css('label')
  todoComplete: By = By.xpath('//input[@class="toggle"]');
  todoStar: By = By.css('.star')
  starBanner: By = By.css('.starred')
  todoCount: By = By.css('.todo-count')
  clearComplete: By = By.css('.clear-completed')

  driver: WebDriver;

  url: string = "https://devmountain.github.io/qa_todos/"

  constructor(driver: WebDriver) {
    this.driver = driver;
  }
}
const tp = new TodoPage(driver)

describe("the todo app", () => {
  beforeEach(async () => {
    await driver.get(tp.url)
  });
  afterAll(async () => {
    await driver.quit()
  })
  it("can add a todo", async () => {
    await driver.wait(until.elementLocated(tp.todoInput));
    await driver.findElement(tp.todoInput).sendKeys("Test to-do \n")
    await driver.sleep(5000)
  });
  it("can remove a todo", async () => {
    await driver.wait(until.elementLocated(tp.clearComplete));
    await driver.findElement(tp.clearComplete).click()
    await driver.sleep(5000)
  });
  it("can mark a todo with a star", async () => {
    await driver.wait(until.elementLocated(tp.todoStar));
    await driver.findElement(tp.todoStar).click()
    await driver.sleep(10000)
  });
  it("has the right number of todos listed", async () => {
    await driver.wait(until.elementLocated(tp.todoCount));
    await driver.findElement(tp.todoCount).click()
    await driver.sleep(5000)
  });
});

