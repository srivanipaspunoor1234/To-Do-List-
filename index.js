let addBtn = document.getElementById("addBtn");
let input = document.getElementById("input");
let div = document.getElementById("div");


function getTaskList() {
    let data = localStorage.getItem("list")
    if (data == null) {
        return []
    } else {
        return JSON.parse(data)
    }

}
let list = getTaskList()


function createandAddRow(task) {
    let row = document.createElement("div")
    row.className = "row";
    div.appendChild(row)

    let cb = document.createElement("input");
    cb.type = "checkbox";
    row.appendChild(cb);

    let todo = document.createElement("p");
    todo.textContent = task.todo;
    row.appendChild(todo);

    let btn = document.createElement("button");
    btn.textContent = "Delete"
    row.appendChild(btn)

    cb.checked = task.completed;
    if (task.completed) {
        todo.style.textDecoration = "line-through"
    }


    cb.onclick = () => {
        if (cb.checked) {
            todo.style.textDecoration = "line-through"
            task.completed = true;
        } else {
            todo.style.textDecoration = "none"
            task.completed = false;
        }
        localStorage.setItem("list", JSON.stringify(list));
    }

    btn.onclick = () => {
        row.remove();

        list = list.filter(item => item !== task);
        localStorage.setItem("list", JSON.stringify(list));
    }
}

addBtn.onclick = () => {
    if (input.value == "") {
        alert("Field is empty")
        return
    }
    let new_list = {
        todo: input.value,
        completed: false
    }
    list.push(new_list)
    localStorage.setItem("list", JSON.stringify(list))

    createandAddRow(new_list)
    input.value = "";

}

for (let i of list) {
    createandAddRow(i)
}
