const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const gallery = document.getElementById('projectGallery');
const galleryGrid = document.getElementById('galleryGrid');
const galleryClose = document.getElementById('galleryClose');
const galleryButtons = document.querySelectorAll('.gallery-button');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main > section[id]');

const galleryItems = {
  'bookmark-1': 'Bookmark layout A',
  'bookmark-2': 'Bookmark layout B',
  'bookmark-3': 'Bookmark layout C',
  'model-1': '3D model draft A',
  'model-2': '3D model draft B',
  'model-3': '3D model draft C'
};

function applyTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    body.classList.remove('light');
    themeToggle.textContent = 'Light';
  } else {
    body.classList.add('light');
    body.classList.remove('dark');
    themeToggle.textContent = 'Dark';
  }
}

function loadTheme() {
  const stored = localStorage.getItem('site-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(stored || (prefersDark ? 'dark' : 'light'));
}

themeToggle.addEventListener('click', () => {
  const nextTheme = body.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(nextTheme);
  localStorage.setItem('site-theme', nextTheme);
});

function openGallery(imageKeys) {
  galleryGrid.innerHTML = '';
  imageKeys.forEach((key) => {
    const card = document.createElement('div');
    card.className = 'gallery-item';
    card.textContent = galleryItems[key] || 'Project preview';
    galleryGrid.appendChild(card);
  });
  gallery.classList.add('active');
  gallery.setAttribute('aria-hidden', 'false');
}

function closeGallery() {
  gallery.classList.remove('active');
  gallery.setAttribute('aria-hidden', 'true');
}

galleryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const images = button.dataset.images.split(',').map((name) => name.trim());
    openGallery(images);
  });
});

galleryClose.addEventListener('click', closeGallery);

gallery.addEventListener('click', (event) => {
  if (event.target === gallery || event.target === document.querySelector('.gallery-overlay')) {
    closeGallery();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && gallery.classList.contains('active')) {
    closeGallery();
  }
});

function setActiveLink(targetId) {
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${targetId}`);
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((section) => sectionObserver.observe(section));

loadTheme();
