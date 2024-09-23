"use strict";
const scrollController = {
    scrollPosition: 0,
    disabledScroll() {
        this.scrollPosition = window.scrollY;
        document.body.style.cssText = `
        overflow: hidden;
        position: fixed;
        top: -${this.scrollPosition}px;
        left: 0;
        height: 100vh;
        width: 100vw;
      `;
    },
    enabledScroll() {
        document.body.style.cssText = 'position: relative;';
        window.scroll({ top: this.scrollPosition });
    }
};
const modalController = ({ modal, btnOpen, btnClose }) => {
    const modalElem = document.querySelector(modal);
    const buttons = document.querySelectorAll(btnOpen);
    modalElem.style.cssText = `
      display: flex;
      visibility: hidden;
      opacity: 0;
      transition: opacity 300ms ease-in-out;
    `;
    const closeModal = (event) => {
        const target = event.target;
        if (target === modalElem || target.closest(btnClose) || (event instanceof KeyboardEvent && event.code === 'Escape')) {
            modalElem.style.opacity = '0';
            setTimeout(() => {
                modalElem.style.visibility = 'hidden';
                scrollController.enabledScroll();
            }, 300);
        }
    };
    const openModal = () => {
        modalElem.style.visibility = 'visible';
        modalElem.style.opacity = '1';
        window.addEventListener('keydown', closeModal);
        scrollController.disabledScroll();
    };
    buttons.forEach(button => button.addEventListener('click', openModal));
    modalElem.addEventListener('click', closeModal);
};
modalController({
    modal: '.modal',
    btnOpen: '.section__button',
    btnClose: '.modal__close'
});
const submitButton = document.querySelector('.end.order');
const inputFields = document.querySelectorAll('input[type="text"]');
const messageElement = document.querySelector('.hidden');
submitButton.addEventListener('click', () => {
    const allFieldsFilled = Array.from(inputFields).every(input => input.value.trim() !== '');
    if (allFieldsFilled) {
        messageElement.classList.remove('hidden');
    }
});
modalController({
    modal: '.modal2',
    btnOpen: '.buy__button',
    btnClose: '.modal__close'
});
