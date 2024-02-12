
import { chromium } from "playwright";
import * as misc from './misc.js'

let credentials = {
    email: '',
    password: ''
}

while (true) {
    try {
        let browser = await chromium.launch();
        //Avoid bot protection from game
        let context = await browser.newContext({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.2227.0 Safari/537.36' });
        await context.addInitScript("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})");
        let page = await context.newPage();
        await page.goto('https://www.wolvesville.com');
        //setInterval(() => { page.screenshot({ path: 'u1.png', timeout: 0 }); }, 500);  //<-- Visual render with screenshots (2fps)
        await page.evaluate(() => {
            localStorage.setItem('settings', '{"friendsLobbyDefaultGameMode":"advanced-fr", "darkmode":"true"}');
        });
        await misc.delay(100);
        await page.reload();
        await misc.login(page, credentials);
        let count = 0
        while (true) { // Starting loop
            await page.getByText('PLAY', { exact: true }).click();
            await page.getByText('PLAY WITH FRIENDS').click();
            await page.locator('.css-175oi2r.r-lrvibr.r-5oul0u.r-1ss6j8a.r-13gvty3.r-1loqt21.r-1otgn73').nth(3).click(); // Spectate button
            await page.getByText('Spectate').nth(1).click();
            await page.getByText('START GAME').click();
            let lobby = [];
            while (!(await page.$('.css-1rynq56.r-1niwhzg.r-ubezar.r-vw2c0b.r-14gqq1x.r-fdjqy7:text-is(" 1")'))) { // Wait for last second decount in chat
                let names = await page.$$('.css-1rynq56.r-dnmrzs.r-1udh08x.r-1udbk01.r-3s2u2q.r-1iln25a.r-jwli3a.r-13awgt0.r-ubezar.r-vw2c0b.r-q4m81j'); // Get names and numbers divs
                lobby = [];
                    for (const name of names) {
                        let str = await name.textContent();
                    let player = {};
                    player['number'] = str.slice(0, str.indexOf(' '));
                    player['name'] = str.slice(str.indexOf(' ') + 1, str.length);
                    lobby.push(player);
                }
                await misc.writeJsonFileAsync('current-lobby.json', lobby);
                await misc.delay(500);
            }
            const oldLobbys = await misc.readJsonFileAsync('lobbys-history.json');
            let newLobby = {};
            const date = new Date();
            newLobby['date'] = [date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes(), date.getTime()];
            newLobby['lobby'] = lobby;
            oldLobbys.push(newLobby);
            let time = date.getTime() - 21600000;
            while (oldLobbys[0]['date'][1] < time) {
                oldLobbys.shift();
            }
            await misc.writeJsonFileAsync('lobbys-history.json', oldLobbys);
            await misc.delay(1000);
            await page.reload();
            count++;
            console.log(count)
        }
    } catch (e) {
        console.log('Session ended because of an error: '+ e)
    }
    await misc.delay(60000); // Sometimes, game block request from an IP for one minute if this IP sent too many request
}