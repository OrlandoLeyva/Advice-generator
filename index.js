// Add an event listen to new advice button.
// when it is clicked call the api and bring a new advice. render the new advice

// HTML ELEMENTS

caches.keys().then(keyList => Promise.all(keyList.map(key => caches.delete(key))));

const adviceNumberEl = document.getElementById('advice-number')
const adviceEl = document.getElementById('advice')
const newAdviceButton = document.getElementById('new-advice-button')

// API SETTINGS
const API_URL = 'https://api.adviceslip.com/advice'

let previousAdvice = {}

// FETCH A NEW ADVICE AND RENDER IT
newAdviceButton.addEventListener('click', fetchAdvice)

async function fetchAdvice(){
    adviceEl.innerText = 'Loading Advice...'
    newAdviceButton.disabled = true
    const res = await fetch(API_URL);
    const data = await res.json()
    
    const adviceObj = data.slip
    if (adviceObj.id == previousAdvice.id){
        await fetchAdvice()
    } else {
        adviceNumberEl.innerText = `Advice # ${adviceObj.id}`
        adviceEl.innerText = adviceObj.advice
        previousAdvice = adviceObj
        newAdviceButton.disabled = false
    }
}

