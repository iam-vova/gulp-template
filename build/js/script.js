'use strict';

var writeUsLink = document.querySelector('.contacts__callme');
var overlay = document.querySelector('.overlay');
var writeUsModal = overlay.querySelector('.modal-write-us');
var writeUsForm = writeUsModal.querySelector('.modal-write-us__form');
var userName = writeUsForm.querySelector('[name=name-field]');
var tel = writeUsForm.querySelector('[name=tel-fiel]');
var message = writeUsForm.querySelector('[name=question-field]');
var modalClose = writeUsModal.querySelector('.modal-write-us__close');


function modalRemove() {
  writeUsModal.classList.remove('modal__show');
  overlay.classList.remove('overlay__show');
}

function modalShow() {
  overlay.classList.add('overlay__show');
  writeUsModal.classList.add('modal__show');
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
anchors.forEach(function(anchor) {
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
