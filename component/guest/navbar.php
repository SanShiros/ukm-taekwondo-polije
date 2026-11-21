<nav class="navbar" id="navbar">
  <div class="navbar-logo">
    <img class="logo-icon" src="/ukm-taekwondo-polije/assets/images/logo.png" alt="Logo SEOGI" />
    <img class="logo-text" src="/ukm-taekwondo-polije/assets/images/textlogo.png" alt="SEOGI" />
  </div>

  <button class="hamburger" id="hamburger">
    <span></span>
    <span></span>
    <span></span>
  </button>

  <div class="nav-content" id="nav-content">
    <div class="navbar-menu">
      <a class="active" href="#home">Beranda</a>
      <a href="#profile">Profile</a>
      <a href="#achievements-gallery">Prestasi &amp; Galeri</a>
      <a href="#pendaftaran">Pendaftaran</a>
      <span class="nav-indicator"></span>
    </div>
    <div class="navbar-action">
      <a href="/ukm-taekwondo-polije/Guest/register/index.php">
        <button type="button">Daftar Sekarang</button>
      </a>
    </div>
  </div>
</nav>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navContent = document.getElementById('nav-content');
    const links = document.querySelectorAll('.navbar-menu a[href^="#"]');
    const indicator = document.querySelector('.nav-indicator');

    hamburger.addEventListener('click', () => navContent.classList.toggle('active'));
    links.forEach((a) => a.addEventListener('click', () => navContent.classList.remove('active')));

    function moveIndicator() {
      const active = document.querySelector('.navbar-menu a.active');
      if (!active) return;
      indicator.style.width = active.offsetWidth + 'px';
      indicator.style.transform = `translateX(${active.offsetLeft}px)`;
    }

    function setActive(id) {
      links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
      moveIndicator();
    }

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      }, {
        rootMargin: '-45% 0px -50% 0px'
      }
    );

    links.forEach((a) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) spy.observe(target);
    });

    moveIndicator();
    window.addEventListener('load', moveIndicator); // setelah font selesai dimuat
    window.addEventListener('resize', moveIndicator);
  });
</script>