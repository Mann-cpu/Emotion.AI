// Switch forms
function showRegister() {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("registerBox").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("registerBox").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
}

// Register
function register() {
    let user = document.getElementById("regUser").value.trim();
    let pass = document.getElementById("regPass").value.trim();
    let msg = document.getElementById("regMsg");

    if (user === "" || pass === "") {
        msg.textContent = "Fill all fields ❌";
        return;
    }

    if (localStorage.getItem(user)) {
        msg.textContent = "User already exists ⚠️";
        return;
    }

    localStorage.setItem(user, pass);
    msg.textContent = "Registered Successfully ✅";
}

// Login
function login() {
    let user = document.getElementById("loginUser").value.trim();
    let pass = document.getElementById("loginPass").value.trim();
    let msg = document.getElementById("loginMsg");

    // 🚫 Check empty fields first
    if (user === "" || pass === "") {
        msg.textContent = "Please enter username and password ❌";
        return;
    }

    let storedPass = localStorage.getItem(user);

    // 🚫 If user not registered
    if (storedPass === null) {
        msg.textContent = "User not found ❌";
        return;
    }

    // 🚫 If password wrong
    if (storedPass !== pass) {
        msg.textContent = "Wrong Password ❌";
        return;
    }

    // ✅ Success
    msg.textContent = "Login Successful ✅";

    setTimeout(() => {
        window.location.href = "home.html";
    }, 1000);
}