document.addEventListener('DOMContentLoaded', () => {
  const saveVoucherBtn = document.getElementById('saveVoucherBtn');
  const getVoucherBtn = document.getElementById('getVoucherBtn'); // Add the 'getVoucherBtn' element
  const resultContainer = document.getElementById('resultContainer');
  const barcodeInput = document.getElementById('barcodeInput');
  const amountInput = document.getElementById('amountInput');

  saveVoucherBtn.addEventListener('click', async () => {
    const barcode = barcodeInput.value;
    const amount = Number(amountInput.value);

    try {
      const response = await fetch('http://localhost:3000/api/vouchers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ barcode, amount }),
      });

      if (response.ok) {
        const user = await response.json();
        resultContainer.innerHTML = `<p>Voucher saved with barcode: ${user.barcode}</p>`;
      } else {
        const error = await response.json();
        resultContainer.innerHTML = `<p class="error">${error.error}</p>`;
      }
    } catch (error) {
      console.error('Error:', error);
      resultContainer.innerHTML = `<p class="error">An error occurred. Please try again later.</p>`;
    }
  });

  getVoucherBtn.addEventListener('click', async () => { // Add the event listener for the 'getVoucherBtn'
    const amount = amountInput.value;

    try {
      const response = await fetch(`http://localhost:3000/api/vouchers?amount=${amount}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const barcode = await response.json();
        resultContainer.innerHTML = `<p>Voucher found with barcode: ${barcode}</p>`;
      } else {
        const error = await response.json();
        resultContainer.innerHTML = `<p class="error">${error.message}</p>`;
      }
    } catch (error) {
      console.error('Error:', error);
      resultContainer.innerHTML = `<p class="error">An error occurred. Please try again later.</p>`;
    }
  });

  deleteVoucherBtn.addEventListener('click', async () => { // Add the event listener for the 'deleteVoucherBtn'
    const barcode = barcodeInput.value;

    try {
      const response = await fetch(`http://localhost:3000/api/vouchers/${barcode}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const deletedVoucher = await response.json();
        resultContainer.innerHTML = `<p>Voucher deleted: ${deletedVoucher.barcode}</p>`;
      } else {
        const error = await response.json();
        resultContainer.innerHTML = `<p class="error">${error.error}</p>`;
      }
    } catch (error) {
      console.error('Error:', error);
      resultContainer.innerHTML = `<p class="error">An error occurred. Please try again later.</p>`;
    }
  });
});
