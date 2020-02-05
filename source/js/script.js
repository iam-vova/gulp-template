'use strict';

var writeUsLink = document.querySelector('.contacts__callme');
var overlay = document.querySelector('.overlay');
var writeUsModal = overlay.querySelector('.modal-write-us');
var writeUsForm = writeUsModal.querySelector('.modal-write-us__form');
var userName = writeUsForm.querySelector('[name=name-field]');
var tel = writeUsForm.querySelector('[name=tel-field]');
var consultationForm = document.querySelector('.consultation');
var telFooter = consultationForm.querySelector('[name=tel-field]');
var message = writeUsForm.querySelector('[name=question-field]');
var modalClose = writeUsModal.querySelector('.modal-write-us__close');

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

function modalRemove() {
  writeUsModal.classList.remove('modal__show');
  overlay.classList.remove('overlay__show');
  document.body.style.overflow = '';
}

function modalShow() {
  overlay.classList.add('overlay__show');
  writeUsModal.classList.add('modal__show');
  document.body.style.overflow = 'hidden';
}

if (overlay) {
  overlay.addEventListener('click', function (evt) {
    evt.target === overlay ? modalRemove() : null;
  });
}

if (modalClose) {
  modalClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalRemove();
  });
}

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (writeUsModal.classList.contains('modal__show')) {
      modalRemove();
    }
  }
});

var isStorageSupport = true;
var check = 'localStorageCheck';
try {
  localStorage.setItem(check, check);
  localStorage.removeItem(check);
} catch (err) {
  isStorageSupport = false;
}

if (writeUsLink) {
  writeUsLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalShow();
    userName.focus();
  });
}

if (writeUsForm) {
  writeUsForm.addEventListener('submit', function () {
    if (isStorageSupport) {
      localStorage.setItem('user-name', userName.value);
      localStorage.setItem('tel', tel.value);
      localStorage.setItem('message', message.value);
    }
  });
}

var anchors = document.querySelectorAll('a[href*="#"]');
anchors.forEach(function (anchor) {
  anchor.addEventListener('click', function (evt) {
    evt.preventDefault();

    var blockID = anchor.getAttribute('href').substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

var accardionBtns = document.querySelectorAll('.footer-top__btn');

function accardionClose() {
  accardionBtns.forEach(function (btn) {
    btn.classList.add('closed');
  });
}

if (accardionBtns) {
  accardionBtns.forEach(function (btn) {
    btn.classList.remove('visually-hidden');
    accardionClose();

    btn.addEventListener('click', function () {

      if (!btn.classList.contains('closed')) {
        btn.classList.add('closed');
      } else {
        accardionClose();
        btn.classList.remove('closed');
      }
    });
  });
}

function telValidation(tel) {
  var currentValue = tel.value;

  tel.addEventListener('focus', function () {
    if (!tel.value) {
      tel.value = '+7(';
      currentValue = tel.value;
    }
  });

  tel.addEventListener('blur', function () {
    tel.value === '+7(' ? tel.value = '' : null;
  });

  tel.addEventListener('keyup', function (evt) {
    if ((evt.keyCode < 48 || evt.keyCode > 57) && (evt.keyCode < 96 || evt.keyCode > 105) && (evt.keyCode !== 8) && (evt.keyCode !== 46)) {
      tel.value = currentValue;
    }

    currentValue = tel.value;

    if ((tel.value.length === 6) && (tel.value.indexOf(')') === -1)) {
      tel.value += ')';
    }

    if ((tel.value.length === 7) && (evt.keyCode === 8)) {
      tel.value = tel.value.substr(0, 5);
      currentValue = tel.value;
    }
  });
}

tel ? telValidation(tel) : null;
telFooter ? telValidation(telFooter) : null;
