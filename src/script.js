// Get references to form and table elements
const expenseForm = document.getElementById('Toadd');
const expensesTable = document.getElementById('expenses');

// Load existing expenses from LocalStorage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to render the expense list
function renderExpenses() {
    expensesTable.innerHTML = ''; // Clear the table before rendering
    expenses.forEach((expense, index) => {
        expensesTable.innerHTML += `
            <tr>
                <td>${expense.name}</td>
                <td>${expense.amount}</td>
                <td>${expense.date}</td>
                <td>${expense.category}</td>
                <td>
                    <button onclick="deleteExpense(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Function to add a new expense
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    // Get values from form fields
    const name = document.getElementById('text').value; // Corrected to match HTML ID
    const amount = document.getElementById('number').value; // Corrected to match HTML ID
    const date = document.getElementById('date').value;
    const category = document.getElementById('forwhat').value;

    // Validate inputs
    if (!name || !amount || !date || category === "Expense Category") {
        alert("Please fill out all fields correctly.");
        return;
    }

    // Create an expense object
    const expense = { name, amount, date, category };

    // Add expense to the array and save to LocalStorage
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Clear the form and re-render the expenses
    expenseForm.reset();
    renderExpenses();
});

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1); // Remove the expense at the given index
    localStorage.setItem('expenses', JSON.stringify(expenses)); // Update LocalStorage
    renderExpenses(); // Re-render the expense list
}

// Initial render of expenses
renderExpenses();
