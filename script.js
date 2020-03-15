//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners() {
  //DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add task event
  form.addEventListener('submit', addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  //Clear task event
  clearBtn.addEventListener('click', clearTasks);
  //Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

//Get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    //Create li element
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    //Create Text Node and append to li
    li.appendChild(document.createTextNode(tasks));
    //Create new link element
    const link = document.createElement('a');
    //Add Class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
  });
}

//Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  } else {
    //Create li element
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    //Create Text Node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    //Add Class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //Add to local storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear Input
    taskInput.value = '';

    e.preventDefault();
  }
}

//Store Task
function storeTaskInLocalStorage(task) {
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
      //Remove from ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear task
function clearTasks() {
  //taskList.innerHTML = '';

  //Use of loop
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //Clear from local Storage
  clearTasksFromLocalStorage();
}

//Clear tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
//Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
