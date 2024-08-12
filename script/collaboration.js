document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formulir');
    const nameEvent = form['nameEvent'];
    const dateEvent = form['dateEvent'];
    const eventCategory = form['eventCategory'];
    const eventForm = form['eventForm'];
    const eventDescription = form['eventDescription'];
    const errorMessages = {};

    // Fungsi untuk memeriksa validitas field
    function validateField(field, message) {
        if (field.value.trim() === '' || field.value === '-') {
            errorMessages[field.name] = message;
            return false;
        } else {
            delete errorMessages[field.name];
            return true;
        }
    }

    // Fungsi untuk memeriksa validitas radio button
    function validateRadio(fieldName, message) {
        const options = form.querySelectorAll(`input[name="${fieldName}"]`);
        let isChecked = false;
        options.forEach(option => {
            if (option.checked) isChecked = true;
        });

        if (!isChecked) {
            errorMessages[fieldName] = message;
            return false;
        } else {
            delete errorMessages[fieldName];
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
        validateField(nameEvent, "Nama Event harus diisi!");
        validateField(dateEvent, "Tanggal harus diisi!");
        validateRadio('eventCategory', "Kategori Event harus dipilih!");
        validateField(eventForm, "Bentuk Event harus dipilih!");
        validateField(eventDescription, "Deskripsi Event harus diisi!");

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