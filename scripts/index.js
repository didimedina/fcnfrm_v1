import anime from 'animejs/lib/anime.es';
import waypoints from 'waypoints/lib/noframework.waypoints.min';

// Define our viewportWidth variable
let viewportWidth;
let breakpoint;
let lastBreakpoint = 'unset';

// Set/update the viewportWidth value
let getViewportWidth = function () {
    viewportWidth = window.innerWidth || document.documentElement.clientWidth;
}

// Log the viewport width into the console
let setBreakpoint = function () {
    if (viewportWidth >= 1536) {
        breakpoint = 'xl-screen';
    } else if (viewportWidth >= 896 && viewportWidth < 1536) {
        breakpoint = 'l-screen';
    } else if (viewportWidth >= 512 && viewportWidth < 896) {
        breakpoint = 'm-screen';
    } else if (viewportWidth >= 320 && viewportWidth < 512) {
        breakpoint = 's-screen';
    } else {
        console.log('Not supported -- too small')
    }
}

// Set our initial breakpoint
getViewportWidth();
setBreakpoint();


// ======= ANIMATIONS ================================
// Set body opacity to 0 and only show when DOMContentLoaded so theres no twitching.
document.body.style.opacity = 0;

let animCurve = 'easeOutQuad';
var isInViewport = function (element) {
    var bounding = element.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

var isPeakingInViewport = function (element, threshold) {
    let boundingTop = document.querySelector(element).getBoundingClientRect().top;
    return (
        boundingTop < window.innerHeight / threshold
    );
};

// window.addEventListener('scroll', function (){
//     console.log(isPeakingInViewport('.hero__promo-video', 1.1))
// }, false);

// =================================================
// === HERO ANIM ===================================
// =================================================
const runHeroAnim = function(){
    let heroAnimTrigger = document.getElementById('hero-anim-trigger');

    let heroAnim = new Waypoint({
        element: heroAnimTrigger,
        handler: function () {
            anime({
                targets: ['.hero__header-container', '.hero__mission-container', '.hero__promo-video'],
                translateY: [100, 0],
                opacity: [0, 1],
                easing: animCurve,
                duration: 1600,
                delay: anime.stagger(300)
            });
            this.destroy();
        },
    });
}; 


// =================================================
// === SERVICES ANIM ===============================
// =================================================
const runServicesAnim = function() {
    let servicesAnimTrigger = document.getElementById('services-anim-trigger');

    anime({
        targets: ['.service-container', '.services__section-title'],
        opacity: 0,
        duration: 0
    });

    let servicesAnim = new Waypoint({
        element: servicesAnimTrigger,
        handler: function () {
            console.log(' we inservices');
            let tl = anime.timeline({
                easing: animCurve,
                duration: 1200
            })
            tl.add({
                targets: '.service-container',
                translateX: [160, 0],
                opacity: 1,
                delay: anime.stagger(300)
            }) 
            .add({
                targets: '.services__section-title',
                opacity: 1,
                translateX: [-100, 0],
            }, 200)
            this.destroy();
        },
        offset: '60%',
    })
};


// =================================================
// === CLIENTS ANIM ================================
// =================================================
const runClientsAnim = function () {
    let clientsAnimTrigger = document.querySelector('.clients-anim-trigger');
    let testimonials = document.getElementById('testimonials');

    anime({
        targets: [testimonials.children, '.clients__section-title', '.clients__section-headline', '.client-logo'],
        opacity: 0,
        duration: 0
    });

    let clientsAnim = new Waypoint({
        element: clientsAnimTrigger,
        handler: function () {
            let tl = anime.timeline({
                easing: animCurve,
                duration: 800,
            })
            tl
            .add({
                targets: '.clients__section-headline',
                opacity: 1,
                scale: [1.3, 1.3],
                translateY: [200, 200],
                duration: 800,
            })
            .add({
                targets: '.clients__section-headline',
                scale: 1,
                translateY: 0,
                duration: 800,
            })
            .add({
                targets: '.clients__section-title',
                opacity: 1,
                duration: 800,
            }, "-=400")
            .add({
                targets: testimonials.children,
                opacity: 1,
                translateX: [100, 0],
                duration: 800,
                delay: anime.stagger(200)
            }, '-=800')
            .add({
                targets: '.client-logo',
                opacity: 1,
                scale: [1.1, 1],
                duration: 400,
                delay: anime.stagger(200)
            }, '-=800')
            this.destroy();
        },
        offset: '40%',
    });

};

// =================================================
// === TEAM ANIM ===================================
// =================================================
const runTeamAnim = function (){
    let teamAnimTrigger = document.querySelector('.team-anim-trigger');

    anime({
        targets: ['.member-container', '.team__section-title'],
        opacity: 0,
        duration: 0
    });

    let teamAnim = new Waypoint({
        element: teamAnimTrigger,
        handler: function(){
            let tl = anime.timeline({
                easing: animCurve,
            })
            tl.add({
                targets: '.member-container',
                scale: [0.8, 1],
                translateY: [160, 0],
                opacity: 1,
                duration: 600,
                delay: anime.stagger(200)
            })
            .add({
                targets: '.team__section-title',
                duration: 1200,
                opacity: 1
            }, 300)
            this.destroy();
        },
        offset: '50%'
    })
}

const runPrinciplesAnim = function () {
    let principlesAnimTrigger = document.querySelector('.principles-anim-trigger');

    anime({
        targets: ['.principles__section-heading-container', '.principle-container'],
        opacity: 0,
        duration: 0
    })

    let principlesAnim = new Waypoint({
        element: principlesAnimTrigger,
        handler: function () {
            let tl = anime.timeline({
                easing: animCurve,
                duration: 1200
            });

            tl.add({
                targets: '.principles__section-heading-container',
                opacity: 1,
                translateX: [-100, 0],
            })
            .add({
                targets: '.principle-container',
                opacity: 1,
                scale: [0.9, 1],
                delay: anime.stagger(300)
            }, 400)
            this.destroy();
        },
        offset: '40%'
    })
}

// =================================================
// === ANIM CONTROLLER =============================
// =================================================
const runAnims = function () {
    // Check if breakpoint has changed then run scripts.
    if (lastBreakpoint == 'unset' || lastBreakpoint != breakpoint) {
        runHeroAnim();
        runServicesAnim();
        runClientsAnim();
        runTeamAnim();
        runPrinciplesAnim();
        
        // Update last breakpoint after anim run.
        lastBreakpoint = breakpoint;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.body.style.opacity = 1;
    runAnims();
}, false);
window.addEventListener('resize', function(){
    getViewportWidth();
    setBreakpoint();
    runAnims();
}, false);

