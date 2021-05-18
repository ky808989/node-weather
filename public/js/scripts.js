console.log('script loaded. Just joking.')

var formData = document.querySelector('form'), search = document.querySelector('input'), msg1 = document.querySelector('#msg1')

formData.addEventListener('submit', (event) => {
    event.preventDefault()
    var location = 'http://localhost:3000/weather/?search=' + search.value
    msg1.textContent = 'Loading...'

    fetch(location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error.name
                console.log(data.error)
            } else {
                console.log(data.contentInfo)
                if (data.contentInfo.weather) {
                    msg1.textContent = data.contentInfo.name + ',' +
                        data.contentInfo.weather + ',' +
                        data.contentInfo.temp
                } else {
                    msg1.textContent = data.contentInfo.name
                }
            }
        })
    })
})


