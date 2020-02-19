const form = document.querySelector("#task-form");
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

function loadEventListeners() {

    document.addEventListener('DOMContentLoaded',getTasks)

    form.addEventListener('submit',addTask);
    //removeTask
    taskList.addEventListener('click',removeItem);
    //cleartasks button
    clearBtn.addEventListener('click',allTasks);
    //filter
    filter.addEventListener('keyup',filterTasks);
}
//get tasks
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');
        const tNode = document.createTextNode(task);
        li.classList.add('collection-item'); 
        li.appendChild(tNode);
        const link = document.createElement('a');
        link.classList.add('delete-item');
        link.classList.add('secondary-content');
        link.setAttribute('href','#')
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}



function addTask(e){
    const li = document.createElement('li');
    const tNode = document.createTextNode(taskInput.value);
    li.classList.add('collection-item'); 
    li.appendChild(tNode);
    const link = document.createElement('a');
    link.classList.add('delete-item');
    link.classList.add('secondary-content');
    link.setAttribute('href','#')
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
    storeTasksInLocatStorage(taskInput.value);

    // console.log(li);
    e.preventDefault();
}

function storeTasksInLocatStorage(task){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));

}

function removeItem(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();
            removeTasksFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
    // e.preventDefault();
    
}

function removeTasksFromLocalStorage(taskItem) {
    // console.log(taskItem.textContent);
debugger
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }

    })

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function allTasks() {
    // console.log(taskList.children[0].remove());
    const child = document.querySelectorAll('ul li');
    for(let i = 0;i < child.length;i++){
        console.log(child.length);
        console.log(child[i].remove());
        
        // Array.from(child)[i].remove();
    }
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    // console.log(text);
    const list = document.querySelectorAll('.collection-item');
    // console.log(list);
    list.forEach(function(tasks){
        const item = tasks.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            tasks.style.display = 'block';
        } else {
            tasks.style.display = 'none';
        }
        
    })
    
    e.preventDefault();
}



loadEventListeners();