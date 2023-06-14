document.addEventListener('DOMContentLoaded', () => {
  const voucherForm = document.getElementById('voucherForm');
  const barcodeInput = document.getElementById('barcodeInput');
  const amountInput = document.getElementById('amountInput');
  const resultContainer = document.getElementById('resultContainer');
  const getVoucherBtn = document.getElementById('getVoucherBtn');
  const deleteVoucherBtn = document.getElementById('deleteVoucherBtn');

  voucherForm.addEventListener('submit', async (event) => {
    event.preventDefault();

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
        resultContainer.innerHTML = `<p class="text-success">Voucher saved with barcode: ${user.barcode}</p>`;
      } else {
        const error = await response.json();
        resultContainer.innerHTML = `<p class="text-danger">${error.error}</p>`;
      }
    } catch (error) {
      console.error('Error:', error);
      resultContainer.innerHTML = `<p class="text-danger">An error occurred. Please try again later.</p>`;
    }
  });

  getVoucherBtn.addEventListener('click', async () => {
    const amount = amountInput.value;

    try {
      const response = await fetch(`http://localhost:3000/api/vouchers?amount=${amount}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const { barcodes, totalAmount, remainingAmount } = data;

        let resultHtml = '';
        if (barcodes.length > 0) {
          resultHtml += `<p>Vouchers found:</p>`;
          resultHtml += `<ul>`;
          barcodes.forEach((barcode) => {
            resultHtml += `<li>${barcode}</li>`;
          });
          resultHtml += `</ul>`;
          resultHtml += `<p>Total amount covered: ${totalAmount}</p>`;
          if (remainingAmount > 0) {
            resultHtml += `<p>Remaining amount: ${remainingAmount}</p>`;
          }
        } else {
          resultHtml = `<p>No vouchers found that can cover the amount ${amount}</p>`;
        }

        resultContainer.innerHTML = resultHtml;
      } else {
        const error = await response.json();
        resultContainer.innerHTML = `<p class="error">${error.message}</p>`;
      }
    } catch (error) {
      console.error('Error:', error);
      resultContainer.innerHTML = `<p class="error">An error occurred. Please try again later.</p>`;
    }
  });

  deleteVoucherBtn.addEventListener('click', async () => {
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
