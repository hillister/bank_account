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
        this.overdraftLimit = 0;
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
        if (this.isClosed || this.isFrozen) {
            console.log('You cannot withdraw money; the account is not active');
            return;
        }

        if (amount < 5) {
            console.log(`The minimum withdrawal is $5`);
            return;
        }
        
        if (amount > this.balance + this.overdraftLimit) {
            console.log(`You do not have enough money to withdraw this amount. Your overdraft limit is $${this.overdraftLimit}.`);
            return;
        }

        this.balance -= amount;
        console.log(`You successfully withdrew $${amount}`);
        this.transactions.unshift(`Withdrew: $${amount} on ${new Date().toLocaleString()}`);
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



