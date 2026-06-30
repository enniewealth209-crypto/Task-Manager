/* =============================================
   PROFILE IMAGE UPLOAD
============================================= */

const profileCircle = document.getElementById("profile-circle");
const uploadInput   = document.getElementById("profile-upload");
const profileImg    = document.getElementById("profile-img");

const usernameEl = document.getElementById("username");
const emailEl    = document.getElementById("email");
const editBtn    = document.getElementById("edit-profile");
const darkToggle = document.getElementById("dark-toggle");
const logoutBtn  = document.getElementById("logout");


profileCircle.addEventListener("click", () => {
    uploadInput.click();
});

uploadInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profileImg.src = e.target.result;
            localStorage.setItem("profileImage", e.target.result);
        };
        reader.readAsDataURL(file);
    }
});


/* =============================================
   EDIT PROFILE — navigate to edit page
============================================= */

editBtn.addEventListener("click", () => {
    window.location.href = "edit-profile.html";
});


/* =============================================
   TASK ANALYTICS
============================================= */

function updateProfileAnalytics() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const total     = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending   = total - completed;

    const totalEl     = document.getElementById("total-count");
    const completedEl = document.getElementById("completed-count");
    const pendingEl   = document.getElementById("pending-count");

    if (totalEl)     totalEl.textContent     = total;
    if (completedEl) completedEl.textContent = completed;
    if (pendingEl)   pendingEl.textContent   = pending;
}


/* =============================================
   DARK MODE — togglable, persists across pages
============================================= */

function applyDarkMode(enabled) {
    document.body.classList.toggle("dark", enabled);
    // Sync toggle if it exists on this page
    if (darkToggle) darkToggle.checked = enabled;
    localStorage.setItem("darkMode", enabled);
}

if (darkToggle) {
    darkToggle.addEventListener("change", () => {
        applyDarkMode(darkToggle.checked);
    });
}


/* =============================================
   LOAD SAVED DATA ON PAGE INIT
============================================= */

window.addEventListener("load", () => {

    /* --- Dark mode (applies on every page that loads profile.js) --- */
    const darkEnabled = localStorage.getItem("darkMode") === "true";
    applyDarkMode(darkEnabled);

    /* --- Profile image --- */
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage && profileImg) profileImg.src = savedImage;

    /* --- User name & email from signup / signin --- */
    const user = JSON.parse(localStorage.getItem("taskflowUser"));

    if (user) {
        if (usernameEl) usernameEl.textContent = user.name  || "Your Name";
        if (emailEl)    emailEl.textContent    = user.email || "your@email.com";
    }

    updateProfileAnalytics();
});


/* =============================================
   LOGOUT
============================================= */

logoutBtn.addEventListener("click", () => {
    // Keep dark mode pref across sessions, clear everything else
    const dark = localStorage.getItem("darkMode");
    localStorage.clear();
    if (dark) localStorage.setItem("darkMode", dark);
    window.location.href = "sign_in.html";
});