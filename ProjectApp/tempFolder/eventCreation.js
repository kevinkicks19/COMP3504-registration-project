import React from 'react';

// EventCard Component: Displays details of an event
const EventCard = ({
  name,
  location,
  date,
  startTime,
  endTime,
  description,
  registrationFee,
  maxCapacity,
  type,
}) => {
  return (
    <div style={styles.eventCard}>
      <h3 style={styles.name}>{name}</h3>
      <p>
        <strong>Location:</strong> {location}
      </p>
      <p>
        <strong>Date:</strong> {date}
      </p>
      <p>
        <strong>Time:</strong> {startTime} - {endTime}
      </p>
      <p>
        <strong>Description:</strong> {description || "No description provided"}
      </p>
      <p>
        <strong>Registration Fee:</strong> ${registrationFee.toFixed(2)}
      </p>
      <p>
        <strong>Max Capacity:</strong> {maxCapacity} attendees
      </p>
      <p>
        <strong>Type:</strong> {type.charAt(0).toUpperCase() + type.slice(1)}
      </p>
      <button style={styles.registerButton}>Register</button>
    </div>
  );
};

// EventList Component: Maps through events and renders EventCard for each
const EventList = ({ events }) => {
  return (
    <div style={styles.eventList}>
      {events.map((event, index) => (
        <EventCard
          key={index}
          name={event.name}
          location={event.location}
          date={event.date}
          startTime={event.startTime}
          endTime={event.endTime}
          description={event.description}
          registrationFee={event.registrationFee}
          maxCapacity={event.maxCapacity}
          type={event.type}
        />
      ))}
    </div>
  );
};

// Sample event data mimicking VENUE TABLE structure
const eventData = [
  {
    name: "Tech Conference 2024",
    location: "San Francisco, CA",
    date: "2024-12-10",
    startTime: "10:00 AM",
    endTime: "5:00 PM",
    description: "An exciting conference about the latest in tech.",
    registrationFee: 299.99,
    maxCapacity: 500,
    type: "conference",
  },
  {
    name: "Corporate Leadership Workshop",
    location: "New York, NY",
    date: "2024-12-15",
    startTime: "9:00 AM",
    endTime: "3:00 PM",
    description: "A workshop for aspiring leaders in the corporate world.",
    registrationFee: 149.99,
    maxCapacity: 300,
    type: "workshop",
  },
  {
    name: "Marketing Festival",
    location: "Los Angeles, CA",
    date: "2024-11-30",
    startTime: "12:00 PM",
    endTime: "8:00 PM",
    description: "Discover the latest trends in marketing at this festival.",
    registrationFee: 99.99,
    maxCapacity: 1000,
    type: "festival",
  },
];

// App Component: Main entry point for the application
const App = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Upcoming Events</h1>
      <EventList events={eventData} />
    </div>
  );
};

// Styles (for simplicity, inline CSS is used here)
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#f8f9fa",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  eventList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  eventCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  name: {
    color: "#007bff",
    marginBottom: "10px",
  },
  registerButton: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

// Export App Component
export default App;
