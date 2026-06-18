const profileCircle = document.getElementById("profile-circle");
const uploadInput = document.getElementById("profile-upload");
const profileImg = document.getElementById("profile-img");

const username = document.getElementById("username");
const email = document.getElementById("email");

const editBtn = document.getElementById("edit-profile");

const darkToggle = document.getElementById("dark-toggle");

const logoutBtn = document.getElementById("logout");



/* PROFILE IMAGE */

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



/* EDIT NAME + EMAIL */

editBtn.addEventListener("click", () => {

    const newName = prompt("Enter your name");

    const newEmail = prompt("Enter your email");


    if (newName) {

        username.textContent = newName;

        localStorage.setItem("userName", newName);

    }


    if (newEmail) {

        email.textContent = newEmail;

        localStorage.setItem("userEmail", newEmail);

    }

});
/* Analysis Update*/

function updateProfileAnalytics() {

    const tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    const total = tasks.length;


    const completed =
        tasks.filter(task =>
            task.completed
        ).length;


    const pending =
        total - completed;


    document.getElementById("total-count").textContent = total;

    document.getElementById("completed-count").textContent = completed;

    document.getElementById("pending-count").textContent = pending;
}



/* DARK MODE */

darkToggle.addEventListener("change", () => {

    document.body.classList.toggle("dark");

    localStorage.setItem(

        "darkMode",

        document.body.classList.contains("dark")

    );

});



/* LOAD SAVED DATA */

window.addEventListener("load", () => {

    const savedImage = localStorage.getItem("profileImage");
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("userEmail");


    if (savedImage) {

        profileImg.src = savedImage;

    }


    if (savedName) {

        username.textContent = savedName;

    }


    if (savedEmail) {

        email.textContent = savedEmail;

    }


    if (localStorage.getItem("darkMode") === "true") {

        document.body.classList.add("dark");

        darkToggle.checked = true;

    }

    updateProfileAnalytics();

});



/* LOGOUT */

logoutBtn.addEventListener("click", () => {

    localStorage.clear();

    location.reload();

});