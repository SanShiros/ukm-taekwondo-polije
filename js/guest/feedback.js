const form = document.getElementById("feedbackForm");
const message = document.getElementById("message");
const nameInput = document.getElementById("name");
const anonymous = document.getElementById("anonymous");
const messageBlock = document.getElementById("messageBlock");
const successBox = document.getElementById("success");
const counter = document.getElementById("counter");

message.addEventListener("input", () => {
  counter.textContent = message.value.length + " / 1000";
  if (message.value.trim()) messageBlock.classList.remove("has-error");
});

anonymous.addEventListener("change", () => {
  nameInput.disabled = anonymous.checked;
  if (anonymous.checked) nameInput.value = "";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  successBox.classList.remove("show");

  if (!message.value.trim()) {
    messageBlock.classList.add("has-error");
    message.focus();
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  if (anonymous.checked) data.name = "Anonymous";

  // TODO: connect to backend, for example:
  // fetch('save-feedback.php', { method: 'POST', body: new FormData(form) })
  console.log("Feedback data:", data);

  form.reset();
  nameInput.disabled = false;
  counter.textContent = "0 / 1000";
  successBox.classList.add("show");
  successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
