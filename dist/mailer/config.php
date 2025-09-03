<?php
// dist/mailer/config.php
// Simple configuration without Dotenv

return [
    'mailer' => 'smtp',
    'host' => 'sandbox.smtp.mailtrap.io',
    'port' => 2525,
    'username' => '527c7c2901f69e',
    'password' => 'ff0551fd9b0abb',
    'encryption' => 'tls',
    'from_email' => 'noreply@hellodine.com',
    'from_name' => 'Hello Dine Restaurant',
    'to_email' => 'restaurant@example.com',
    'to_name' => 'Restaurant Manager',
];