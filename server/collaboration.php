<?php
function sanitize_input($data)
{
   return htmlspecialchars(trim($data));
}

function validate_required($field, $value, &$errors)
{
   if (empty($value)) {
      $errors[$field] = ucfirst($field) . " harus diisi!";
   }
}

function validate_select($field, $value, &$errors)
{
   if ($value == "-") {
      $errors[$field] = ucfirst($field) . " harus dipilih!";
   }
}

function validate_form($form_data)
{
   $errors = [];

   $fields_to_validate = [
      'nameEvent' => 'validate_required',
      'dateEvent' => 'validate_required',
      'eventCategory' => 'validate_required',
      'eventForm' => 'validate_select',
      'eventDescription' => 'validate_required'
   ];

   foreach ($form_data as $field => $value) {
      if (array_key_exists($field, $fields_to_validate)) {
         $validation_function = $fields_to_validate[$field];
         $validation_function($field, $value, $errors);
      }
   }

   return $errors;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   // Sanitize inputs
   $form_data = [];
   foreach ($_POST as $key => $value) {
      $form_data[$key] = sanitize_input($value);
   }

   // Validasi form
   $errors = validate_form($form_data);

   // Hapus input submit dari array form_data jika ada
   if (isset($form_data['submit'])) {
      unset($form_data['submit']);
   }

   // Tampilkan error jika validasi gagal
   if (!empty($errors)) {
      foreach ($errors as $error) {
         echo "<p style='color: red;'>$error</p>";
      }
   } else {

      $file = fopen("../database/collab.txt", "a");
      $file_content = "-Event Data-\n";
      foreach ($form_data as $field => $value) {
         $file_content .= ucfirst($field) . ": " . $value . "\n";
      }
      $file_content .= "\n";
      fwrite($file, $file_content);
      fclose($file);

      echo "<script>
               alert('Event berhasil disimpan!');
               window.location.href = '../collaboration.html';
            </script>";
   }
}
?>