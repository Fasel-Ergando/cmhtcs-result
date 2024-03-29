import { errorPopup } from "./errorPopupLibrary.js";

window.addEventListener('DOMContentLoaded',  e => {
  if (e.target.readyState === "interactive") {
    initApp();
  }
});

function initApp() {
  const headerLinks = document.querySelectorAll('.headerLink');
  const getInTouch = document.querySelector('.getInTouch');
  const displayErrorPopup = document.querySelector('.displayErrorPopup');

  window.addEventListener('keydown', e => {
    if ((e.ctrlKey && e.key === 'u') || (e.ctrlKey && e.key === 'U')) {
      e.preventDefault();
      errorPopup('Error', 'Viewing code in this way is restricted due to privacy reasons.', displayErrorPopup);
    } else if ((e.ctrlKey && e.shiftKey && e.key === 'i') || e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault();
      errorPopup('Error', 'Viewing code in this way is restricted due to privacy reasons.', displayErrorPopup);
    }
  });

  window.addEventListener('contextmenu', e => {
    e.preventDefault();
    errorPopup('Error', 'Viewing code in this way is restricted due to privacy reasons.', displayErrorPopup);
  });

  headerLinks.forEach(link => {
    link.addEventListener('click', e => {
      headerLinks.forEach(l => l.classList.remove('link-active'));
      link.classList.add('link-active');
    });
  });

  getInTouch.addEventListener('submit', e => {
    if (!getInTouch.checkValidity()) {
      getInTouch.classList.add('was-validated');
      e.preventDefault();
    }
  });
}
