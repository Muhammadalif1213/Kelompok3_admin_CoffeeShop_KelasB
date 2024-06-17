function isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
  }

  // Fungsi untuk mengecek status login
  function checkLogin(event, redirectUrl) {
    if (!isLoggedIn()) {
      event.preventDefault();
      $('#registrasiModal').modal('show');
    } else if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }

  // Fungsi untuk logout
  function logout() {
    localStorage.removeItem('loggedIn');
    alert('Anda telah logout.');
    updateLoginStatus();
  }

  // Fungsi untuk mengupdate tampilan login/logout
  function updateLoginStatus() {
    if (isLoggedIn()) {
      document.getElementById('loginLink').style.display = 'none';
      document.getElementById('logoutLink').style.display = 'block';
    } else {
      document.getElementById('loginLink').style.display = 'block';
      document.getElementById('logoutLink').style.display = 'none';
    }
  }

  // Form submission event listener
  document.getElementById('registrasiForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Ambil nilai dari input username dan password
    var email = document.getElementById('registrasiEmail').value;
    var password = document.getElementById('registrasiPassword').value;

    // Cek kredensial login
    if (email === 'admin@mail.com' && password === '123456') {
      localStorage.setItem('loggedIn', 'true');
      $('#registrasiModal').modal('hide');
      alert('Login berhasil! Anda sekarang sudah login.');
      updateLoginStatus();
    } else {
      alert('Username atau password salah. Silakan coba lagi.');
    }
  });

  // Update status login saat halaman dimuat
  document.addEventListener('DOMContentLoaded', function() {
    updateLoginStatus();
  });