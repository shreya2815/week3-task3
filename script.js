let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    input.value = "";
    saveTasks();
    displayTasks();
}

function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${task.text}</span>
            <button onclick="completeTask(${index})">Complete</button>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        if (task.completed) {
            li.style.textDecoration = "line-through";
        }

        list.appendChild(li);
    });
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);

    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        displayTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

displayTasks();