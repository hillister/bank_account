class Dashboard {
    constructor(){
        this.username = sessionStorage.getItem("loggedInUser");
        if(!this.username){
            alert('Please log in to access your dashboard');
            window.location.href = 'login.html';
        } else {
            this.loadUserData();
            this.transactionButtons();
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
            transactionType = 'withdrawl';
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
}

document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});