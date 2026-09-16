// Data daftar menu
const menuData = [
    { id: 1, name: "Nasi Goreng Spesial", price: 20000 },
    { id: 2, name: "Mie Ayam Bakso", price: 15000 },
    { id: 3, name: "Ayam Goreng Lengkuas", price: 18000 },
    { id: 4, name: "Es Teh Manis", price: 5000 },
    { id: 5, name: "Es Jeruk", price: 6000 }
];

// Array untuk menyimpan item di keranjang
let cart = [];

// DOM Elements
const menuContainer = document.getElementById("menu-container");
const cartList = document.getElementById("cart-list");
const totalPriceElement = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");

// Format angka ke mata uang Rupiah
function formatRupiah(number) {
    return "Rp " + number.toLocaleString("id-ID");
}

// Menampilkan data menu ke HTML
function renderMenu() {
    menuContainer.innerHTML = "";
    menuData.forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>${formatRupiah(item.price)}</p>
            </div>
            <button class="btn-add" onclick="addToCart(${item.id})">Tambah</button>
        `;
        menuContainer.appendChild(card);
    });
}

// Menambahkan item ke keranjang
function addToCart(itemId) {
    const selectedItem = menuData.find(item => item.id === itemId);
    const existingIndex = cart.findIndex(item => item.id === itemId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ ...selectedItem, quantity: 1 });
    }

    updateCartUI();
}

// Memperbarui tampilan keranjang dan total harga
function updateCartUI() {
    cartList.innerHTML = "";

    if (cart.length === 0) {
        cartList.innerHTML = '<li class="empty-cart">Keranjang masih kosong.</li>';
        totalPriceElement.textContent = "Rp 0";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            <span>${item.name} (${item.quantity}x)</span>
            <span>${formatRupiah(itemTotal)}</span>
        `;
        cartList.appendChild(li);
    });

    totalPriceElement.textContent = formatRupiah(total);
}

// Event handler untuk tombol checkout
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Keranjang Anda masih kosong!");
        return;
    }

    alert("Pesanan berhasil diproses! Terima kasih.");
    cart = [];
    updateCartUI();
});

// Inisialisasi awal
renderMenu();