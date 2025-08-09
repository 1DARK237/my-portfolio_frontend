document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form-submission');
    const formStatus = document.getElementById('form-status');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Basic validation
        if (!data.firstName || !data.lastName || !data.email || !data.message || !data.country) {
            formStatus.textContent = '❌ Please fill in all required fields.';
            formStatus.style.color = 'red';
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            formStatus.textContent = '❌ Please enter a valid email address.';
            formStatus.style.color = 'red';
            return;
        }

        formStatus.textContent = 'Sending...';
        formStatus.style.color = '#FFD700';
        submitButton.disabled = true;

        const payload = {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            message: data.message,
            country: data.country
        };

        try {
            const response = await fetch('/submit-form', {  // Relative URL to backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorResult = await response.json().catch(() => ({}));
                formStatus.textContent = errorResult.message || `❌ Error: ${response.status} ${response.statusText}`;
                formStatus.style.color = 'red';
            } else {
                const result = await response.json();
                formStatus.textContent = result.message;
                formStatus.style.color = 'green';
                form.reset();
            }
        } catch (error) {
            console.error('Error:', error);
            formStatus.textContent = '❌ A network error occurred. Please try again later.';
            formStatus.style.color = 'red';
        } finally {
            submitButton.disabled = false;
        }
    });
});
