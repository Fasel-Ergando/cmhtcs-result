import { errorPopup } from "./errorPopupLibrary.js";

window.addEventListener('DOMContentLoaded',  e => {
  if (e.target.readyState === "interactive") {
    initApp();
  }
});

function initApp() {
  const headerLinks = document.querySelectorAll('.headerLink');
  const studentEntryForm = document.querySelector('form.studentEntryForm');
  const selectIdNum = document.querySelector('form .selectIdNum');
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

  studentEntryForm.addEventListener('submit', e => {
    e.preventDefault();
    
    if (!studentEntryForm.checkValidity() || !selectIdNum.value.trim()) {
      selectIdNum.classList.add('is-invalid');
    } else {
      if (isNaN(selectIdNum.value.trim())) {
        errorPopup('Error', 'Please fill in an ID number', displayErrorPopup); 
      } else {
        fetchStudentData(selectIdNum.value.trim());
      }
    }
  });

  studentEntryForm.addEventListener('input', e => {
    if (!studentEntryForm.checkValidity() || !selectIdNum.value.trim()) {
      selectIdNum.classList.add('is-invalid');
    } else {
      selectIdNum.classList.remove('is-invalid');
    }
  });
}

function fetchStudentData(idNum) {
  const selectedGrade = document.querySelector('#selectGrade').value;
  const selectedSection = document.querySelector('#selectSection').value;
  const displayStudentResultBody = document.querySelector('.displayStudentResultBody');
  const copyTableButton = document.querySelector('.copyTableButton');

  fetch(`../Assets/student grades/g${selectedGrade}.csv`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.text();
  })
  .then(data => {
    let iter = 0;
    let popupId;
    const studentDetail = data.trim().split('\n').map(arr => arr.split(','));

    idNum = idNum < 10? '0' + idNum: idNum;

    if (idNum > studentDetail.length) {
      errorPopup("Error",'Invalid ID Number', document.querySelector('.displayErrorPopup'));
      displayStudentResultBody.innerHTML = '';
      copyTableButton.classList.add('d-none');
      return;
    }

    studentDetail.forEach(arr => {
      if (arr[0] === `16${selectedGrade}${selectedSection}${idNum}`) {
        displayStudentResultBody.innerHTML = '';
        copyTableButton.classList.remove('d-none');

        arr.forEach((d, i) => {
          if (i === 0) {
            displayStudentResultBody.innerHTML += `
              <tr>
                <td class="table-primary">ID NO</td>
                <td>${idNum}</td>
              </tr>
            `;
          } else {
            displayStudentResultBody.innerHTML += `
              <tr>
                <td class="table-primary">${studentDetail[0][i]}</td>
                <td>${d}</td>
              </tr>
            `;
          }
        });
        
        copyTableButton.addEventListener('click', e => {
          const textElement = displayStudentResultBody;
          
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(textElement);
          selection.removeAllRanges();
          selection.addRange(range);
          
          document.execCommand("copy");
          
          selection.removeAllRanges();
          
          document.querySelector('.displayInfo').classList.remove('d-none');
          clearInterval(popupId);
          document.querySelector('.displayInfo').textContent = 'Copied to clipboard!';
              popupId = setTimeout(() => {
              document.querySelector('.displayInfo').classList.add('d-none');
            }, 2000);
        });
      } else {
        if (iter >= studentDetail.length - 1) {
          errorPopup('Error', 'Invalid ID Number', document.querySelector('.displayErrorPopup'));
        }
        iter++;
      }
    });
    
  })
  .catch(e => {
    errorPopup('error', 'An error occurred while fetching the file', document.querySelector('.displayErrorPopup'));
  });
}
