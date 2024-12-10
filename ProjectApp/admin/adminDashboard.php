<?php
session_start();
if (!isset($_SESSION['is_admin']) || !$_SESSION['is_admin']) {
    header('Location: login.html'); // Redirect non-admins to login page
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Portal - Event Registration</title>
  <style 
</head>
<body>
  <header>
    <h1>Admin Portal</h1>
    <p>Welcome, Admin! Manage your events and registrations here.</p>
    <link rel="stylesheet" href="styles/adminStyles.css">
  </header>

  <nav>
    <a href="#view-registrations">View Registrations</a>
    <a href="#manage-users">Manage Users</a>
    <a href="#add-events">Add Events</a>
  </nav>

  <main>
    <!-- View Registrations Section -->
    <section id="view-registrations" class="card">
      <h2>View Registrations</h2>
      <table>
        <thead>
          <tr>
            <th>Registration ID</th>
            <th>Event</th>
            <th>User</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Music Concert</td>
            <td>John Doe</td>
            <td>2024-12-01</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Tech Workshop</td>
            <td>Jane Smith</td>
            <td>2024-12-02</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Manage Users Section -->
    <section id="manage-users" class="card">
      <h2>Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>
              <a href="#" class="button">Edit</a>
              <a href="#" class="button" style="background-color: red;">Delete</a>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jane Smith</td>
            <td>jane@example.com</td>
            <td>
              <a href="#" class="button">Edit</a>
              <a href="#" class="button" style="background-color: red;">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Add Events Section -->
    <section id="add-events" class="card">
      <h2>Add Events</h2>
      <form>
        <div>
          <label for="event-name">Event Name:</label>
          <input type="text" id="event-name" name="event-name" required>
        </div>
        <div>
          <label for="event-date">Event Date:</label>
          <input type="date" id="event-date" name="event-date" required>
        </div>
        <div>
          <label for="event-description">Description:</label>
          <textarea id="event-description" name="event-description" rows="4" required></textarea>
        </div>
        <button type="submit" class="button">Add Event</button>
      </form>
    </section>
  </main>
</body>
</html>
