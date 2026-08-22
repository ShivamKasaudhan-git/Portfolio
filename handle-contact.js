/**
 * ==============================================================================
 * SHIVAM KASAUDHAN PORTFOLIO — CONTACT FORM HANDLER (handle-contact.js)
 * Form validation, simulated asynchronous submission, and feedback states
 * ==============================================================================
 */

function handleFormSubmit() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const sendBtn = document.getElementById('sendBtn');
    const formSuccess = document.getElementById('formSuccess');
    const contactForm = document.getElementById('contactForm');

    if (!nameInput || !emailInput || !messageInput || !sendBtn) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput ? subjectInput.value.trim() : '';
    const message = messageInput.value.trim();

    // Basic Validation
    if (!name) {
        alertField(nameInput, 'Please enter your full name.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        alertField(emailInput, 'Please provide a valid email address.');
        return;
    }

    if (!message) {
        alertField(messageInput, 'Please write a brief message.');
        return;
    }

    // Button loading animation state
    const originalBtnHtml = sendBtn.innerHTML;
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...';

    // Simulate sending network request
    setTimeout(() => {
        sendBtn.disabled = false;
        sendBtn.innerHTML = originalBtnHtml;

        // Hide form and display success
        if (contactForm) contactForm.style.display = 'none';
        if (formSuccess) {
            formSuccess.style.display = 'block';
            formSuccess.classList.add('fadeIn');
        }

        // Reset input fields
        nameInput.value = '';
        emailInput.value = '';
        if (subjectInput) subjectInput.value = '';
        messageInput.value = '';
    }, 1000);
}

function alertField(inputElement, message) {
    inputElement.focus();
    inputElement.style.borderColor = '#ef4444';
    inputElement.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.25)';

    setTimeout(() => {
        inputElement.style.borderColor = '';
        inputElement.style.boxShadow = '';
    }, 2500);
}

function resetContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (formSuccess) formSuccess.style.display = 'none';
    if (contactForm) {
        contactForm.style.display = 'flex';
        contactForm.classList.add('fadeIn');
    }
}

window.handleFormSubmit = handleFormSubmit;
window.resetContactForm = resetContactForm;
