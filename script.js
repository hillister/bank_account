class BankAccount {
    constructor(accountNumber) {
        this.accountNumber = accountNumber;
        this.balance = 0;
    }

    deposit(amount){
        let balance =  amount + this.balance
        this.balance = balance
        console.log(`Your new balance is ${balance}`)
    }

    withdraw(amount){
        if(amount >= 5 && amount <= this.balance){
            let balance =  this.balance - amount
            this.balance = balance
            console.log(`Your new balance is ${balance}`)
        } else if(amount > this.balance){
            console.log(`You do not have enough money to withdraw this ammount`);
        } else {
            console.log(`The minimum withdrawl is $5`);
        }
    }
}


const jerry = new BankAccount(69847)

jerry.deposit(200);
jerry.deposit(40);
jerry.withdraw(300);
jerry.withdraw(2);