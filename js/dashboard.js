class Dashboard {
    constructor(){
        this.username = sessionStorage.getItem("loggedInUser");
        if(!this.username){
            alert('Please log in to access your dashboard');
            window.location.href = 'login.html';
        } else {
            this.loadUserData();
            this.transactionButtons();
            this.transaction();
            this.loadTransactionHistory();
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

 
    transactionButtons() {
        const depositBtn = document.getElementById('deposit');
        const withdrawlBtn = document.getElementById('withdrawl');
        const transactionForm = document.getElementById('transactionForm');
        const transactionMessage = document.getElementById('transactionMessage');
        let transactionType = '';

        depositBtn.addEventListener("click", () => {
            transactionType = 'deposit';
            this.showTransactionForm('Deposit Amount');
        })


        withdrawlBtn.addEventListener("click", () => {
            transactionType = 'withdraw';
            this.showTransactionForm('Withdrawl Amount');
        })

        const transactionFormElement = document.getElementById('transactionFormElement');
        transactionFormElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const amount = parseFloat(document.getElementById("transactionAmount").value);

            if (transactionType === 'deposit') {
                this.deposit(amount, transactionMessage);
            } else if (transactionType === 'withdraw') {
                this.withdraw(amount, transactionMessage);
            }

            this.updateBalance();
            this.loadTransactionHistory();
        });
    }

    showTransactionForm(labelText) {
        const transactionForm = document.getElementById("transactionForm");
        const transactionAmountLabel = document.querySelector("label[for='amount']");
        transactionAmountLabel.textContent = labelText;

        document.getElementById("transactionFormElement").reset();
        document.getElementById("transactionMessage").textContent = '';

        transactionForm.classList.remove("hidden");
    }

    deposit(amount, transactionMessage) {
        const account = new BankAccount(this.userAccount.username, this.userAccount.balance);
        account.transactions = this.userAccount.transactions || [];
        account.deposit(amount);

        if (amount > 0) {
            transactionMessage.textContent = `Successfully deposited $${amount.toFixed(2)}.`;
            this.userAccount.balance = account.balance; 
            this.userAccount.transactions = account.transactions; 

        } else {
            transactionMessage.textContent = `Deposit amount must be greater than zero.`;
        }
    }

    withdraw(amount, transactionMessage) {
        const account = new BankAccount(this.userAccount.username, this.userAccount.balance);
        account.transactions = this.userAccount.transactions || [];
        account.withdraw(amount);

        if (amount > this.userAccount.balance){
            transactionMessage.textContent = `You dont have enough money for this withdrawel. Set up an overdraft`;
        } else if (amount > 0) {
            transactionMessage.textContent = `Successfully withdrew $${amount.toFixed(2)}.`;
            this.userAccount.balance = account.balance; 
            this.userAccount.transactions = account.transactions;


        } else {
            transactionMessage.textContent = `Withdrawal amount must be greater than zero.`;
        }
    }

    updateBalance() {
        const newBalance = this.userAccount.balance;

        const balanceInfo = document.getElementById('balanceInfo');
        balanceInfo.textContent = `Balance: $${newBalance.toFixed(2)}`;
 
        localStorage.setItem(this.username, JSON.stringify(this.userAccount));
    }



    transaction() {
        const transferForm = document.querySelector('.transferForm');
        
        transferForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const transferAmount = parseFloat(document.getElementById('amount').value);
            const recipientAccountNumber = parseInt(document.getElementById('accountNo').value);
            
            this.handleTransfer(transferAmount, recipientAccountNumber); 
        });
    }

    handleTransfer(amount, recipientAccountNumber) {
        const recipientData = this.getAccountByNumber(recipientAccountNumber);
        const transferMessage = document.getElementById('transferMessage');

        if (amount <= 0) {
            transferMessage.innerText = "Transfer amount must be greater than zero.";
            return;
        }

        if (this.userAccount.balance < amount) {
            transferMessage.innerText = "Insufficient funds for this transfer.";
            return;
        }

        if (recipientData) {
            const senderAccount = new BankAccount(this.userAccount.username, this.userAccount.balance);
            const recipientAccount = new BankAccount(recipientData.username, recipientData.balance);

            senderAccount.transfer(amount, recipientAccount); 


            this.userAccount.balance = senderAccount.getBalance();
            this.userAccount.transactions = senderAccount.transactions;
            localStorage.setItem(this.username, JSON.stringify(this.userAccount));

            recipientData.balance = recipientAccount.getBalance();
            recipientData.transactions = recipientAccount.transactions;
            localStorage.setItem(recipientData.username, JSON.stringify(recipientData));

            transferMessage.innerText = `Transferred $${amount.toFixed(2)} to ${recipientData.username}`;

            this.updateBalance(); 
        } else {
            transferMessage.innerText = `Account number ${recipientAccountNumber} not found.`;
        }
    }

    getAccountByNumber(accountNumber) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const account = JSON.parse(localStorage.getItem(key));
            if (account.accountNumber === accountNumber) {
                return account;
            }
        }
        return null;
    }


    loadTransactionHistory() {
        const transferHistoryList = document.getElementById('transactionInfo');
        transferHistoryList.innerHTML = ''; 

        const transactions = this.userAccount.transactions || [];
        if (transactions.length === 0) {
            transferHistoryList.innerHTML = '<li>No transfer history available.</li>';
        } else {
            transactions.forEach((transaction) => {
                const listItem = document.createElement('li');
                listItem.textContent = transaction;
                transferHistoryList.appendChild(listItem);
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});

