class BankAccount {
    constructor(name) {
        this.name = name;
        this.accountNumber = Math.floor(100000 + Math.random() * 900000);
        this.balance = 0;
        this.transactions = [];
        this.createdOn = new Date();
        this.now = new Date();
    }

    deposit(amount) {
        this.balance =  amount + this.balance
        console.log(`You successfully deposited $${amount}`)
        this.transactions.unshift(`Deposited: $${amount} on ${this.now.toLocaleString()}`)
    }

    withdraw(amount) {
        if(amount >= 5 && amount <= this.balance){
            this.balance =  this.balance - amount
            console.log(`You successfully withdrew $${amount}`)
            this.transactions.unshift(`Withdrew: $${amount} on ${this.now.toLocaleString()}`)


        } else if(amount > this.balance){
            console.log(`You do not have enough money to withdraw this ammount`);
        } else {
            console.log(`The minimum withdrawl is $5`);
        }
    }

    getBalance() {
        return this.balance
    }

    transfer(amount, recipientAccount) {
        if(amount >= 5 && amount <= this.balance){
            this.balance = this.balance - amount;
            console.log(`You successfully transfered ${amount} to account number ${recipientAccount.accountNumber}.Your new balance is ${this.balance}`)
            recipientAccount.balance = amount + recipientAccount.balance
            this.transactions.unshift(`Transfered: $${amount} on ${this.now.toLocaleString()} to ${recipientAccount.name}, Account no. ${recipientAccount.accountNumber}`)
        } else if(amount > this.balance){
            console.log(`You do not have enough money in your account`);
        } else {
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
        for(const transaction in transactions){
            console.log(transactions[transaction])
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

const interestInfo = BankAccount.calcInterest(jerry.getBalance(), 4.5); 
console.log(`The interest you have earned is $${interestInfo.interest}`);
console.log(`Your new balance with interest added is $${interestInfo.newBalance}`);

console.log(jerry.createdOn)
jerry.withdraw(20)
console.log(jerry.transactions)
jerry.transactionLog()