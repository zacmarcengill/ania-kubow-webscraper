const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://www.theguardian.com/us'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []
        $('.fc-item__title', html).each(function() {
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({
                title,
                url
            })
        })
        console.log(articles)
    }).catch(err => console.log(err))

// axios(url)
//     .then(response => {
//         const html = response.data
//         const $ = cheerio.load(html)
//         const tvawidgetArr = []

//         $('.tvawidget', html).each(function() {
//             const h2Text = $(this).find('h2').text()
//             // const links = $(this).find('a').attr('href')
//             tvawidgetArr.push({
//                 h2Text,
//             })
//         })
//         console.log('tvawidgetArr: ' + tvawidgetArr)
//     }).catch(err => console.log(err))

app.listen(PORT, () => console.log('server running on PORT ${PORT}'))

