// Define fees
const baseFees = {
    attendee: 50, // Base fee for Regular Attendee
    author: 100   // Base fee for Author
};

const extraFees = {
    paperUpload: 25 // Fee for uploading a paper
};

// DOM elements
const roleSelect = document.getElementById('role');
const paperUploadField = document.getElementById('paper-upload');
const feeDisplay = document.getElementById('total-fee');

// Update the fee display
function calculateFee() {
    let totalFee = 0;

    // Base fee based on role
    const selectedRole = roleSelect.value;
    totalFee += baseFees[selectedRole] || 0;

    // Extra fee for paper upload if Author
    if (selectedRole === 'author' && paperUploadField.value) {
        totalFee += extraFees.paperUpload;
    }

    // Update fee display
    feeDisplay.textContent = totalFee.toFixed(2);
}

// Toggle author fields based on role selection
function toggleAuthorFields() {
    const authorFields = document.getElementById('author-fields');
    if (roleSelect.value === 'author') {
        authorFields.style.display = 'block';
    } else {
        authorFields.style.display = 'none';
    }

    // Recalculate fee when role changes
    calculateFee();
}

// Attach event listeners
roleSelect.addEventListener('change', calculateFee);
paperUploadField.addEventListener('input', calculateFee);

// Initialize fee calculation on page load
document.addEventListener('DOMContentLoaded', () => {
    calculateFee();
    toggleAuthorFields();
});
