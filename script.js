
let currentStep = 1;
showStep(currentStep);

function showStep(n) {
  document.querySelectorAll('.step').forEach((step, index) => {
    step.classList.toggle('active', index === n - 1);
  });
}

function nextStep() {
  currentStep++;
  if (currentStep > 6) currentStep = 6;
  showStep(currentStep);
  if (currentStep === 6) calculate();
}

function prevStep() {
  currentStep--;
  if (currentStep < 1) currentStep = 1;
  showStep(currentStep);
}

function updatePlocha() {
  const val = document.getElementById("plocha").value;
  document.getElementById("plocha-label").innerText = val + " m²";
}

function calculate() {
  const dispo = document.getElementById("dispozice").value;
  const plocha = parseInt(document.getElementById("plocha").value);
  const dodani = document.getElementById("dodani").value;
  const krytina = document.getElementById("krytina").value;

  let cenaZaM2 = {
    hruba: 16500,
    dokonceni: 24500,
    naklic: 30500
  }[dodani];

  let cena = plocha * cenaZaM2;

  if (krytina === "taska") {
    cena += plocha * 600;
  }

  document.getElementById("summary").innerHTML = `
    <strong>Dispozice:</strong> ${dispo}<br>
    <strong>Plocha:</strong> ${plocha} m²<br>
    <strong>Dodání:</strong> ${dodani}<br>
    <strong>Krytina:</strong> ${krytina}<br>
    <strong><u>Celková cena:</u></strong> ${cena.toLocaleString('cs-CZ')} Kč
  `;
}
