const fs = require('fs')

const files = fs.readdirSync('data')

Promise
  .all(files.filter((el) => el.match(/page-[0-9]+.json/)).map((file) => {
    return new Promise((resolve) => {
      return fs.readFile(`data/${file}`, 'utf8', (err, file) => {
        return resolve(JSON.parse(file))
      })
    })
  }))
  .then((result) => {
    result = result
      .map((el) => el.results[0].hits)
      .reduce((acc, curr) => {
        acc.push(curr[0])
        return acc
      }, [])

    console.log(result)
    fs.writeFileSync('data/startups.json', JSON.stringify(result))
  })

