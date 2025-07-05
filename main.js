import { calculatePrice } from './src/priceCalculator.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('config-form');
  const priceDisplay = document.getElementById('price-display');
  const confirmation = document.getElementById('confirmation');

  function updatePrice() {
    const disposition = form.elements.disposition.value;
    const area = parseFloat(form.elements.area.value) || 0;
    const delivery = form.elements.delivery.value;

    const price = calculatePrice(disposition, area, delivery);
    priceDisplay.textContent = `Cena: ${price.toLocaleString('cs-CZ')} Kč`;
  }

  async function submitForm(data) {
    try {
      const res = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Chyba při odesílání');

      confirmation.textContent = 'Vaše konfigurace byla úspěšně odeslána.';
      form.reset();
      updatePrice();
    } catch (err) {
      confirmation.textContent = 'Nepodařilo se odeslat konfiguraci.';
    }
  }

  form.addEventListener('input', updatePrice);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      disposition: form.elements.disposition.value,
      area: form.elements.area.value,
      delivery: form.elements.delivery.value,
    };
    submitForm(data);
  });

  updatePrice();
});