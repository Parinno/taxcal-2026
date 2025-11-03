export default () => {
    let list = []
    try {
        let timeNow = new Date().toISOString().split('T')[0]
        list.push({
            loc: `/tax/calculator`,
            changefreq: 'monthly',
            lastmod: timeNow
        })

        list.push({
            loc: '/tax/%E0%B8%84%E0%B8%B3%E0%B8%99%E0%B8%A7%E0%B8%93%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B5',
            changefreq: 'monthly',
            lastmod: timeNow
        })

    } catch (e) {
        console.error(e)
    }

    return list
}
