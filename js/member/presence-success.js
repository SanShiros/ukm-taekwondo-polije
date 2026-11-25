(function () {
  let data = null;
  try {
    data = JSON.parse(sessionStorage.getItem("presence"));
  } catch (err) {}
  if (!data) return;

  document.getElementById("outName").textContent = data.name;
  document.getElementById("outNim").textContent = data.nim;
  document.getElementById("outMajor").textContent = data.major;
  document.getElementById("outTime").textContent = data.time;
})();
