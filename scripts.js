// Timer Elements
const timerDisplay = document.getElementById('timerDisplay');
const startStudyButton = document.getElementById('startStudyButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const breakButtons = document.querySelectorAll('.break-button');
const body = document.body;

let timerInterval; // Variabel untuk interval timer
let remainingTime = 0; // Waktu tersisa dalam detik
let isBreak = false; // Apakah sedang break
let isTimerRunning = false; // Status apakah timer sedang berjalan

// Start Study Timer
startStudyButton.addEventListener('click', () => {
  const studyMinutes = document.getElementById('studyMinutes').value;
  if (studyMinutes > 0) {
    remainingTime = studyMinutes * 60; // Konversi menit ke detik
    startTimer(); // Mulai timer
    body.classList.add('timer-active'); // Tambahkan warna biru saat timer aktif
    body.classList.remove('timer-finished'); // Hapus warna merah jika ada
  } else {
    alert('Masukkan waktu belajar yang valid!');
  }
});

// Start Break Timer
breakButtons.forEach((button) => {
  button.addEventListener('click', () => {
    remainingTime = parseInt(button.getAttribute('data-time')) * 60; // Ambil waktu break
    startTimer(); // Mulai timer
    isBreak = true; // Tandai bahwa ini break
    body.classList.add('break-active'); // Tambahkan warna biru untuk break
    body.classList.remove('timer-finished'); // Hapus warna merah jika ada
  });
});

// Start Timer
function startTimer() {
  if (isTimerRunning) return; // Jika timer sudah berjalan, hentikan agar tidak double-start
  isTimerRunning = true; // Tandai bahwa timer sedang berjalan
  updatePauseButtonText(); // Perbarui teks tombol Pause/Start

  clearInterval(timerInterval); // Pastikan interval sebelumnya dihentikan
  timerInterval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--; // Kurangi waktu tersisa
      updateTimerDisplay(); // Perbarui tampilan waktu
    } else {
      clearInterval(timerInterval); // Hentikan interval jika waktu habis
      handleTimerEnd(); // Tangani ketika timer selesai
    }
  }, 1000); // Interval 1 detik
}

// Pause Timer
pauseButton.addEventListener('click', () => {
  if (isTimerRunning) {
    clearInterval(timerInterval); // Hentikan interval
    isTimerRunning = false; // Tandai timer sebagai dijeda
  } else {
    startTimer(); // Lanjutkan timer jika dijeda
  }
  updatePauseButtonText(); // Perbarui teks tombol Pause/Start
});

// Reset Timer
resetButton.addEventListener('click', () => {
  clearInterval(timerInterval); // Hentikan interval
  isTimerRunning = false; // Timer tidak berjalan lagi
  remainingTime = 0; // Set waktu tersisa ke 0
  timerDisplay.textContent = '00:00'; // Reset tampilan waktu
  body.classList.remove('timer-active', 'break-active', 'timer-finished'); // Hapus semua status warna
  updatePauseButtonText(); // Pastikan tombol kembali ke Pause
});

// Update Timer Display
function updateTimerDisplay() {
  const minutes = Math.floor(remainingTime / 60); // Hitung menit
  const seconds = remainingTime % 60; // Hitung detik
  timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Perbarui teks waktu
}

// Handle Timer End
function handleTimerEnd() {
  isTimerRunning = false; // Timer selesai
  updatePauseButtonText(); // Perbarui tombol Pause/Start
  body.classList.remove('timer-active', 'break-active'); // Hapus status biru
  body.classList.add('timer-finished'); // Tambahkan warna merah
  timerDisplay.textContent = 'Waktu Habis!'; // Tampilkan waktu habis
  alert(isBreak ? 'Waktu Istirahat Selesai!' : 'Waktu Belajar Selesai!'); // Notifikasi
  isBreak = false; // Reset status break
}

// Update Pause Button Text
function updatePauseButtonText() {
  pauseButton.textContent = isTimerRunning ? 'Pause' : 'Start'; // Ubah teks tombol
}
