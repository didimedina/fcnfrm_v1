import anime from '../node_modules/animejs/lib/anime.es.js';

console.log('hello world');
let promoVideoCTA = document.querySelector('.promo-video__img-placeholder');

promoVideoCTA.addEventListener('click', () => {
    console.log('click!');
    promoVideoCTA.style.visibility = "hidden";
    document.querySelector('.promo-video__embed').src = 'https://www.youtube.com/embed/3s3UeXjzO74?autoplay=1&controls=1';
    anime({
        targets: '.hero__promo-video',
        scale: [1, 1.05],
        easing: 'spring(1, 80, 10, 0)',
        duration: 500
    });
})





