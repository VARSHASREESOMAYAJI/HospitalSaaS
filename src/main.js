import './style.css';

// --- State and Config ---
const state = {
  booking: {
    dept: null,
    doctor: null,
    date: null,
    time: null,
    name: null,
    lockedUntil: null
  },
  admin: {
    bookings: JSON.parse(localStorage.getItem('admin_bookings') || '[]'),
    orders: JSON.parse(localStorage.getItem('admin_orders') || '[]')
  }
};

const appEl = document.getElementById('app');
const generateId = () => Math.floor(100000 + Math.random() * 900000);

// --- Theme Toggle Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('ion-icon');

const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (theme === 'dark') {
    themeIcon.setAttribute('name', 'sunny-outline');
  } else {
    themeIcon.setAttribute('name', 'moon-outline');
  }
};

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
}

// --- Real-time Notification Simulator ---
const showIncomingMessage = (title, message, delay = 1500) => {
  setTimeout(() => {
    // Ensure container exists
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    // Create Toast
    const toast = document.createElement('div');
    toast.className = 'toast';

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    toast.innerHTML = `
      <div class="toast-icon">
        <ion-icon name="logo-whatsapp"></ion-icon>
      </div>
      <div class="toast-content" style="flex: 1;">
        <h4>
          ${title}
          <span class="toast-time">${timeString}</span>
        </h4>
        <p>${message}</p>
      </div>
    `;

    container.appendChild(toast);

    // Play sound (optional tiny beep using web audio API to make it feel real, or just visual)
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.type = 'sine';
    oscillator.frequency.value = 880; // A5
    gainNode.gain.setValueAtTime(0.1, context.currentTime);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.1);

    // Animate in
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    // Remove after 6 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400); // Wait for transition
    }, 6000);
  }, delay);
};

