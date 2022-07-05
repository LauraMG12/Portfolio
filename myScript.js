'use strict';

///////////////////////////////////////

//    MODAL WINDOW

const modal = document.querySelectorAll('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelectorAll('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');

for (let i = 0; i < btnOpenModal.length; i++) {
  btnOpenModal[i].addEventListener('click', function () {
    modal[i].classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
}

for (let i = 0; i < btnCloseModal.length; i++) {
  btnCloseModal[i].addEventListener('click', function () {
    modal[i].classList.add('hidden');
    overlay.classList.add('hidden');
  });
}

for (let i = 0; i < btnCloseModal.length; i++) {
  overlay.addEventListener('click', function () {
    modal[i].classList.add('hidden');
    overlay.classList.add('hidden');
  });
}

///////////////////////////////////////

// NAVIGATION WINDOW

const btnMenu = document.querySelector('.btnMenu');
const itemMenu = document.querySelectorAll('.navigation__item');
const background = document.querySelector('.navigation__background');
var counter = 0; // 0 = close; 1 = open

function openNav() {
  background.style.height = '100%';
  counter = 1;
}

function closeNav() {
  background.style.height = '0%';
  counter = 0;
}

btnMenu.addEventListener('click', function () {
  if (counter === 0) {
    openNav();
  } else if (counter === 1) {
    closeNav();
  }
});
for (let i = 0; i < itemMenu.length; i++) {
  itemMenu[i].addEventListener('click', function () {
    closeNav();
  });
}

///////////////////////////////////////

// SKILLS HIGHLIGHT START

const skills = document.querySelector('.skills');

const obsCallback = function (entries, skillsObserver) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  if (entry.isIntersecting && window.innerWidth > 800) {
    skillsCharts[0].classList.add('highlight');
  }
  skillsObserver.unobserve(skills);
};

const obsOptions = {
  root: null,
  threshold: 0.5,
};

const skillsObserver = new IntersectionObserver(obsCallback, obsOptions);
skillsObserver.observe(skills);

// SKILLS HIGHLIGHT

const skillsCharts = document.querySelectorAll('.skills__chart');

for (let i = 0; i < skillsCharts.length; i++) {
  skillsCharts[i].addEventListener('animationend', function () {
    if (i === skillsCharts.length - 1) {
      skillsCharts[i].classList.remove('highlight');
      skillsCharts[0].classList.add('highlight');
    } else {
      skillsCharts[i].classList.remove('highlight');
      skillsCharts[i + 1].classList.add('highlight');
    }
  });
}

///////////////////////////////////////

// STICKY NAVIGATION

const nav = document.querySelector('.navigation');
const navHeight = nav.getBoundingClientRect().height;
const home = document.querySelector('.home');
const visible = document.querySelectorAll('.navigation__list--item-visible1');
const button = document.querySelector('.navigation__list--button1');

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
    button.classList.add('navigation__list--button2');
    for (let i = 0; i < visible.length; i++) {
      visible[i].classList.add('navigation__list--item-visible2');
    }
  } else {
    nav.classList.remove('sticky');
    button.classList.remove('navigation__list--button2');
    for (let i = 0; i < visible.length; i++) {
      visible[i].classList.remove('navigation__list--item-visible2');
    }
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(home);

///////////////////////////////////////

// REVEAL SECTIONS

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
});

///////////////////////////////////////

// WHEN REFRESH, MOVE ON TOP

history.scrollRestoration = 'manual';

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

///////////////////////////////////////

// BLUE NAV

// Efecto inicio de cada sección y header. Activación de las secciones del navbar
var currSection = 0;
var lastSection = 4;

const activeSection = function (entries, observer) {
  const [entry] = entries;
  // Si intersecta con la sección (Puede haber más de una section intersectada)
  if (entry.isIntersecting) {
    // Actualiza la seccion anterior
    lastSection = currSection;
    for (let i = 0; i < visible.length; i++) {
      if (entry.target.classList.contains(`section--${i}`)) {
        currSection = i;
        visible[i].classList.add('navigation__list--item-visibleBlue');
      } else {
        // Se podria eliminar solo la anterior pero esto es una fuente de errores, por lo tanto elimina la clase de todos los elementos diferentes
        visible[i].classList.remove('navigation__list--item-visibleBlue');
      }
    }
  } else {
    for (let i = 0; i < visible.length; i++) {
      if (
        entry.target.classList.contains(`section--${i}`) &&
        i == currSection
      ) {
        visible[currSection].classList.remove(
          'navigation__list--item-visibleBlue'
        );
        visible[lastSection].classList.add(
          'navigation__list--item-visibleBlue'
        );
        // Actualiza la seccion actual a la anterior
        currSection = lastSection;
      }
    }
  }
};

