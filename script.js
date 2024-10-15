class BankAccount {
    constructor(name, startingBalance = 0) {
        this.name = name;
        this.accountNumber = Math.floor(100000 + Math.random() * 900000);
        this.balance = startingBalance;
        this.startingBalance = startingBalance;
        this.transactions = [];
        this.createdOn = new Date();
    }

    deposit(amount) {
        this.balance = amount + this.balance;
        console.log(`You successfully deposited $${amount}`)
        this.transactions.unshift(`Deposited: $${amount} on ${new Date().toLocaleString()}`)
    }

    withdraw(amount) {
        if(amount >= 5 && amount <= this.balance){
            this.balance =  this.balance - amount
            console.log(`You successfully withdrew $${amount}`)
            this.transactions.unshift(`Withdrew: $${amount} on ${new Date().toLocaleString()}`)


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
            console.log(`You successfully transfered ${amount} to account number ${recipientAccount.accountNumber}.Your new balance is ${this.newBalance}`)
            recipientAccount.balance = amount + recipientAccount.balance
            this.transactions.unshift(`Transfered: $${amount} on ${new Date().toLocaleString()} to ${recipientAccount.name}, Account no. ${recipientAccount.accountNumber}`)
            recipientAccount.transactions.unshift(`Received: $${amount} on ${new Date().toLocaleString()} from ${this.name}, Account no. ${this.accountNumber}`)
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


const jerry = new BankAccount('Jerry', 50);
const peter = new BankAccount('Peter');

console.log(jerry.accountNumber)
console.log(peter.accountNumber)

jerry.deposit(400)
console.log(jerry.balance)
jerry.accountStatement()

/*const interestInfo = BankAccount.calcInterest(jerry.getBalance(), 4.5); 
console.log(`The interest you have earned is $${interestInfo.interest}`);
console.log(`Your new balance with interest added is $${interestInfo.newBalance}`);
*/