// --- Pages / Views ---
const renderHome = () => `
  <section class="hero section-padding">
    <div class="container hero-content">
      <h1>Advanced Skin, Hair & Laser Treatments in Anantapur</h1>
      <p style="font-size: 1.25rem; font-weight: 500; color: var(--primary-blue);">Expert Dermatology & Psychiatric Care Under One Roof</p>
      
      <div class="hero-buttons">
        <a href="/book-appointment" class="btn btn-primary router-link">
          <ion-icon name="calendar-outline"></ion-icon> Book Appointment
        </a>
        <a href="https://wa.me/919100803079" target="_blank" class="btn btn-secondary">
          <ion-icon name="logo-whatsapp"></ion-icon> WhatsApp Now
        </a>
      </div>

      <div class="trust-badges">
        <div class="badge"><ion-icon name="star"></ion-icon> 4.2+ Rating</div>
        <div class="badge"><ion-icon name="flash"></ion-icon> Advanced Laser Technology</div>
        <div class="badge"><ion-icon name="medical"></ion-icon> Experienced Specialists</div>
      </div>
    </div>
  </section>

  <!-- About Short Intro -->
  <section class="section-padding" style="background-color: var(--bg-light);">
    <div class="container text-center">
      <h2>About Shine Hospital</h2>
      <p style="max-width: 800px; margin: 0 auto;">Shine Hospital is Anantapur's premier destination for advanced dermatological and psychiatric care. We combine state-of-the-art laser technology with compassionate expertise to deliver world-class treatments.</p>
    </div>
  </section>

  <!-- Doctor Highlights -->
  <section class="section-padding">
    <div class="container">
      <h2 class="text-center mb-4">Our Specialists</h2>
      <div class="doctors-grid">
        <div class="card text-center">
          <div style="font-size:4rem; color:var(--primary-blue); margin-bottom:1rem;"><ion-icon name="person-circle-outline"></ion-icon></div>
          <h3>Dr. Senior Dermatologist</h3>
          <p>MBBS, MD (Dermatology)</p>
          <p>10+ Years Experience in Laser & Aesthetics</p>
        </div>
        <div class="card text-center">
          <div style="font-size:4rem; color:var(--primary-yellow); margin-bottom:1rem;"><ion-icon name="person-circle-outline"></ion-icon></div>
          <h3>Dr. Expert Psychiatrist</h3>
          <p>MBBS, MD (Psychiatry)</p>
          <p>Compassionate care for mental wellness</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Grid -->
  <section class="section-padding" style="background-color: var(--bg-light);">
    <div class="container">
      <h2 class="text-center mb-4">Our Services</h2>
      <div class="services-grid">
        <div class="card text-center">
          <ion-icon name="color-wand-outline" class="card-icon"></ion-icon>
          <h3>Laser Hair Removal</h3>
          <p>Painless and permanent hair reduction using advanced lasers.</p>
        </div>
        <div class="card text-center">
          <ion-icon name="sparkles-outline" class="card-icon"></ion-icon>
          <h3>Acne Treatment</h3>
          <p>Comprehensive care for clear, glowing skin.</p>
        </div>
        <div class="card text-center">
          <ion-icon name="leaf-outline" class="card-icon"></ion-icon>
          <h3>Hair Fall Treatment</h3>
          <p>PRP therapies and medical management for hair growth.</p>
        </div>
        <div class="card text-center">
          <ion-icon name="rose-outline" class="card-icon"></ion-icon>
          <h3>Skin Rejuvenation</h3>
          <p>Anti-aging and pigmentation solutions.</p>
        </div>
        <div class="card text-center">
          <ion-icon name="medical-outline" class="card-icon"></ion-icon>
          <h3>Clinical Dermatology</h3>
          <p>Treatment for vitiligo, psoriasis, and skin infections.</p>
        </div>
        <div class="card text-center">
          <ion-icon name="headset-outline" class="card-icon"></ion-icon>
          <h3>Psychiatric Care</h3>
          <p>Counseling and treatment for anxiety, depression, and more.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Before & After Preview -->
  <section class="section-padding">
    <div class="container text-center">
      <h2 class="mb-4">Real Results. Real Patients.</h2>
      <div class="services-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
        <div class="card" style="padding: 0; overflow: hidden;">
          <div style="background:var(--border-color); height: 200px; display:flex; align-items:center; justify-content:center; font-weight:bold; color:var(--text-muted);">[Before & After Photo Placeholder]</div>
          <div style="padding: 1.5rem;">
            <h3>Acne Scar Treatment</h3>
            <p>Significant reduction in scars after 4 laser sessions.</p>
          </div>
        </div>
        <div class="card" style="padding: 0; overflow: hidden;">
          <div style="background:var(--border-color); height: 200px; display:flex; align-items:center; justify-content:center; font-weight:bold; color:var(--text-muted);">[Before & After Photo Placeholder]</div>
          <div style="padding: 1.5rem;">
            <h3>Hair Restoration (PRP)</h3>
            <p>Visible new growth in 3 months of treatment.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="section-padding" style="background-color: var(--primary-blue); color: var(--bg-white);">
    <div class="container text-center">
      <h2 style="color: var(--primary-yellow);" class="mb-4">What Our Patients Say</h2>
      <div class="services-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
        <div class="card" style="background: rgba(255,255,255,0.1); border:none; color:var(--bg-white);">
          <div style="color:var(--primary-yellow); font-size:1.5rem; margin-bottom:1rem;"><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon></div>
          <p>"The best laser clinic in Anantapur. The staff is professional and the dermatologist explained everything clearly. Highly recommend!"</p>
          <strong style="display:block; margin-top:1rem; color:var(--primary-yellow);">- Ramesh K.</strong>
        </div>
        <div class="card" style="background: rgba(255,255,255,0.1); border:none; color:var(--bg-white);">
          <div style="color:var(--primary-yellow); font-size:1.5rem; margin-bottom:1rem;"><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon></div>
          <p>"Amazing results for my hair fall issue. Felt very comfortable and the psychiatric counseling given helped me manage my stress effectively."</p>
          <strong style="display:block; margin-top:1rem; color:var(--primary-yellow);">- Sneha M.</strong>
        </div>
      </div>
    </div>
  </section>

  <!-- Google Map section -->
  <section class="section-padding" style="padding-bottom: 0;">
    <div class="container mb-4">
      <h2 class="text-center">Visit Our Clinic</h2>
      <p class="text-center">Ramnagar, Anantapur, Andhra Pradesh</p>
      <div style="width: 100%; height: 350px; background: var(--bg-light); border: 2px solid var(--border-color); border-radius: 12px; overflow:hidden; display:flex; margin-top: 2rem;">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.5855734208455!2d77.595912!3d14.6794559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb1412e8c2018dd%3A0xe5a28bf292a8326a!2sShine%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
      </div>
    </div>
  </section>

  <!-- Medicine Delivery Banner -->
  <section class="section-padding">
    <div class="container">
      <div class="banner">
        <div>
          <h2>Need Prescribed Medicines?</h2>
          <p style="color:var(--bg-white); font-size:1.1rem; opacity:0.9;">Get them delivered directly to your doorstep within Anantapur.</p>
        </div>
        <a href="/medicine-delivery" class="btn btn-primary router-link">Order Medicine</a>
      </div>
    </div>
  </section>

  <!-- CTA Strip -->
  <div style="background-color: var(--primary-yellow); padding: 3rem 0; text-align: center;">
    <h2 style="color: var(--primary-blue);">Ready to start your journey?</h2>
    <a href="/book-appointment" class="btn btn-secondary router-link mt-3" style="margin-top: 1rem;">Book an Appointment Today</a>
  </div>
`;

const renderAbout = () => `
  <section class="hero text-center" style="padding: 4rem 0; background-color: var(--primary-blue); color: var(--bg-white);">
    <div class="container">
      <h1 style="color: var(--primary-yellow);">About Shine Hospital</h1>
      <p style="font-size:1.2rem; max-width:600px; margin:0 auto; color: white;">Care with Compassion & Cure with Passion</p>
    </div>
  </section>

  <section class="section-padding">
    <div class="container" style="max-width: 900px;">
      <h2 class="mb-4">Who We Are</h2>
      <p style="font-size: 1.1rem; line-height: 1.8;">Shine Hospital is renowned for providing advanced-class medical services in Dermatology and Psychiatry. Located in the heart of Anantapur, we are dedicated to helping thousands of people achieve their healthiest skin, hair, and mental well-being. Your health is our most important asset.</p>
      <div class="services-grid mt-4" style="margin-top: 3rem;">
        <div class="card text-center">
          <ion-icon name="eye-outline" class="card-icon"></ion-icon>
          <h3>Our Vision</h3>
          <p>To be the premier destination for advanced dermatological and psychiatric care, creating a community where everyone glows from the inside out.</p>
        </div>
        <div class="card text-center">
          <ion-icon name="heart-outline" class="card-icon"></ion-icon>
          <h3>Our Mission</h3>
          <p>Delivering state-of-the-art laser treatments and compassionate mental wellness services with integrity and personalized attention.</p>
        </div>
      </div>
    </div>
  </section>
`;

