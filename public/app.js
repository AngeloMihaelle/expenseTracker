// app.js
/**
* This script manages the expense tracker functionality, including adding expenses,
* updating totals, saving data to localStorage, and generating a PDF summary.
* Ensure the script runs after the DOM is fully loaded
*/

const incomeInput = document.getElementById("income");
const expensesDiv = document.getElementById("expenses");
const summaryDiv = document.getElementById("summary");
const addExpenseBtn = document.getElementById("add-expense");

/**
 * An array to store expense objects.
 * Each expense object may contain details such as amount, category, date, and description.
 * @type {Array<Object>}
 */
let expenses = [];

/**
 * Creates and appends a new expense item input row to the expenses section.
 * Automatically hooks into data update logic.
 *
 * @param {string} [name=""] - The initial value for the expense name input.
 * @param {string|number} [amount=""] - The initial value for the expense amount input.
 */
function addExpenseItem(name = "", amount = "") {
  const div = document.createElement("div");
  div.className = "expense-item";

  const nameInput = document.createElement("input");
  nameInput.placeholder = "Name";
  nameInput.value = name;

  const amountInput = document.createElement("input");
  amountInput.placeholder = "Amount";
  amountInput.type = "number";
  amountInput.value = amount;

  expensesDiv.appendChild(div);
  div.appendChild(nameInput);
  div.appendChild(amountInput);

  nameInput.addEventListener("input", updateData);
  amountInput.addEventListener("input", updateData);

  updateData();
}

/**
 * Updates the expense tracker data by reading the current income and expense items from the DOM,
 * recalculates totals, updates the summary display, and saves the data.
 * 
 * @function
 * @returns {void}
 */
function updateData() {
  const income = parseFloat(incomeInput.value) || 0;
  const items = expensesDiv.querySelectorAll(".expense-item");
  expenses = [];

  items.forEach(item => {
    const inputs = item.querySelectorAll("input");
    const name = inputs[0].value;
    const amount = parseFloat(inputs[1].value) || 0;
    expenses.push({ name, amount });
  });

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = income - total;

  summaryDiv.innerHTML = `
    <p>Total Expenses: $${total.toFixed(2)}</p>
    <p>Remaining: $${remaining.toFixed(2)}</p>
    <p>Spent: ${(income ? (total / income) * 100 : 0).toFixed(1)}%</p>
  `;

  saveData(income, expenses);
}

/**
 * Saves the current income and expense list to localStorage.
 *
 * @param {number} income - The total income to be saved.
 * @param {Array<Object>} expenses - An array of expense objects to be saved.
 */
function saveData(income, expenses) {
  localStorage.setItem("expenseTrackerData", JSON.stringify({ income, expenses }));
}

/**
 * Loads any existing data from localStorage and populates the UI.
 * Should be called once on page load.
 */
function loadData() {
  const data = JSON.parse(localStorage.getItem("expenseTrackerData"));
  if (!data) return;

  incomeInput.value = data.income;
  data.expenses.forEach(e => addExpenseItem(e.name, e.amount));
}

// Update calculations when income changes
incomeInput.addEventListener("input", updateData);

// Add new expense input row on button click
addExpenseBtn.addEventListener("click", () => addExpenseItem());


loadData();
updateData();

// Generate PDF summary of current income and expenses
document.getElementById("download-pdf").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const income = parseFloat(incomeInput.value) || 0;
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = income - total;
  const percent = income ? (total / income) * 100 : 0;

  let y = 10;

  doc.setFontSize(16);
  doc.text("Expense Tracker Summary", 10, y);
  y += 10;

  doc.setFontSize(12);
  doc.text(`Income: $${income.toFixed(2)}`, 10, y); y += 8;
  doc.text(`Total Expenses: $${total.toFixed(2)}`, 10, y); y += 8;
  doc.text(`Remaining: $${remaining.toFixed(2)}`, 10, y); y += 8;
  doc.text(`Spent: ${percent.toFixed(1)}%`, 10, y); y += 12;

  doc.setFontSize(14);
  doc.text("Expenses:", 10, y); y += 10;

  expenses.forEach((e, index) => {
    doc.setFontSize(12);
    doc.text(`- ${e.name}: $${e.amount.toFixed(2)}`, 10, y);
    y += 7;
    if (y > 270) { doc.addPage(); y = 10; }
  });

  doc.save("expense-summary.pdf");
});
