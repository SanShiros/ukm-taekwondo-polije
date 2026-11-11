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
      <a class="active" href="#beranda">Beranda</a>
      <a href="#profile">Profile</a>
      <a href="#prestasi-galeri">Prestasi &amp; Galeri</a>
      <a href="#pendaftaran">Pendaftaran</a>
    </div>

    <div class="navbar-action">
      <a href="/ukm-taekwondo-polije/Guest/register/index.php">
        <button type="button">Daftar Sekarang</button>
      </a>
    </div>
  </div>
</nav>

<script>
  const hamburger = document.getElementById('hamburger');
  const navContent = document.getElementById('nav-content');

  hamburger.addEventListener('click', () => {
    navContent.classList.toggle('active');
  });
</script>