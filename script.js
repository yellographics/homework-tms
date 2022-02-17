'use strict';

const nameField = document.querySelector('.name');
const yearField = document.querySelector('.year');
const dateField = document.querySelector('.date');
const paymentField = document.querySelector('.payment');
const workers = document.querySelector('.workers');
const total = document.querySelector('.total');
const table = document.querySelector('.table');

const addBtn = document.querySelector('.add');
const fireBtn = document.querySelector('.fire');
const calcTotalBtn = document.querySelector('.calc-total');

let allWorkers = [];


function createWorker(name, birthYear, workStarted, payment){
    return { 
        name: name,
        birthYear: birthYear,
        workStarted: workStarted,
        payment: payment,
        checked: false,
    }
}

function renderTable(){
    table.querySelector('tbody').innerHTML = '';
    allWorkers.forEach((worker, index) => {
        table.querySelector('tbody').innerHTML += `
        <tr><td><input type="checkbox" id='${index}'></td><td>${worker.name}</td>
        <td>${worker.birthYear}</td><td>${worker.workStarted}</td><td>${worker.payment}</td></tr>
        `
    })     
}

function showNumberOfWorkers(){
    workers.innerText = `Number of workers: ${allWorkers.length}`;
}

function countTotal(){
    const sum = allWorkers.reduce((sum, worker) => sum + +worker.payment, 0);
    total.innerText = `Sum $: ${sum}`;
}

function sortArray(prop){
    prop === 'birthYear' ? allWorkers.sort((a, b) => +a[prop]- +b[prop]) : allWorkers.sort((a, b) => new Date(a[prop]) - new Date(b[prop]));    
}

function setLocalStorage() {
    localStorage.setItem('workers', JSON.stringify(allWorkers));
}

function getLocalStorage() {
    if(localStorage.getItem('workers')) {
      allWorkers = JSON.parse(localStorage.getItem('workers'));
      renderTable();
      showNumberOfWorkers();
      countTotal();
    }
  }
  window.addEventListener('load', getLocalStorage)



addBtn.addEventListener('click', (event) => {
    event.preventDefault();    
    allWorkers.push(createWorker(nameField.value, yearField.value, dateField.value, paymentField.value));
    renderTable();
    showNumberOfWorkers();
    nameField.value = '';
    yearField.value = '';
    dateField.value = '';
    paymentField.value = '';
    
})

table.querySelector('tbody').addEventListener('click', (event) => {
    
    if (event.target.type === 'checkbox'){
        !allWorkers[+event.target.id].checked ? allWorkers[+event.target.id].checked = true : allWorkers[+event.target.id].checked = false;                
    }   
})

fireBtn.addEventListener('click', () => {
    allWorkers = allWorkers.filter(worker => worker.checked === false);
    renderTable();
    countTotal();
    showNumberOfWorkers();
})

calcTotalBtn.addEventListener('click', countTotal);

table.querySelector('thead').addEventListener('click', (event) => {
    console.log(allWorkers);
    switch (true){
        case event.target.classList.contains('up'):           
            sortArray(event.target.dataset.type);
            allWorkers.reverse();
            renderTable();
            break;
        case event.target.classList.contains('down'):
            sortArray(event.target.dataset.type);          
            renderTable();
            break;
    }
})




window.addEventListener('beforeunload', setLocalStorage)



