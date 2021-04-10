const pup = require('puppeteer');

const play = async (page) => {

    let answer = await page.evaluate(() => {
        let r = document.querySelector('.red').textContent;
        let g = document.querySelector('.green').textContent;
        let b = document.querySelector('.blue').textContent;
        return `rgb(${r}, ${g}, ${b})`;
    })

    const options = await page.$$('.option');

    for (let option in options) {

        const box = options[option];
        await box.hover();
        const z = await box.evaluateHandle(node => node.classList.add('highlight'));
        // console.log(z._remoteObject);

        let res = await box.evaluateHandle(node => {
            return node.style.backgroundColor;
        });

        if (answer === res._remoteObject.value) {
            console.log(answer);
            box.click();
            break;
        }else{
            await box.evaluateHandle(node => node.classList.remove('highlight'));
        }

    }

}

const main = async () => {
    const browser = await pup.launch({
        headless: false,
        defaultViewport: null,
        slowMo: 100
    });
    const pages = await browser.pages();
    const page = pages[0];
    await page.goto(`file://${__dirname}/app.html`);
    await play(page);
    // await browser.close();
};


main();