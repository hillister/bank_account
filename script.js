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
}


const jerry = new BankAccount(69847)

jerry.deposit(200);
jerry.deposit(40);
jerry.deposit(100);