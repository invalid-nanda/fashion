// ===== PRODUCT DATA =====
const categories = [
    "necklace", "bangle", "earring", "ring", "bracelet",
    "ethnic", "western", "heels", "cosmetic", "skincare"
];

// Category display names
const categoryNames = {
    necklace: "Necklace",
    bangle: "Bangle",
    earring: "Earring",
    ring: "Ring",
    bracelet: "Bracelet",
    ethnic: "Ethnic Wear",
    western: "Western Wear",
    heels: "Heels",
    cosmetic: "Cosmetics",
    skincare: "Skincare"
};

// Category emojis for visual display
const categoryEmojis = {
    necklace: "📿",
    bangle: "⭕",
    earring: "💎",
    ring: "💍",
    bracelet: "🔮",
    ethnic: "👘",
    western: "👗",
    heels: "👠",
    cosmetic: "💄",
    skincare: "🧴"
};

const categoryImageQueries = {
    necklace: "necklace,jewelry,luxury",
    bangle: "bangle,bracelet,jewelry",
    earring: "earrings,jewelry,accessories",
    ring: "ring,jewelry,fashion",
    bracelet: "bracelet,hand,jewelry",
    ethnic: "ethnic,traditional,dress",
    western: "western,dress,fashion",
    heels: "heels,shoes,fashion",
    cosmetic: "cosmetics,makeup,beauty",
    skincare: "skincare,beauty,serum"
};

// Category-wise prices
function getPrices(category) {
    const priceMap = {
        necklace:  [1199, 1350, 1499, 1250, 1100, 1600, 1750, 1450, 1300, 1550],
        bangle:    [749, 899, 1050, 980, 840, 1150, 1250, 1100, 920, 1000],
        earring:   [599, 699, 799, 750, 650, 850, 920, 780, 720, 870],
        ring:      [499, 599, 650, 580, 540, 720, 780, 660, 610, 700],
        bracelet:  [799, 900, 999, 950, 860, 1050, 1120, 980, 910, 1000],
        ethnic:    [3299, 3599, 3799, 3450, 3650, 4100, 4500, 3900, 4200, 3750],
        western:   [2199, 2499, 2799, 2350, 2600, 3000, 3200, 2850, 3100, 2700],
        heels:     [1399, 1599, 1799, 1699, 1499, 1999, 2199, 1899, 2099, 1750],
        cosmetic:  [399, 499, 599, 549, 449, 699, 799, 649, 750, 680],
        skincare:  [349, 449, 549, 499, 399, 649, 749, 599, 699, 620]
    };
    return priceMap[category] || [];
}

// Product names per category
function getProductNames(category) {
    const names = {
        necklace: ["Pearl Strand", "Gold Layered", "Stone Drop", "Floral Pendant", "Kundan Set",
                   "Oxidised Charm", "Silver Bead", "Diamond Cut", "Antique Coin", "Meenakari"],
        bangle: ["Glass Fusion", "Gold Plated", "Lac Bangle", "Stone Studded", "Oxidised Set",
                 "Pearl Border", "Kundan Kara", "Bridal Set", "Enamel Set", "Silver Cuff"],
        earring: ["Jhumka Classic", "Stud Pearl", "Hoop Twist", "Chandbali", "Tassel Drop",
                  "Mirror Jhumki", "Kundan Stud", "Meenakari Hoop", "Oxidised Leaf", "Diamond Stud"],
        ring: ["Adjustable Floral", "Stone Cocktail", "Band Twist", "Pearl Solitaire", "Kundan Dome",
               "Oxidised Tribal", "Gold Plated Midi", "Antique Finish", "Meenakari Art", "Silver Filigree"],
        bracelet: ["Charm Links", "Beaded Strand", "Cuff Stone", "Leather Wrap", "Bangle Bracelet",
                   "Pearl Strand", "Metal Layered", "Elastic Bead", "Kundan Tennis", "Silver Chain"],
        ethnic: ["Chanderi Suit", "Silk Saree", "Lehenga Choli", "Banarasi Kurti", "Anarkali Set",
                 "Rajasthani Ghagra", "Cotton Salwar", "Embroidered Dupatta Set", "Pattu Pavadai", "Ikat Dress"],
        western: ["Floral Maxi", "Denim Jacket", "Crop Top Set", "Jumpsuit Casual", "Blazer Set",
                  "Pleated Skirt", "Ruffle Blouse", "Palazzo Co-ord", "Boho Dress", "Striped Shirt"],
        heels: ["Block Heel", "Stiletto Point", "Wedge Sandal", "Kitten Heel", "Platform Pump",
                "Ankle Strap", "Mule Slide", "T-Strap Formal", "Cone Heel", "Slingback"],
        cosmetic: ["Matte Lipstick", "Kajal Intense", "Foundation Glow", "Blush Palette", "Eye Shadow",
                   "Setting Spray", "Highlighter", "Lip Liner", "Concealer Stick", "Brow Pencil"],
        skincare: ["Vitamin C Serum", "Aloe Gel", "Rose Toner", "SPF 50 Sunscreen", "Night Cream",
                   "Face Wash Gentle", "Hyaluronic Moisturiser", "Under Eye Cream", "Sheet Mask", "Exfoliating Scrub"]
    };
    return names[category] || [];
}

