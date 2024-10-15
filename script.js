class BankAccount {
    constructor(accountNumber) {
        this.accountNumber = accountNumber;
        this.balance = 0;
    }

    deposit(amount){
        let balance =  amount + this.balance
        this.balance = balance
        console.log(`You successfully deposited $${amount}`)
    }

    withdraw(amount){
        if(amount >= 5 && amount <= this.balance){
            let balance =  this.balance - amount
            this.balance = balance
            console.log(`You successfully withdrew $${amount}`)
        } else if(amount > this.balance){
            console.log(`You do not have enough money to withdraw this ammount`);
        } else {
            console.log(`The minimum withdrawl is $5`);
        }
    }

    getBalance(currentBalance){
        currentBalance = this.balance;
        console.log(`Your current balance is: $${currentBalance}`) 
    }
}


const jerry = new BankAccount(69847)

jerry.deposit(200);
jerry.deposit(40);
jerry.withdraw(10);
jerry.withdraw(2);

jerry.getBalance();

jerry.deposit(40);
jerry.getBalance();