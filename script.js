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
// FITUR ANIMASI DENGAN ANIME.JS
// =========================================================

// Animasi Hero Section saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    // Tambahkan perspektif 3D ke parent kontainer logo agar putarannya terlihat berdimensi
    const logoContainer = document.querySelector('.logo-container');
    if(logoContainer) logoContainer.style.perspective = "1000px";

    // Set awal elemen hero agar tidak terlihat sebelum dianimasikan
    anime.set(['.logo-item', '.hero-content', '.guest-wrapper'], { opacity: 0 });

    const timeline = anime.timeline({
        duration: 1500
    });

    // Animasikan Logo (Efek Putar 3D seperti Koin)
    timeline
    .add({
        targets: '.logo-item',
        opacity: [0, 1],
        translateY: [-50, 0],
        rotateY: [-90, 0], // Berputar 3D dari sumbu Y
        easing: 'easeOutElastic(1, .6)', // Efek memantul
        delay: anime.stagger(200) // Beri jeda antar logo
    })
    // Disusul oleh Hero Content (Efek Tumbuh dan Terbalik 3D)
    .add({
        targets: '.hero-content',
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.8, 1],
        rotateX: [30, 0], // Terbalik sedikit ke depan
        easing: 'easeOutExpo',
    }, '-=1200') 
    // Disusul oleh Guest Wrapper (Efek Ayunan Kertas)
    .add({
        targets: '.guest-wrapper',
        opacity: [0, 1],
        translateY: [40, 0],
        rotateX: [-40, 0],
        scale: [0.9, 1],
        easing: 'easeOutExpo',
    }, '-=1000');
});

// Fitur Scroll Animation (Reveal) dengan IntersectionObserver & Anime.js
const revealOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Elemen akan ter-trigger saat 15% bagiannya sudah terlihat
};

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Berikan perspektif 3D ke elemen induk dari target agar rotasinya nyata
            if(entry.target.parentNode) {
                entry.target.parentNode.style.perspective = "1200px";
            }

            // Animasikan elemen yang muncul menggunakan Anime.js dengan efek 3D
            anime({
                targets: entry.target,
                opacity: [0, 1],
                translateY: [80, 0],
                translateZ: [50, 0],
                rotateX: [35, 0], // Terbuka seperti pintu / flip 3D
                scale: [0.85, 1],
                easing: 'easeOutElastic(1, .8)', // Memantul elegan
                duration: 1400,
                delay: parseInt(entry.target.dataset.delay) || 0
            });
            
            // Stop observasi setelah elemen dianimasikan sekali
            observer.unobserve(entry.target);
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

// Mencari semua elemen yang memiliki kelas 'reveal'
const reveals = document.querySelectorAll(".reveal");

// Memberikan variasi delay berdasarkan urutan index agar jika muncul bersamaan tidak terlalu kaku
reveals.forEach((el, index) => {
    el.dataset.delay = (index % 3) * 150; 
    revealObserver.observe(el);
});