const navSectionObserver = new IntersectionObserver(activeSection, {
  root: null,
  threshold: 0.05,
  rootMargin: `-30px`,
});

allSections.forEach(function (section) {
  navSectionObserver.observe(section);
});

///////////////////////////////////////

// HOME ANIMATION

const headingPrimaryMain = document.querySelector('.heading--primary--main');
const blackDiv = document.querySelector('.blackDiv');

headingPrimaryMain.addEventListener('animationend', function () {
  headingPrimaryMain.style.borderRight = 'none';
});

blackDiv.addEventListener('animationend', function () {
  nav.style.zIndex = '150';
});

///////////////////////////////////////

//    LANGUAGES

//        SHOW FLAG

var flag = 0; // 0 = spain flag;   1 = english flag
const languages = document.querySelectorAll('.flag');
const spanish = document.querySelector('.spanish');
const english = document.querySelector('.english');

for (let i = 0; i < languages.length; i++) {
  languages[i].addEventListener('click', function () {
    if (flag === 0) {
      spanish.classList.add('hidden');
      english.classList.remove('hidden');
      flag = 1;
    } else if (flag === 1) {
      spanish.classList.remove('hidden');
      english.classList.add('hidden');
      flag = 0;
    }
  });
}

//        SECTIONS CLASSES

const navbar = {
  itemsVis: document.querySelectorAll('.navigation__list--item-visible1'),
  itemsInvis: document.querySelectorAll('.navigation__list--item-invisible'),
};

const hiddenNav = document.querySelectorAll('.hiddenNav');

const headings = document.querySelectorAll('.section--trnsl');

const btns = document.querySelectorAll('.btn');

const skill = document.querySelectorAll('.skill');

const techHeading = document.querySelectorAll('.technologies__chart-title');

const contactMessage = document.querySelectorAll('.contact__icon-information');

const project = {
  label: document.querySelectorAll('.projects__label'),
  modalTitle: document.querySelectorAll('.project__modal--title'),
  modalWindow: document.querySelectorAll('.modal--info'),
};

const aboutMe = {
  title: document.querySelectorAll('.about-me__title'),
  personality: document.querySelectorAll('.personality'),
  lang: document.querySelectorAll('.lang'),
  biography: document.querySelectorAll('.biography__paragraph'),
};

const education = {
  position: document.querySelectorAll('.education__title'),
  date: document.querySelectorAll('.education__date'),
  info: document.querySelectorAll('.education__info'),
};

const CV = document.querySelector('.CV');

//        TRANSLATIONS

const trnslSections = {
  esp: ['Inicio', 'Conocimientos', 'Proyectos', 'Sobre mí', 'Contacto'],
  eng: ['Home', 'Technologies', 'Projects', 'About me', 'Contact'],
};

const trnslBtn = {
  esp: [
    'Contactemos',
    'Ver más',
    'Ver más',
    'Ver más',
    'Ver más',
    'Ver más',
    'Ver más',
    'Ver más',
    'Abrir CV',
  ],
  eng: [
    'Contact me',
    'See more',
    'See more',
    'See more',
    'See more',
    'See more',
    'See more',
    'See more',
    'Open CV',
  ],
};

const trnslSkill = {
  esp: ['Metódica', 'Minuciosa', 'Cooperativa', 'Resolutiva'],
  eng: ['Methodical', 'Careful', 'Teamworker', 'Resolutive'],
};

const trnslBiography = {
  esp: [
    '"Soy una desarrolladora web autodidacta a la que le apasionan los efectos de UI, las animaciones y la creación de experiencias de usuario dinámicas, intuitivas y responsive. ',
    'A nivel personal, me considero una persona decidida y organizada, con gran atención al detalle que trabaja bien en equipo. ',
    'Entre mis intereses se encuentran el desarrollo front-end y full-stack."',
  ],
  eng: [
    '"I am a self-taught web developer who is passionate about UI effects, animations and creating dynamic, intuitive and responsive user experiences. ',
    'On a personal level, I consider myself an organized and strong-willed person, with great attention to detail, that works well in a team. ',
    'My interests include front-end and full-stack development."',
  ],
};

const trnslsTech = {
  esp: ['Front end', 'Back end', 'Otros'],
  eng: ['Front end', 'Back end', 'Others'],
};

const trnslContact = {
  esp: ['Contactemos', 'Mis proyectos', 'Más información'],
  eng: ['Start meeting', 'Check my projects', 'More information'],
};

