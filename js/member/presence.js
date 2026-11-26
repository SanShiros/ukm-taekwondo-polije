(function () {
  const form = document.getElementById("presenceForm");
  if (!form) return;

  const nim = document.getElementById("nim");
  const qrBox = document.querySelector(".method-qr");
  const errorMessage = document.getElementById("errorMessage");

  const members = {
    E41231234: { name: "Sample Member 1", major: "Information Technology" },
    E41235678: { name: "Sample Member 2", major: "Information Technology" },
  };

  function updateMethod() {
    const method = form.querySelector('input[name="method"]:checked').value;
    nim.disabled = method !== "nim";
    qrBox.classList.toggle("disabled", method !== "qr");
    if (method !== "nim") nim.value = "";
  }
  form.querySelectorAll('input[name="method"]').forEach((r) => r.addEventListener("change", updateMethod));
  form.addEventListener("reset", () => {
    errorMessage.textContent = "";
    setTimeout(updateMethod, 0);
  });
  updateMethod();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const method = form.querySelector('input[name="method"]:checked').value;

    if (method === "nim" && !members[nim.value]) {
      errorMessage.textContent = "Please select a Student ID (NIM) first.";
      nim.focus();
      return;
    }

    const id = method === "nim" ? nim.value : "E41231234";
    const now = new Date();
    const time = String(now.getHours()).padStart(2, "0") + "." + String(now.getMinutes()).padStart(2, "0");

    try {
      sessionStorage.setItem("presence", JSON.stringify({ name: members[id].name, nim: id, major: members[id].major, time }));
    } catch (err) {}
    window.location.href = "presence-success.html";
  });

  const from = document.getElementById("from");
  const to = document.getElementById("to");
  const rows = Array.from(document.querySelectorAll("#attendanceBody tr"));
  const statPresent = document.getElementById("statPresent");
  const initialTotal = statPresent.textContent;

  function parseDate(v) {
    const m = v.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/);
    if (!m) return null;
    const year = m[3].length === 2 ? 2000 + Number(m[3]) : Number(m[3]);
    return new Date(year, Number(m[2]) - 1, Number(m[1]));
  }

  document.getElementById("btnApply").addEventListener("click", () => {
    const a = parseDate(from.value);
    const b = parseDate(to.value);
    let count = 0;
    rows.forEach((tr) => {
      const d = new Date(tr.dataset.date);
      const show = (!a || d >= a) && (!b || d <= b);
      tr.hidden = !show;
      if (show) count++;
    });
    statPresent.textContent = count;
  });

  document.getElementById("btnReset").addEventListener("click", () => {
    from.value = "";
    to.value = "";
    rows.forEach((tr) => (tr.hidden = false));
    statPresent.textContent = initialTotal;
  });
})();
