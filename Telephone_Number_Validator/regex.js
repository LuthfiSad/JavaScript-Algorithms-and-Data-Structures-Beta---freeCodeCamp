document.getElementById('check-btn').addEventListener('click', function() {
  console.log('regex');
  const phoneNumber = document.getElementById('user-input').value.trim();

  if (phoneNumber === '') {
      alert('Please provide a phone number');
      return;
  }

  const regex = /^(1[-. ]?)?(\([2-9]\d{2}\)|[2-9]\d{2})[-. ]?[2-9]\d{2}[-. ]?\d{4}$/;
  if (regex.test(phoneNumber)) {
      document.getElementById('results-div').innerText = `Valid US number: ${phoneNumber}`;
  } else {
      document.getElementById('results-div').innerText = `Invalid US number: ${phoneNumber}`;
  }
});

document.getElementById('clear-btn').addEventListener('click', function() {
  document.getElementById('results-div').innerText = '';
});