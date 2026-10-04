document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const cartButton = document.getElementById("cartButton");
  const cartClose = document.getElementById("cartClose");
  const cartPanel = document.getElementById("cartPanel");
  const cartBackdrop = document.getElementById("cartBackdrop");
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");
  const checkoutButton = document.getElementById("checkoutButton");
  const toast = document.getElementById("toast");

  setTimeout(() => intro?.classList.add("hide"), 3200);

  let cart = JSON.parse(localStorage.getItem("biteaCart") || "[]");

  const rupiah = (value) => new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value).replace("IDR", "Rp");

  function saveCart() {
    localStorage.setItem("biteaCart", JSON.stringify(cart));
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    cartCount.textContent = count;
    cartTotal.textContent = rupiah(total);
    checkoutButton.disabled = cart.length === 0;

    if (!cart.length) {
      cartItems.innerHTML = '<div class="empty-cart"><span>🛍️</span><strong>Keranjang masih kosong</strong><p>Pilih menu dulu, nanti pesananmu muncul di sini.</p></div>';
      return;
    }

    cart.forEach((item) => {
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <div class="cart-item-info">
          <strong>${item.name}</strong>
          <small>${rupiah(item.price)} / item</small>
        </div>
        <div class="qty-control">
          <button type="button" data-action="minus" data-name="${item.name}">−</button>
          <span>${item.qty}</span>
          <button type="button" data-action="plus" data-name="${item.name}">+</button>
        </div>
      `;
      cartItems.appendChild(row);
    });
  }

  function openCart() {
    cartPanel.classList.add("open");
    cartBackdrop.classList.add("show");
    cartPanel.setAttribute("aria-hidden", "false");
  }

  function closeCart() {
    cartPanel.classList.remove("open");
    cartBackdrop.classList.remove("show");
    cartPanel.setAttribute("aria-hidden", "true");
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
  }

  document.querySelectorAll(".add-button").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = Number(button.dataset.price);
      const existing = cart.find((item) => item.name === name);
      if (existing) existing.qty += 1;
      else cart.push({ name, price, qty: 1 });
      saveCart();
      showToast(name + " masuk ke keranjang ✓");
    });
  });

  cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const item = cart.find((entry) => entry.name === button.dataset.name);
    if (!item) return;
    if (button.dataset.action === "plus") item.qty += 1;
    if (button.dataset.action === "minus") item.qty -= 1;
    cart = cart.filter((entry) => entry.qty > 0);
    saveCart();
  });

  cartButton.addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);
  cartBackdrop.addEventListener("click", closeCart);

  checkoutButton.addEventListener("click", () => {
    if (!cart.length) {
      showToast("Pilih produk dulu ya 😭");
      return;
    }
    window.location.href = "../03.form/index.html";
  });

  renderCart();
});