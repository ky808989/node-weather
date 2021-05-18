console.log('script loaded. Just joking.')

var formData = document.querySelector('form'), search = document.querySelector('input')
var msg1 = document.querySelector('#msg1')

formData.addEventListener('submit', (event) => {
    event.preventDefault()
    var location = '/weather/?search=' + search.value
    msg1.textContent = 'Loading...'

    fetch(location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error.name
                console.log(data.error)
            } else {
                console.log(data.contentInfo)
                if (data.contentInfo.weather) {
                    msg1.textContent = data.contentInfo.name + ' is currently ' +
                        data.contentInfo.weather + ' with a temperature of ' +
                        data.contentInfo.temp + '\xb0C'
                } else {
                    msg1.textContent = data.contentInfo.name
                }
            }
        })
    })
})


