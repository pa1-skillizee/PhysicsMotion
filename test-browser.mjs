import puppeteer from 'puppeteer';

(async () => {
    console.log('Starting browser...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => {
        if (msg.type() === 'error') console.log('BROWSER ERROR:', msg.text());
    });
    page.on('pageerror', error => console.error('PAGE CRASH:', error.message));

    const chapters = [
        '/chapter-1.1', '/chapter-1.2', '/chapter-1.3', '/chapter-1.4',
        '/chapter-2.1', '/chapter-2.2', '/chapter-2.3', '/chapter-3.1', '/chapter-3.2'
    ];

    for (const route of chapters) {
        console.log(`\nNavigating to http://localhost:5173${route} ...`);
        await page.goto(`http://localhost:5173${route}`, { waitUntil: 'domcontentloaded' }).catch(e => console.error('GOTO ERROR:', e.message));
        await new Promise(r => setTimeout(r, 1000));
        const content = await page.content();
        if (content.includes('Error:') || content.includes('Failed to compile') || content.length < 500) {
            console.error(`❌ FAILED: ${route} is blank or threw an error.`);
        } else {
            console.log(`✅ SUCCESS: ${route} rendered correctly.`);
        }
    }

    await browser.close();
    console.log('Done.');
})();
