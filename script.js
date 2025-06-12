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
                                                                                                                            }
}