// ===== STOCK DATA =====
// Generate stock values (some items out of stock, some low stock)
function generateStock(index) {
    const stockValues = [15, 8, 0, 22, 3, 18, 0, 11, 6, 25];
    return stockValues[index % 10];
}

function getProductImage(category, index) {
    const query = categoryImageQueries[category] || "fashion,style";
    const signature = (index + 1) * 13;
    return `https://source.unsplash.com/600x760/?${encodeURIComponent(query)}&sig=${signature}`;
}

// ===== CART STATE =====
let cart = [];
let currentCategory = "all";

// ===== RENDER PRODUCTS =====
const productsContainer = document.getElementById("products");

categories.forEach(category => {
    const prices = getPrices(category);
    const names = getProductNames(category);
    for (let i = 0; i < 10; i++) {
        const stock = generateStock(i);
        createProductCard(names[i], category, prices[i], stock, i);
    }
});

function createProductCard(name, category, price, stock, index) {
    const card = document.createElement("div");
    card.className = "card " + category;
    card.dataset.name = name;

    let stockBadge = "";
    let stockText = "";
    let btnDisabled = "";

    if (stock === 0) {
        stockBadge = `<span class="stock-badge out-of-stock">Out of Stock</span>`;
        stockText = `<p class="stock-count critical">❌ Not Available</p>`;
        btnDisabled = "disabled";
    } else if (stock <= 5) {
        stockBadge = `<span class="stock-badge low-stock">Only ${stock} left!</span>`;
        stockText = `<p class="stock-count critical">⚠️ Only ${stock} items left</p>`;
    } else {
        stockBadge = `<span class="stock-badge in-stock">In Stock</span>`;
        stockText = `<p class="stock-count">✅ ${stock} items available</p>`;
    }

    card.innerHTML = `
        <div class="card-img-wrapper">
            <img class="product-img" src="${getProductImage(category, index)}" alt="${name}" loading="lazy" onerror="this.closest('.card-img-wrapper').classList.add('image-failed'); this.remove();">
            <span class="emoji-img">${categoryEmojis[category]}</span>
            ${stockBadge}
        </div>
        <div class="card-info">
            <h3>${name}</h3>
            <p class="price">₹${price}</p>
            ${stockText}
            <button class="add-btn" onclick="addToCart('${name}', ${price}, '${category}')" ${btnDisabled}>
                ${stock === 0 ? "Out of Stock" : "Add to Cart 🛍️"}
            </button>
        </div>
    `;
    productsContainer.appendChild(card);
}

function updateResultsMeta() {
    const resultsMeta = document.getElementById("results-meta");
    if (!resultsMeta) return;

    const visibleCards = [...document.querySelectorAll(".card")].filter(
        card => card.style.display !== "none"
    ).length;

    const categoryLabel = currentCategory === "all"
        ? "all categories"
        : (categoryNames[currentCategory] || currentCategory);

    resultsMeta.innerText = `${visibleCards} products in ${categoryLabel}`;
}

function setActiveCategoryButton(category) {
    const nav = document.getElementById("category-nav");
    if (!nav) return;

    const buttons = nav.querySelectorAll("button");
    buttons.forEach(btn => {
        const value = (btn.getAttribute("onclick") || "").match(/'([^']+)'/)?.[1];
        btn.classList.toggle("active", value === category);
    });
}

