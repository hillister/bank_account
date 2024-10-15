class BankAccount {
    constructor(name) {
        this.name = name;
        this.accountNumber = Math.floor(100000 + Math.random() * 900000);
        this.balance = 0;
    }

    deposit(amount) {
        this.balance =  amount + this.balance
        console.log(`You successfully deposited $${amount}`)
    }

    withdraw(amount) {
        if(amount >= 5 && amount <= this.balance){
            this.balance =  this.balance - amount
            console.log(`You successfully withdrew $${amount}`)
        } else if(amount > this.balance){
            console.log(`You do not have enough money to withdraw this ammount`);
        } else {
            console.log(`The minimum withdrawl is $5`);
        }
    }

    getBalance(currentBalance) {
        currentBalance = this.balance;
        console.log(`Your current balance is: $${currentBalance}`) 
    }

    transfer(amount, recipientAccount) {
        if(amount >= 5 && amount <= this.balance){
            this.balance = this.balance - amount;
            console.log(`You successfully transfered ${amount} to account number ${recipientAccount.accountNumber}.Your new balance is ${this.balance}`)
            recipientAccount.balance = amount + recipientAccount.balance
        } else if(amount > this.balance){
            console.log(`You do not have enough money in your account`);
        } else {
            console.log(`The minimum transfer is $5`);
        }
    }
}


const jerry = new BankAccount('Jerry');
const peter = new BankAccount('Peter');

console.log(jerry.accountNumber)
console.log(peter.accountNumber)

jerry.deposit(400)
jerry.transfer(20, peter);

peter.getBalance();