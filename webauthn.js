async function authenticate() {
  try {
    await navigator.credentials.get({
      publicKey: {
        challenge: crypto.getRandomValues(new Uint8Array(32)),
        userVerification: "required"
      }
    });
    authSuccess();
  } catch {
    document.getElementById("authMsg").innerText = "Biometric failed";
  }
}

function authSuccess() {
  document.getElementById("authScreen").style.display = "none";
  document.getElementById("app").classList.remove("hidden");
  fetchCurrentPrice();
  loadInvestments();
}
