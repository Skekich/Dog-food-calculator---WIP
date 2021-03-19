const kgOrLbs = document.querySelector('fieldset');
const weightKg = document.querySelector('.feeding-row-kg');
const weightLbs = document.querySelector('.feeding-row-lbs');
const activity = document.querySelector('.feeding-column-kg');
const formSelection = document.querySelectorAll('.calculator-container');
const showOutput = document.querySelector('#output');
const clickInput = document.querySelectorAll('#input');
const clickToggle = document.querySelectorAll('.weight-selector');
let selectedValue;

kgOrLbs.addEventListener('input', () => {
    let currentSelection;

    clickInput.forEach(elementValue => {
        if(elementValue.checked){
            selectedValue = elementValue.value; 
            currentSelection = selectedValue; 
        }
        rightValueSelected(currentSelection);
    })
});

function rightValueSelected(value){
    if(value === 'lbs'){
        weightLbs.classList.add('selected-lbs');
        weightKg.classList.add('hidden-kg');
    } else {
        weightLbs.classList.remove('selected-lbs');
        weightKg.classList.remove('hidden-kg');
    }
}

//TODO prepravit ne radi
function getWeightValue(){   
    if(selectedValue === 'lbs'){       

        return weightLbs.value;
    }
    else{
        return weightKg.value;
    }
}

function getActivity(){
    let currentActivity = activity.options[activity.selectedIndex].value;
    return currentActivity;
}

formSelection.forEach(element => {
    element.addEventListener('input', () =>{
        if(getWeightValue() > 0 && getActivity() > 0 && selectedValue != undefined){
            showOutput.textContent = calculateAmmount();     
       }
    });
});

function calculateAmmount(){
    let ammount;

    if(selectedValue === 'kg'){        
        ammount = convertToGrams(getWeight(weightKg)) * getActivity() + ' grams';
    }
    else {
        ammount = convertToOz(getWeight(weightLbs)) * getActivity() + ' oz';
    }

    return ammount;
}

function convertToGrams(weightValue){
    return weightValue * 10;
}

function convertToOz(weightValue){
    /* const lbsInKg = 2.205;
    const ozInLbs = 16;
    let currentOz;
    let currentlbs;

    currentlbs = (kgvalue/100) * lbsInKg;
    currentOz = currentlbs * ozInLbs; */
    return weightValue / 6.25;
}

function getWeight(weight){
    let stringValue = weight.options[weight.selectedIndex].text;
    let numbericVlaue = Number(stringValue.replace(/[^0-9]/g, ''));
    return numbericVlaue;
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

/* let formLabel = document.querySelector('.feeding-row-lbs');

formLabel.addEventListener('input', convertKg());

function convertKg(){
    const weightKg = document.querySelectorAll('.lbs');
    const lbsInKg = 2.205;
    let testString;
    let numValue;

    for (let index = 0; index < weightKg.length; index++) {
        testString = weightKg[index].text;
        numValue = Number(testString.replace(/[^0-9]/g, ''));
        console.log(roundToNum((numValue*lbsInKg), 1));
    }
} */