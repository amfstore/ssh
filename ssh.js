const cheerio = require('cheerio');
const fetch = require('node-fetch');

function search() {
    return new Promise((resolve, reject) => {
        fetch('https://opentunnel.net/ssh-server-4/', {
            method: 'get'
        })
        .then(res => res.text())
        .then(res => {
            const soup = cheerio.load(res)
            const desc = [];
            const account = [];
            const hasil = [];
            soup('ul.list-group').each(function(a, b) {
                soup(b).find('li').each(function(c, d) {
                    desc.push(soup(d).text())
                })
                soup('div.p-2').each(function(a, b) {
                    soup(b).find('form').each(function(c, d) {
                        account.push(soup(d).text())
                    })
                })
                
            })
            for (let i = 0; i < desc.length; i++) {
                hasil.push({
                Akun: account[i],
                Deskripsi: desc[i]
                
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