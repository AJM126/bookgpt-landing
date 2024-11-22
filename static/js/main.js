// Typing animation
let text = "Let AI help you write your next bestseller...";
let index = 0;
let typingElement = document.querySelector('.typing-text');

function type() {
    if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100);
    } else {
        setTimeout(() => {
            typingElement.textContent = '';
            index = 0;
            type();
        }, 2000);
    }
}

// Start typing animation
if (typingElement) {
    type();
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Success popup functions
function showSuccessPopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.add('show');
    }
}

function closePopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.remove('show');
    }
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('waitlistForm');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('email');
            if (!emailInput) return;
            
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            try {
                const response = await fetch('/join-waitlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });
                
                if (response.ok) {
                    emailInput.value = '';
                    showSuccessPopup();
                } else {
                    const data = await response.json();
                    alert(data.error || 'Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Something went wrong. Please try again.');
            }
        });
    }
});
