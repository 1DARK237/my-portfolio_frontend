document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form-submission');
    const submitButton = document.getElementById('submit-button');
    const spinner = submitButton.querySelector('.spinner-border');
    const originalButtonText = "Submit";
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const country = document.getElementById('country').value;

        if (!firstName || !lastName || !email || !message || !country) {
            formStatus.textContent = '❌ Please fill in all the required fields.';
            formStatus.style.color = 'red';
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formStatus.textContent = '❌ Please enter a valid email address.';
            formStatus.style.color = 'red';
            return;
        }

        submitButton.textContent = 'Sending...';
        spinner.classList.remove('visually-hidden');
        submitButton.disabled = true;
        formStatus.textContent = '';

        const payload = {
            name: `${firstName} ${lastName}`,
            email: email,
            message: message,
            country: country
        };

        try {
            // Use the full URL for the fetch request
            const response = await fetch('http://localhost:3000/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            submitButton.textContent = originalButtonText;
            spinner.classList.add('visually-hidden');
            submitButton.disabled = false;

            if (response.ok) {
                formStatus.textContent = `✅ ${result.message}`;
                formStatus.style.color = 'green';
                contactForm.reset();
            } else {
                formStatus.textContent = `❌ Error: ${result.message}`;
                formStatus.style.color = 'red';
            }
        } catch (error) {
            console.error('Fetch error:', error);
            formStatus.textContent = '❌ A network error occurred. Please try again later.';
            formStatus.style.color = 'red';
            submitButton.textContent = originalButtonText;
            spinner.classList.add('visually-hidden');
            submitButton.disabled = false;
        }
    });
});