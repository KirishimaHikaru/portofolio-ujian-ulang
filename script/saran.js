document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form[name="saranForm"]');
    const inisial = form['inisial'];
    const email = form['email'];
    const kritik = form['kritik'];
    const saran = form['saran'];
    const errorMessages = {};

    // Fungsi untuk memeriksa validitas form
    function validateField(field, message) {
        if (field.value.trim() === '') {
            errorMessages[field.name] = message;
            return false;
        } else {
            delete errorMessages[field.name];
            return true;
        }
    }

    // Fungsi untuk memeriksa validitas email
    function validateEmail(field) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value.trim())) {
            errorMessages[field.name] = "Format email tidak valid!";
            return false;
        } else {
            delete errorMessages[field.name];
            return true;
        }
    }

    // Fungsi untuk menampilkan pesan error
    function showErrors() {
        const errorDiv = document.getElementById('error-messages');
        errorDiv.innerHTML = '';

        for (const [key, value] of Object.entries(errorMessages)) {
            const errorItem = document.createElement('p');
            errorItem.textContent = value;
            errorItem.style.color = 'red';
            errorDiv.appendChild(errorItem);
        }
    }

    // Fungsi untuk validasi keseluruhan form
    function validateForm() {
        validateField(inisial, "Inisial harus diisi!");
        validateField(email, "Email harus diisi!");
        validateField(kritik, "Kritik harus diisi!");
        validateField(saran, "Saran harus diisi!");
        validateEmail(email);

        showErrors();

        return Object.keys(errorMessages).length === 0;
    }

    // Event listener untuk validasi saat submit
    form.addEventListener('submit', function (e) {
        if (!validateForm()) {
            e.preventDefault();
        }
    });
});
