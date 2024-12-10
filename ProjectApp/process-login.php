<?php
session_start();
require './database/dbconfig.php'; 

try {
    $pdo->query('SELECT 1');
    echo 'Database connection successful';
} catch (Exception $e) {
    error_log('Database connection failed: ' . $e->getMessage());
    echo json_encode(['error' => 'Database connection failed.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    try {
        // Check if the user is an Admin
        $adminStmt = $pdo->prepare("SELECT * FROM Admin WHERE Username = :username");
        $adminStmt->execute([':username' => $username]);
        $admin = $adminStmt->fetch();

        if ($admin && password_verify($password, $admin['Password'])) {
            $_SESSION['user_id'] = $admin['AdminID'];
            $_SESSION['username'] = $admin['Username'];
            $_SESSION['role'] = 'admin';

            // Respond with the admin dashboard redirection
            echo json_encode(['redirect' => 'admin-dashboard.php']);
            exit;
        }

        // Check if the user is a regular User
        $userStmt = $pdo->prepare("SELECT * FROM User WHERE username = :username");
        $userStmt->execute([':username' => $username]);
        $user = $userStmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['ID'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];

            // Respond with the user dashboard redirection
            echo json_encode(['redirect' => 'index.php']); // Redirect to the main page
            exit;
        }

        // Invalid credentials
        http_response_code(401);
        echo json_encode(['error' => 'Invalid username or password']);
        exit;

    } catch (Exception $e) {
        error_log($e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'An error occurred. Please try again.']);
        exit;
    }
}
?>
