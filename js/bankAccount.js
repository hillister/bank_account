class BankAccount {
    constructor(name, startingBalance = 0) {
        this.name = name;
        this.accountNumber = Math.floor(100000 + Math.random() * 900000);
        this.balance = startingBalance;
        this.startingBalance = startingBalance;
        this.transactions = [];
        this.createdOn = new Date();
        this.isFrozen = false;
        this.isClosed = false;
    }

    freezeAccount(){
        this.isFrozen = true;
    }

    closeAccount(){
        this.isClosed = true;
    }

    deposit(amount) {
        if(this.isClosed === true || this.isFrozen === true){
            console.log('You cannot deposit money the account is not active')
        } else {
            this.balance = amount + this.balance;
            console.log(`You successfully deposited $${amount}`)
            this.transactions.unshift(`Deposited: $${amount} on ${new Date().toLocaleString()}`)
        }
    }

    withdraw(amount) {
        if(this.isClosed === true || this.isFrozen === true){
            console.log('You cannot withdraw money the account is not active')
        } else if(amount >= 5 && amount <= this.balance){
            this.balance =  this.balance - amount
            console.log(`You successfully withdrew $${amount}`)
            this.transactions.unshift(`Withdrew: $${amount} on ${new Date().toLocaleString()}`)
        } else if(amount > this.balance && !this.overdraftLimit){
            console.log(`You do not have enough money to withdraw this ammount. You can enable an overdraft in the settings.`);
        } else if(this.overdraftLimit && amount < this.balance + this.overdraftLimit){
            this.balance =  this.balance - amount
            console.log(`You successfully withdrew $${amount}`)
            this.transactions.unshift(`Withdrew: $${amount} on ${new Date().toLocaleString()}`)
        } else if(amount > this.balance && amount > this.overdraftLimit){
            console.log(`You do not have enough money to withdraw this ammount. Youre overdraft limit is set at ${this.overdraftLimit}`);
        }else {
            console.log(`The minimum withdrawl is $5`);
        }
    }

    enableOverdraft(limit){
        this.overdraftLimit = limit;
    }

    getBalance() {
        return this.balance
    }

    transfer(amount, recipientAccount) {
        if(this.isClosed === true || this.isFrozen === true){
            console.log('You cannot transfer money your account is not active');
        } else if (recipientAccount.isClosed === true || recipientAccount.isFrozen === true){
            console.log('The account you are trying to transfer to is not active');
        } else if(amount >= 5 && amount <= this.balance){
            this.balance = this.balance - amount;
            console.log(`You successfully transfered ${amount} to account number ${recipientAccount.accountNumber}.Your new balance is ${this.balance}`)
            recipientAccount.balance = amount + recipientAccount.balance
            this.transactions.unshift(`Transfered: $${amount} on ${new Date().toLocaleString()} to ${recipientAccount.name}, Account no. ${recipientAccount.accountNumber}`)
            recipientAccount.transactions.unshift(`Received: $${amount} on ${new Date().toLocaleString()} from ${this.name}, Account no. ${this.accountNumber}`)
        } else if(amount > this.balance){
            console.log(`You do not have enough money in your account`);
        } else if (ammount < 5){
            console.log(`The minimum transfer is $5`);
        }
    }

    static calcInterest(balance, rate){
        const interest = balance * (rate/100);
        const newBalance = balance + interest;
        return {
            interest: interest,
            newBalance: newBalance
        };
    }

    transactionLog(transactions){
        transactions = this.transactions;
        if(transactions.length === 0){
            console.log('No transactions yet')
        } else {
            console.log(`Transaction History:`)
            for(const transaction of transactions){
            console.log(transaction)
            }
        }
    }

    accountStatement(){
        console.log(`Starting Balance: $${this.startingBalance}`)
        this.transactionLog()
        console.log(`Current balance: $${this.getBalance()}`)
    }
}




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