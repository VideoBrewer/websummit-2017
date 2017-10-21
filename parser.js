'use strict'

const fs = require('fs')
const zlib = require('zlib')

const files = fs.readdirSync('data')

Promise
  .all(files.filter((el) => el.match(/page-[0-9]+.json/)).map((file) => {
    return new Promise((resolve) => {
      return fs.readFile(`data/${file}`, 'utf8', (error, file) => {
        if (error) throw error

        return resolve(JSON.parse(file))
      })
    })
  }))
  .then((result) => {
    result = result
      .map((el) => el.results[0].hits)
      .reduce((acc, curr) => {
        acc = acc.concat(curr.map((startup) => ({
          city: startup.city,
          country: startup.country,
          elevatorPitch: startup.elevator_pitch,
          homepage: startup.external_urls.homepage.replace(/^http[s]?:\/\//, ''),
          industry: startup.industry,
          logo: startup.logo_urls.thumb,
          name: startup.name,
          id: startup.id
        })))

        return acc
      }, [])

    result = JSON.stringify(result)

    fs.writeFileSync('data/startups.json', result)
    zlib.gzip(result, (error, result) => {
      if (error) throw error

      fs.writeFileSync('data/startups.json.gz', result)
    })
  })

