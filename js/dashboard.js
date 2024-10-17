class Dashboard {
    constructor(){
        this.username = sessionStorage.getItem("loggedInUser");
        if(!this.username){
            alert('Please log in to access your dashboard');
            window.location.href = 'login.html';
        } else {
            this.loadUserData();
        }
    }

    loadUserData() {
        const userData = JSON.parse(localStorage.getItem(this.username));
        if(userData){
            const welcomeMessage = document.getElementById('welcomeUser');
            welcomeMessage.textContent = `Welcome, ${userData.username}!`
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});