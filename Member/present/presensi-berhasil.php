<?php
session_start();

// Jika halaman dibuka langsung tanpa presensi, tampilkan placeholder
$data = $_SESSION['presensi'] ?? [
  'nama'    => '[Nama pendaftar]',
  'nim'     => '[NIM]',
  'jurusan' => '[Jurusan]',
  'waktu'   => '[00.00]',
];

function h($s) { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }
?>
<!doctype html>
<html lang="id">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Presensi Berhasil | UKM Taekwondo Polije</title>
  <script>
    document.documentElement.classList.add('js');
  </script>
  <link rel="stylesheet" href="/ukm-taekwondo-polije/css/member/navbar.css" />
  <link rel="stylesheet" href="/ukm-taekwondo-polije/css/member/footer.css" />
  <link rel="stylesheet" href="/ukm-taekwondo-polije/css/member/presensi.css" />
</head>

<body>
  <?php include __DIR__ . '/../../component/member/navbar.html'; ?>

  <main class="presensi-page">
    <section class="berhasil-section">
      <div class="check-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      </div>
      <h1>Presensi Berhasil</h1>
      <p class="berhasil-sub">Kehadiran kamu pada sesi latihan telah tercatat</p>

      <div class="detail-card">
        <dl>
          <dt>Nama</dt>
          <dd><?= h($data['nama']) ?></dd>
          <dt>NIM</dt>
          <dd><?= h($data['nim']) ?></dd>
          <dt>Jurusan</dt>
          <dd><?= h($data['jurusan']) ?></dd>
          <dt>Waktu Check In</dt>
          <dd><?= h($data['waktu']) ?></dd>
        </dl>
      </div>

      <div class="berhasil-actions">
        <div class="aksi">
          <a href="index.php" class="btn-primary btn-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l9 8h-2.5v9h-5v-6h-3v6h-5v-9H3z" /></svg>
            Kembali ke Beranda
          </a>
        </div>
        <div class="aksi">
          <a href="jadwal-lokasi.php" class="btn-outline btn-icon">
            <svg class="stroke" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
            Lihat Jadwal Latihan
          </a>
        </div>
      </div>
    </section>
  </main>

  <?php include __DIR__ . '/../../component/member/footer.html'; ?>
</body>

</html>