const renderDoctors = () => `
  <section class="hero text-center" style="padding: 4rem 0; background-color: var(--primary-blue); color: var(--bg-white);">
    <div class="container">
      <h1 style="color: var(--primary-yellow);">Our Compassionate Specialists</h1>
      <p style="font-size:1.2rem; max-width:600px; margin:0 auto; color: white;">Meet the experts dedicated to your care.</p>
    </div>
  </section>

  <section class="section-padding" style="background-color: var(--bg-light);">
    <div class="container">
      <div class="doctors-grid">
        <div class="card text-center" style="background: white; border-top: 5px solid var(--primary-blue);">
          <div style="font-size:5rem; color:var(--primary-blue);"><ion-icon name="person-circle-outline"></ion-icon></div>
          <h3>Dr. Shivarama Krishna Avula</h3>
          <h4 style="color: var(--primary-yellow); margin-bottom: 1rem;">Senior Dermatologist</h4>
          <p>MBBS, MD (Dermatology)</p>
          <p>Specialized in advanced laser technology, acne scar reduction, and hair restoration therapies.</p>
          <a href="/book-appointment" class="btn btn-secondary mt-3 router-link" style="margin-top: 1rem;">Book Now</a>
        </div>
        <div class="card text-center" style="background: white; border-top: 5px solid var(--primary-yellow);">
          <div style="font-size:5rem; color:var(--primary-yellow);"><ion-icon name="person-circle-outline"></ion-icon></div>
          <h3>Dr. Harshitha Rao</h3>
          <h4 style="color: var(--primary-blue); margin-bottom: 1rem;">Senior Psychiatrist</h4>
          <p>MBBS, MD (Psychiatry)</p>
          <p>Expert in cognitive behavioral therapy, anxiety management, and comprehensive mental wellness counseling.</p>
          <a href="/book-appointment" class="btn btn-secondary mt-3 router-link" style="margin-top: 1rem;">Book Now</a>
        </div>
      </div>
    </div>
  </section>
`;

const renderServices = () => `
  <section class="hero text-center" style="padding: 4rem 0; background-color: var(--primary-blue); color: var(--bg-white);">
    <div class="container">
      <h1 style="color: var(--primary-yellow);">Our Advanced Services</h1>
      <p style="font-size:1.2rem; max-width:600px; margin:0 auto; color: white;">Comprehensive solutions for your skin, hair, and mind.</p>
    </div>
  </section>

  <section class="section-padding">
    <div class="container">
      <h2 class="text-center mb-4" style="color: var(--primary-blue);">Dermatology & Cosmetology</h2>
      <div class="services-grid mb-4">
        <div class="card text-center">
          <ion-icon name="color-wand-outline" class="card-icon"></ion-icon>
          <h3>Laser Hair Removal</h3>
          <p>Painless and permanent hair reduction using advanced lasers.</p>
        </div>
        <div class="card text-center">
          <ion-icon name="sparkles-outline" class="card-icon"></ion-icon>
          <h3>Acne Treatment</h3>
          <p>Comprehensive care for clear, glowing skin.</p>
        </div>
        <div class="card text-center">
          <ion-icon name="leaf-outline" class="card-icon"></ion-icon>
          <h3>Hair Fall Treatment</h3>
          <p>PRP therapies and medical management for hair growth.</p>
        </div>
      </div>

      <h2 class="text-center mb-4" style="margin-top: 4rem; color: var(--primary-yellow);">Psychiatry & Wellness</h2>
      <div class="services-grid">
        <div class="card text-center" style="border-color: var(--primary-yellow);">
          <ion-icon name="headset-outline" class="card-icon" style="color: var(--primary-yellow);"></ion-icon>
          <h3>Mental Wellness Counseling</h3>
          <p>Counseling and treatment for anxiety, depression, and stress management.</p>
        </div>
        <div class="card text-center" style="border-color: var(--primary-yellow);">
          <ion-icon name="fitness-outline" class="card-icon" style="color: var(--primary-yellow);"></ion-icon>
          <h3>Behavioral Therapy</h3>
          <p>Targeted treatments to help build positive habits and coping mechanisms.</p>
        </div>
      </div>
    </div>
  </section>
`;

