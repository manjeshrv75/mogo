import '../sass/main.scss';

///////////////////////////////////////////////////////
// GLOBAL CONSTANTS
const nav = document.querySelector('.nav');
const navMenu = document.querySelector('.nav__menu');
const navHeight = nav.getBoundingClientRect().height;
const allNavLinks = navMenu.querySelectorAll('.nav__link');
const btnOpenNavMenu = document.querySelector('.nav__menu-icon');
const btnCloseNavMenu = document.querySelector('.nav__close-icon');
const header = document.querySelector('.header');
const animateSections = document.querySelectorAll('.section-animate');

///////////////////////////////////////////////////////
// Accordion
const accordion = function (el) {
  const accordion = el;

  const allItems = accordion.querySelectorAll('.accordion__item');

  accordion.addEventListener('click', function (e) {
    // Gaurd clause: If user did not click on accordion then return
    if (!e.target.closest('.accordion__head')) return;

    // Select clicked accordion accordion item
    const clickedItem = e.target.closest('.accordion__item');

    // Remove active class from all accrodian items
    allItems.forEach(item => item.classList.remove('accordion--active'));

    // Add active class to clicked accordion item
    clickedItem.classList.add('accordion--active');
  });
};

//What we do accordion
accordion(document.querySelector('#what-we-do-accordion'));

///////////////////////////////////////////////////////
// Slider
const slider = function (el) {
  const slider = el;
  const slides = slider.querySelectorAll('.slider__item');
  const btnRight = slider.querySelector('.slider__btn--right');
  const btnLeft = slider.querySelector('.slider__btn--left');
  const maxSlide = slides.length;
  let curSlide = 0;

  // Functions
  const goToSlide = function (cur) {
    slides.forEach((item, i) => {
      item.style.transform = `translateX(-${cur * 100}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
  };

  // Event listener
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
};

// Quote slider
slider(document.querySelector('#quote-slider'));

// Testimonial slider
slider(document.querySelector('#testimonial-slider'));

///////////////////////////////////////////////////////
// Open mobile nav
btnOpenNavMenu.addEventListener('click', function () {
  navMenu.classList.add('nav__menu--open');
});

///////////////////////////////////////////////////////
// Close mobile nav
btnCloseNavMenu.addEventListener('click', function () {
  navMenu.classList.remove('nav__menu--open');
});

/////////////////////////////////////////////////////////////////
// Active nav link
const activateNavlink = function (el) {
  allNavLinks.forEach(link => {
    if (link !== el) {
      link.classList.remove('nav__link--active');
    } else {
      link.classList.add('nav__link--active');
    }
  });
};

/////////////////////////////////////////////////////////////////
// Sticky nav
const toggleStickyNav = function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    nav.classList.remove('nav--sticky');
    // Remove active class from all link
    activateNavlink(null);
  } else {
    nav.classList.add('nav--sticky');
  }
};

const stickyNavOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(
  toggleStickyNav,
  stickyNavOptions
);

headerObserver.observe(header);

/////////////////////////////////////////////////////////////////
// Page navigation
nav.addEventListener('click', function (e) {
  // Guard clause: If user does not click on nav link then return
  if (
    !e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('nav__brand')
  )
    return;

  // Prevent default scroll behaviour
  e.preventDefault(e);

  // Get section id from e.target
  const id = e.target.getAttribute('href');
  console.log(id);

  // Get section we have to scroll to using id
  const section = document.querySelector(id);

  // Get section coords
  const coords = section.getBoundingClientRect();

  // Scroll to section
  window.scrollTo({
    left: coords.left + window.pageXOffset,
    top: coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  // Close mobile nav if website is viewed in mobile
  navMenu.classList.remove('nav__menu--open');

  // Add active link class
  activateNavlink(e.target);
});

/////////////////////////////////////////////////////////////////
// Scroll spy
// All all nav link node list to array
const allNavLinkArr = [...allNavLinks];

// Get all section arr from all nav link arr
const allSections = allNavLinkArr.map(link =>
  document.querySelector(link.getAttribute('href'))
);

// Create intersection observer and observe each section

const scrollSpy = function (entries) {
  const [entry] = entries;

  // Gaurd clause: If e.target target is not intersection then return
  if (!entry.isIntersecting) return;

  // Get section id from entry.target
  const id = `#${entry.target.getAttribute('id')}`;

  // Get nav link element that needs to be active using section id
  const navEl = navMenu.querySelector(`[href='${id}']`);

  // Activate link using function
  activateNavlink(navEl);
};

const scrollSpyOptions = {
  root: null,
  threshold: 0.4,
};

const allSectionsObserver = new IntersectionObserver(
  scrollSpy,
  scrollSpyOptions
);

allSections.forEach(section => allSectionsObserver.observe(section));

/////////////////////////////////////////////////////////////////
// Animate section on scroll
const animateSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section-animate');
  observer.unobserve(entry.target);
};

const animateSectionOpt = {
  root: null,
  threshold: 0.05,
};

const animateSectionObserver = new IntersectionObserver(
  animateSection,
  animateSectionOpt
);

animateSections.forEach(section => animateSectionObserver.observe(section));
