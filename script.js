// Global variables
let expenses = [];

// DOM elements
const expenseForm = document.getElementById('expenseForm');
const expensesList = document.getElementById('expensesList');
const totalAmount = document.getElementById('totalAmount');
const todayAmount = document.getElementById('todayAmount');
const welcomeMessage = document.getElementById('welcomeMessage');
const logoutBtn = document.getElementById('logoutBtn');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!userManager.isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    // Set welcome message
    const currentUser = userManager.getCurrentUser();
    welcomeMessage.textContent = `Welcome, ${currentUser.username}!`;

    // Setup logout button
    logoutBtn.addEventListener('click', () => userManager.logout());

    loadExpenses();
    setDefaultDate();
});

// Set default date to today
function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
}

// Form submission
expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const expenseData = {
        id: Date.now(), // Use timestamp as unique ID
        description: document.getElementById('description').value,
        amount: parseFloat(document.getElementById('amount').value),
        category: document.getElementById('category').value,
        date: document.getElementById('date').value,
        username: userManager.getCurrentUser().username // Add username to expense
    };

    addExpense(expenseData);
    expenseForm.reset();
    setDefaultDate();
});

// Add expense function
function addExpense(expenseData) {
    expenses.push(expenseData);
    saveExpenses();
    displayExpenses();
    updateSummary();
    showNotification('Expense added successfully!', 'success');
}

// Load expenses from localStorage (user-specific)
function loadExpenses() {
    const currentUser = userManager.getCurrentUser();
    const savedExpenses = localStorage.getItem(`expenses_${currentUser.username}`);
    if (savedExpenses) {
        expenses = JSON.parse(savedExpenses);
    }
    displayExpenses();
    updateSummary();
}

// Save expenses to localStorage (user-specific)
function saveExpenses() {
    const currentUser = userManager.getCurrentUser();
    localStorage.setItem(`expenses_${currentUser.username}`, JSON.stringify(expenses));
}

// Delete expense function
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    saveExpenses();
    displayExpenses();
    updateSummary();
    showNotification('Expense deleted successfully!', 'success');
}

// Display expenses in the list
function displayExpenses() {
    expensesList.innerHTML = '';
    
    if (expenses.length === 0) {
        expensesList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No expenses found. Add your first expense above!</p>';
        return;
    }

    // Sort expenses by date (newest first)
    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedExpenses.forEach(expense => {
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        
        const rupeeAmount = parseFloat(expense.amount).toFixed(2);
        
        expenseItem.innerHTML = `
            <div class="expense-info">
                <h4>${expense.description}</h4>
                <p>${expense.category} • ${formatDate(expense.date)}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <div class="amount-display">
                    <span class="expense-amount">₹${rupeeAmount}</span>
                </div>
                <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
            </div>
        `;
        
        expensesList.appendChild(expenseItem);
    });
}

// Update summary cards
function updateSummary() {
    const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const today = new Date().toISOString().split('T')[0];
    const todayExpenses = expenses.filter(expense => expense.date === today);
    const todayTotal = todayExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    
    totalAmount.textContent = `₹${total.toFixed(2)}`;
    todayAmount.textContent = `₹${todayTotal.toFixed(2)}`;
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    if (type === 'success') {
        notification.style.background = '#28a745';
    } else {
        notification.style.background = '#dc3545';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);
