// ===== CART =====
let cartCount = 0;

function addToCart(btnOrName, btn) {
  let name = '';
  if (typeof btnOrName === 'string') {
    name = btnOrName;
  } else {
    // called from index with (this)
    btn = btnOrName;
    name = btn.closest('.product-card').querySelector('h3').textContent;
  }
  cartCount++;
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = cartCount);
  if (btn) {
    const orig = btn.innerHTML;
    btn.innerHTML = 'Added! <i class="fas fa-check"></i>';
    btn.disabled = true;
    setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 1500);
  }
  showToast(`${name} added to cart!`);
}

// ===== QUICK VIEW MODAL =====
let modalProductName = '';

function openModal(name, desc, price, bg, icon) {
  modalProductName = name;
  document.getElementById('modal-name').textContent = name;
  document.getElementById('modal-desc').textContent = desc;
  document.getElementById('modal-price').textContent = price;
  document.getElementById('modal-img').style.background = bg;
  document.getElementById('modal-img').innerHTML = `<i class="fas ${icon} fa-4x"></i>`;
  document.getElementById('modal-qty').textContent = 1;
  document.getElementById('quickViewModal').classList.add('open');
}

function closeModal(e) {
  if (e.target.id === 'quickViewModal') {
    document.getElementById('quickViewModal').classList.remove('open');
  }
}

function changeQty(delta) {
  const el = document.getElementById('modal-qty');
  el.textContent = Math.max(1, parseInt(el.textContent) + delta);
}

function addFromModal() {
  const qty = parseInt(document.getElementById('modal-qty').textContent);
  cartCount += qty;
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = cartCount);
  document.getElementById('quickViewModal').classList.remove('open');
  showToast(`${qty} × ${modalProductName} added to cart!`);
}

// ===== TOAST =====
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed; bottom:2rem; right:2rem; background:#4a7c59; color:#fff;
      padding:0.9rem 1.8rem; border-radius:30px; font-family:'Lato',sans-serif;
      font-weight:700; font-size:0.95rem; box-shadow:0 4px 20px rgba(0,0,0,0.2);
      z-index:9999; opacity:0; transition:opacity 0.3s;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.style.opacity = '0', 2500);
}

// ===== HAMBURGER =====
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// ===== CONTACT FORM =====
function submitForm(e) {
  e.preventDefault();
  document.getElementById('form-success').style.display = 'block';
  document.getElementById('contactForm').reset();
}

// ===== NEWSLETTER =====
function subscribeNewsletter(e) {
  e.preventDefault();
  showToast('Thanks for subscribing!');
  e.target.reset();
}

// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
  document.addEventListener('mousemove', e => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
  });
}

// ===== PARTICLES =====
const particlesEl = document.getElementById('particles');
if (particlesEl) {
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (8 + Math.random() * 12) + 's';
    p.style.animationDelay    = (Math.random() * 10) + 's';
    p.style.width = p.style.height = (4 + Math.random() * 6) + 'px';
    particlesEl.appendChild(p);
  }
}

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal, .reveal-right, .reveal-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.count');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    const step = Math.ceil(target / 60);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString();
      if (current >= target) clearInterval(timer);
    }, 30);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });
}
