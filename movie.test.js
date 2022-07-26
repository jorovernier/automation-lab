const {Builder, Capabilities, By} = require('selenium-webdriver');
require('chromedriver');

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeEach(async () => {
    await driver.get('http://127.0.0.1:5500/movieList/index.html')
})
afterAll(async () => {
    await driver.quit()
})

test('delete works', async () => {
    await driver.findElement(By.xpath('//input')).sendKeys('Detective Pikachu\n');
    await driver.findElement(By.xpath('(//button)[2]')).click();

    const ul = await driver.findElement(By.xpath('//ul'));
    expect(ul.hasChildren).toBeFalsy();

    // This way checks if the ul has inner text
    // const findMovie = await driver.findElement(By.xpath('//ul[contains(text(), "")]'))
    // const displayed = findMovie.isDisplayed()
    // expect(displayed).toBeTruthy()
})

test('cross off works', async () => {
    await driver.findElement(By.xpath('//input')).sendKeys('Detective Pikachu\n');
    await driver.findElement(By.xpath('//span')).click();

    const checked = await driver.findElement(By.xpath('(//span[contains(@class, "checked")])'));
    let displayed = checked.isDisplayed();
    expect(displayed).toBeTruthy();
})

test('message is displayed', async () => {
    await driver.findElement(By.xpath('//input')).sendKeys('Detective Pikachu\n');
    await driver.findElement(By.xpath('//span')).click();

    let message = await driver.findElement(By.css('#message')).getText();
    expect(message).toContain('watched');
})