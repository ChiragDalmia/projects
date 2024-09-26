
const inputBox = document.getElementById('input-box');
const inputDate = document.getElementById('input-date');
const addBtn = document.getElementById('add-btn');
const listContainer = document.getElementById('list-container');

addBtn.addEventListener('click',() => {
  addTask();
})

function addTask(){
  if (inputBox.value === '' || inputDate.value === '') {
    alert('Please fill both fields');
    return;
  } else{
    const listItem = document.createElement('li');
    listItem.classList.add('list-item');
    const checkMark = document.createElement('div');
    checkMark.classList.add('checkmark');
    const listItemText = document.createElement('div');
    listItemText.classList.add('list-item-text');
    listItemText.innerText = inputBox.value;
    const listItemDate = document.createElement('div');
    listItemDate.classList.add('list-item-date');
    listItemDate.innerText = inputDate.value;
    const listItemDelete = document.createElement('div');
    listItemDelete.classList.add('list-item-delete');
    listItemDelete.innerText = '\u00d7';
    listItem.appendChild(checkMark);
    listItem.appendChild(listItemText);
    listItem.appendChild(listItemDate);
    listItem.appendChild(listItemDelete);
    listContainer.appendChild(listItem);
    inputBox.value = '';
    inputDate.value = '';
    saveData();
  }
}

listContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
    saveData()
  } else if (e.target.tagName === 'DIV' && e.target.classList.contains('list-item-delete')) {
    e.target.parentElement.remove();
    saveData()
  }
}, false)

function saveData(){
  localStorage.setItem('listContainer', listContainer.innerHTML);
}

function loadData(){
  if (localStorage.getItem('listContainer')) {
    listContainer.innerHTML = localStorage.getItem('listContainer');
  }
}

loadData();