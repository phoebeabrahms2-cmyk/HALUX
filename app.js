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
    }, 300); // small delay so chime feels intentional
  } else {
    error.innerText = "Incorrect password";
  }
}

const btcPriceEl = document.getElementById("btcPrice");
const list = document.getElementById("investmentList");
const uiSound = document.getElementById("uiSound");
const lofi = document.getElementById("lofi");

function toggleMusic() {
  lofi.paused ? lofi.play() : lofi.pause();
}

async function fetchCurrentPrice() {
  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
  const data = await res.json();
  btcPriceEl.innerText = `$${data.bitcoin.usd}`;
  localStorage.setItem("lastPrice", data.bitcoin.usd);
  return data.bitcoin.usd;
}

async function fetchHistorical(date) {
  const [y,m,d] = date.split("-");
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${d}-${m}-${y}`);
  const data = await res.json();
  return data.market_data.current_price.usd;
}

async function addInvestment() {
  uiSound.play();
  const date = buyDate.value;
  const amt = parseFloat(btcAmount.value);
  const buy = await fetchHistorical(date);
  const now = await fetchCurrentPrice();
  const diff = (now - buy) * amt;

  const inv = { date, amt, diff };
  const stored = JSON.parse(localStorage.getItem("investments") || "[]");
  stored.push(await encrypt(inv));
  localStorage.setItem("investments", JSON.stringify(stored));
  render(inv);
}

async function loadInvestments() {
  const stored = JSON.parse(localStorage.getItem("investments") || "[]");
  for (const s of stored) render(await decrypt(s));
}

function render(inv) {
  const li = document.createElement("li");
  li.innerText = `${inv.date}: ${inv.diff >= 0 ? "+" : "-"}$${Math.abs(inv.diff).toFixed(2)}`;
  list.appendChild(li);
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
