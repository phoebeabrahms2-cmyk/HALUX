const PASSWORD = "Godlovesyou321!";

function unlock() {
  const input = document.getElementById("passwordInput").value;
  const error = document.getElementById("lockError");
  const chime = document.getElementById("chime");

  if (input === PASSWORD) {
    chime.currentTime = 0;
    chime.play();

    setTimeout(() => {
      document.getElementById("lockScreen").style.display = "none";
      document.getElementById("app").classList.remove("hidden");
      fetchCurrentPrice();
      loadInvestments();
    }, 300);
  } else {
    error.innerText = "Incorrect password";
  }
}

// LO-FI MUSIC toggle
const lofi = document.getElementById("lofi");
function toggleMusic() {
  lofi.paused ? lofi.play() : lofi.pause();
}

// BTC Logic
const btcPriceEl = document.getElementById("btcPrice");
const list = document.getElementById("investmentList");

async function fetchCurrentPrice() {
  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
  const data = await res.json();
  btcPriceEl.innerText = `$${data.bitcoin.usd}`;
  return data.bitcoin.usd;
}

// Placeholder investment logic
function addInvestment() { alert("Investment logic placeholder"); }
function loadInvestments() { /* load stored investments if needed */ }

