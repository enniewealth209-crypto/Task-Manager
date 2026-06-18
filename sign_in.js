document.addEventListener("DOMContentLoaded", function() {
    const password = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    if (password && togglePassword) {
        togglePassword.addEventListener("click", function(e) {
            e.stopPropagation();
            
            const type = password.getAttribute("type") === "password" ? "text" : "password";
            password.setAttribute("type", type);
            togglePassword.textContent = type === "password" ? "👁" : "🙈";
        });
        
        togglePassword.style.cursor = "pointer";
    }
});