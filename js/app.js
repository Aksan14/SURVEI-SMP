// ===== KONFIGURASI =====
// Ganti URL ini dengan URL Web App Google Apps Script Anda
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbySXs2PSY8ZJgD3RQTz5ErggESofENSNig0IWqPKjojEIEhorjkiHCFiUiXrpmWiWKV/exec';

// ===== NAVIGASI =====
function selectRole(role) {
    if (role === 'guru') {
        window.location.href = 'guru.html';
    } else if (role === 'siswa') {
        window.location.href = 'siswa.html';
    }
}

function goBack() {
    window.location.href = 'index.html';
}

function goHome() {
    window.location.href = 'index.html';
}

// ===== LOADING & MODAL =====
function showLoading() {
    document.getElementById('loadingOverlay').classList.add('active');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.remove('active');
}

function showSuccessModal() {
    document.getElementById('successModal').classList.add('active');
}

function showErrorAlert(message) {
    alert('Error: ' + message);
}

// ===== FORM SUBMISSION - GURU =====
function submitGuruForm() {
    // Validasi checkbox q3
    const mediaCheckboxes = document.querySelectorAll('input[name="q3"]:checked');
    if (mediaCheckboxes.length === 0) {
        alert('Silakan pilih minimal satu media pembelajaran!');
        return;
    }

    showLoading();

    // Kumpulkan data identitas
    const nama = document.getElementById('nama').value.trim();
    const nip = document.getElementById('nip').value.trim();
    const sekolah = document.getElementById('sekolah').value.trim();
    const pengalaman = document.getElementById('pengalaman').value;
    const jumlahSiswa = document.getElementById('jumlahSiswa').value;

    // Kumpulkan jawaban kuesioner
    const q1 = document.querySelector('input[name="q1"]:checked')?.value || '';
    const q2 = document.querySelector('input[name="q2"]:checked')?.value || '';
    
    // Q3 - Multiple checkbox
    let q3Values = [];
    mediaCheckboxes.forEach(cb => {
        if (cb.value === 'Lainnya') {
            const otherText = document.getElementById('q3OtherText').value.trim();
            if (otherText) {
                q3Values.push('Lainnya: ' + otherText);
            }
        } else {
            q3Values.push(cb.value);
        }
    });
    const q3 = q3Values.join(', ');

    const q4 = document.querySelector('input[name="q4"]:checked')?.value || '';
    const q5 = document.getElementById('q5').value.trim();

    // Data yang akan dikirim
    const formData = {
        role: 'guru',
        timestamp: new Date().toLocaleString('id-ID'),
        nama: nama,
        nip: nip,
        sekolah: sekolah,
        pengalaman: pengalaman,
        jumlahSiswa: jumlahSiswa,
        q1: q1,
        q2: q2,
        q3: q3,
        q4: q4,
        q5: q5
    };

    // Kirim ke Google Apps Script
    sendToGoogleSheet(formData);
}

// ===== FORM SUBMISSION - SISWA =====
function submitSiswaForm() {
    showLoading();

    // Kumpulkan data identitas
    const nama = document.getElementById('nama').value.trim();
    const nis = document.getElementById('nis').value.trim();
    const kelas = document.getElementById('kelas').value;
    const sekolah = document.getElementById('sekolah').value.trim();
    const jenisKelamin = document.getElementById('jenisKelamin').value;

    // Kumpulkan jawaban kuesioner
    const q1 = document.querySelector('input[name="q1"]:checked')?.value || '';
    const q2 = document.querySelector('input[name="q2"]:checked')?.value || '';
    
    // Q3 - Radio dengan opsi lainnya
    let q3 = document.querySelector('input[name="q3"]:checked')?.value || '';
    if (q3 === 'Lainnya') {
        const otherText = document.getElementById('q3OtherText').value.trim();
        if (otherText) {
            q3 = 'Lainnya: ' + otherText;
        }
    }

    const q4 = document.querySelector('input[name="q4"]:checked')?.value || '';
    const q5 = document.querySelector('input[name="q5"]:checked')?.value || '';
    const q6 = document.querySelector('input[name="q6"]:checked')?.value || '';
    const q7 = document.querySelector('input[name="q7"]:checked')?.value || '';
    const q8 = document.querySelector('input[name="q8"]:checked')?.value || '';
    const q9 = document.querySelector('input[name="q9"]:checked')?.value || '';

    // Data yang akan dikirim
    const formData = {
        role: 'siswa',
        timestamp: new Date().toLocaleString('id-ID'),
        nama: nama,
        nis: nis,
        kelas: kelas,
        sekolah: sekolah,
        jenisKelamin: jenisKelamin,
        q1: q1,
        q2: q2,
        q3: q3,
        q4: q4,
        q5: q5,
        q6: q6,
        q7: q7,
        q8: q8,
        q9: q9
    };

    // Kirim ke Google Apps Script
    sendToGoogleSheet(formData);
}

// ===== KIRIM KE GOOGLE SHEET =====
function sendToGoogleSheet(data) {
    // Cek apakah URL sudah dikonfigurasi
    if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        hideLoading();
        // Untuk testing tanpa Google Sheet
        console.log('Data yang akan dikirim:', data);
        alert('PERHATIAN: URL Google Apps Script belum dikonfigurasi.\n\nSilakan ikuti petunjuk di file README.md untuk mengonfigurasi integrasi Google Spreadsheet.\n\nData (untuk testing):\n' + JSON.stringify(data, null, 2));
        showSuccessModal();
        return;
    }

    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        hideLoading();
        showSuccessModal();
    })
    .catch(error => {
        hideLoading();
        console.error('Error:', error);
        showErrorAlert('Gagal mengirim data. Silakan coba lagi.');
    });
}

// ===== UTILITY FUNCTIONS =====
// Validasi form sebelum submit
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }
    return true;
}

// Scroll ke pertanyaan yang belum dijawab
function scrollToUnanswered() {
    const unanswered = document.querySelector('.question-card:has(input:required:not(:checked))');
    if (unanswered) {
        unanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
