(function () {
  const form = document.getElementById("formPresensi");
  if (!form) return;

  const nim = document.getElementById("nim");
  const qrBox = document.querySelector(".metode-qr");
  const pesan = document.getElementById("pesanError");

  // Aktif/nonaktifkan metode QR atau NIM
  function updateMetode() {
    const metode = form.querySelector('input[name="metode"]:checked').value;
    nim.disabled = metode !== "nim";
    qrBox.classList.toggle("nonaktif", metode !== "qr");
    if (metode !== "nim") nim.value = "";
  }
  form.querySelectorAll('input[name="metode"]').forEach((r) => r.addEventListener("change", updateMetode));
  form.addEventListener("reset", () => {
    pesan.textContent = "";
    setTimeout(updateMetode, 0);
  });
  updateMetode();

  // Validasi sisi klien (validasi utama tetap di PHP)
  form.addEventListener("submit", (e) => {
    const metode = form.querySelector('input[name="metode"]:checked').value;
    if (metode === "nim" && !nim.value) {
      e.preventDefault();
      pesan.textContent = "Pilih NIM terlebih dahulu.";
      nim.focus();
    }
  });

  // Filter riwayat berdasarkan tanggal (format DD/MM/YY)
  const dari = document.getElementById("dari");
  const sampai = document.getElementById("sampai");
  const baris = Array.from(document.querySelectorAll("#tbodyKehadiran tr"));
  const statHadir = document.getElementById("statHadir");
  const totalAwal = statHadir ? statHadir.textContent : "";

  function parseTanggal(v) {
    const m = v.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/);
    if (!m) return null;
    const tahun = m[3].length === 2 ? 2000 + Number(m[3]) : Number(m[3]);
    return new Date(tahun, Number(m[2]) - 1, Number(m[1]));
  }

  document.getElementById("btnTerapkan").addEventListener("click", () => {
    const a = parseTanggal(dari.value);
    const b = parseTanggal(sampai.value);
    let jumlah = 0;
    baris.forEach((tr) => {
      const t = new Date(tr.dataset.tanggal);
      const tampil = (!a || t >= a) && (!b || t <= b);
      tr.hidden = !tampil;
      if (tampil) jumlah++;
    });
    statHadir.textContent = jumlah;
  });

  document.getElementById("btnAturUlang").addEventListener("click", () => {
    dari.value = "";
    sampai.value = "";
    baris.forEach((tr) => (tr.hidden = false));
    statHadir.textContent = totalAwal;
  });
})();
