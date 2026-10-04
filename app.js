/* ==========================================================================
   HavenCare Home Services - Core Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCaregiverFilter();
  initServiceTabs();
  initPricingCalculator();
  initCareWizard();
  initPortalPreview();
  initFaqAccordion();
  initBlogModals();
  initModals();
  initContactForm();
});

/* Top Dropdown Mobile Navigation System */
function initMobileNav() {
  window.toggleMobileNav = function() {
    const panel = document.getElementById('mobile-dropdown-panel');
    const icon = document.getElementById('mobile-toggle-icon');
    const toggleBtn = document.getElementById('mobile-nav-toggle');

    if (!panel) return;

    const isOpen = panel.classList.contains('open');
    if (isOpen) {
      closeMobileNav();
    } else {
      panel.classList.add('open');
      if (icon) icon.className = 'fas fa-times';
      if (toggleBtn) toggleBtn.classList.add('active');
    }
  };

  window.closeMobileNav = function() {
    const panel = document.getElementById('mobile-dropdown-panel');
    const icon = document.getElementById('mobile-toggle-icon');
    const toggleBtn = document.getElementById('mobile-nav-toggle');

    if (panel) panel.classList.remove('open');
    if (icon) icon.className = 'fas fa-bars';
    if (toggleBtn) toggleBtn.classList.remove('active');
  };

  window.toggleMobileServicesMenu = function() {
    const accordion = document.getElementById('mobile-services-accordion');
    if (accordion) {
      accordion.classList.toggle('open');
    }
  };
}

/* Helper to switch active service tab from any link */
window.switchServiceTab = function(tabName) {
  const tabBtn = document.querySelector(`.service-tab-btn[data-tab="${tabName}"]`);
  if (tabBtn) {
    tabBtn.click();
  }
};

/* Privacy & Terms Modal Handlers */
window.openPrivacyModal = function() {
  const modal = document.getElementById('privacy-modal');
  if (modal) modal.classList.add('active');
};
window.closePrivacyModal = function() {
  const modal = document.getElementById('privacy-modal');
  if (modal) modal.classList.remove('active');
};

window.openTermsModal = function() {
  const modal = document.getElementById('terms-modal');
  if (modal) modal.classList.add('active');
};
window.closeTermsModal = function() {
  const modal = document.getElementById('terms-modal');
  if (modal) modal.classList.remove('active');
};

/* Caregiver Profiles Data & Filtering */
const CAREGIVERS_DATA = [
  {
    id: 'jane-w',
    name: 'Jane W.',
    role: 'Certified Home Care Specialist',
    experience: '4+ Years',
    specialties: ['Elderly Care', 'Post-Hospital Support', 'Companionship'],
    languages: ['English', 'Kiswahili'],
    category: 'elderly',
    image: 'assets/images/caregiver_jane.jpg',
    backgroundChecked: true,
    cprCertified: true,
    rating: 4.9,
    reviewsCount: 38,
    bio: 'Jane is a dedicated certified caregiver with over 4 years of hands-on experience in personal care assistance, post-operative support, and elderly mobility guidance. She is known for her warm, patient demeanor.'
  },
  {
    id: 'david-m',
    name: 'David M.',
    role: 'Physical Rehab & Post-Hospital Specialist',
    experience: '6+ Years',
    specialties: ['Post-Hospital Care', 'Mobility Support', 'Disability Support'],
    languages: ['English'],
    category: 'post-hospital',
    image: 'assets/images/caregiver_david.jpg',
    backgroundChecked: true,
    cprCertified: true,
    rating: 5.0,
    reviewsCount: 42,
    bio: 'David specializes in post-surgical recovery, mobility transfer assistance, and physical routine support. He works closely with care coordinators to ensure safe at-home recovery.'
  },
  {
    id: 'sarah-k',
    name: 'Sarah K.',
    role: 'Dementia & Respite Support Specialist',
    experience: '5+ Years',
    specialties: ['Elderly Care', 'Respite Care', 'Memory Support'],
    languages: ['English', 'Kiswahili'],
    category: 'respite',
    image: 'assets/images/caregiver_sarah.jpg',
    backgroundChecked: true,
    cprCertified: true,
    rating: 4.95,
    reviewsCount: 29,
    bio: 'Sarah provides gentle, empathetic care tailored for seniors living with memory loss or mild cognitive decline. She excels in meal support, light housekeeping, and companion care.'
  },
  {
    id: 'amin-n',
    name: 'Amin N.',
    role: 'Personal Care & Disability Assistant',
    experience: '4+ Years',
    specialties: ['Disability Support', 'Home Care', 'Personal Hygiene'],
    languages: ['English', 'Kiswahili'],
    category: 'disability',
    image: 'assets/images/caregiver_amin.jpg',
    backgroundChecked: true,
    cprCertified: true,
    rating: 4.88,
    reviewsCount: 31,
    bio: 'Amin brings compassion and technical skill to daily living assistance, routine care, hygiene support, and errand management for individuals living with disabilities or limited mobility.'
  }
];

function initCaregiverFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const grid = document.querySelector('.caregiver-grid');

  if (!grid) return;

  renderCaregiverCards(CAREGIVERS_DATA);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      if (filter === 'all') {
        renderCaregiverCards(CAREGIVERS_DATA);
      } else {
        const filtered = CAREGIVERS_DATA.filter(c => c.category === filter);
        renderCaregiverCards(filtered);
      }
    });
  });
}

function renderCaregiverCards(caregivers) {
  const grid = document.querySelector('.caregiver-grid');
  if (!grid) return;

  grid.innerHTML = caregivers.map(c => `
    <div class="caregiver-card">
      <div class="caregiver-photo-wrap">
        <img src="${c.image}" alt="${c.name} - ${c.role}" loading="lazy">
        ${c.backgroundChecked ? `<span class="verified-badge"><i class="fas fa-shield-alt"></i> Background Checked</span>` : ''}
      </div>
      <div class="caregiver-info">
        <h3>${c.name}</h3>
        <p class="caregiver-role">${c.role}</p>
        <div class="caregiver-tags">
          ${c.specialties.map(s => `<span class="tag">${s}</span>`).join('')}
        </div>
        <div class="caregiver-meta">
          <span><i class="fas fa-award"></i> ${c.experience}</span>
          <span><i class="fas fa-globe"></i> ${c.languages.join(', ')}</span>
        </div>
        <div class="caregiver-actions">
          <button class="btn btn-outline btn-sm w-100" onclick="openCaregiverModal('${c.id}')">
            View Credentials & Bio
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

window.openCaregiverModal = function(id) {
  const caregiver = CAREGIVERS_DATA.find(c => c.id === id);
  if (!caregiver) return;

  const modalBody = document.getElementById('caregiver-modal-body');
  modalBody.innerHTML = `
    <div style="text-align: center; margin-bottom: 1.5rem;">
      <img src="${caregiver.image}" alt="${caregiver.name}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin: 0 auto 1rem auto; border: 4px solid var(--clr-teal-bg);">
      <h2>${caregiver.name}</h2>
      <p style="color: var(--clr-teal); font-weight: 700;">${caregiver.role}</p>
      <p style="color: var(--clr-text-muted); font-size: 0.9rem; margin-top: 0.25rem;">
        ⭐ ${caregiver.rating} / 5.0 (${caregiver.reviewsCount} verified family reviews)
      </p>
    </div>

    <div style="background: var(--clr-teal-bg); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.9rem;">
        <div><strong>Status:</strong> <span style="color: var(--clr-success); font-weight:700;">✅ Active & Vetted</span></div>
        <div><strong>Experience:</strong> ${caregiver.experience}</div>
        <div><strong>Background Check:</strong> Cleared & Verified</div>
        <div><strong>CPR / First Aid:</strong> Certified (Current)</div>
        <div><strong>Languages Spoken:</strong> ${caregiver.languages.join(', ')}</div>
        <div><strong>Service Areas:</strong> Metro & Surrounding</div>
      </div>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="margin-bottom: 0.5rem;">Caregiver Overview</h4>
      <p style="color: var(--clr-text-muted); font-size: 0.95rem; line-height: 1.6;">${caregiver.bio}</p>
    </div>

    <div style="text-align: center; border-top: 1px solid var(--clr-border); padding-top: 1.25rem;">
      <button class="btn btn-primary btn-lg" onclick="closeCaregiverModal(); openRequestModalWithCaregiver('${caregiver.name}')">
        <i class="fas fa-calendar-check"></i> Request ${caregiver.name} as Your Caregiver
      </button>
    </div>
  `;

  document.getElementById('caregiver-modal-overlay').classList.add('active');
};

window.closeCaregiverModal = function() {
  document.getElementById('caregiver-modal-overlay').classList.remove('active');
};

window.openRequestModalWithCaregiver = function(name) {
  openCareModal();
  const notesField = document.getElementById('wizard-additional');
  if (notesField) {
    notesField.value = `Client requested caregiver preference: ${name}`;
  }
};

/* Dedicated Service Detailed Breakdown Tabs */
function initServiceTabs() {
  const tabBtns = document.querySelectorAll('.service-tab-btn');
  const tabPanes = document.querySelectorAll('.service-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const target = btn.dataset.tab;
      const pane = document.getElementById(`service-pane-${target}`);
      if (pane) pane.classList.add('active');
    });
  });
}

/* Dynamic Interactive Pricing & Custom Quote Estimator */
function initPricingCalculator() {
  const serviceTypeSelect = document.getElementById('calc-service-type');
  const hoursSelect = document.getElementById('calc-hours');
  const daysSelect = document.getElementById('calc-days');
  const priceDisplay = document.getElementById('calc-total-display');
  const priceUnit = document.getElementById('calc-unit-display');

  if (!serviceTypeSelect) return;

  function calculateRate() {
    const type = serviceTypeSelect.value;
    const hours = parseInt(hoursSelect.value) || 4;
    const days = parseInt(daysSelect.value) || 3;

    let baseRatePerHour = 15; // USD / approx rate benchmark
    let total = 0;
    let unit = 'per week';

    if (type === 'hourly') {
      baseRatePerHour = 15;
      total = baseRatePerHour * hours * days;
      unit = `per week (${hours} hrs/day, ${days} days/wk)`;
    } else if (type === 'daily') {
      const dailyRate = 95;
      total = dailyRate * days;
      unit = `per week (${days} full 8-hour days)`;
    } else if (type === 'overnight') {
      const overnightRate = 130;
      total = overnightRate * days;
      unit = `per week (${days} overnight shifts 10pm-6am)`;
    } else if (type === 'livein') {
      const liveInDailyRate = 180;
      total = liveInDailyRate * days;
      unit = `per week (${days} live-in 24hr presence)`;
    } else if (type === 'respite') {
      const respiteDaily = 110;
      total = respiteDaily * days;
      unit = `estimated for ${days} days respite block`;
    }

    priceDisplay.textContent = `$${total.toLocaleString()}`;
    priceUnit.textContent = unit;
  }

  serviceTypeSelect.addEventListener('change', calculateRate);
  hoursSelect.addEventListener('change', calculateRate);
  daysSelect.addEventListener('change', calculateRate);

  calculateRate();
}

/* Multi-Step Care Request Wizard (Booking System) */
let currentWizardStep = 1;

function initCareWizard() {
  window.openCareModal = function() {
    currentWizardStep = 1;
    showWizardStep(1);
    document.getElementById('care-wizard-modal').classList.add('active');
  };

  window.closeCareModal = function() {
    document.getElementById('care-wizard-modal').classList.remove('active');
  };

  window.wizardNext = function() {
    if (validateWizardStep(currentWizardStep)) {
      if (currentWizardStep < 4) {
        currentWizardStep++;
        showWizardStep(currentWizardStep);
      }
    }
  };

  window.wizardPrev = function() {
    if (currentWizardStep > 1) {
      currentWizardStep--;
      showWizardStep(currentWizardStep);
    }
  };
}

function showWizardStep(step) {
  for (let i = 1; i <= 4; i++) {
    const stepEl = document.getElementById(`wizard-step-${i}`);
    const dotEl = document.getElementById(`step-dot-${i}`);
    if (stepEl) stepEl.style.display = (i === step) ? 'block' : 'none';
    if (dotEl) {
      if (i <= step) dotEl.classList.add('active');
      else dotEl.classList.remove('active');
    }
  }

  // Populate summary step 4
  if (step === 4) {
    const name = document.getElementById('wizard-name').value || 'Valued Client';
    const recipient = document.getElementById('wizard-recipient-name').value || 'Family Member';
    const phone = document.getElementById('wizard-phone').value || 'Provided';
    const selectedServices = Array.from(document.querySelectorAll('input[name="wizard-services"]:checked')).map(cb => cb.value);

    document.getElementById('summary-details').innerHTML = `
      <div style="background: var(--clr-teal-bg); padding: 1.25rem; border-radius: var(--radius-sm); font-size: 0.95rem;">
        <p><strong>Primary Contact:</strong> ${name} (${phone})</p>
        <p><strong>Care Recipient:</strong> ${recipient}</p>
        <p><strong>Selected Care Services:</strong> ${selectedServices.length > 0 ? selectedServices.join(', ') : 'General Care Assessment'}</p>
        <p style="margin-top: 0.5rem; color: var(--clr-teal); font-weight: 700;">✅ Reference Request ID: #HC-${Math.floor(100000 + Math.random() * 900000)}</p>
      </div>
    `;
  }
}

function validateWizardStep(step) {
  if (step === 1) {
    const name = document.getElementById('wizard-name').value;
    const phone = document.getElementById('wizard-phone').value;
    if (!name || !phone) {
      alert('Please fill in your name and phone number so our care team can contact you.');
      return false;
    }
  }
  return true;
}

window.submitCareRequest = function() {
  alert('Thank you! Your Care Request has been submitted successfully. A HavenCare Coordinator will call you within 2 hours to confirm your care assessment.');
  closeCareModal();
};

/* Consultation Scheduler Modal */
window.openConsultationModal = function() {
  document.getElementById('consultation-modal').classList.add('active');
};
window.closeConsultationModal = function() {
  document.getElementById('consultation-modal').classList.remove('active');
};
window.submitConsultation = function(e) {
  e.preventDefault();
  alert('Your consultation request has been received! Our senior care coordinator will reach out at your requested time.');
  closeConsultationModal();
};

/* Emergency Guidance Modal */
window.openEmergencyModal = function() {
  document.getElementById('emergency-modal').classList.add('active');
};
window.closeEmergencyModal = function() {
  document.getElementById('emergency-modal').classList.remove('active');
};

/* Portal Preview Interactive Feature */
function initPortalPreview() {
  const clientTab = document.getElementById('portal-tab-client');
  const caregiverTab = document.getElementById('portal-tab-caregiver');
  const viewContainer = document.getElementById('portal-view-container');

  if (!clientTab || !caregiverTab) return;

  clientTab.addEventListener('click', () => {
    clientTab.classList.add('active');
    caregiverTab.classList.remove('active');
    renderClientPortalView();
  });

  caregiverTab.addEventListener('click', () => {
    caregiverTab.classList.add('active');
    clientTab.classList.remove('active');
    renderCaregiverPortalView();
  });

  renderClientPortalView();
}

function renderClientPortalView() {
  const container = document.getElementById('portal-view-container');
  container.innerHTML = `
    <div class="portal-mock-dashboard">
      <div class="mock-sidebar">
        <div style="font-weight:700; color:var(--clr-navy); margin-bottom: 1rem; font-size:0.95rem;">FAMILY DASHBOARD</div>
        <div class="mock-nav-item active"><i class="fas fa-calendar-alt"></i> Care Schedule</div>
        <div class="mock-nav-item"><i class="fas fa-user-nurse"></i> My Caregiver (Jane W.)</div>
        <div class="mock-nav-item"><i class="fas fa-notes-medical"></i> Daily Care Notes</div>
        <div class="mock-nav-item"><i class="fas fa-file-invoice-dollar"></i> Invoices & Statements</div>
        <div class="mock-nav-item"><i class="fas fa-comment-dots"></i> Message Care Team</div>
      </div>
      <div class="mock-main">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <h4>Today's Care Status (Senior: Mary K.)</h4>
          <span style="background:#2A9D8F; color:#FFF; font-size:0.75rem; font-weight:700; padding:0.25rem 0.6rem; border-radius:12px;">ACTIVE VISIT</span>
        </div>
        <div class="visit-card-mock">
          <div style="font-weight:700; color:var(--clr-navy);">Caregiver Jane W. - Checked In 8:30 AM</div>
          <p style="font-size:0.875rem; color:var(--clr-text-muted); margin-top:0.3rem;">
            Today's Plan: Morning mobility walk, medication reminder at 9:00 AM, meal preparation (light breakfast), companion reading session.
          </p>
          <div style="font-size:0.8rem; color:var(--clr-teal); font-weight:600; margin-top:0.5rem;">
            <i class="fas fa-check-circle"></i> Morning Medication Administered • Vitals Normal
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderCaregiverPortalView() {
  const container = document.getElementById('portal-view-container');
  container.innerHTML = `
    <div class="portal-mock-dashboard">
      <div class="mock-sidebar">
        <div style="font-weight:700; color:var(--clr-navy); margin-bottom: 1rem; font-size:0.95rem;">CAREGIVER PORTAL</div>
        <div class="mock-nav-item active"><i class="fas fa-clock"></i> Shift Clock-In / Out</div>
        <div class="mock-nav-item"><i class="fas fa-tasks"></i> Assigned Care Plan</div>
        <div class="mock-nav-item"><i class="fas fa-pen-fancy"></i> Submit Daily Notes</div>
        <div class="mock-nav-item"><i class="fas fa-history"></i> Weekly Timesheet</div>
      </div>
      <div class="mock-main">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <h4>Current Shift: Client Mary K.</h4>
          <button class="btn btn-sm btn-primary"><i class="fas fa-stopwatch"></i> Shift In Progress (03h 15m)</button>
        </div>
        <div style="background:var(--clr-white); border:1px solid var(--clr-border); padding:1rem; border-radius:var(--radius-sm);">
          <h5>Care Routine Checklist</h5>
          <ul style="list-style:none; margin-top:0.5rem; font-size:0.875rem; line-height:1.8;">
            <li><i class="fas fa-check-square" style="color:var(--clr-teal);"></i> 08:30 AM - Arrive & Safety Walkthrough</li>
            <li><i class="fas fa-check-square" style="color:var(--clr-teal);"></i> 09:00 AM - Assist with Medication & Hydration</li>
            <li><i class="far fa-square" style="color:var(--clr-text-light);"></i> 12:30 PM - Prepare Lunch & Assist Dressing</li>
            <li><i class="far fa-square" style="color:var(--clr-text-light);"></i> 02:00 PM - Log Daily Care Notes & Departure</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

/* FAQ Accordions & Live Search */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  const searchInput = document.getElementById('faq-search-input');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      faqItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'block' : 'none';
      });
    });
  }
}

/* Blog Article Reader Modal */
const BLOG_ARTICLES = {
  'choosing-caregiver': {
    title: '7 Key Questions to Ask When Choosing a Home Caregiver',
    category: 'Caregiver Selection',
    content: `
      <p>Selecting the right caregiver for an elderly parent or family member is one of the most critical decisions a family can make. Here are seven essential questions to ensure safety, dignity, and professional care:</p>
      <ol style="margin-left: 1.25rem; margin-top: 1rem; line-height: 1.8;">
        <li><strong>What specific background checks and screening procedures were conducted?</strong> Ensure nationwide criminal audits and reference verifications are complete.</li>
        <li><strong>Is the caregiver trained in fall prevention and emergency response?</strong> CPR certification and practical mobility training are essential.</li>
        <li><strong>How do you handle caregiver absences or emergencies?</strong> Confirm that backup coverage is available through the care coordination team.</li>
        <li><strong>Are non-medical care limits clearly defined?</strong> Certified caregivers assist with personal hygiene, meals, companionship, and daily tasks without performing unauthorized medical procedures.</li>
      </ol>
    `
  },
  'preventing-falls': {
    title: 'Home Safety Checklist: Preventing Senior Fall Hazards',
    category: 'Home Safety & Wellness',
    content: `
      <p>Falls are the leading cause of injury among seniors living independently at home. Simple adjustments can drastically reduce fall hazards:</p>
      <ul style="margin-left: 1.25rem; margin-top: 1rem; line-height: 1.8;">
        <li>Clear pathways by removing loose throw rugs, cords, and cluttered items.</li>
        <li>Install sturdy grab bars in bathrooms and shower stalls.</li>
        <li>Ensure high-contrast, bright illumination along staircases and hallways.</li>
      </ul>
    `
  },
  'avoiding-burnout': {
    title: 'Understanding Respite Care: Preventing Family Caregiver Burnout',
    category: 'Family Caregiver Support',
    content: `
      <p>Caring for a loved one is deeply rewarding, but without rest, family caregivers face physical and emotional exhaustion. Respite care provides structured temporary support so family members can rest, travel, or handle work responsibilities with complete peace of mind.</p>
    `
  }
};

function initBlogModals() {
  window.openBlogArticle = function(id) {
    const article = BLOG_ARTICLES[id];
    if (!article) return;

    const modalBody = document.getElementById('blog-modal-body');
    modalBody.innerHTML = `
      <span class="blog-tag">${article.category}</span>
      <h2 style="margin-bottom: 1.25rem; margin-top:0.5rem;">${article.title}</h2>
      <div style="font-size: 1rem; color: var(--clr-text-main); line-height: 1.7;">${article.content}</div>
      <div style="margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid var(--clr-border); text-align: right;">
        <button class="btn btn-primary" onclick="closeBlogModal(); openCareModal();">Speak to a Care Coordinator</button>
      </div>
    `;
    document.getElementById('blog-modal-overlay').classList.add('active');
  };

  window.closeBlogModal = function() {
    document.getElementById('blog-modal-overlay').classList.remove('active');
  };
}

/* Modal Helper Utility */
function initModals() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });
}

/* Contact Form Handler */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for contacting HavenCare! Our care team has received your message and will respond within 1-2 business hours.');
      contactForm.reset();
    });
  }
}
