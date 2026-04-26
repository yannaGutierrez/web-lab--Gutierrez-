// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255,255,255,0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.12)';
    } else {
        navbar.style.background = 'rgba(255,255,255,0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    }
});

// Contact form handler
document.getElementById('contactForm').addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target;
    const messageEl = document.getElementById('formMessage');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Show loading
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        const formData = new FormData(form);
        // Replace with your Cloudflare Worker URL when ready
        const response = await fetch('/', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            messageEl.textContent = '✅ Message sent! I\'ll reply within 24 hours.';
            messageEl.style.color = '#10b981';
            form.reset();
        }
    } catch (error) {
        messageEl.textContent = '❌ Something went wrong. Please try again.';
        messageEl.style.color = '#ef4444';
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});