// ===== CART FUNCTIONS =====
function addToCart(name, price, category) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, category, qty: 1 });
    }
    updateCart();
    showToast(`✅ "${name}" added to cart!`);
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `<div class="empty-cart"><p>🛒 Your cart is empty</p><p>Add some beautiful items!</p></div>`;
    } else {
        cart.forEach(item => {
            total += item.price * item.qty;
            count += item.qty;

            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <div class="cart-item-info">
                    <p>${categoryEmojis[item.category]} ${item.name}</p>
                    <span>₹${item.price} × ${item.qty} = ₹${item.price * item.qty}</span>
                </div>
                <div class="qty-controls">
                    <button onclick="decreaseQty('${item.name}')">−</button>
                    <span>${item.qty}</span>
                    <button onclick="increaseQty('${item.name}')">+</button>
                </div>
            `;
            cartItems.appendChild(div);
        });
    }

    cartTotal.innerText = total;
    cartCount.innerText = count;
}

function increaseQty(name) {
    const item = cart.find(p => p.name === name);
    if (item) { item.qty++; updateCart(); }
}

function decreaseQty(name) {
    const item = cart.find(p => p.name === name);
    if (item) {
        item.qty--;
        if (item.qty <= 0) cart = cart.filter(p => p.name !== name);
        updateCart();
    }
}

function toggleCart() {
    document.getElementById("cart-sidebar").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

// ===== FILTER =====
function filterCategory(category) {
    currentCategory = category;
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        if (category === "all") {
            card.style.display = "block";
        } else {
            card.style.display = card.classList.contains(category) ? "block" : "none";
        }
    });
    setActiveCategoryButton(category);
    updateResultsMeta();
}

// ===== SEARCH =====
function searchProduct() {
    const value = document.getElementById("search").value.toLowerCase();
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        const text = card.innerText.toLowerCase();

        const categoryPass = currentCategory === "all" || card.classList.contains(currentCategory);
        const searchPass = text.includes(value);
        card.style.display = (categoryPass && searchPass) ? "block" : "none";
    });
    updateResultsMeta();
}

// ===== CHECKOUT =====
function checkout() {
    if (cart.length === 0) {
        showToast("🛒 Your cart is empty!");
        return;
    }
    const total = document.getElementById("cart-total").innerText;
    document.getElementById("final-amount").innerText = total;
    document.getElementById("payment-section").style.display = "block";
    document.getElementById("payment-section").scrollIntoView({ behavior: "smooth" });
}

// ===== FINISH PAYMENT =====
function finishPayment() {
    const name = document.getElementById("cust-name").value.trim();
    const address = document.getElementById("cust-address").value.trim();
    const phone = document.getElementById("cust-phone").value.trim();
    const email = document.getElementById("cust-email").value.trim();

    if (!name || !address || !phone) {
        showToast("⚠️ Please fill all required details!");
        return;
    }

    if (phone.length < 10) {
        showToast("⚠️ Please enter a valid phone number!");
        return;
    }

    const total = document.getElementById("final-amount").innerText;
    alert(`🎉 Payment Successful!\n\n✅ Order Confirmed!\n\n👤 Name: ${name}\n📍 Address: ${address}\n📞 Phone: ${phone}\n💰 Amount Paid: ₹${total}\n\nThank you for shopping with Fashion!`);

    cart = [];
    updateCart();
    document.getElementById("payment-section").style.display = "none";
    document.getElementById("cust-name").value = "";
    document.getElementById("cust-address").value = "";
    document.getElementById("cust-phone").value = "";
    document.getElementById("cust-email").value = "";
    toggleCart();
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark-theme", isDark);

    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.innerText = isDark ? "Light" : "Dark";
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem("fashion-theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    applyTheme(initialTheme);

    const themeToggle = document.getElementById("theme-toggle");
    if (!themeToggle) return;

    themeToggle.addEventListener("click", () => {
        const nextTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
        localStorage.setItem("fashion-theme", nextTheme);
        applyTheme(nextTheme);
        showToast(`Theme switched to ${nextTheme}`);
    });
}

// ===== INIT CART =====
updateCart();
setActiveCategoryButton("all");
updateResultsMeta();

const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.innerText = new Date().getFullYear();
}

initTheme();