const trnslProjectLabel = {
  esp: [
    'Ver proyecto',
    'Ver proyecto',
    'Ver proyecto',
    'Ver proyecto',
    'Ver proyecto',
    'Ver proyecto',
  ],
  eng: [
    'View project',
    'View project',
    'View project',
    'View project',
    'View project',
    'View project',
  ],
};

const trnslProjectTitle = {
  esp: ['Portafolio', 'Natours', 'Nexter', 'Juego I', 'Juego II', 'Bankist'],
  eng: [
    'Portfolio',
    'Natours',
    'Nexter',
    'Guess my number',
    'Pig game',
    'Bankist',
  ],
};

const trnslModalInfo = {
  esp: [
    'Este es mi primer proyecto, sobre mi carrera como desarrolladora web, enfocado en mostrar mis conocimientos y experiencia.',
    'Natours es una página web centrada en ofrecer actividades al aire libre. Se realizó como práctica de un curso de desarrollo front-end centrado en HTML y CSS avanzado.',
    'Este proyecto consiste en una página web inmobiliaria. Se realizó como práctica de un curso de desarrollo front-end centrado en HTML y CSS avanzado.',
    'Este juego constiste en adivinar un número aleatorio. Se realizó como práctica de un curso de desarrollo front-end centrado en JavaScript.',
    'Este proyecto es un juego de azar de dos jugadores. Se realizó como práctica de un curso de desarrollo front-end centrado en JavaScript.',
    'Es una página web de un banco. Se realizó como práctica de un curso de desarrollo front-end centrado en JavaScript.',
  ],
  eng: [
    'This is my first own project, about my profesional career as a web developer focused on showing my knowledge and experience.',
    'Natours is a web page that has some offers focused on outdoor activities. It was developed as a practice of a front-end development course based on HTML and advanced CSS languages.',
    'This project consists in a property company web page. It was developed as a practice of a front-end development course based on HTML and advanced CSS languages.',
    'This is a game related to guess a random number. It was developed as a practice of a front-end development course based on JavaScript.',
    'This is a two players roll dice game. It was developed as a practice of a front-end development course based on JavaScript.',
    'It is a bank web page. It was developed as a practice of a front-end development course based on JavaScript.',
  ],
};

const trnslProjectBtn = {
  esp: 'Ver más',
  eng: 'See more',
};

const trnslAboutMeTitle = {
  esp: ['Personalidad', 'Idiomas', 'Sobre mí', 'Experiencia'],
  eng: ['Personality', 'Languages', 'About me', 'Experience'],
};

const trnslAboutMePersonality = {
  esp: [
    'Responsable',
    'Determinada',
    'Autodidacta',
    'Organizada',
    'Eficiente',
    'Colaborativa',
  ],
  eng: [
    'Responsible',
    'Strong-willed',
    'Self-learned',
    'Organized',
    'Efficient',
    'Team work',
  ],
};

const trnslAboutMeLanguages = {
  esp: ['Español - Nativo', 'Catalán - C1', 'Inglés - B2'],
  eng: ['Spanish - Native', 'Catalan - C1', 'English - B2'],
};

const trnslPositionTitle = {
  esp: [
    'Desarrolladora Full Stack Júnior - JAN CHOUEIRI MANAGEMENT AND CONSULTING SL',
    'Desarrollador Full Stack - Autoaprendizaje',
  ],
  eng: [
    'Junior Full Stack developer - JAN CHOUEIRI MANAGEMENT AND CONSULTING SL',
    'Self-taught web development',
  ],
};

const trnslPositionDate = {
  esp: ['Marzo 2022 - Actualidad', 'Octubre 2021 - Actualidad'],
  eng: ['March 2022 - Actualidad', 'October 2021 - Current'],
};

const trnslPositionInfo = {
  esp: [
    'Experiencia usando VueJS, NuxtJs y SCSS. Testing en el front mediante la implementación de TDD con Jest.',
    'He estudiado desarrollo web mediante cursos avanzados de Udemy enfocados en SASS, JavaScript and VueJS, entre otros; donde he realizado algunos proyectos. También he hecho proyectos por mi cuenta, como mi portafolio.',
  ],
  eng: [
    'Experience working with VueJS, NuxtJs and SCSS. Frontend testing with TDD implementation using Jest.',
    'I have studied web development by taking some Udemy advanced courses focused on SASS, JavaScript and VueJS, among others; where I have made some projects. I have also done some personal projects, as my portfolio.',
  ],
};

//        TRANSLATE TO ENGLISH

