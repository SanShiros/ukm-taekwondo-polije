<?php
session_start();

// Daftar sesi & NIM contoh (ganti dengan query database)
$sesiList = [
  'kamis' => 'Kamis, 19.00 - 21.00 - GOR Perjuangan 45',
  'sabtu' => 'Sabtu, 16.00 - 18.00 - GOR Perjuangan 45',
];
$anggota = [
  'E41231234' => ['nama' => 'Contoh Anggota 1', 'jurusan' => 'Teknologi Informasi'],
  'E41235678' => ['nama' => 'Contoh Anggota 2', 'jurusan' => 'Teknologi Informasi'],
];

// Data riwayat contoh (ganti dengan query database)
$riwayat = [
  ['tanggal' => '2026-12-16', 'sesi' => 'Latihan Fisik & Sparring (Kyorugi)', 'lokasi' => 'GOR Perjuangan 45 Polije', 'status' => 'Hadir'],
  ['tanggal' => '2026-12-16', 'sesi' => 'Latihan Fisik & Sparring (Kyorugi)', 'lokasi' => 'GOR Perjuangan 45 Polije', 'status' => 'Hadir'],
  ['tanggal' => '2026-12-16', 'sesi' => 'Latihan Fisik & Sparring (Kyorugi)', 'lokasi' => 'GOR Perjuangan 45 Polije', 'status' => 'Hadir'],
];

$error = '';

// Proses tombol "Hadir"
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $sesi   = $_POST['sesi'] ?? '';
  $metode = $_POST['metode'] ?? 'qr';
  $nim    = $_POST['nim'] ?? '';

  if (!isset($sesiList[$sesi])) {
    $error = 'Sesi latihan tidak valid.';
  } elseif ($metode === 'nim' && !isset($anggota[$nim])) {
    $error = 'Pilih NIM terlebih dahulu.';
  } else {
    // Untuk metode QR, data diambil dari hasil scan (di sini masih contoh)
    if ($metode === 'qr') {
      $nim = 'E41231234';
    }
    $_SESSION['presensi'] = [
      'nama'    => $anggota[$nim]['nama'],
      'nim'     => $nim,
      'jurusan' => $anggota[$nim]['jurusan'],
      'waktu'   => date('H.i'),
    ];
    // TODO: simpan ke database di sini
    header('Location: presensi-berhasil.php');
    exit;
  }
}

$totalHadir = count($riwayat);
$totalSesi  = 5;
$persen     = $totalSesi > 0 ? min(100, round($totalHadir / $totalSesi * 100)) : 0;
// NB: pada desain: 19 hadir, 5 sesi, 100% -> sesuaikan rumus dengan data asli.
$totalHadir = 19;
$persen     = 100;

function h($s) { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }
?>
<!doctype html>
<html lang="id">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Presensi Latihan | UKM Taekwondo Polije</title>
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
    <!-- PRESENSI LATIHAN -->
    <section id="presensi" class="presensi-section">
      <div class="presensi-header reveal">
        <h1>Presensi Latihan</h1>
        <p>Catat kehadiran pada sesi latihan yang sedang berlangsung</p>
      </div>

      <form class="presensi-card reveal" data-delay="120" method="post" action="presensi.php" id="formPresensi" novalidate>
        <h3>1. Pilih sesi Latihan</h3>
        <select name="sesi" class="field" aria-label="Sesi latihan">
          <?php foreach ($sesiList as $key => $label): ?>
            <option value="<?= h($key) ?>"><?= h($label) ?></option>
          <?php endforeach; ?>
        </select>

        <h3>2. Pilih Metode Presensi</h3>
        <div class="metode-grid">
          <div class="metode-qr">
            <label class="radio">
              <input type="radio" name="metode" value="qr" checked />
              <span>Scan QR Code</span>
            </label>
            <img id="qrImage" src="/ukm-taekwondo-polije/assets/images/qr-placeholder.svg" alt="QR Code presensi" />
          </div>

          <div class="metode-nim">
            <label class="radio">
              <input type="radio" name="metode" value="nim" />
              <span>Masukkan NIM</span>
            </label>
            <div class="select-wrap">
              <select name="nim" id="nim" class="field" disabled aria-label="Masukkan NIM">
                <option value="">Masukkan NIM</option>
                <?php foreach ($anggota as $kode => $a): ?>
                  <option value="<?= h($kode) ?>"><?= h($kode . ' - ' . $a['nama']) ?></option>
                <?php endforeach; ?>
              </select>
            </div>
            <p class="catatan">Khusus pengurus UKM Taekwondo</p>
            <p class="pesan-error" id="pesanError" role="alert"><?= h($error) ?></p>
          </div>
        </div>

        <div class="presensi-actions">
          <button type="submit" class="btn-primary">Hadir</button>
          <button type="reset" class="btn-outline">Batal</button>
        </div>
      </form>
    </section>

    <!-- RIWAYAT PRESENSI -->
    <section id="riwayat" class="riwayat-section">
      <div class="reveal">
        <h2 class="section-title">Riwayat Presensi</h2>
        <p class="section-sub">Pantau rekap kehadiran pada sesi latihan</p>
      </div>

      <div class="filter-bar reveal" data-delay="100">
        <div class="filter-field">
          <label for="dari">Dari</label>
          <input type="text" id="dari" class="field" placeholder="DD/MM/YY" inputmode="numeric" />
        </div>
        <div class="filter-field">
          <label for="sampai">Sampai</label>
          <input type="text" id="sampai" class="field" placeholder="DD/MM/YY" inputmode="numeric" />
        </div>
        <button type="button" class="btn-primary" id="btnTerapkan">Terapkan</button>
        <button type="button" class="btn-outline" id="btnAturUlang">Atur Ulang</button>
      </div>

      <div class="stat-grid">
        <article class="stat-card reveal" data-delay="0">
          <span>Total Hadir</span>
          <strong id="statHadir"><?= (int) $totalHadir ?></strong>
        </article>
        <article class="stat-card reveal" data-delay="120">
          <span>Total Sesi</span>
          <strong><?= (int) $totalSesi ?></strong>
        </article>
        <article class="stat-card reveal" data-delay="240">
          <span>Presentasi Kehadiran</span>
          <strong><?= (int) $persen ?>%</strong>
        </article>
      </div>
    </section>

    <!-- DAFTAR KEHADIRAN -->
    <section id="daftar-kehadiran" class="daftar-section">
      <h2 class="section-title reveal">Daftar Kehadiran</h2>
      <div class="tabel-wrap reveal" data-delay="100">
        <table class="tabel-kehadiran">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Sesi Latihan</th>
              <th>Lokasi</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="tbodyKehadiran">
            <?php foreach ($riwayat as $r): ?>
              <tr data-tanggal="<?= h($r['tanggal']) ?>">
                <td><?= h(date('d/m/Y', strtotime($r['tanggal']))) ?></td>
                <td><?= h($r['sesi']) ?></td>
                <td><?= h($r['lokasi']) ?></td>
                <td><?= h($r['status']) ?></td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </section>
  </main>

  <?php include __DIR__ . '/../../component/member/footer.html'; ?>
  <script src="/ukm-taekwondo-polije/js/member/index.js"></script>
  <script src="/ukm-taekwondo-polije/js/member/presensi.js"></script>
</body>

</html>
