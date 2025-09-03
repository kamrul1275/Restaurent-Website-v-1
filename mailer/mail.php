<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require __DIR__ . '/../vendor/autoload.php';

// Load configuration
$config = require __DIR__ . '/config.php';

$mail = new PHPMailer(true);

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Retrieve and sanitize form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $message = htmlspecialchars(trim($_POST['message']));
    $website = isset($_POST['website']) ? htmlspecialchars(trim($_POST['website'])) : '';

    // Validate required fields
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        header('Location: /contact.html?status=error&message=Please fill out all required fields.');
        exit;
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header('Location: /contact.html?status=error&message=Please enter a valid email address.');
        exit;
    }

    // If honeypot field is filled, it's a bot
    if (!empty($website)) {
        header('Location: /contact.html?status=error&message=Bot detected!');
        exit;
    }

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = $config['host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $config['username'];
        $mail->Password   = $config['password'];
        
        // Set encryption based on config
        if (strtolower($config['encryption']) === 'ssl') {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        } else {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        }
        
        $mail->Port = $config['port'];

        // SSL options for better compatibility
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );

        // Recipients
        $mail->setFrom($config['from_email'], $config['from_name']);
        $mail->addAddress($config['to_email'], $config['to_name']);
        $mail->addReplyTo($email, $name);

        // Content
        $mail->isHTML(true);
        $mail->Subject = "New Contact Form Submission from " . $name;
        $mail->Body    = "
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
                <h2 style='color: #333; border-bottom: 2px solid #ff6b35; padding-bottom: 10px;'>
                    New Contact Form Submission
                </h2>
                <div style='background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;'>
                    <p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>
                    <p><strong>Email:</strong> <a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></p>
                    <p><strong>Phone:</strong> " . htmlspecialchars($phone) . "</p>
                    <p><strong>Message:</strong></p>
                    <div style='background-color: white; padding: 15px; border-left: 4px solid #ff6b35; margin-top: 10px;'>
                        " . nl2br(htmlspecialchars($message)) . "
                    </div>
                </div>
                <hr style='border: none; border-top: 1px solid #ddd; margin: 30px 0;'>
                <p style='color: #666; font-size: 12px;'>
                    This message was sent from your Hello Dine restaurant website contact form.<br>
                    Sent on: " . date('Y-m-d H:i:s') . "
                </p>
            </div>
        ";

        // Plain text version
        $mail->AltBody = "New Contact Form Submission\n\n" .
                        "Name: " . $name . "\n" .
                        "Email: " . $email . "\n" .
                        "Phone: " . $phone . "\n" .
                        "Message: " . $message . "\n\n" .
                        "Sent from Hello Dine website contact form.\n" .
                        "Date: " . date('Y-m-d H:i:s');

        // Send the email
        $mail->send();

        // Redirect to contact page with success message
        header('Location: /contact.html?status=success');
        exit;

    } catch (Exception $e) {
        // Log the actual error for debugging
        error_log("PHPMailer Error: " . $mail->ErrorInfo);

        // Redirect to contact page with error message
        header('Location: /contact.html?status=error&message=' . urlencode($mail->ErrorInfo));
        exit;
    }

} else {
    // Redirect to contact page if form is not submitted
    header('Location: /contact.html?status=error&message=Invalid form submission.');
    exit;
}
?>
