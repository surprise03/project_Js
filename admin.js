const admin = "admin";
const password = "admin123";
const Admin1 = document.getElementById("Admin_login");
const password1 = document.getElementById("password");

function login(event) {
    console.log(event)
    event.preventDefault(); // Prevent the form from submitting



    if (Admin1.value == admin && password1.value == password) {
        console.log("Redirecting to adminDash.html");
        window.location.href = "adminDash.html";
    } else {
        alert("Invalid credentials. Please try again.");
    }
}
