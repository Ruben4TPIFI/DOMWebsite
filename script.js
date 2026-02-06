// Smooth scroll functionality
function smoothScroll(target) {
  const element = document.querySelector('#' + target);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Email capture and submission
function handleSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const email = form.querySelector('input[type="email"]').value;
  const button = form.querySelector('button[type="submit"]');
  
  // Validate email
  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address');
    return;
  }
  
  // Disable button during submission
  button.disabled = true;
  button.textContent = 'Sending...';
  
  // Send email to Formspree (free email capture service)
  // Visit https://formspree.io to set up your form
  fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email })
  })
  .then(response => {
    if (response.ok) {
      // Email captured successfully
      button.textContent = 'Downloading...';
      
      // Trigger PDF download
      const link = document.createElement('a');
      link.href = 'beginner-guide.pdf';
      link.download = 'DOM-Living-Beginners-Guide.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Success message
      setTimeout(() => {
        alert('Thank you! Your free guide is downloading. Check your email for the complete version.');
        form.reset();
        button.disabled = false;
        button.textContent = 'Download Free Guide';
      }, 1000);
    } else {
      throw new Error('Form submission failed');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error submitting form. Please try again.');
    button.disabled = false;
    button.textContent = 'Download Free Guide';
  });
}

// Animation on load
window.addEventListener('load', function() {
  const cards = document.querySelectorAll('.authority-card, .pillar-card, .program-card');
  cards.forEach((card, index) => {
    card.style.animationDelay = (index * 0.1) + 's';
  });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.animation = 'fadeUp 0.6s ease-out forwards';
      }
    });
  }, { threshold: 0.1 });
  
  cards.forEach(card => observer.observe(card));
});
