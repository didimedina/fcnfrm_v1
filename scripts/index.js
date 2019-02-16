import anime from '../node_modules/animejs/lib/anime.es.js';
import waypoints from '../node_modules/waypoints/lib/noframework.waypoints.min.js';

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
// window.addEventListener('resize', function () {
//     getViewportWidth();
//     setBreakpoint();
//     console.log(breakpoint);
// }, false);

// setInterval(console.log(breakpoint), 500);

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


// ======= ANIMATIONS ================================
// Set body opacity to 0 and only show when DOMContentLoaded so theres no twitching.
document.body.style.opacity = 0;


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



document.addEventListener('DOMContentLoaded', function () {
    document.body.style.opacity = 1;
    // Get elements by ID and assign to variables to use as triggers with Waypoints.
    let animCurve = 'easeOutQuad'; 
    let heroAnimTrigger = document.getElementById('hero-anim-trigger');
    let servicesAnimTrigger = document.getElementById('services-anim-trigger');
    let clientsAnimTrigger = document.getElementById('testimonials');

    // ===== HERO ANIM =================

    let heroAnim = new Waypoint({
        element: heroAnimTrigger,
        handler: function () {
            console.log('hero fired!');
            anime({
                targets: ['.hero__header-container', '.hero__mission-container', '.hero__promo-video'],
                translateY: [100, 0],
                opacity: [0, 1],
                easing: animCurve,
                duration: 600,
                delay: anime.stagger(300)
            });
            this.destroy();
        },
    });

    // ===== SERVICES ANIM ==============
    anime({
        targets: ['.service-container', '.services__section-title'],
        opacity: 0,
        duration: 0
    });

    let servicesAnim = new Waypoint({
        element: servicesAnimTrigger,
        handler: function (direction) {
            console.log('services fired!');
            if (direction == 'down'){
                anime({
                    targets: '.service-container',
                    translateX: [300, 0],
                    opacity: 1,
                    easing: animCurve,
                    duration: 800,
                    delay: anime.stagger(300)
                });

                anime({
                    targets: '.services__section-title',
                    translateX: [-100, 0],
                    opacity: 1,
                    easing: animCurve,
                    duration: 800,
                })
            };
            this.destroy();
        },
        offset: '40%',
    })


    // Set starting points.
    anime({
        targets: clientsAnimTrigger.children,
        opacity: 0,
        duration: 0
    });

    // Exicute anim when scrolled into view.
    let clientsAnim = new Waypoint({
        element: clientsAnimTrigger,
        handler: function (direction) {
            console.log('clients fired!');
            if (direction == 'down') {
                anime({
                    targets: this.element.children,
                    translateX: [-100, 0],
                    opacity: [0, 1],
                    easing: animCurve,
                    duration: 400,
                    delay: anime.stagger(100)
                });
            }
            this.destroy();
        },
        offset: '50%',
    });

})
