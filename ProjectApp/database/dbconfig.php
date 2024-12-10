<?php
// Database configuration
$host = '35.209.245.183';
$dbname = 'registration_system';
$username = 'root';
$password = 'zrVIC3e4kGCfYs'; 

// PDO connection
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Handle connection error
    die("Database connection failed: " . $e->getMessage());
}
?>
