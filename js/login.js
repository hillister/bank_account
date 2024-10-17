class Login {
    constructor() {
        const form = document.getElementById("loginForm");
        form.addEventListener("submit", this.handleLogIn.bind(this))
    }

    handleLogIn(event){
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if(this.validateLogin(username, password)){
            sessionStorage.setItem('loggedInUser', username)
            alert(`Welcome back, ${username}!`);
            window.location.href = 'dashboard.html';
        } else {
            alert(`Wrong username or password try again`);
        }
    }

    validateLogin(username, password){
        const storedUserData = JSON.parse(localStorage.getItem(username));

        if(storedUserData && storedUserData.password === password){
            return true
        } else {
            return false
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const login = new Login();  
});