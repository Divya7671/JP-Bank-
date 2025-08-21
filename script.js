// Save signup data
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const depositForm = document.getElementById("depositForm");
  const withdrawForm = document.getElementById("withdrawForm");
  const transferForm = document.getElementById("transferForm");

  // SIGNUP
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        balance: 1000 // initial balance
      };
      localStorage.setItem(user.email, JSON.stringify(user));
      alert("Signup successful! You can now login.");
      window.location.href = "login.html";
    });
  }

  // LOGIN
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let email = document.getElementById("loginEmail").value;
      let password = document.getElementById("loginPassword").value;
      let user = JSON.parse(localStorage.getItem(email));

      if (user && user.password === password) {
        localStorage.setItem("currentUser", email);
        alert("Login successful!");
        window.location.href = "account.html";
      } else {
        alert("Invalid email or password");
      }
    });
  }

  // DEPOSIT
  if (depositForm) {
    depositForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let amount = parseFloat(document.getElementById("depositAmount").value);
      let email = localStorage.getItem("currentUser");
      let user = JSON.parse(localStorage.getItem(email));

      user.balance += amount;
      localStorage.setItem(email, JSON.stringify(user));

      document.getElementById("depositMessage").innerText =
        "Successfully deposited ₹" + amount + ". New balance: ₹" + user.balance;
    });
  }

  // WITHDRAW
  if (withdrawForm) {
    withdrawForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let amount = parseFloat(document.getElementById("withdrawAmount").value);
      let email = localStorage.getItem("currentUser");
      let user = JSON.parse(localStorage.getItem(email));

      if (amount <= user.balance) {
        user.balance -= amount;
        localStorage.setItem(email, JSON.stringify(user));
        document.getElementById("withdrawMessage").innerText =
          "Successfully withdrew ₹" + amount + ". New balance: ₹" + user.balance;
      } else {
        document.getElementById("withdrawMessage").innerText =
          "Insufficient balance!";
      }
    });
  }

  // TRANSFER
  if (transferForm) {
    transferForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let recipientEmail = document.getElementById("recipientEmail").value;
      let amount = parseFloat(document.getElementById("transferAmount").value);
      let senderEmail = localStorage.getItem("currentUser");

      let sender = JSON.parse(localStorage.getItem(senderEmail));
      let recipient = JSON.parse(localStorage.getItem(recipientEmail));

      if (!recipient) {
        document.getElementById("transferMessage").innerText =
          "Recipient not found!";
        return;
      }

      if (amount <= sender.balance) {
        sender.balance -= amount;
        recipient.balance += amount;

        localStorage.setItem(senderEmail, JSON.stringify(sender));
        localStorage.setItem(recipientEmail, JSON.stringify(recipient));

        document.getElementById("transferMessage").innerText =
          "Transferred ₹" + amount + " to " + recipientEmail +
          ". New balance: ₹" + sender.balance;
      } else {
        document.getElementById("transferMessage").innerText =
          "Insufficient funds!";
      }
    });
  }

  // WELCOME USER (account.html)
  const welcomeUser = document.getElementById("welcomeUser");
  if (welcomeUser) {
    let email = localStorage.getItem("currentUser");
    let user = JSON.parse(localStorage.getItem(email));
    welcomeUser.innerText = "Hello, " + user.name + "! Your email: " + email;
  }
});

// BALANCE CHECK
function checkBalance() {
  let email = localStorage.getItem("currentUser");
  if (email) {
    let user = JSON.parse(localStorage.getItem(email));
    document.getElementById("balanceDisplay").innerText =
      "Your balance: ₹" + user.balance;
  }
}