const renderContact = () => `
  <section class="hero text-center" style="padding: 4rem 0; background-color: var(--primary-blue); color: var(--bg-white);">
    <div class="container">
      <h1 style="color: var(--primary-yellow);">Contact Shine Hospital</h1>
      <p style="font-size:1.2rem; max-width:600px; margin:0 auto; color: white;">We're here to help you shine.</p>
    </div>
  </section>

  <section class="section-padding" style="background-color: var(--bg-light);">
    <div class="container">
      <div class="services-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
        
        <!-- Address & Info -->
        <div class="card">
          <h2 style="margin-bottom: 2rem;">Get in Touch</h2>
          
          <div style="display: flex; gap: 15px; margin-bottom: 1.5rem;">
            <ion-icon name="location" style="font-size: 2rem; color: var(--primary-blue);"></ion-icon>
            <div>
              <h4 style="margin-bottom: 5px; color: var(--primary-blue);">Head Office</h4>
              <p>Ramnagar, Anantapur, Andhra Pradesh, India</p>
            </div>
          </div>
          
          <div style="display: flex; gap: 15px; margin-bottom: 1.5rem;">
            <ion-icon name="call" style="font-size: 2rem; color: var(--primary-blue);"></ion-icon>
            <div>
              <h4 style="margin-bottom: 5px; color: var(--primary-blue);">Make a Call</h4>
              <p>08554-236466<br/>+91 9100803079</p>
            </div>
          </div>
          
          <div style="display: flex; gap: 15px;">
            <ion-icon name="mail" style="font-size: 2rem; color: var(--primary-blue);"></ion-icon>
            <div>
              <h4 style="margin-bottom: 5px; color: var(--primary-blue);">Email Us</h4>
              <p>info@shinehospital.com</p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="card" style="background: white;">
          <h2>Send a Message</h2>
          <form style="margin-top: 1.5rem;" onsubmit="event.preventDefault(); alert('Message Sent Successfully!'); this.reset();">
            <div class="form-group">
              <label class="form-label">Name</label>
              <input type="text" class="form-control" required placeholder="Your Name" />
            </div>
            <div class="form-group">
              <label class="form-label">Phone</label>
              <input type="tel" class="form-control" required placeholder="Phone Number" />
            </div>
            <div class="form-group">
              <label class="form-label">Message</label>
              <textarea class="form-control" required rows="4" placeholder="How can we help you?"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Submit Message</button>
          </form>
        </div>

      </div>
    </div>
  </section>
  
  <section class="section-padding" style="padding-bottom: 0;">
    <div style="width: 100%; height: 400px; background: #eee;">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.5855734208455!2d77.595912!3d14.6794559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb1412e8c2018dd%3A0xe5a28bf292a8326a!2sShine%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
    </div>
  </section>
`;

const renderBookAppointment = () => `
  <section class="section-padding">
    <div class="container" style="max-width: 800px;">
      <h1 class="text-center">Book Appointment</h1>
      <p class="text-center mb-4">Schedule your visit with our specialists.</p>
      
      <div class="card">
        <div class="stepper" id="booking-stepper">
          <div class="step active" data-step="1">
            <div class="step-number">1</div>
            <div class="step-label">Department</div>
          </div>
          <div class="step" data-step="2">
            <div class="step-number">2</div>
            <div class="step-label">Doctor</div>
          </div>
          <div class="step" data-step="3">
            <div class="step-number">3</div>
            <div class="step-label">Date & Time</div>
          </div>
          <div class="step" data-step="4">
            <div class="step-number">4</div>
            <div class="step-label">Details</div>
          </div>
          <div class="step" data-step="5">
            <div class="step-number">5</div>
            <div class="step-label">Payment</div>
          </div>
        </div>

        <div id="booking-step-content"></div>
      </div>
    </div>
  </section>
`;

