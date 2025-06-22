const SHEET_ID = "1mi09p8ARKDclZWfCDC_e7qU2M2V_ZhUx_awT-bLKl_U";
const WRITE_URL = "https://script.google.com/macros/s/AKfycbyOik9Mjn-QehAvEJUByzP2Jc3ve5uWQYgyAWnM115cZaKi7oUY7JZkTfnL_WpFgogK/exec";
const READ_URL = "https://script.google.com/macros/s/AKfycbyOik9Mjn-QehAvEJUByzP2Jc3ve5uWQYgyAWnM115cZaKi7oUY7JZkTfnL_WpFgogK/exec";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("submitBtn").addEventListener("click", submitExpense);
  fetchExpenses();
});

async function submitExpense() {
  const textInput = document.getElementById("expenseText");
  const text = textInput.value.trim();
  const responseDiv = document.getElementById("response");

  if (!text) {
    responseDiv.textContent = "❗ Please enter an expense text.";
    return;
  }

  try {
    const res = await fetch(`${WRITE_URL}?text=${encodeURIComponent(text)}`);
    const msg = await res.text();
    responseDiv.textContent = msg;
    textInput.value = "";
    fetchExpenses();
  } catch (e) {
    responseDiv.textContent = "❌ Error submitting: " + e.message;
  }
}

async function fetchExpenses() {
  const res = await fetch(READ_URL);
  const data = await res.json();
  const tbody = document.querySelector("#expensesTable tbody");
  tbody.innerHTML = "";

  const summary = {};
  const categoryTotals = {};

  for (let i = 1; i < data.length; i++) {
    const [date, category, amount] = data[i];
    if (!date || !amount) continue;

    const row = document.createElement("tr");
    row.innerHTML = `<td>${date}</td><td>${category}</td><td>${amount}</td>`;
    tbody.appendChild(row);

    const month = new Date(date).toLocaleString('default', { month: 'long', year: 'numeric' });
    summary[month] = (summary[month] || 0) + parseFloat(amount);
    categoryTotals[category] = (categoryTotals[category] || 0) + parseFloat(amount);
  }

  renderMonthlySummary(summary);
  renderCategoryChart(categoryTotals);
}

function renderMonthlySummary(summary) {
  const container = document.getElementById("monthlySummary");
  container.innerHTML = Object.entries(summary)
    .map(([month, total]) => `<p><strong>${month}:</strong> ₹${total.toFixed(2)}</p>`)
    .join("");
}

function renderCategoryChart(data) {
  const ctx = document.getElementById("categoryChart").getContext("2d");
  if (window.chartInstance) window.chartInstance.destroy();

  window.chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: 'Total Spent (₹)',
        data: Object.values(data),
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Expenses by Category' }
      }
    }
  });
}
