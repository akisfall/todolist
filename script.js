const inputbox = document.querySelector(".input");
inputbox.addEventListener("keydown",Enter);
const todopane = document.querySelector(".list");
const storedData = localStorage.getItem("Data");
const storedTask = JSON.parse(storedData);
const dataArray = storedData ? JSON.parse(storedData) : [];

document.addEventListener("DOMContentLoaded",()=>{
    if (storedData) {
        storedTask.forEach((task) => {
                taskAdd(task);
        });
    }
})

function taskAdd(t){
    const taskpane = document.createElement("div");
    taskpane.setAttribute("class","todo-item");
    const task = document.createElement("span");
    task.textContent = t;
    const deletebtn = document.createElement("button");
    deletebtn.textContent = "X";
    const editbtn = document.createElement("button");
    editbtn.textContent = "edit";
    deletebtn.addEventListener("click",deltask);
    editbtn.addEventListener("click",edit);
    taskpane.addEventListener('click', mark);
    taskpane.appendChild(task);
    taskpane.appendChild(deletebtn);
    taskpane.appendChild(editbtn);
    todopane.appendChild(taskpane);
}

function mark(e){
    const span = e.target;
    if(span.tagName === "SPAN"){
        span.classList.toggle("done");
    }
}

const selectedtasks = [];
function deltask(e){
    const parent = e.target.parentElement;
    const span = parent.querySelector("span");
    selectedtasks.push(span.textContent);
    const storedTask = JSON.parse(storedData);
    const deletetask = storedTask.filter(task=>!selectedtasks.includes(task));
    localStorage.setItem("Data",JSON.stringify(deletetask));
    parent.remove();
}

function edit(e){
    const parent = e.target.parentElement;
    const edit = prompt("Enter new edit");
    const task = parent.querySelector("span");
    if(edit){
        const storedTask = JSON.parse(storedData);
        const selectEditIndex = storedTask.indexOf(task.textContent);
        storedTask[selectEditIndex] = edit;
        localStorage.setItem("Data",JSON.stringify(storedTask));
        task.textContent = edit;
        task.classList.remove("done");
    };
}
function Enter(event){
    if((inputbox.value) && event.key === "Enter" || event.keycode === 13){
        const task = inputbox.value;
        taskAdd(task);
        dataArray.push(task);
        localStorage.setItem("Data", JSON.stringify(dataArray));
        inputbox.value = "";
    }
}