(function () {
  // Where to go after a successful login (change to your dashboard page)
  const DASHBOARD_URL = "/ukm-taekwondo-polije/Admin/dashboard.html";

  const form = document.getElementById("loginForm");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");
  const formError = document.getElementById("formError");
  const toggle = document.getElementById("togglePassword");
  const submitButton = form.querySelector(".btn-login");

  // Show / hide password
  toggle.addEventListener("click", () => {
    const show = password.type === "password";
    password.type = show ? "text" : "password";
    toggle.setAttribute("aria-pressed", String(show));
    toggle.setAttribute("aria-label", show ? "Sembunyikan password" : "Tampilkan password");
  });

  function setError(input, element, message) {
    element.textContent = message;
    input.classList.toggle("invalid", Boolean(message));
  }

  // Clear the error while the user is typing
  [username, password].forEach((input) => {
    input.addEventListener("input", () => {
      setError(input, input === username ? usernameError : passwordError, "");
      formError.textContent = "";
    });
  });

  // Client-side validation
  function validate() {
    let valid = true;

    if (!username.value.trim()) {
      setError(username, usernameError, "Username / NIM wajib diisi.");
      valid = false;
    }
    if (!password.value) {
      setError(password, passwordError, "Password wajib diisi.");
      valid = false;
    } else if (password.value.length < 6) {
      setError(password, passwordError, "Password minimal 6 karakter.");
      valid = false;
    }

    if (!valid) (username.value.trim() ? password : username).focus();
    return valid;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    formError.textContent = "";
    if (!validate()) return;

    submitButton.disabled = true;
    submitButton.textContent = "Memproses...";

    try {
      // TODO: replace with a real request to your backend, e.g.
      // const res = await fetch("/ukm-taekwondo-polije/api/login.php", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ username: username.value.trim(), password: password.value }),
      // });
      // if (!res.ok) throw new Error("invalid");
      window.location.href = DASHBOARD_URL;
    } catch (err) {
      formError.textContent = "Username / NIM atau password salah.";
      submitButton.disabled = false;
      submitButton.textContent = "Masuk";
    }
  });
})();
