const APP_PIN = "2580";

function checkPIN() {
  const input = document.getElementById("pin-input").value;
  if (input === APP_PIN) {
    document.getElementById("lock-screen").style.display = "none";
    document.getElementById("app").style.display = "block";
  } else {
    document.getElementById("pin-msg").textContent = "❌ Incorrect PIN";
  }
}

async function submitExpense() {
  const amount = document.getElementById("amount").value;
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;

  if (!amount || !name || !date) {
    document.getElementById("message").textContent = "❌ Fill all fields!";
    return;
  }

  const dateParts = new Date(date).toLocaleDateString("en-GB", {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const text = `Spent ${amount} on ${name} on ${dateParts}`;

  const response = await fetch('https://api.telegram.org/bot7751754561:AAFL9D33IUmujz-t6efKtd_UHa6jC6Y_J5U/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: 1363653408,
      text: text
    })
  });

  if (response.ok) {
    document.getElementById("message").textContent = "✅ Expense sent!";
    document.getElementById("amount").value = '';
    document.getElementById("name").value = '';
    document.getElementById("date").value = '';
  } else {
    document.getElementById("message").textContent = "❌ Error sending!";
  }
}

// ---- summary chart ---
function showSummary() {
  fetch('https://api.telegram.org/bot7751754561:AAFL9D33IUmujz-t6efKtd_UHa6jC6Y_J5U/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: 1363653408,
      text: "/summary"
    })
  });

  document.getElementById("message").textContent = "📩 Summary requested via Telegram!";

  // Simulated category data – replace with Google Sheets pull later
  const data = {
    labels: ['Food', 'Travel', 'Shopping', 'Rent', 'Other'],
    datasets: [{
      label: 'Expenses',
      data: [4500, 2200, 3000, 7000, 1200],
      backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0'],
      hoverOffset: 4
    }]
  };

  const config = {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
        title: { display: true, text: 'Spending by Category (Sample)' }
      }
    }
  };

  const canvas = document.getElementById("chart");
  new Chart(canvas, config);
  document.getElementById("message").textContent = "✅ Summary displayed below";


}
