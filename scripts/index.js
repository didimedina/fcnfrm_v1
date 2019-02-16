import anime from '../node_modules/animejs/lib/anime.es.js';

// Define our viewportWidth variable
let viewportWidth;
let breakpoint;

// Set/update the viewportWidth value
let getViewportWidth = function () {
    viewportWidth = window.innerWidth || document.documentElement.clientWidth;
}

// Log the viewport width into the console
let setBreakpoint = function () {
    if (viewportWidth >= 1536) {
        // console.log('xl-screen');
        breakpoint = 'xl-screen';
        // return 'xl-screen';
    } else if (viewportWidth >= 896 && viewportWidth < 1536) {
        // console.log('l-screen');
        breakpoint = 'l-screen';
        // return 'l-screen';
    } else if (viewportWidth >= 512 && viewportWidth < 896) {
        // console.log('m-screen');
        breakpoint = 'm-screen';
        // return 'm-screen';
    } else if (viewportWidth >= 320 && viewportWidth < 512) {
        // console.log('s-screen');
        breakpoint = 's-screen';
        // return 's-screen';
    } else {
        console.log('Not supported -- too small')
    }
}

// Set our initial width and log it
getViewportWidth();
setBreakpoint();

// On resize events, recalculate and log
// let onResize = function() { 
//     window.addEventListener('resize', function () {
//         setViewportWidth();
//         let breakpoint = returnBreakpoint();
//         console.log(breakpoint);
//     }, false);
// }

// if (onResize() == 'l-screen') {
//     console.log('its working');
// };
// This isn't working, but what im attempting to do is create a function that could be compared per instance that
// way I could set the conditions per animation vs wrapping them all in one resize eventListener. also i wont have to write all the syntax all the time.



let promoVideoCTA = document.querySelector('.promo-video__img-placeholder');

promoVideoCTA.addEventListener('click', function () {
    getViewportWidth();
    setBreakpoint();


    promoVideoCTA.style.visibility = "hidden";
    document.querySelector('.promo-video__embed').src = 'https://www.youtube.com/embed/3s3UeXjzO74?autoplay=1&controls=1';

    if (breakpoint == 'xl-screen' || breakpoint == 'l-screen') {
        anime({
            targets: '.hero__promo-video',
            scale: [1, 1.05],
            easing: 'spring(1, 80, 10, 0)',
            duration: 500
        });
    }

    window.addEventListener('resize', function () {
        getViewportWidth();
        setBreakpoint();
        if (breakpoint == 'm-screen' || breakpoint == 's-screen') {
            anime({
                targets: '.hero__promo-video',
                scale: 1,
                easing: 'spring(1, 80, 10, 0)',
                duration: 200
            });
        } 
    });
})
