const openFormBtn = document.getElementById("open-form");
const mainContent = document.getElementById("main-content");
const formContainer = document.getElementById("form-container");
const emptyState = document.getElementById("empty-state");
const taskGrid = document.getElementById("task-grid");

// Dashboard elements
const totalCount = document.getElementById("total-count");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");

// Load external form
fetch("task-form.html")
    .then(res => res.text())
    .then(html => {
        formContainer.innerHTML = html;
        initializeFormEvents(); // Initialize events after form loads
    });

function initializeFormEvents() {
    const backBtn = document.getElementById("back-btn");
    const saveBtn = document.getElementById("save-btn");
    const taskForm = document.getElementById("task-model");

    // --- Open Form → Hide everything ---
    openFormBtn.onclick = () => {
        mainContent.style.display = "none";
        taskForm.style.display = "flex";
    };

    // --- Close Form → Show everything ---
    backBtn.onclick = () => {
        taskForm.style.display = "none";
        mainContent.style.display = "block";
        updateDashboard();
    };

    // --- Category Selection ---
    document.querySelectorAll(".cate-btn").forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll(".cate-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        };
    });

    // --- Priority Selection ---
    document.querySelectorAll(".priority-btn").forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll(".priority-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        };
    });

    // --- Save New Task ---
    saveBtn.onclick = () => {
        const title = document.getElementById("task-title").value.trim();
        const desc = document.getElementById("task-desc").value.trim();
        const date = document.getElementById("task-duedate").value;
        const time = document.getElementById("task-duetime").value;

        const category = document.querySelector(".cate-btn.active").textContent;
        const priority = document.querySelector(".priority-btn.active").textContent;

        // Validate
        if (!title || !desc || !date || !time) {
            alert("Please fill all fields!");
            return;
        }

        // Create Task Card
        const card = document.createElement("div");
        card.className = "task-card";
        card.innerHTML = `
            <div class="card-header">
                <h3>${title}</h3>
                <div class="card-icons">
                    <span class="complete-btn">✔</span>
                    <span class="delete-btn">🗑</span>
                </div>
            </div>
            <div class="card-body"><p>${desc}</p></div>
            <div class="card-footer">
                <span class="task-cate">${category}</span>
                <span class="priority-${priority.toLowerCase()}">${priority}</span>
            </div>
            <div class="card-deadline">
                <span><i class='bx bx-calendar-event'></i> ${date}</span>
                <span><i class='bx bx-stopwatch'></i> ${time}</span>
            </div>
        `;

        // Complete Task
        card.querySelector(".complete-btn").onclick = () => {
            card.classList.toggle("completed");
            updateDashboard();
        };

        // Delete Task
        card.querySelector(".delete-btn").onclick = () => {
            card.remove();
            updateDashboard();
        };

        // Add to DOM
        taskGrid.appendChild(card);
        taskGrid.style.display = "grid";

        // Clear Form
        document.getElementById("task-title").value = "";
        document.getElementById("task-desc").value = "";
        document.getElementById("task-duedate").value = "";
        document.getElementById("task-duetime").value = "";

        // Close Form
        taskForm.style.display = "none";
        mainContent.style.display = "block";

        // Update Stats
        updateDashboard();
    };
}

// --- Update Dashboard Counts ---
function updateDashboard() {
    const cards = document.querySelectorAll(".task-card");
    const total = cards.length;
    const completed = document.querySelectorAll(".task-card.completed").length;
    const pending = total - completed;

    totalCount.textContent = total;
    completedCount.textContent = completed;
    pendingCount.textContent = pending;

    emptyState.style.display = total === 0 ? "flex" : "none";
}