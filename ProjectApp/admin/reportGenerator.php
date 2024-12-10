<?php
require 'db_connect.php';

if ($_GET['type'] === 'registrations') {
    $stmt = $pdo->query("SELECT events.name AS event, COUNT(registrations.reg_id) AS total_registrations 
                         FROM registrations
                         JOIN events ON registrations.event_id = events.event_id
                         GROUP BY events.name");
} elseif ($_GET['type'] === 'fees') {
    $stmt = $pdo->query("SELECT events.name AS event, SUM(events.fee) AS total_fees 
                         FROM registrations
                         JOIN events ON registrations.event_id = events.event_id
                         GROUP BY events.name");
} elseif ($_GET['type'] === 'participation') {
    $stmt = $pdo->query("SELECT events.name AS event, COUNT(registrations.reg_id) AS participants 
                         FROM registrations
                         JOIN events ON registrations.event_id = events.event_id
                         GROUP BY events.name");
}
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>
