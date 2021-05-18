const chalk = require('chalk')
const geocode = require('./goecode')
const weather = require('./weather')

console.log(chalk.blue('=============================================='))
console.log('Retrieving data..........')
if (process.argv.length < 3) {
    console.log(chalk.yellow('Please enter the location you intend to search for it\'s weather.'))
    console.log(chalk.yellow('=============================================='))
} else {
    geocode(process.argv[2], (err, res) => {
        if (err) {
            console.log(chalk.red.inverse(err))
            console.log(chalk.red('=============================================='))
        } else {
            weather(res.longitude, res.latitude, (error, response) => {
                if (error) {
                    console.log(chalk.red.inverse(error))
                    console.log(chalk.red('=============================================='))
                } else {
                    console.log(chalk.greenBright(response.name + ' is currently '
                        + response.weather + ' with the temperature of '
                        + response.temp + ' degree.\nThe chance of rainning is '
                        + response.precip + '%.'))
                    console.log(chalk.blue('=============================================='))
                }
            })
        }
    })
}

const MYVACCINENUM = 'R - Z S E 8 R M 5 W'
const XIAOVACCINENUM = 'R - D 3 M 1 I X B X'