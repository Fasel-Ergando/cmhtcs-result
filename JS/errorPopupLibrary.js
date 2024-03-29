export function errorPopup(errorName = 'Error', message = 'An error occurred.', parentContainer) {
  createError(errorName, message);
  function startDecreasing(div, errorPopupDiv) {
    let i = div.clientWidth;
    const interval = setInterval(() => {
      i--;
      div.style.width = `${i}px`;
      div.style.borderBottomRightRadius = `0`;
      if (i === 0) {
        if (parentContainer.lastElementChild) {
          errorPopupDiv.remove();
        }
        clearInterval(interval);
      }
    },  5);
  }
  
  function createError(errorName, message) {
    const errorPopupDiv = document.createElement('div');
    const errorSvgDiv = document.createElement('div');
    const errorNameDiv = document.createElement('div');
    const errorMessageDiv = document.createElement('div');
    const errorStackDiv = document.createElement('div');
    const progressDiv = document.createElement('div');
    const sideBarDiv = document.createElement('div');
  
    //Inner Content
    errorSvgDiv.innerHTML = `<svg xmlns="https://www.w3.org/2000/svg" width="25" height="25" fill="#ff0000af" class="bi bi-x-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
      </svg>`;
    errorNameDiv.innerHTML = errorName;
    errorMessageDiv.innerHTML = message;
     //add classes
     errorPopupDiv.className = 'errorPopup';
     errorSvgDiv.className = 'errorSvg';
     errorStackDiv.className = 'errorStack';
     errorNameDiv.className = 'errorName';
     errorMessageDiv.className = 'errorMessage';
     progressDiv.className = 'progress';
     sideBarDiv.className = 'sideBar';
  
    //appending order is crucial
    parentContainer.appendChild(errorPopupDiv);
    errorPopupDiv.appendChild(errorSvgDiv);
    errorPopupDiv.appendChild(errorStackDiv);
    errorStackDiv.appendChild(errorNameDiv);
    errorStackDiv.appendChild(errorMessageDiv);
    errorPopupDiv.appendChild(progressDiv);
    errorPopupDiv.appendChild(sideBarDiv);
  
    
    startDecreasing(progressDiv, errorPopupDiv);
  
    if (parentContainer.childElementCount > 7) {
      //automatically remove the last popup if the number of popups exceed 7
      parentContainer.lastElementChild.remove();
    }
  }
}
