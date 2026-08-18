// =========================================================
// FITUR COUNTDOWN (HITUNG MUNDUR) ACARA TRIESULA 2026
// =========================================================

// Menentukan tanggal target acara: 21 Agustus 2026, pukul 18:00:00 WIB
// Format bulan pada JS dimulai dari 0 (0 = Januari, 7 = Agustus)
// Namun, lebih mudah dan aman menggunakan string format ISO atau standar bahasa Inggris.
const targetDate = new Date("September 12, 2026 08:00:00").getTime();

// Fungsi untuk memperbarui hitung mundur setiap 1 detik
const countdownTimer = setInterval(function() {

    // Mendapatkan waktu saat ini
    const now = new Date().getTime();

    // Mencari selisih waktu antara sekarang dan tanggal target
    const distance = targetDate - now;

    // Perhitungan waktu untuk hari, jam, menit, dan detik
    // 1 hari = 1000ms * 60 detik * 60 menit * 24 jam
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    
    // Sisa modulus (sisa bagi) dari hari, dibagi untuk mendapatkan jam
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    // Sisa modulus dari jam, dibagi untuk mendapatkan menit
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    // Sisa modulus dari menit, dibagi untuk mendapatkan detik
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Fungsi tambahan untuk menambahkan angka "0" di depan jika angka < 10 (contoh: 09 bukan 9)
    const formatTime = (time) => time < 10 ? `0${time}` : time;

    // Menampilkan hasil perhitungan ke elemen HTML yang sesuai
    document.getElementById("days").innerHTML = formatTime(days);
    document.getElementById("hours").innerHTML = formatTime(hours);
    document.getElementById("minutes").innerHTML = formatTime(minutes);
    document.getElementById("seconds").innerHTML = formatTime(seconds);

    // Kondisi jika waktu acara sudah tiba atau terlewat
    if (distance < 0) {
        clearInterval(countdownTimer); // Hentikan perhitungan
        
        // Ubah tampilan angka menjadi nol semua
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        
        // Ubah judul countdown untuk menandakan acara sedang berlangsung
        const countdownTitle = document.querySelector(".countdown-title");
        if (countdownTitle) {
            countdownTitle.innerHTML = "Acara Sedang Berlangsung!";
        }
    }
}, 1000); // 1000 milidetik = 1 detik

// =========================================================
// FITUR NAMA TAMU DARI URL PARAMETER (?to=Nama)
// =========================================================

// Mengambil parameter dari URL
const urlParams = new URLSearchParams(window.location.search);
// Mencari parameter dengan kunci 'to'
const guestNameParam = urlParams.get('to');

// Menemukan elemen HTML tempat nama akan ditampilkan
const guestNameElement = document.getElementById('guestName');

// Jika parameter 'to' ada dan tidak kosong di link URL
if (guestNameParam && guestNameParam.trim() !== '') {
    // Mengganti teks default dengan nama dari link URL
    guestNameElement.innerHTML = guestNameParam;
}

// =========================================================
// FITUR ANIMASI SCROLL (REVEAL)
// =========================================================

function revealElements() {
    // Mencari semua elemen yang memiliki kelas 'reveal'
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight; // Tinggi layar
        var elementTop = reveals[i].getBoundingClientRect().top; // Jarak elemen dari atas layar
        var elementVisible = 100; // Elemen akan muncul ketika berjarak 100px dari bawah layar

        // Jika elemen sudah masuk jangkauan layar, tambahkan kelas 'active'
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Menjalankan fungsi setiap kali pengguna melakukan scroll
window.addEventListener("scroll", revealElements);

// Memanggil fungsi sekali saat halaman pertama kali dimuat
revealElements();