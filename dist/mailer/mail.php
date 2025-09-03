<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php';

// Load environment
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->isSMTP();
    $mail->Host       = $_ENV['SMTP_HOST'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $_ENV['SMTP_USERNAME'];
    $mail->Password   = $_ENV['SMTP_PASSWORD'];
    $mail->SMTPSecure = $_ENV['SMTP_ENCRYPTION'] ?? PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $_ENV['SMTP_PORT'];

    // **Safe SSL config** (verify_peer kept true by default)
    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer'       => true,
            'verify_peer_name'  => true,
            'allow_self_signed' => false
        ]
    ];

    //Recipients
    $mail->setFrom($_ENV['MAIL_FROM_EMAIL'], $_ENV['MAIL_FROM_NAME']);
    $mail->addAddress($_ENV['MAIL_TO_EMAIL'], $_ENV['MAIL_TO_NAME']);

    //Content
    $mail->isHTML(true);
    $mail->Subject = 'New Message from Restaurant Website';
    $mail->Body    = nl2br("Name: {$_POST['name']}\nEmail: {$_POST['email']}\nMessage: {$_POST['message']}");

    $mail->send();

    // ✅ Relative-path-safe redirect
    $base = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
    header("Location: {$base}/contact.html?status=success");
    exit;

} catch (Exception $e) {
    $base = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
    header("Location: {$base}/contact.html?status=error&message=" . urlencode($mail->ErrorInfo));
    exit;
}
