'use strict';

const mainNav = document.querySelector('.main-nav');
const header = document.querySelector('.header');
const navBtn = document.querySelector('.btn-mobile-nav');


window.addEventListener('pagehide', (event) => {
	if (event.persisted) {
		console.log('This page *might* be entering the bfcache.');
	} else {
		console.log('This page will unload normally and be discarded.');
	}
});

navBtn.addEventListener('click', (evt) => {
	evt.preventDefault();
	header.classList.toggle('nav-open');
});


//smooth scrolling animatoin
const allLinks = document.querySelectorAll('a:link');

allLinks.forEach(function (link) {
	link.addEventListener('click', (evt) => {
		evt.preventDefault();
		const href = link.getAttribute('href');

		if (href === '#') {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			})
		}


		if (href !== '#' && href.startsWith('#')) {
			const sectionEl = document.querySelector(href);
			sectionEl.scrollIntoView({
				behavior: "smooth"
			})
		}

		if (link.classList.contains('main-nav-link')) {
			header.classList.toggle('nav-open');
		}
	})
})


//stick navigation bar///
const sectionHero = document.querySelector('.section-hero');

const observer = new IntersectionObserver(function (entries) {
	const ent = entries[0];
	if (ent.isIntersecting === false) {
		document.body.classList.add('stiky');
	}

	if (ent.isIntersecting) {
		document.body.classList.remove('stiky');
	}
}, {
	root: null,
	threshold: 0,
	rootMargin: "-80px",
});

observer.observe(sectionHero);

function checkFlexGap() {
	var flex = document.createElement('div');
	flex.style.display = 'flex';
	flex.style.flexDirection = 'column';
	flex.style.rowGap = '1px';

	flex.appendChild(document.createElement('div'));
	flex.appendChild(document.createElement('div'));

	document.body.appendChild(flex);
	var isSupported = flex.scrollHeight === 1;

	flex.parentNode.removeChild(flex);

	if (!isSupported) document.body.classList.add('no-flexbox-gap');
}

checkFlexGap();