
const { Chromeless } = require('chromeless')

async function run() {
    const chromeless = new Chromeless()

    const screenshot = await chromeless
        .goto('https://www.zhihu.com/#signin')
        .click('.qrcode-signin-cut-button')        
        .wait('input[name="account"]')
        .type('2392231552@qq.com', 'input[name="account"]')
        .type('wypsy1993727', 'input[name="password"]')
        .click('.sign-button')
        .wait(20000)
        .click('.sign-button')
        .wait('.Topstory')
        .click('.ContentItem-more')
        .wait(200000)
        
        
        
    // console.log(screenshot)

    await chromeless.end()
}

run().catch(console.error.bind(console))