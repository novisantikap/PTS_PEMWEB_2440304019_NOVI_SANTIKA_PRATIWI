/* =========================================================
   PROYEK PTS PEMROGRAMAN WEB (NIM: 2440304019)
   NAMA MAHASISWA : NOVI SANTIKA PRATIWI
   NAMA APLIKASI  : TARA MART - DASHBOARD MINIMARKET
   ========================================================= */

// --- A. ELEMEN DOM SELECTOR ---
const productContainer = document.getElementById('product-container');
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');

// Elemen Statistik (Fitur Y=1)
const statTotal = document.getElementById('stat-total');
const statAvgPrice = document.getElementById('stat-avg-price');
const statMaxPrice = document.getElementById('stat-max-price');

// Elemen Control (Search & Filter)
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');

// Elemen Form (Digit Z=9)
const productForm = document.getElementById('product-form');
const prodName = document.getElementById('prod-name');
const prodPrice = document.getElementById('prod-price');
const prodDiscount = document.getElementById('prod-discount');

const errName = document.getElementById('err-name');
const errPrice = document.getElementById('err-price');
const errDiscount = document.getElementById('err-discount');
const formSuccess = document.getElementById('form-success');

// Variable Global Menyimpan Data Produk
let allProducts = [];

// API Endpoint DummyJSON (Digit X=0: Products)
const API_URL = 'https://dummyjson.com/products?limit=24';

// --- B. FETCH API DATA (ASYNC / AWAIT) ---
async function loadProducts() {
  // Show Loading State (Challenge C=2)
  loadingState.style.display = 'block';
  errorState.style.display = 'none';
  productContainer.innerHTML = '';

  try {
    const response = await fetch(API_URL);

    // Pengecekan HTTP Response
    if (!response.ok) {
      throw new Error(`HTTP Error Status: ${response.status}`);
    }

    const data = await response.json();
    allProducts = data.products;

    // Sembunyikan Loading State
    loadingState.style.display = 'none';

    // Render Data awal & Hitung Statistik
    renderProducts(allProducts);
    updateStatistics(allProducts);

  } catch (error) {
    loadingState.style.display = 'none';
    errorState.style.display = 'block';
    errorState.innerHTML = `
      <p><strong>Gagal memuat data produk!</strong></p>
      <p>Penyebab: ${error.message}</p>
      <button onclick="loadProducts()" class="btn-filter" style="margin-top: 10px;">Coba Lagi (Retry)</button>
    `;
  }
}

// --- C. RENDER DATA KE DOM ---
function renderProducts(products) {
  productContainer.innerHTML = '';

  if (products.length === 0) {
    productContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Barang tidak ditemukan.</p>';
    return;
  }

  products.forEach(item => {
    // Kurs Konversi Simulasi ke Rupiah (1 USD = Rp15.000)
    const hargaRupiah = (item.price * 15000).toLocaleString('id-ID');

    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.title}" class="product-img">
      <div class="product-info">
        <span class="product-category">${item.category}</span>
        <h3 class="product-title">${item.title}</h3>
        <p class="product-price">Rp${hargaRupiah}</p>
        <span class="badge ${item.stock > 10 ? 'badge-success' : 'badge-warning'}">
          Stok: ${item.stock} unit
        </span>
      </div>
    `;
    productContainer.appendChild(card);
  });
}

// --- D. ANALISIS DATA / STATISTIK SEDERHANA (FITUR Y=1) ---
function updateStatistics(products) {
  if (products.length === 0) {
    statTotal.textContent = '0 Item';
    statAvgPrice.textContent = 'Rp0';
    statMaxPrice.textContent = '-';
    return;
  }

  // 1. Total Produk
  statTotal.textContent = `${products.length} Item`;

  // 2. Rata-rata Harga (Menggunakan reduce)
  const totalHarga = products.reduce((acc, item) => acc + item.price, 0);
  const avgHarga = (totalHarga / products.length) * 15000;
  statAvgPrice.textContent = `Rp${Math.round(avgHarga).toLocaleString('id-ID')}`;

  // 3. Produk Termahal (Menggunakan Math.max & map)
  const maxHarga = Math.max(...products.map(item => item.price));
  const maxProduct = products.find(item => item.price === maxHarga);
  const maxHargaRupiah = (maxHarga * 15000).toLocaleString('id-ID');
  statMaxPrice.textContent = `${maxProduct.title} (Rp${maxHargaRupiah})`;
}

// --- E. FILTER KATEGORI (FITUR Y=1) ---
categoryFilter.addEventListener('change', (e) => {
  const selectedCategory = e.target.value;
  let filtered = allProducts;

  if (selectedCategory !== 'all') {
    filtered = allProducts.filter(item => item.category.toLowerCase().includes(selectedCategory.toLowerCase()));
  }

  renderProducts(filtered);
  updateStatistics(filtered);
});

// --- F. DEBOUNCE FUNCTION FOR SEARCH BAR (CHALLENGE C=2) ---
function debounce(func, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Handler Pencarian dengan Debounce
const handleSearch = debounce((e) => {
  const keyword = e.target.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;

  let filtered = allProducts.filter(item => 
    item.title.toLowerCase().includes(keyword) || 
    item.category.toLowerCase().includes(keyword)
  );

  if (selectedCategory !== 'all') {
    filtered = filtered.filter(item => item.category.toLowerCase().includes(selectedCategory.toLowerCase()));
  }
// Fitur perhitungan statistik harga dan total produk
  renderProducts(filtered);
  updateStatistics(filtered);
}, 300);

searchInput.addEventListener('input', handleSearch);

// --- G. FORM VALIDASI 2 INPUT BERKAITAN (DIGIT Z=9) ---
productForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Mencegah reload halaman

  // Reset Pesan Error & Sukses
  errName.textContent = '';
  errPrice.textContent = '';
  errDiscount.textContent = '';
  formSuccess.style.display = 'none';

  let isValid = true;

  const nameVal = prodName.value.trim();
  const priceVal = parseFloat(prodPrice.value);
  const discountVal = parseFloat(prodDiscount.value);

  // 1. Validasi Nama
  if (nameVal === '' || nameVal.length < 3) {
    errName.textContent = 'Nama barang wajib diisi (minimal 3 karakter).';
    isValid = false;
  }

  // 2. Validasi Harga Normal
  if (isNaN(priceVal) || priceVal <= 0) {
    errPrice.textContent = 'Harga normal harus berupa angka lebih dari 0.';
    isValid = false;
  }

  // 3. Validasi Harga Diskon
  if (isNaN(discountVal) || discountVal < 0) {
    errDiscount.textContent = 'Harga diskon tidak boleh kosong (minimal 0).';
    isValid = false;
  }

  // 4. VALIDASI 2 INPUT BERKAITAN (Harga Diskon vs Harga Normal)
  if (!isNaN(priceVal) && !isNaN(discountVal)) {
    if (discountVal >= priceVal) {
      errDiscount.textContent = 'VALIDASI GAGAL: Harga diskon harus LEBIH KECIL dari harga normal!';
      isValid = false;
    }
  }

  // Jika semua input valid
  if (isValid) {
    const hemat = priceVal - discountVal;
    formSuccess.style.display = 'block';
    formSuccess.innerHTML = `
      ✓ Validasi Berhasil!<br>
      Barang <strong>${nameVal}</strong> terkonfirmasi dengan Harga Diskon Rp${discountVal.toLocaleString('id-ID')}.<br>
      Pelanggan menghemat Rp${hemat.toLocaleString('id-ID')}.
    `;
    productForm.reset();
  }
});

// --- H. JALANKAN SAAT HALAMAN DIBUKA ---
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});