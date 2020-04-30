console.log("Some javascipt onnn.")

const form = document.querySelector('form')
const input = document.querySelector('input')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const loc = input.value
    document.getElementById('p1').innerHTML = "Loading..."
    document.getElementById('p2').innerHTML = ""
    fetch('http://localhost:4000/weather?address=' + loc).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                document.getElementById('p1').innerHTML = data.error
                    // console.log(data.error)
            } else {
                document.getElementById('p1').innerHTML = data.location
                document.getElementById('p2').innerHTML = data.forecastdata
                    // console.log(data.location)
                    // console.log(data.forecastdata)
            }
        })
    })
})