const renderMedicineDelivery = () => `
  <section class="hero text-center" style="padding: 4rem 0;">
    <div class="container">
      <div style="font-size:4rem; color:var(--primary-blue); margin-bottom:1rem;"><ion-icon name="bicycle-outline"></ion-icon></div>
      <h1>Get Prescribed Medicines Delivered to Your Doorstep</h1>
      <p style="font-size:1.2rem; max-width:600px; margin:0 auto;">Fast, reliable, and hassle-free medicine delivery across Anantapur.</p>
    </div>
  </section>

  <section class="section-padding" style="background-color: var(--bg-light);">
    <div class="container">
      <h2 class="text-center mb-4">How It Works</h2>
      <div class="steps-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); text-align:center;">
        <div>
          <ion-icon name="document-text-outline" style="font-size:3rem; color:var(--primary-yellow);"></ion-icon>
          <h3 style="margin:1rem 0;">1. Upload Prescription</h3>
          <p>Send a clear photo of your prescription.</p>
        </div>
        <div>
          <ion-icon name="checkmark-circle-outline" style="font-size:3rem; color:var(--primary-yellow);"></ion-icon>
          <h3 style="margin:1rem 0;">2. Confirmation</h3>
          <p>We verify and confirm your order.</p>
        </div>
        <div>
          <ion-icon name="bicycle-outline" style="font-size:3rem; color:var(--primary-yellow);"></ion-icon>
          <h3 style="margin:1rem 0;">3. Dispatch</h3>
          <p>Medicines packed and dispatched fast.</p>
        </div>
        <div>
          <ion-icon name="home-outline" style="font-size:3rem; color:var(--primary-yellow);"></ion-icon>
          <h3 style="margin:1rem 0;">4. Delivery</h3>
          <p>Receive at your doorstep and pay.</p>
        </div>
      </div>

      <!-- Info grids for delivery details -->
      <div class="services-grid" style="margin-top: 4rem;">
        <div class="card text-center">
          <ion-icon name="location-outline" style="font-size:2.5rem; color:var(--primary-blue); margin-bottom:1rem;"></ion-icon>
          <h3>Delivery Areas</h3>
          <p>All residential and commercial areas within Anantapur city limits.</p>
        </div>
        <div class="card text-center">
          <ion-icon name="time-outline" style="font-size:2.5rem; color:var(--primary-blue); margin-bottom:1rem;"></ion-icon>
          <h3>Timings</h3>
          <p>Orders placed before 2 PM are delivered the same day. Later orders will arrive next morning.</p>
        </div>
        <div class="card text-center">
          <ion-icon name="cash-outline" style="font-size:2.5rem; color:var(--primary-blue); margin-bottom:1rem;"></ion-icon>
          <h3>Charges</h3>
          <p>Free delivery for orders above ₹500. Flat ₹50 delivery fee for smaller orders.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section-padding">
    <div class="container" style="max-width: 600px;">
      <div class="card">
        <h2 class="text-center">Order Now</h2>
        <form id="delivery-form">
          <div class="form-group">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" required placeholder="Full Name" />
          </div>
          <div class="form-group">
            <label class="form-label">Phone</label>
            <input type="tel" class="form-control" required placeholder="10-digit Mobile Number" />
          </div>
          <div class="form-group">
            <label class="form-label">Delivery Address</label>
            <textarea class="form-control" required rows="3" placeholder="Full address in Anantapur"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Upload Prescription</label>
            <input type="file" class="form-control" required />
          </div>
          <div class="form-group">
            <label class="form-label">Notes (Optional)</label>
            <textarea class="form-control" rows="2" placeholder="Any specific instructions?"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%; font-size:1.1rem;">
            <ion-icon name="logo-whatsapp"></ion-icon> Order via WhatsApp
          </button>
        </form>
      </div>
    </div>
  </section>
`;

