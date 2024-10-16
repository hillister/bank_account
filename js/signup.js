
class SignUp {
    constructor(){
        const form = document.querySelector("form");
        form.addEventListener("submit", this.handleSignUp.bind(this))
    }

    handleSignUp(event){
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const startingBalance = parseFloat(document.getElementById("startingBalance").value);
        const email = document.getElementById("email").value;

        if (this.validateForm(username, email, password, startingBalance)){
            this.createBankAccount(username, email, password, startingBalance);
        } else {
            alert('Please fill out all fields correctly')
        }
    }

    validateForm(username, email, password, startingBalance) {
        return username !== '' && email !== '' && password !== '' && !isNaN(startingBalance);
    }

    createBankAccount(username, email, password, startingBalance) {
        const newAccount = new BankAccount(username, startingBalance);

        const userData = {
            username: username,
            email: email,
            password: password,
            accountNumber: newAccount.accountNumber,
            balance: newAccount.balance,
            transactions: newAccount.transactions,
            createdOn: newAccount.createdOn
        }

        localStorage.setItem(username, JSON.stringify(userData));

        alert(`Welcome to Piggypal, ${username}! Your account number is ${newAccount.accountNumber}.`);
        window.location.href = 'login.html';
    }

}

document.addEventListener('DOMContentLoaded', function() {
    const signUp = new SignUp();  
});