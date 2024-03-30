window.addEventListener('DOMContentLoaded', e => {
  if (e.target.readyState === "interactive") {
    initApp();
  }
});

function initApp() {
  /* Dropdown toggler for smaller devices */
  const dropdownToggler = document.querySelector('.dropdown-icon');
  const deviceSmMenu = document.querySelector('.device-sm-menu');
  let deviceSmMenuAll = document.querySelectorAll('.device-sm-menu *');
  deviceSmMenuAll = Array.from(deviceSmMenuAll);
  
  dropdownToggler.addEventListener('click', e => {
    deviceSmMenu.classList.toggle("d-none");

    window.addEventListener('click', removeSubMenu);

    function removeSubMenu(ev) {
      
      if ((deviceSmMenuAll.every(el => ev.target !== el)) && (ev.target !== dropdownToggler) && (ev.target !== deviceSmMenu)) {
        deviceSmMenu.classList.add('d-none');
        window.removeEventListener("click", removeSubMenu);
      }
    }
  });
}
