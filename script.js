// Fetch data from local JSON
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const skillList = document.getElementById('skill-list');
    data.skills.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill;
      skillList.appendChild(li);
    });
  })
  .catch(error => console.log('Error loading data:', error));

// Form submission (demo)
document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  alert('Message sent successfully!');
});
