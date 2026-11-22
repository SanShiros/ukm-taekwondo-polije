(function () {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduce) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const delay = parseInt(el.dataset.delay || "0", 10);

        el.style.transitionDelay = delay + "ms";
        el.classList.add("in");
        io.unobserve(el);

        // Lepas class setelah animasi selesai supaya hover
        // (news-card, btn, dll) tidak ketimpa transisi reveal
        setTimeout(() => {
          el.classList.remove("reveal", "in");
          el.style.transitionDelay = "";
          el.style.willChange = "";
        }, delay + 800);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  items.forEach((el) => io.observe(el));
})();
