console.log('weather app data')




const weather = document.querySelector('form')

const search = document.querySelector('input')
const msgone = document.querySelector('#temp')
const msgtwo = document.querySelector('#fore')
const msgthree = document.querySelector('#loc')
weather.addEventListener('submit',(e) => {
    e.preventDefault()
   const searchVal = search.value

    fetch(`http://localhost:3000/weather?address=${searchVal}`).then(response => {
    response.json().then(data => {
        if(data.error){
            console.log('error happened')
        }
        msgone.textContent=data.temperature
        msgtwo.textContent=data.forecast
        msgthree.textContent=data.location
    })
})
})