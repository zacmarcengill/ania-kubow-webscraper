const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://www.tva.com/environment/lake-levels/center-hill'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const tvawidgetArr = []

        $('.tvawidget', html).each(function() {
            const h2Text = $(this).find('h2').text()
            // const links = $(this).find('a').attr('href')
            tvawidgetArr.push({
                h2Text,
            })
        })
        console.log('tvawidgetArr: ' + tvawidgetArr)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log('server running on PORT ${PORT}'))

