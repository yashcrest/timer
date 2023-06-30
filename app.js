const start_btn = document.querySelector('#start');
const pause_btn = document.querySelector('#pause');
const reset_btn = document.querySelector('#reset');
const hour = document.querySelector('#hour')
const minute = document.querySelector('#minute')
const second = document.querySelector('#second')
const hourError = document.querySelector('#hour-error')
const minuteError = document.querySelector('#minute-error')
const secondError = document.querySelector('#second-error')
let interval;
let remainingSeconds = null;

//validate user input
function validateInput(input, errorElement, min, max, unit) {
let lastValidInput = '';
    input.addEventListener('input' , function () {
        let value = this.value === '' ? '' : parseInt(this.value);
        if(value !== '' && isNaN(value) || value < min || value > max) {
            this.value = lastValidInput;
            errorElement.textContent = `Valid Range:${min}-${max} ${unit}`;
            errorElement.style.display = 'block';
            setTimeout(() => {
                errorElement.style.display = 'none'
            }, 1000);
        } else {
            this.value = this.value.replace(/^0+/, '')
            lastValidInput = this.value;
        }
    } )
}

//Function to start imer 
function startTimer(hours, minutes, seconds){
    if(remainingSeconds === null) {
        remainingSeconds = hours * 60 * 60 + minutes * 60 + seconds;
    }

    //clear any existing interval
    if(interval) clearInterval(interval);

    interval = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds --;
            displayTime(remainingSeconds);
        } else {
            clearInterval(interval);
            remainingSeconds = null;
        }
    } ,1000); 
}


//Function to format time units
function formatTimeUnits(unit) {
    return unit < 10 ? '0' + unit : unit;
}

//Function to display timer
function displayTime(seconds) {
    const displayHours = Math.floor(seconds /3600);
    const displayMinutes = Math.floor((seconds % 3600) / 60);
    const displaySeconds = seconds % 60;
    const formattedTime = `${formatTimeUnits(displayHours)}:${formatTimeUnits(displayMinutes)}:${formatTimeUnits(displaySeconds)}`;
    document.getElementById('timer').textContent = formattedTime;
}

//Validation check 
validateInput(hour, hourError, 0 , 24, 'hrs')
validateInput(minute,minuteError ,0 , 59, 'mins')
validateInput(second,secondError ,0 , 59, 'secs')

//Start Timer
start_btn.addEventListener('click', ()=> {
    const totalHours = parseInt(hour.value) || 0;
    const totalMinutes = parseInt(minute.value) || 0;
    const totalSeconds = parseInt(second.value) || 0;
    const screenDiv = document.querySelector('.screen');

    //Hide input field
    hour.style.display = 'none'
    minute.style.display = 'none'
    second.style.display = 'none'

    //check if the <p> element is already created
    if(!screenDiv.querySelector('p#timer')){
        const pElement = document.createElement('p')
        pElement.id = 'timer'
        screenDiv.appendChild(pElement)
        startTimer(totalHours, totalMinutes, totalSeconds);
    }
    
});

//pause timer
pause_btn.addEventListener('click' , (e) => {
    clearInterval(interval);
})

//reset timer
reset_btn.addEventListener('click' , function(){
    hour.value = ''
    minute.value = ''
    second.value = ''
    clearInterval(interval)
    hour.style.display = 'inline';
    minute.style.display = 'inline';
    second.style.display = 'inline';

    const timerElement = document.getElementById('timer');
    if(timerElement) {
        timerElement.parentElement.removeChild(timerElement);
    }

    //Reset remainingSeconds and interval as well
    if(interval) {
        clearInterval(interval);
        interval = null;
    }
    remainingSeconds = null;
})
