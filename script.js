document.getElementById('expForm').addEventListener('submit', addTransaction);
const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
function addTransaction(e) {
  e.preventDefault();

  let type = document.getElementById('type').value;
  let category = document.getElementById('category').value;
  let amount = document.getElementById('amount').value;

  if (type != 'chooseOne'
    && category.length > 0
    && amount > 0) {
    const transaction = {
      type,
      category,
      amount,
      id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
    }

    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

  document.getElementById('expForm').reset();
  showTransactions();
  updateBalance();
}

const showTransactions = () => {

  const transactionTable = document.getElementById('transactionTable');

  transactionTable.innerHTML = '';

  for (let i = 0; i < transactions.length; i++) {
    transactionTable.innerHTML += `
            <tr>
                <td>${transactions[i].type}</td>
                <td>${transactions[i].category}</td>
                <td>$${transactions[i].amount}</td>
                <td><a class="deleteButton" onclick="deleteTransaction(${transactions[i].id})">
                    Delete</td>
            </tr>
        `;
  }
}
const deleteTransaction = (id) => {
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].id == id) {
      transactions.splice(i, 1);
    }
  }

  // localStorage
  localStorage.setItem('transactions', JSON.stringify(transactions));
  showTransactions();
  updateBalance();
}
const updateBalance = () => {
  let balance = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      balance += Number(transaction.amount);
    } else if (transaction.type === "expenses") {
      balance -= Number(transaction.amount);
    }
  });

  document.querySelector(".balance").textContent = balance;
}