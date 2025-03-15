document.addEventListener("DOMContentLoaded", function() {
    // Check if the user is logged in
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "login.html"; // Redirect if not logged in
    } else {
        // Set username and profile image in the sidebar
        document.getElementById("user-name").textContent = user.username;
        document.getElementById("profile-img").src = user.profileImage;

        // Handle logout
        document.getElementById("logout-btn").addEventListener("click", function() {
            localStorage.removeItem("user");
            window.location.href = "login.html"; // Redirect to login
        });
    }
});
document.getElementById("signup-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const profileImage = document.getElementById("profile-image").files[0];

    // Convert image to Base64 (optional)
    const reader = new FileReader();
    reader.onloadend = function() {
        const userData = {
            username,
            password,
            profileImage: reader.result, // Store base64 image data
        };

        // Store user data in local storage
        localStorage.setItem("user", JSON.stringify(userData));
        alert("Signup successful! You can now login.");
        window.location.href = "login.html";
    };
    
    if (profileImage) {
        reader.readAsDataURL(profileImage); // Converts the image to base64
    }
});

// Login Form
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const loginUsername = document.getElementById("login-username").value;
    const loginPassword = document.getElementById("login-password").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.username === loginUsername && storedUser.password === loginPassword) {
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid login credentials.");
    }
});