<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
   $inisial = htmlspecialchars($_POST['inisial']);
   $email = htmlspecialchars($_POST['email']);
   $kritik = htmlspecialchars($_POST['kritik']);
   $saran = htmlspecialchars($_POST['saran']);

   // Contoh validasi server-side sederhana
   if (empty($inisial) || empty($email) || empty($kritik) || empty($saran)) {
      echo "Semua field harus diisi!";
   } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      echo "Format email tidak valid!";
   } else {
      // Misalnya, menyimpan ke file
      $file = fopen("../database/saran.txt", "a");
      fwrite($file, "Inisial: $inisial\nEmail: $email\nKritik: $kritik\nSaran: $saran\n\n");
      fclose($file);

      echo "<script>
                alert('Terima kasih atas kritik dan sarannya!');
                window.location.href = '../index.html';
              </script>";
   }
}
?>