// --- Logic ---
const updateBookingStepper = (stepNo) => {
  document.querySelectorAll('.step').forEach(el => {
    if (parseInt(el.dataset.step) <= stepNo) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
};

const initBookingStep1 = () => {
  updateBookingStepper(1);
  const content = document.getElementById('booking-step-content');
  content.innerHTML = `
    <h3>Choose Department</h3>
    <div class="services-grid" style="grid-template-columns: 1fr 1fr; margin-top:1.5rem;">
      <div class="card text-center" style="cursor:pointer;" onclick="window.selectDept('Dermatology')">
        <ion-icon name="color-wand-outline" style="font-size:2.5rem; color:var(--primary-blue);"></ion-icon>
        <h4 style="margin-top:10px;">Dermatology</h4>
      </div>
      <div class="card text-center" style="cursor:pointer;" onclick="window.selectDept('Psychiatry')">
        <ion-icon name="headset-outline" style="font-size:2.5rem; color:var(--primary-blue);"></ion-icon>
        <h4 style="margin-top:10px;">Psychiatry</h4>
      </div>
    </div>
  `;
};

window.selectDept = (dept) => {
  state.booking.dept = dept;
  initBookingStep2();
};

const initBookingStep2 = () => {
  updateBookingStepper(2);
  const content = document.getElementById('booking-step-content');
  const doctorName = state.booking.dept === 'Dermatology' ? 'Dr. Shivarama Krishna Avula (Dermatologist)' : 'Dr. Harshitha Rao (Psychiatrist)';
  content.innerHTML = `
    <h3>Choose Doctor</h3>
    <p>Available doctors for ${state.booking.dept}</p>
    <div class="services-grid" style="grid-template-columns: 1fr; margin-top:1.5rem;">
      <div class="card" style="cursor:pointer; display:flex; align-items:center; gap:20px;" onclick="window.selectDoctor('${doctorName}')">
        <ion-icon name="person-circle-outline" style="font-size:4rem; color:var(--primary-yellow);"></ion-icon>
        <div>
          <h4>${doctorName}</h4>
          <p style="margin:0;">Senior Consultant</p>
        </div>
      </div>
    </div>
    <button class="btn btn-secondary mt-3" style="margin-top:1.5rem;" onclick="window.initBookingStep1()">Back</button>
  `;
};

window.selectDoctor = (doc) => {
  state.booking.doctor = doc;
  initBookingStep3();
};

window.initBookingStep1 = initBookingStep1;
window.initBookingStep2 = initBookingStep2;
window.initBookingStep3 = () => initBookingStep3();

const initBookingStep3 = () => {
  updateBookingStepper(3);
  const content = document.getElementById('booking-step-content');

  // Dummy slots
  const slots = [
    { time: '10:00 AM', status: 'available' },
    { time: '10:30 AM', status: 'fast' },
    { time: '11:00 AM', status: 'full' },
    { time: '11:30 AM', status: 'available' },
    { time: '12:00 PM', status: 'fast' },
    { time: '04:00 PM', status: 'available' },
    { time: '04:30 PM', status: 'available' },
    { time: '05:00 PM', status: 'full' },
  ];

  let slotsHtml = slots.map(s => {
    let className = 'slot-btn ';
    if (s.status === 'available') className += 'slot-available';
    if (s.status === 'fast') className += 'slot-fast';
    if (s.status === 'full') className += 'slot-full';

    const onclick = s.status !== 'full' ? `onclick="window.selectTime('${s.time}', this)"` : '';
    return `<button class="${className}" ${s.status === 'full' ? 'disabled' : ''} ${onclick}>${s.time}</button>`;
  }).join('');

  content.innerHTML = `
    <div class="alert alert-info hidden" id="lock-alert">
      <ion-icon name="time-outline"></ion-icon> Slot locked for 5 minutes. Please complete booking!
    </div>
    
    <h3>Choose Date & Time Slot</h3>
    <div class="form-group" style="margin-top:1rem;">
      <input type="date" class="form-control" value="2026-03-04" />
    </div>
    
    <div style="display:flex; gap:15px; font-size:0.8rem; margin:1rem 0; font-weight:600;">
      <span style="color:var(--success);"><ion-icon name="square"></ion-icon> Available</span>
      <span style="color:var(--warning);"><ion-icon name="square"></ion-icon> Filling Fast</span>
      <span style="color:var(--text-muted);"><ion-icon name="square"></ion-icon> Full</span>
    </div>

    <div class="slot-grid">
      ${slotsHtml}
    </div>

    <div style="margin-top:2rem; display:flex; justify-content:space-between;">
      <button class="btn btn-secondary" onclick="window.initBookingStep2()">Back</button>
      <button class="btn btn-primary" id="btn-next-step" disabled onclick="window.initBookingStep4()">Next Step</button>
    </div>
  `;
};

window.selectTime = (time, btnEl) => {
  state.booking.time = time;
  document.querySelectorAll('.slot-btn').forEach(b => {
    b.classList.remove('slot-selected');
    b.style.backgroundColor = '';
    b.style.color = '';
  });

  if (btnEl.classList.contains('slot-available')) {
    btnEl.style.backgroundColor = 'var(--success)';
  } else {
    btnEl.style.backgroundColor = 'var(--warning)';
  }
  btnEl.style.color = 'white';
  btnEl.classList.add('slot-selected');

  document.getElementById('lock-alert').classList.remove('hidden');
  document.getElementById('btn-next-step').disabled = false;
};

window.initBookingStep4 = () => {
  updateBookingStepper(4);
  const content = document.getElementById('booking-step-content');

  content.innerHTML = `
    <h3>Patient Details</h3>
    <div class="alert alert-info" style="margin-top:1rem;">
      Booking <strong>${state.booking.doctor}</strong> at <strong>${state.booking.time}</strong>
    </div>

    <form id="booking-form" style="margin-top:1.5rem;">
      <div class="form-group">
        <label class="form-label">Full Name</label>
        <input type="text" id="bf-name" class="form-control" required />
      </div>
      <div class="form-group">
        <label class="form-label">Phone Number</label>
        <input type="tel" id="bf-phone" class="form-control" required />
      </div>
      <div class="form-group">
        <label class="form-label">Email (Optional)</label>
        <input type="email" id="bf-email" class="form-control" />
      </div>
      <div class="form-group">
        <label class="form-label">Reason for visit</label>
        <input type="text" id="bf-reason" class="form-control" required />
      </div>
      <div class="form-group">
        <label class="form-label">Notes (Optional)</label>
        <textarea id="bf-notes" class="form-control" rows="2"></textarea>
      </div>
      <div style="margin-top:2rem; display:flex; justify-content:space-between;">
        <button type="button" class="btn btn-secondary" onclick="window.initBookingStep3()">Back</button>
        <button type="submit" class="btn btn-primary">Proceed to Payment</button>
      </div>
    </form>
  `;

  document.getElementById('booking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    state.booking.name = document.getElementById('bf-name').value;
    window.initBookingStep5();
  });
};

window.initBookingStep5 = () => {
  updateBookingStepper(5);
  const content = document.getElementById('booking-step-content');

  content.innerHTML = `
    <h3>Secure Payment</h3>
    <div class="alert alert-info" style="margin-top:1rem;">
      Consultation Fee for <strong>${state.booking.doctor}</strong>: <strong>₹500</strong>
    </div>

    <div class="services-grid" style="grid-template-columns: 1fr; gap: 1rem; margin-top: 1.5rem;">
      <div class="card" style="border-color: var(--primary-blue); background-color: var(--bg-light); text-align: center;">
        <h4 style="margin-bottom: 1rem; color: var(--primary-blue);">Select Payment Option</h4>
        
        <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px; margin: 0 auto;">
          <button class="btn btn-primary" style="width: 100%; display: flex; justify-content: center; gap: 10px;" id="btn-pay-upi">
            <ion-icon name="qr-code-outline"></ion-icon> Pay via UPI / QR Checkout
          </button>
          
          <button class="btn btn-secondary" style="width: 100%; display: flex; justify-content: center; gap: 10px;" id="btn-pay-card">
            <ion-icon name="card-outline"></ion-icon> Pay via Credit/Debit Card
          </button>
        </div>
      </div>
    </div>
    
    <div style="margin-top:2rem; display:flex; justify-content:space-between;">
      <button class="btn btn-secondary" onclick="window.initBookingStep4()">Back to Details</button>
    </div>
  `;

  const processPayment = () => {
    content.innerHTML = `
      <div class="text-center" style="padding: 4rem 0;">
        <ion-icon name="sync-outline" style="font-size: 5rem; color: var(--primary-blue);" class="spin-anim"></ion-icon>
        <h2 style="margin-top: 1rem; color: var(--primary-blue);">Processing Secure Payment...</h2>
        <p style="font-size: 1.1rem; color: var(--text-muted);">Please do not refresh or close this window while we verify the transaction.</p>
      </div>
      <style>
        .spin-anim { animation: spin 2s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      </style>
    `;

    setTimeout(() => {
      completeBooking();
    }, 2500);
  };

  document.getElementById('btn-pay-upi').addEventListener('click', processPayment);
  document.getElementById('btn-pay-card').addEventListener('click', processPayment);
};

const completeBooking = () => {
  const content = document.getElementById('booking-step-content');
  const bookingId = 'SH' + generateId();

  // Save to Admin panel
  const dateInput = document.querySelector('input[type="date"]');
  const dateVal = dateInput ? dateInput.value : new Date().toISOString().split('T')[0];
  state.admin.bookings.unshift({
    id: bookingId,
    name: state.booking.name,
    doctor: state.booking.doctor,
    date: dateVal,
    time: state.booking.time,
    status: 'Confirmed',
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('admin_bookings', JSON.stringify(state.admin.bookings));

  content.innerHTML = `
    <div class="text-center" style="padding: 2rem 0;">
      <ion-icon name="checkmark-circle" style="font-size: 5rem; color: var(--success);"></ion-icon>
      <h2 style="color: var(--success); margin-top:1rem;">Payment Successful!</h2>
      <p style="font-size: 1.2rem; margin-bottom:0.5rem;">Booking ID: <strong>${bookingId}</strong></p>
      <p>Thank you, ${state.booking.name}. Your appointment with ${state.booking.doctor} at ${state.booking.time} is scheduled.</p>
      
      <div style="margin-top: 2rem;">
        <p style="color: var(--text-muted); font-size: 0.9rem;">
           <ion-icon name="checkmark-done-outline" style="color: #34B7F1; font-size: 1.2rem; vertical-align: middle;"></ion-icon> 
           Secured & Verified. Please check your messages momentarily.
        </p>
      </div>
    </div>
  `;

  // Simulate real-time incoming automated message from the Hospital
  showIncomingMessage(
    "Shine Hospital Team",
    `Hi ${state.booking.name}, your payment of ₹500 is received! Appointment with ${state.booking.doctor} at ${state.booking.time} is CONFIRMED. Ref: ${bookingId}.`,
    1500
  );
};

const handleDeliverySubmit = () => {
  const form = document.getElementById('delivery-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const orderId = 'MD' + generateId();
      const name = form.querySelector('input[type="text"]').value;
      const phoneInput = form.querySelector('input[type="tel"]');
      const addressInput = form.querySelector('textarea');

      // Save to Admin panel
      state.admin.orders.unshift({
        id: orderId,
        name: name,
        phone: phoneInput ? phoneInput.value : '',
        address: addressInput ? addressInput.value : '',
        status: 'Processing',
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('admin_orders', JSON.stringify(state.admin.orders));

      // Clear the form instantly
      form.innerHTML = `
        <div class="text-center" style="padding: 2rem 0;">
          <ion-icon name="checkmark-circle" style="font-size: 5rem; color: var(--success);"></ion-icon>
          <h2 style="color: var(--success); margin-top:1rem;">Order Received!</h2>
          <p>Order Reference: <strong>${orderId}</strong></p>
        </div>
      `;

      // Simulate real-time incoming automated message
      showIncomingMessage(
        "Shine Pharmacy",
        `Hello ${name}, we have received your prescription for Order ${orderId}. Our pharmacist is verifying it. It will be dispatched shortly!`,
        2000
      );
    });
  }
};

// --- Admin Views & Logic ---
const renderAdmin = () => `
  <section class="hero text-center" style="padding: 4rem 0; background-color: var(--primary-blue); color: var(--bg-white);">
    <div class="container">
      <h1 style="color: var(--primary-yellow);">Admin Dashboard</h1>
      <p style="font-size:1.2rem; margin:0 auto; color: white;">Manage Bookings and Orders</p>
    </div>
  </section>

  <section class="section-padding" style="background-color: var(--bg-light); min-height: 60vh;">
    <div class="container">
      
      <div class="card" style="margin-bottom: 2rem; overflow-x: auto;">
        <h2 style="color: var(--primary-blue); margin-bottom: 1rem;">Recent Appointments</h2>
        <table style="width: 100%; border-collapse: collapse; min-width: 600px;">
          <thead>
            <tr style="border-bottom: 2px solid var(--border-color); text-align: left;">
              <th style="padding: 12px;">ID</th>
              <th style="padding: 12px;">Patient</th>
              <th style="padding: 12px;">Doctor</th>
              <th style="padding: 12px;">Schedule</th>
              <th style="padding: 12px;">Status</th>
              <th style="padding: 12px;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${state.admin.bookings.length ? state.admin.bookings.map((b, i) => `
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: 500;">${b.id}</td>
                <td style="padding: 12px;">${b.name}</td>
                <td style="padding: 12px;">${b.doctor}</td>
                <td style="padding: 12px;">${b.date} &bull; ${b.time}</td>
                <td style="padding: 12px;"><span style="color: ${b.status === 'Completed' ? 'var(--success)' : 'var(--primary-blue)'}">${b.status}</span></td>
                <td style="padding: 12px;">
                  ${b.status !== 'Completed' ? `<button class="btn btn-secondary" style="padding: 5px 10px; font-size: 0.8rem;" onclick="window.markBookingCompleted(${i})">Mark Done</button>` : ''}
                </td>
              </tr>
            `).join('') : '<tr><td colspan="6" style="padding: 20px; text-align: center; color: var(--text-muted);">No bookings yet</td></tr>'}
          </tbody>
        </table>
      </div>

      <div class="card" style="overflow-x: auto;">
        <h2 style="color: var(--primary-blue); margin-bottom: 1rem;">Medicine Orders</h2>
        <table style="width: 100%; border-collapse: collapse; min-width: 600px;">
          <thead>
            <tr style="border-bottom: 2px solid var(--border-color); text-align: left;">
              <th style="padding: 12px;">Order ID</th>
              <th style="padding: 12px;">Patient</th>
              <th style="padding: 12px;">Contact</th>
              <th style="padding: 12px;">Address</th>
              <th style="padding: 12px;">Status</th>
              <th style="padding: 12px;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${state.admin.orders.length ? state.admin.orders.map((o, i) => `
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 12px; font-weight: 500;">${o.id}</td>
                <td style="padding: 12px;">${o.name}</td>
                <td style="padding: 12px;">${o.phone}</td>
                <td style="padding: 12px; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${o.address}">${o.address}</td>
                <td style="padding: 12px;"><span style="color: ${o.status === 'Dispatched' ? 'var(--success)' : 'var(--warning)'}">${o.status}</span></td>
                <td style="padding: 12px;">
                  ${o.status !== 'Dispatched' ? `<button class="btn btn-secondary" style="padding: 5px 10px; font-size: 0.8rem;" onclick="window.markOrderDispatched(${i})">Dispatch</button>` : ''}
                </td>
              </tr>
            `).join('') : '<tr><td colspan="6" style="padding: 20px; text-align: center; color: var(--text-muted);">No orders yet</td></tr>'}
          </tbody>
        </table>
      </div>

    </div>
  </section>
`;

window.markBookingCompleted = (index) => {
  state.admin.bookings[index].status = 'Completed';
  localStorage.setItem('admin_bookings', JSON.stringify(state.admin.bookings));
  if (window.location.pathname === '/admin') window.router();
};

window.markOrderDispatched = (index) => {
  state.admin.orders[index].status = 'Dispatched';
  localStorage.setItem('admin_orders', JSON.stringify(state.admin.orders));
  if (window.location.pathname === '/admin') window.router();
};

// --- Router ---
window.router = () => {
  const path = window.location.pathname.replace('/ShineHosp', ''); // robust local dev check
  appEl.innerHTML = '';
  window.scrollTo(0, 0);

  if (path === '/' || path === '/home' || path === '') {
    appEl.innerHTML = renderHome();
  } else if (path === '/admin') {
    appEl.innerHTML = renderAdmin();
  } else if (path === '/about') {
    appEl.innerHTML = renderAbout();
  } else if (path === '/services') {
    appEl.innerHTML = renderServices();
  } else if (path === '/doctors') {
    appEl.innerHTML = renderDoctors();
  } else if (path === '/contact') {
    appEl.innerHTML = renderContact();
  } else if (path === '/book-appointment') {
    appEl.innerHTML = renderBookAppointment();
    initBookingStep1();
  } else if (path === '/medicine-delivery') {
    appEl.innerHTML = renderMedicineDelivery();
    handleDeliverySubmit();
  } else {
    appEl.innerHTML = renderHome(); // Fallback
  }

  // Update active states in desktop nav
  document.querySelectorAll('.desktop-nav a').forEach(a => {
    if (a.getAttribute('href') === path) {
      a.style.color = 'var(--primary-yellow)';
    } else {
      a.style.color = '';
    }
  });

  // Close mobile drawer if open
  document.getElementById('mobile-drawer').classList.remove('open');
};

// Intercept clicks on router-links
document.addEventListener('click', e => {
  const a = e.target.closest('a.router-link');
  if (a) {
    e.preventDefault();
    const href = a.getAttribute('href');
    history.pushState(null, '', href);
    window.router();
  }
});

window.addEventListener('popstate', window.router);

// Mobile Menu Listeners
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
  document.getElementById('mobile-drawer').classList.add('open');
});

document.getElementById('close-menu-btn').addEventListener('click', () => {
  document.getElementById('mobile-drawer').classList.remove('open');
});

// Init
window.router();
