/**
 * Bagus Karandika - Portfolio Interaction Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initSpotlightEffect();
  initMobileMenu();
  initScrollSpy();
  initModals();
  initLightbox();
  initClipboardToast();
});

/* -------------------------------------------------------------------------- */
/* 1. Spotlight Card Effect                                                   */
/* -------------------------------------------------------------------------- */
function initSpotlightEffect() {
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 2. Mobile Navigation Drawer                                                */
/* -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('close-mobile-menu');
  const navLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  if (!menuBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('hidden', 'translate-x-full');
    mobileMenu.classList.add('flex', 'translate-x-0');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    setTimeout(() => {
      mobileMenu.classList.remove('flex');
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    }, 250);
  }

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* -------------------------------------------------------------------------- */
/* 3. ScrollSpy Navigation Highlighting                                       */
/* -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('nav a.nav-link');

  function updateActiveNav() {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopLinks.forEach(link => {
          link.classList.remove('active', 'text-on-surface');
          link.classList.add('text-secondary');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active', 'text-on-surface');
            link.classList.remove('text-secondary');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
}

/* -------------------------------------------------------------------------- */
/* 4. Project Dossier Modals                                                  */
/* -------------------------------------------------------------------------- */
const projectData = {
  edispo: {
    title: "E-Dispo | Digital Disposition System",
    subtitle: "BPKAD Kabupaten Lampung Timur",
    tag: "Government E-Office // Audit Grade",
    status: "Verified & Approved",
    overview: "Sistem informasi persuratan dinas dan disposisi digital yang dikembangkan untuk Badan Pengelola Keuangan dan Aset Daerah (BPKAD) Kabupaten Lampung Timur. Bertujuan mengeliminasi keterlambatan arsip kertas dan merekam jejak digital disposisi berjenjang secara transparan dan akuntabel.",
    specifications: [
      { label: "Role Hierarchy", value: "Operator -> Kasubbid -> Kabid -> Kepala Badan (4-Tier Validation)" },
      { label: "Testing Paradigm", value: "Comprehensive Black-box & Boundary Value Analysis (BVA)" },
      { label: "Security", value: "Row-Level Security (RLS), Role-Based Access Control (RBAC)" },
      { label: "Tech Stack", value: "Vue.js 3, Tailwind CSS, PostgreSQL, REST API" },
      { label: "Defect Ratio", value: "0 Critical / 0 High Severity Bugs at Handover" },
      { label: "UAT Sign-off", value: "Signed by Lead Administrator BPKAD Lampung Timur (Feb 2026)" }
    ],
    testScenarios: [
      "Verifikasi integritas aliran surat masuk agar tidak dapat di-bypass melewati rantai hierarki otoritas.",
      "Pengujian penomoran agenda otomatis dengan proteksi race condition pada pengiriman berkas simultan.",
      "Validasi upload berkas PDF dengan batas ukuran maksimum 10MB dan enkripsi nama dokumen.",
      "Uji waktu respon query pencarian arsip < 350ms pada dataset 10.000+ dokumen surat dinas."
    ]
  },
  pesantren: {
    title: "Smart Pesantren | Modern Islamic Platform",
    subtitle: "Comprehensive Academic & Santri Management",
    tag: "Edu Tech Mobile & Web // Enterprise Scaled",
    status: "Production Ready - 98.4% Pass Rate",
    overview: "Platform tata kelola komprehensif bagi institusi pesantren modern yang mencakup manajemen data santri, pencatatan hafalan Al-Qur'an terstruktur, sistem absensi realtime, dan billing SPP bulanan.",
    specifications: [
      { label: "Multi-Role Architecture", value: "Admin Pesantren, Pengasuh/Ustadz, Wali Santri (Web & Mobile)" },
      { label: "Test Coverage", value: "98.4% UAT Acceptance across 62 Functional Scenarios" },
      { label: "Data Engine", value: "Supabase Relational Engine + Realtime Subscriptions" },
      { label: "Frontend", value: "Next.js & Vue.js Dashboard, Responsive Mobile UI" },
      { label: "Data Integrity", value: "ACID Compliant Transactions for Student Financials" }
    ],
    testScenarios: [
      "Simulasi pengisian mutaba'ah hafalan 50 santri serentak tanpa lock contention pada tabel relasi.",
      "Pemeriksaan notifikasi WhatsApp gateway terhadap status kedisiplinan dan absensi santri.",
      "Pengujian kalkulasi otomatis tunggakan dan kwitansi elektronik berbasis PDF invoice."
    ]
  },
  babycare: {
    title: "GS Baby Care POS System",
    subtitle: "Retail Point-of-Sale & Inventory Control",
    tag: "Retail App // Offline-to-Online Synchronized",
    status: "Passed 47/47 Test Suites",
    overview: "Sistem kasir cerdas dan manajemen pergudangan retail untuk gerai perlengkapan bayi. Didesain untuk keandalan kasir di lapangan dengan dukungan pencetakan thermal bluetooth, multi-barcode scanner, dan tracking margin keuntungan.",
    specifications: [
      { label: "Platform", value: "Hybrid Mobile (Capacitor) + Desktop Cashier" },
      { label: "Test Suites", value: "47 Suites (100% Passing Score)" },
      { label: "Offline Resilience", value: "Local SQLite cache dengan sinkronisasi otomatis saat reconnect" },
      { label: "Stock Accuracy", value: "Atomic inventory reduction pada setiap transaksi checkout" }
    ],
    testScenarios: [
      "Stress test 100 checkout berturut-turut dalam kondisi jaringan terputus (offline mode).",
      "Kalkulasi diskon tiering dan bundling promosi tanpa error pembulatan sen/rupiah.",
      "Uji kompatibilitas thermal printer 58mm & 80mm via protokol Bluetooth serial."
    ]
  }
};

function initModals() {
  const modalBackdrop = document.getElementById('project-modal');
  const closeBtn = document.getElementById('close-project-modal');
  const triggerBtns = document.querySelectorAll('[data-dossier-target]');

  if (!modalBackdrop) return;

  function openDossier(id) {
    const data = projectData[id];
    if (!data) return;

    document.getElementById('modal-project-title').textContent = data.title;
    document.getElementById('modal-project-subtitle').textContent = data.subtitle;
    document.getElementById('modal-project-tag').textContent = data.tag;
    document.getElementById('modal-project-status').textContent = data.status;
    document.getElementById('modal-project-overview').textContent = data.overview;

    const specsContainer = document.getElementById('modal-project-specs');
    specsContainer.innerHTML = data.specifications.map(s => `
      <div class="p-3 bg-[#111111] border border-[#262626] rounded">
        <div class="text-[11px] font-mono text-primary uppercase font-bold">${s.label}</div>
        <div class="text-sm font-medium text-on-surface mt-0.5">${s.value}</div>
      </div>
    `).join('');

    const scenariosContainer = document.getElementById('modal-project-scenarios');
    scenariosContainer.innerHTML = data.testScenarios.map((sc, idx) => `
      <li class="flex items-start gap-2.5 text-xs text-[#a1a1aa] leading-relaxed">
        <span class="text-primary font-bold font-mono">0${idx + 1}.</span>
        <span>${sc}</span>
      </li>
    `).join('');

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDossier() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-dossier-target');
      openDossier(targetId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDossier);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeDossier();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeDossier();
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 5. Image Lightbox Preview                                                  */
/* -------------------------------------------------------------------------- */
function initLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image');
  const closeBtn = document.getElementById('close-lightbox');
  const triggers = document.querySelectorAll('[data-lightbox]');

  if (!lightbox || !lightboxImg) return;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Preview';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggers.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      openLightbox(img.getAttribute('src'), img.getAttribute('alt'));
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxImg.parentElement) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 6. CV Generator & Viewer Modal                                             */
/* -------------------------------------------------------------------------- */
window.openCvModal = function() {
  const cvModal = document.getElementById('cv-modal');
  if (cvModal) {
    cvModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeCvModal = function() {
  const cvModal = document.getElementById('cv-modal');
  if (cvModal) {
    cvModal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.printCv = function() {
  window.print();
};

/* -------------------------------------------------------------------------- */
/* 7. Toast & Clipboard Copy                                                  */
/* -------------------------------------------------------------------------- */
function initClipboardToast() {
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  window.showToast = function(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  };

  window.copyToClipboard = function(text, label) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`✔ Berhasil menyalin ${label}: ${text}`);
      }).catch(() => {
        showToast(`✔ Tersalin: ${text}`);
      });
    } else {
      showToast(`✔ ${label}: ${text}`);
    }
  };
}
