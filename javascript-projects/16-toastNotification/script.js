const successBtn = document.querySelector('.buttons button:nth-child(1)');
    const errorBtn = document.querySelector('.buttons button:nth-child(2)');
    const invalidBtn = document.querySelector('.buttons button:nth-child(3)');
    const toastBox = document.querySelector('#toastBox');

    let successMsg = '<i class="fa-solid fa-circle-check"></i>Successfully submitted!';
    let errorMsg = '<i class="fa-solid fa-circle-xmark"></i>Error! Please try again.';
    let invalidMsg = '<i class="fa-solid fa-circle-exclamation"></i>Invalid input!';

    successBtn.addEventListener('click', () =>
      showToast(successMsg)
    );
    errorBtn.addEventListener('click', () =>
      showToast(errorMsg)
    );
    invalidBtn.addEventListener('click', () =>
      showToast(invalidMsg)
    );

    function showToast(msg) {
      let toast = document.createElement('div');
      toast.classList.add('toast');
      toast.innerHTML = msg;
      toastBox.appendChild(toast);

      if (msg.includes('Error')) {
        toast.classList.add('error');
      }
      if (msg.includes('Invalid')) {
        toast.classList.add('invalid');
      }
      setTimeout(() => {
        toast.remove();
      }, 5000);
    }