const DELETE_BTN_CLASS = 'delete-btn';
const CONTACT_ROW_SELECTOR = '.contact-row';

const contactForm = document.querySelector('#newContactForm');
const contactsList = document.querySelector('#contactsList');
const contactTemplate = document.querySelector('#contactTemplate').innerHTML;
const formInputs = document.querySelectorAll('.form-input');

contactForm.addEventListener('submit', onContactFormSubmit);
contactsList.addEventListener('click', onContactsListClick);

addContact({
    name: 'Brad',
    surname: 'Pitt',
    phone: '0676458585',
});

addContact({
    name: 'Max',
    surname: 'Payne',
    phone: '0936458585',
});

addContact({
    name: 'Jacke',
    surname: 'Chan',
    phone: '0956458585',
});

function onContactFormSubmit(e) {
    e.preventDefault();

    const newContact = getContact();

    if (isContactValid(newContact)) {
        addContact(newContact);
        resetForm();
    } else {
        alert('Not valid');
    }
}

function onContactsListClick(e) {
    if (e.target.classList.contains(DELETE_BTN_CLASS)) {
        const tr = getContactRow(e.target);
        removeContact(tr);
    }
}

function getContact() {
    const contact = {};

    formInputs.forEach((inp) => {
        contact[inp.name] = inp.value;
    });

    return contact;
}

function isContactValid(contact) {
    return (
        isFieldValid(contact.name) &&
        isFieldValid(contact.surname) &&
        isPhoneFieldValid(contact.phone)
    );
}

function isFieldValid(value) {
    return value !== '';
}

function isPhoneFieldValid(value) {
    return isFieldValid(value) && !isNaN(value);
}

function generateContactHtml(contact) {
    return contactTemplate
        .replace('{{name}}', contact.name)
        .replace('{{surname}}', contact.surname)
        .replace('{{phone}}', contact.phone);
}

function addContact(contact) {
    const newContactHtml = generateContactHtml(contact);

    contactsList.insertAdjacentHTML('beforeend', newContactHtml);
}

function resetForm() {
    contactForm.reset();
}

function getContactRow(el) {
    return el.parentElement.closest(CONTACT_ROW_SELECTOR);
}

function removeContact(el) {
    el.remove();
}