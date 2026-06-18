const openFormBtn = document.getElementById("open-form");
const mainContent = document.getElementById("main-content");
const formContainer = document.getElementById("form-container");
const emptyState = document.getElementById("empty-state");
const taskGrid = document.getElementById("task-grid");

const totalCount = document.getElementById("total-count");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");

/* LOAD FORM — only on task.html where form-container exists */

if(formContainer){
    fetch("create-task-form.html")
    .then(res => res.text())
    .then(html => {
        formContainer.innerHTML = html;
        initializeFormEvents();
    });
}

/* FORM EVENTS */

function initializeFormEvents(){

    const backBtn = document.getElementById("back-btn");
    const saveBtn = document.getElementById("save-btn");
    const taskForm = document.getElementById("task-model");

    openFormBtn.onclick = () => {

        mainContent.style.display = "none";
        taskForm.style.display = "flex";

    };

    backBtn.onclick = () => {

        taskForm.style.display = "none";
        mainContent.style.display = "block";

    };

    document.querySelectorAll(".cate-btn").forEach(btn => {

        btn.onclick = () => {

            document
            .querySelectorAll(".cate-btn")
            .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

        };

    });

    document.querySelectorAll(".priority-btn").forEach(btn => {

        btn.onclick = () => {

            document
            .querySelectorAll(".priority-btn")
            .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

        };

    });

    saveBtn.onclick = () => {

        const title =
        document.getElementById("task-title").value.trim();

        const description =
        document.getElementById("task-desc").value.trim();

        const date =
        document.getElementById("task-duedate").value;

        const time =
        document.getElementById("task-duetime").value;

        const category =
        document.querySelector(".cate-btn.active").textContent;

        const priority =
        document.querySelector(".priority-btn.active").textContent;

        if(
            !title ||
            !description ||
            !date ||
            !time
        ){
            alert("Please fill all fields");
            return;
        }

        const task = {

            title,
            description,
            date,
            time,
            category,
            priority,
            completed:false

        };

        let tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];

        tasks.push(task);

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

        taskForm.style.display = "none";
        mainContent.style.display = "block";

        renderTasks();

        document.getElementById("task-title").value = "";
        document.getElementById("task-desc").value = "";
        document.getElementById("task-duedate").value = "";
        document.getElementById("task-duetime").value = "";

    };

}

/* RENDER TASKS */

function renderTasks(){

    const tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];

    taskGrid.innerHTML = "";

    if(tasks.length === 0){

        emptyState.style.display = "flex";

    }else{

        emptyState.style.display = "none";

    }

    tasks.forEach((task,index)=>{

        const card = document.createElement("div");

        card.className = `task-card ${task.completed ? "completed" : ""}`;
        card.style.cursor = "pointer";

        card.innerHTML = `

            <div class="card-header">

                <h3>${task.title}</h3>

                <div class="card-icons">

                    <span
                        class="complete-btn"
                        title="${task.completed ? 'Mark pending' : 'Mark complete'}"
                    >
                        ✔
                    </span>

                    <span
                        class="delete-btn"
                        title="Delete task"
                    >
                        🗑
                    </span>

                </div>

            </div>

            <div class="card-body">
                <p>${task.description}</p>
            </div>

            <div class="card-footer">

                <span class="task-cate">
                    ${task.category}
                </span>

                <span class="priority-${task.priority.toLowerCase()}">
                    ${task.priority}
                </span>

            </div>

            <div class="card-deadline">

                <span>📅 ${task.date}</span>

                <span>⏰ ${task.time}</span>

            </div>`;

        // wire buttons first — stopPropagation prevents card click from firing
        card.querySelector(".complete-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            toggleTask(index);
        });

        card.querySelector(".delete-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            deleteTask(index);
        });

        // clicking anywhere else on the card opens task details
        card.addEventListener("click", () => openTask(index));

        taskGrid.appendChild(card);

    });

    updateDashboard();

}

/* OPEN TASK DETAILS */

function openTask(index){
    localStorage.setItem("selectedTask", index);
    window.location.href = "task-details.html";
}

/* COMPLETE */

function toggleTask(index){

    let tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];

    tasks[index].completed =
    !tasks[index].completed;

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    renderTasks();

}

/* DELETE */

function deleteTask(index){

    let tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];

    tasks.splice(index,1);

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    renderTasks();

}

/* STATS */

function updateDashboard(){

    const tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];

    const total = tasks.length;

    const completed =
    tasks.filter(task => task.completed).length;

    const pending =
    total - completed;

    // task.html counters
    if(totalCount)    totalCount.textContent    = total;
    if(completedCount) completedCount.textContent = completed;
    if(pendingCount)  pendingCount.textContent   = pending;

    // dashboard.html counters
    const elTotal      = document.getElementById("totalTasks");
    const elCompleted  = document.getElementById("completedTasks");
    const elPending    = document.getElementById("pendingTasks");
    const elRate       = document.getElementById("completionRate");

    if(elTotal)     elTotal.textContent    = total;
    if(elCompleted) elCompleted.textContent = completed;
    if(elPending)   elPending.textContent   = pending;
    if(elRate)      elRate.textContent      = (total > 0 ? Math.round((completed/total)*100) : 0) + "%";
}

/* INITIAL LOAD */

if(taskGrid) renderTasks();