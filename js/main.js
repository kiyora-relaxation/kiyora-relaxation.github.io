const header = document.getElementById('site-header');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 24), { passive: true });

function closeMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'メニューを開く');
  mobileNav.hidden = true;
}

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.classList.toggle('open', !isOpen);
  hamburger.setAttribute('aria-expanded', String(!isOpen));
  hamburger.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
  mobileNav.hidden = isOpen;
});
document.querySelectorAll('.mobile-nav-link').forEach((link) => link.addEventListener('click', closeMenu));

document.querySelectorAll('.menu-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab').forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('.menu-panel').forEach((panel) => {
      const active = panel.id === `tab-${tab.dataset.tab}`;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });
  });
});

document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const body = document.getElementById(trigger.getAttribute('aria-controls'));
    const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
    trigger.setAttribute('aria-expanded', String(willOpen));
    body.hidden = !willOpen;
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}

// ── 空き状況のご案内 ──
const availabilityCalendarLink = document.querySelector('.access .text-link.light');
if (availabilityCalendarLink) {
  const availability = document.createElement('div');
  availability.className = 'availability-info';
  availability.innerHTML = `
    <p>空き状況は、LINE公式アカウントとInstagramで配信しています。</p>
    <div>
      <a class="text-link light" href="https://lin.ee/B4hcPD2" target="_blank" rel="noopener">LINEで空き状況を見る →</a>
      <a class="text-link light" href="https://www.instagram.com/kiyora.relaxation.higashiomi/" target="_blank" rel="noopener">Instagramで空き状況を見る →</a>
    </div>`;
  availabilityCalendarLink.replaceWith(availability);
}

const instagramGuide = document.querySelector('.instagram-link');
if (instagramGuide) {
  instagramGuide.innerHTML = `空き状況やサロンの日々は、Instagramでも配信しています。<br><a href="https://www.instagram.com/kiyora.relaxation.higashiomi/" target="_blank" rel="noopener">Instagramを見る ↗</a>`;
}

// ── セラピスト写真の背景 ──
const ownerPhoto = document.querySelector('.owner-photo');
if (ownerPhoto) {
  const backdrop = document.createElement('div');
  backdrop.className = 'therapist-backdrop';
  ownerPhoto.prepend(backdrop);
  const therapistImage = ownerPhoto.querySelector('img');
  if (therapistImage) {
    therapistImage.src = 'assets/images/therapist-salon.png';
    therapistImage.alt = 'やわらかなサロンの光に包まれたkiyoraのセラピスト';
  }
}
