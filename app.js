const start_btn = document.querySelector('#start');
const pause_btn = document.querySelector('#pause');
const reset_btn = document.querySelector('#reset');
const hour = document.querySelector('#hour')
const minute = document.querySelector('#minute')
const second = document.querySelector('#second')
const hourError = document.querySelector('#hour-error')
const minuteError = document.querySelector('#minute-error')
const secondError = document.querySelector('#second-error')


//validate user input
function validateInput(input, errorElement, min, max, unit) {
    let lastValidInput = '';
    input.addEventListener('input' , function () {
        let value = this.value === '' ? '' : parseInt(this.value);
        if(value !== '' && isNaN(value) || value < min || value > max) {
            this.value = lastValidInput;
            errorElement.textContent = `Valid Range:${min}-${max} ${unit} `;
            errorElement.style.display = 'block';
            setTimeout(() => {
                errorElement.style.display = 'none'
                this.value = ''
            }, 2000);
        } else {
            this.value = this.value.replace(/^0+/, '')
            lastValidInput = this.value;
        }
    } )
}
validateInput(hour, hourError, 0 , 24, 'hrs')
validateInput(minute,minuteError ,0 , 59, 'mins')
validateInput(second,secondError ,0 , 59, 'secs')



start_btn.addEventListener('click' , (e) => {
    console.log(e);
})

pause_btn.addEventListener('click' , (e) => {
    console.log(e);
})

reset_btn.addEventListener('click' , (e) => {
    console.log(e);
})