languages[1].addEventListener('click', function (e) {
  for (let i = 0; i < navbar.itemsVis.length; i++) {
    navbar.itemsVis[i].innerHTML = trnslSections.eng[i];
    navbar.itemsInvis[i].innerHTML = trnslSections.eng[i];
    hiddenNav[i].innerHTML = trnslSections.eng[i];
    if (i > 0) {
      headings[i - 1].innerHTML = trnslSections.eng[i];
    }
  }
  for (let i = 0; i < btns.length; i++) {
    btns[i].innerHTML = trnslBtn.eng[i];
  }
  for (let i = 0; i < skill.length; i++) {
    skill[i].innerHTML = trnslSkill.eng[i];
  }
  for (let i = 0; i < techHeading.length; i++) {
    techHeading[i].innerHTML = trnslsTech.eng[i];
  }
  for (let i = 0; i < contactMessage.length; i++) {
    contactMessage[i].innerHTML = trnslContact.eng[i];
  }
  for (let i = 0; i < project.label.length; i++) {
    project.label[i].innerHTML = trnslProjectLabel.eng[i];
    project.modalTitle[i].innerHTML = trnslProjectTitle.eng[i];
    project.modalWindow[i].innerHTML = trnslModalInfo.eng[i];
  }
  for (let i = 0; i < aboutMe.title.length; i++) {
    aboutMe.title[i].innerHTML = trnslAboutMeTitle.eng[i];
  }
  for (let i = 0; i < aboutMe.personality.length; i++) {
    aboutMe.personality[i].innerHTML = trnslAboutMePersonality.eng[i];
  }
  for (let i = 0; i < aboutMe.lang.length; i++) {
    aboutMe.lang[i].innerHTML = trnslAboutMeLanguages.eng[i];
  }
  for (let i = 0; i < aboutMe.biography.length; i++) {
    aboutMe.biography[i].innerHTML = trnslBiography.eng[i];
  }
  for (let i = 0; i < education.position.length; i++) {
    education.position[i].innerHTML = trnslPositionTitle.eng[i];
    education.date[i].innerHTML = trnslPositionDate.eng[i];
    education.info[i].innerHTML = trnslPositionInfo.eng[i];
  }
  CV.href = 'Images/about/CV Laura Mañogil González (ENG).pdf';
});

//        TRANSLATE TO SPANISH

languages[0].addEventListener('click', function (e) {
  for (let i = 0; i < navbar.itemsVis.length; i++) {
    navbar.itemsVis[i].innerHTML = trnslSections.esp[i];
    navbar.itemsInvis[i].innerHTML = trnslSections.esp[i];
    hiddenNav[i].innerHTML = trnslSections.esp[i];
    if (i > 0) {
      headings[i - 1].innerHTML = trnslSections.esp[i];
    }
  }
  for (let i = 0; i < btns.length; i++) {
    btns[i].innerHTML = trnslBtn.esp[i];
  }
  for (let i = 0; i < skill.length; i++) {
    skill[i].innerHTML = trnslSkill.esp[i];
  }
  for (let i = 0; i < techHeading.length; i++) {
    techHeading[i].innerHTML = trnslsTech.esp[i];
  }
  for (let i = 0; i < contactMessage.length; i++) {
    contactMessage[i].innerHTML = trnslContact.esp[i];
  }
  for (let i = 0; i < project.label.length; i++) {
    project.label[i].innerHTML = trnslProjectLabel.esp[i];
    project.modalTitle[i].innerHTML = trnslProjectTitle.esp[i];
    project.modalWindow[i].innerHTML = trnslModalInfo.esp[i];
  }
  for (let i = 0; i < aboutMe.title.length; i++) {
    aboutMe.title[i].innerHTML = trnslAboutMeTitle.esp[i];
  }
  for (let i = 0; i < aboutMe.personality.length; i++) {
    aboutMe.personality[i].innerHTML = trnslAboutMePersonality.esp[i];
  }
  for (let i = 0; i < aboutMe.lang.length; i++) {
    aboutMe.lang[i].innerHTML = trnslAboutMeLanguages.esp[i];
  }
  for (let i = 0; i < aboutMe.biography.length; i++) {
    aboutMe.biography[i].innerHTML = trnslBiography.esp[i];
  }
  for (let i = 0; i < education.position.length; i++) {
    education.position[i].innerHTML = trnslPositionTitle.esp[i];
    education.date[i].innerHTML = trnslPositionDate.esp[i];
    education.info[i].innerHTML = trnslPositionInfo.esp[i];
  }
  CV.href = 'Images/about/CV Laura Mañogil González (ESP).pdf';
});
