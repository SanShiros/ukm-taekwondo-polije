const FOTO_DEFAULT = "/ukm-taekwondo-polije/assets/images/kegiatan.jpeg";

const prestasi = [{ judul: "Juara 1 Kyorugi Putra", event: "Kejuaraan Taekwondo Jawa Timur", tahun: 2025, level: "Regional", medali: "Emas", foto: "/ukm-taekwondo-polije/assets/images/kegiatan.jpeg" }];

const PER_PAGE = 6;
let filter = "Semua";
let shown = PER_PAGE;

const grid = document.getElementById("prestasiGrid");
const moreBtn = document.getElementById("prestasiMore");

// ====== SCROLL REVEAL ======
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.style.transitionDelay = (el.dataset.delay || 0) + "ms";
      el.classList.add("in");
      el.addEventListener(
        "transitionend",
        () => {
          el.classList.remove("reveal", "in");
          el.style.transitionDelay = "";
        },
        { once: true },
      );
      io.unobserve(el);
    });
  },
  { threshold: 0.15 },
);
const observe = (root = document) => root.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));

// ====== RENDER PRESTASI ======
function renderPrestasi() {
  const list = prestasi.filter((p) => filter === "Semua" || p.level === filter);
  grid.innerHTML = list
    .slice(0, shown)
    .map(
      (p, i) => `
      <article class="prestasi-card reveal" data-delay="${(i % 3) * 100}">
        <div class="prestasi-photo">
          <img src="${p.foto || FOTO_DEFAULT}" alt="${p.judul}" loading="lazy" />
          <span class="medal medal-${p.medali.toLowerCase()}">${p.medali}</span>
        </div>
        <div class="prestasi-body">
          <h4>${p.judul}</h4>
          <p>${p.event}</p>
          <div class="meta"><span>${p.tahun}</span><span class="tag">${p.level}</span></div>
        </div>
      </article>`,
    )
    .join("");
  moreBtn.style.display = list.length > shown ? "inline-block" : "none";
  observe(grid);
}

document.getElementById("prestasiFilter").addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  btn.classList.add("active");
  filter = btn.dataset.filter;
  shown = PER_PAGE;
  renderPrestasi();
});

moreBtn.addEventListener("click", () => {
  shown += PER_PAGE;
  renderPrestasi();
});

// ====== COUNTER ANGKA ======
const counterIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const start = performance.now();
      const dur = 1500;
      const tick = (now) => {
        const t = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  },
  { threshold: 0.6 },
);
document.querySelectorAll("[data-count]").forEach((el) => counterIO.observe(el));

// ====== LIGHTBOX GALERI ======
const lightbox = document.getElementById("lightbox");
const lbImg = lightbox.querySelector("img");
document.querySelectorAll(".gallery-grid img").forEach((img) => {
  img.addEventListener("click", () => {
    lbImg.src = img.src;
    lightbox.classList.add("open");
  });
});
lightbox.addEventListener("click", () => lightbox.classList.remove("open"));
document.addEventListener("keydown", (e) => e.key === "Escape" && lightbox.classList.remove("open"));

// ====== TOMBOL KE ATAS ======
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => toTop.classList.toggle("show", window.scrollY > 400), { passive: true });
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ====== START ======
renderPrestasi();
observe();
