let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

// SAVE
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ADD
function addTask() {
  let input = document.getElementById("taskInput");

  if (input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    done: false
  });

  input.value = "";
  save();
  render();
}

// FILTER SET
function setFilter(type) {
  filter = type;
  render();
}

// SEARCH + FILTER + RENDER
function render() {
  let list = document.getElementById("taskList");
  let search = document.getElementById("searchInput").value.toLowerCase();

  list.innerHTML = "";

  tasks
    .filter(task => {
      if (filter === "active") return !task.done;
      if (filter === "done") return task.done;
      return true;
    })
    .filter(task => task.text.toLowerCase().includes(search))
    .forEach((task, index) => {

      let li = document.createElement("li");

      li.textContent = task.text;

      if (task.done) li.classList.add("completed");

      // TOGGLE DONE
      li.onclick = () => {
        task.done = !task.done;
        save();
        render();
      };

      // DELETE
      let del = document.createElement("button");
      del.textContent = "X";

      del.onclick = (e) => {
        e.stopPropagation();
        tasks.splice(index, 1);
        save();
        render();
      };

      li.appendChild(del);
      list.appendChild(li);
    });
}

// THEME
function toggleTheme() {
  document.body.classList.toggle("light");
}

// INIT
render();