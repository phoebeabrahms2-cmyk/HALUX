let key;

async function getKey() {
  if (!key) {
    key = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }
  return key;
}

async function encrypt(obj) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(obj));
  const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await getKey(), encoded);
  return { iv: [...iv], data: [...new Uint8Array(cipher)] };
}

async function decrypt(payload) {
  const iv = new Uint8Array(payload.iv);
  const data = new Uint8Array(payload.data);
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, await getKey(), data);
  return JSON.parse(new TextDecoder().decode(plain));
}
