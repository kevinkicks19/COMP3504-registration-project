<?php
session_start();
if (isset($_SESSION['user_id'])) {
    // Redirect logged-in users to the appropriate dashboard
    $redirectPage = ($_SESSION['role'] === 'admin') ? 'admin-dashboard.php' : 'index.php';
    header("Location: $redirectPage");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MindVenture Login</title>
        <link rel="stylesheet" href="styles.css">
    </head>

    <body>
         <header>
        <h1>User Login</h1>
    </header>
         <header class="taskbar">
        <nav>
            <ul class="nav-links">
                <li><a href="index.php">Home</a></li>
                <li><a href="register.html">Register</a></li>
                <li><a href="user.html">Profile</a></li>
                <li><a href="logout.html">Logout</a></li>
            </ul>
        </nav>
    </header>
        <div class="log">
            <div class="">

                <div class="logo">
                    <h1>
                        <img src="Images/logo.png" alt="MindVenture Logo" >
                    </h1>
                </div>

                <h2>Diving into new subjects and learning journeys</h2>
                
                
                <!-- <form method="POST" action="/api/login" id="loginForm"> -->
                    <form id="loginForm">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required>

                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>

                    <div class="options"> 
                        <a href="###" class="forgot-password">Forgot password?</a>
                    </div>

                    <button type="submit" class="sign-in-button">Sign in</button>

                    <p class="signup"> Don't have an account? <a href="register.html">Sign up</a></p>
                </form>
                <div id="error-message" style="color: red; margin-top: 10px;"></div>
            </div>

        </div>
        <!-- <script src="login.js"></script> -->
        <script src="./tempFolder/newlogin.js"></script>
        <footer>
        <p>&copy; 2024 MindVenture Conference App</p>
    </footer>
    </body>

</html>
