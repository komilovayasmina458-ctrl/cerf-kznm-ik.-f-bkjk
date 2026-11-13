
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let form = document.getElementById("task-form");
let input = document.getElementById("task-input");
let list = document.getElementById("task-list");

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let div = document.createElement("div");
        div.className = task.done ? "task done" : "task";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;

        checkbox.onchange = () => {
            task.done = checkbox.checked;
            save();
            render();

            if (task.done) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.7 }
                });
            }
        };

        let span = document.createElement("span");
        span.innerText = task.name;

        let del = document.createElement("button");
        del.innerText = "Delete";
        del.className = "delete";

        del.onclick = () => {
            tasks.splice(index, 1);
            save();
            render();
        };

        div.append(checkbox, span, del);
        list.appendChild(div);
    });

    let total = tasks.length;
    let completed = tasks.filter(task => task.done).length;
    let percent = total === 0 ? 0 : Math.round(completed / total * 100);

    document.getElementById("total").innerText = total;
    document.getElementById("completed").innerText = completed;
    document.getElementById("percent").innerText = percent + "%";
    document.getElementById("progress-text").innerText = percent + "%";
    document.getElementById("progress").style.width = percent + "%";
}

form.onsubmit = function(event) {
    event.preventDefault();

    let name = input.value.trim();

    if (name === "") return;

    tasks.push({
        name: name,
        done: false
    });

    input.value = "";

    save();
    render();
};

render();
