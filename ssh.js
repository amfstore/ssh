const cheerio = require('cheerio');
const fetch = require('node-fetch');

function search() {
    return new Promise((resolve, reject) => {
        fetch('https://opentunnel.net/', {
            method: 'get'
        })
        .then(res => res.text())
        .then(res => {
            const soup = cheerio.load(res)
            const list = [];
            const desc = [];
            const hasil = [];
            soup('div.my-2').each(function(a, b) {
                soup(b).find('div.d-flex').each(function(c, d) {
                    list.push(soup(d).text())
                })
                soup('div.my-2').each(function(a, b) {
                    soup(b).find('div.d-flex').each(function(c, d) {
                        desc.push(soup(d).text())
                    })
                })
                
            })
            for (let i = 0; i < list.length; i++) {
                hasil.push({
                List: list[i],
                Deskripsi: list[i]
                
            }) 
        }
            resolve(hasil)
        })
        .catch(reject)
    })
}

search()
.then(res => console.log(res))
.catch(err => console.log(err))