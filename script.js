// Small interactive helpers for the contact form
function handleContact(e) {
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();
    if (!name || !email || !message) {
        alert('Please fill all fields.');
        return false;
    }

    // For this static demo we just show a message.
    // You can replace this with a fetch() to your backend or Formspree/GitHub Actions/email API.
    alert(`Thanks ${name}! Message received — I'll get back to ${email} soon.`);
    document.getElementById('contact-form').reset();
    return false;
}