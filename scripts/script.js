const kgOrLbs = document.querySelector('fieldset');
const weight = document.querySelector('.feeding-row-kg');
const activity = document.querySelector('.feeding-column-kg');
const formSelection = document.querySelectorAll('.calculator-container');
const showOutput = document.querySelector('#output');
const clickInput = document.querySelectorAll('#input');
const clickToggle = document.querySelectorAll('.weight-selector')
let selectedValue;


kgOrLbs.addEventListener('input', () => {
    clickInput.forEach(elementValue => {
        if(elementValue.checked){
            selectedValue = elementValue.value;
        }
    })
});

function getWeight(){
    let test = weight.options[weight.selectedIndex].text;
    let numbericVlaue = Number(test.replace(/[^0-9]/g, ''));
    return numbericVlaue;
}

function getActivity(){
    let currentActivity = activity.options[activity.selectedIndex].value;
    return currentActivity;
}

formSelection.forEach(element => {
    element.addEventListener('input', () =>{
       if(getWeight() > 0 && getActivity() > 0 && selectedValue != undefined){
           showOutput.textContent = calculateAmmount();          
       }
    });
});

function calculateAmmount(){
    let ammount;

    if(selectedValue === 'kg'){
        
        ammount = convertToGrams(getWeight()) * getActivity() + ' grams';
    }
    else{
        ammount = convertToOz(getWeight()) * getActivity() + ' oz';
    }

    return ammount;
}

function convertToGrams(kgvalue){
    return kgvalue * 10;
}

function convertToOz(kgvalue){
    let lbsInKg = 2.205;
    let ozInLbs = 16;
    let currentOz;
    let currentlbs;

    currentlbs = (kgvalue/100) * lbsInKg;
    currentOz = currentlbs * ozInLbs;
    return roundToNum(currentOz, 1);
}

function roundToNum(num, decimalPlaces){
    return +(Math.round(num + 'e+' + decimalPlaces) + 'e-' + decimalPlaces);
}

clickToggle.forEach(element => {
    element.addEventListener('click', () => {
        clickToggle.forEach(elem => {
            elem.classList.remove('clicked');
        })
        element.classList.add('clicked');   
    });
});