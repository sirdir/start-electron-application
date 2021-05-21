import puppeteer, {Browser} from 'puppeteer-core';
import {spawn,  ChildProcessWithoutNullStreams} from 'child_process';
import wait from './wait';
import {ROOT_OF_REPO} from './constatns';

describe('Run', () => {
    let browser: Browser;
    let childProcessWithoutNullStreams: ChildProcessWithoutNullStreams;

    beforeEach(async () => {
        childProcessWithoutNullStreams = spawn('yarn',['start:old', '--remote-debugging-port=12345'], {cwd: ROOT_OF_REPO, shell: true});
        // childProcessWithoutNullStreams = spawn('ping', ['8.8.8.8']);
        const receivedData: string[] = [];
        childProcessWithoutNullStreams.stderr.on('data', (data) => {
            receivedData.push(data.toString());
        });
        console.log(Date.now());
        await wait(5_000);
        console.log(Date.now());
        let wsEndpoint = '';
        for (const line of receivedData) {
            console.log(line);
            let match = line.match(/ws:.{0,100}/);
            if (match) {
                wsEndpoint = match[0];
            }
        }

        browser = await puppeteer.connect({browserWSEndpoint: wsEndpoint});
    });

    afterEach( async () => {
        await browser.close();
        // browser.disconnect();
        childProcessWithoutNullStreams.kill();
        await wait(5000);
        console.log(childProcessWithoutNullStreams.pid);
        console.log(childProcessWithoutNullStreams.exitCode);
    });

    test('as binary', async () => {
        const allpages = await browser.pages();
        expect(allpages).toHaveLength(1);
        console.log(await allpages[0].content());
        expect(1).toBe(1);
    });
});