/* ============================================================
   VÉNUS HAIR — Catalogue produits
   ------------------------------------------------------------
   Les produits sont chargés depuis data/data/products.json.
   Ce fichier est modifiable :
   - à la main (ouvrez data/data/products.json dans un éditeur), OU
   - via le panneau admin sans code, une fois connecté (voir /admin)

   POUR ACTIVER LE PAIEMENT :
   1. Créez un compte gratuit sur https://dashboard.stripe.com
   2. Pour CHAQUE produit, créez un "Payment Link"
      (Stripe > Payment links > Créer un lien de paiement)
   3. Collez l'URL obtenue (ex: https://buy.stripe.com/xxxxx)
      dans le champ "Lien de paiement" du produit (admin ou JSON).
   4. Tant que le lien est vide, le bouton "Acheter" affiche
      un message d'attente au lieu d'ouvrir le paiement.
   ============================================================ */

const CATEGORIES = ["Toutes", "Naturelles", "Synthétiques", "Lace Front", "Closures & Frontals", "Accessoires"];

let PRODUCTS = [];

// Fallback utilisé uniquement si data/data/products.json est introuvable
// (par ex. si le site est ouvert en double-clic depuis l'ordinateur,
// sans passer par un serveur/hébergement).
const FALLBACK_PRODUCTS = [
  { name: "Mèches Brésiliennes Lisses", cat: "Naturelles", length: "18\" / 45cm", price: "89€", stripeLink: "", image: "" },
  { name: "Mèches Synthétiques Lisses", cat: "Synthétiques", length: "20\" / 50cm", price: "29€", stripeLink: "", image: "" },
  { name: "Lace Front Wig Naturelle", cat: "Lace Front", length: "18\" / 45cm", price: "249€", stripeLink: "", image: "" },
  { name: "Closure 4x4 Lisse", cat: "Closures & Frontals", length: "16\" / 40cm", price: "59€", stripeLink: "", image: "" },
];

async function loadProducts() {
  try {
    const res = await fetch("data/data/products.json");
    if (!res.ok) throw new Error("not found");
    const data = await res.json();
    PRODUCTS = (data.products || []).map((p, i) => ({ id: i + 1, ...p }));
  } catch (e) {
    PRODUCTS = FALLBACK_PRODUCTS.map((p, i) => ({ id: i + 1, ...p }));
  }
}

const strandIcon = `<svg viewBox="0 0 24 24" fill="none"><path d="M6 2c0 4 4 4 4 8s-4 4-4 8M12 2c0 4 4 4 4 8s-4 4-4 8M18 2c0 4 4 4 4 8s-4 4-4 8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`;

function cardHTML(p) {
  const media = p.image && p.image.trim() !== ""
    ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;">`
    : `${strandIcon}<span class="ph-label">Photo à venir</span>`;
  return `
    <div class="card" style="animation-delay:${(p.id % 8) * 0.05}s">
      <div class="card-media">
        ${media}
      </div>
      <div class="card-body">
        <div class="card-cat">${p.cat}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-meta">${p.length}</div>
        <div class="card-foot">
          <div class="card-price">${p.price}</div>
          <button class="card-buy" data-link="${p.stripeLink}" data-name="${p.name}">Acheter</button>
        </div>
      </div>
    </div>`;
}

function renderGrid(container, list) {
  container.innerHTML = list.map(cardHTML).join("");
  attachBuyHandlers(container);
}

function attachBuyHandlers(scope) {
  scope.querySelectorAll(".card-buy").forEach((btn) => {
    btn.addEventListener("click", () => {
      const link = btn.getAttribute("data-link");
      const name = btn.getAttribute("data-name");
      if (link && link.trim() !== "") {
        window.open(link, "_blank");
      } else {
        showToast(`Paiement pas encore configuré pour "${name}". Ajoutez le lien Stripe dans products.js.`);
      }
    });
  });
}

function showToast(msg) {
  let toast = document.querySelector(".cart-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "cart-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 3500);
}

function initFilters(pillRow, grid) {
  pillRow.innerHTML = CATEGORIES.map(
    (c, i) => `<button class="pill ${i === 0 ? "active" : ""}" data-cat="${c}">${c}</button>`
  ).join("");
  pillRow.querySelectorAll(".pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      pillRow.querySelectorAll(".pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      const cat = pill.getAttribute("data-cat");
      const list = cat === "Toutes" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat);
      renderGrid(grid, list);
    });
  });
}

async function initCatalogue() {
  const grid = document.getElementById("product-grid");
  const previewGrid = document.getElementById("preview-grid");
  if (!grid && !previewGrid) return;
  await loadProducts();
  if (grid) {
    const pillRow = document.getElementById("filter-row");
    if (pillRow) initFilters(pillRow, grid);
    renderGrid(grid, PRODUCTS);
  }
  if (previewGrid) {
    renderGrid(previewGrid, PRODUCTS.slice(0, 4));
  }
}

function initMobileNav() {
  const toggle = document.querySelector(".mobile-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.style.display === "flex";
    nav.style.display = open ? "none" : "flex";
    nav.style.flexDirection = "column";
    nav.style.position = "absolute";
    nav.style.top = "100%";
    nav.style.left = "0";
    nav.style.right = "0";
    nav.style.background = "var(--ivory)";
    nav.style.padding = "20px 32px";
    nav.style.gap = "16px";
    nav.style.borderBottom = "1px solid var(--line)";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCatalogue();
  initMobileNav();
});
