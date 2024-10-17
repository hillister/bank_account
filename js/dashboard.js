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

            const balanceInfo = document.getElementById('balanceInfo');
            balanceInfo.textContent = `Balance: $${userData.balance.toFixed(2)}`

            const accountNo = document.getElementById('accountInfo')
            accountNo.textContent = `Account number: ${userData.accountNumber}`;

            this.userAccount = userData
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});