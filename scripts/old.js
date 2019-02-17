// let promoVideoCTA = document.querySelector('.promo-video__img-placeholder');

// promoVideoCTA.addEventListener('click', function () {
//     getViewportWidth();
//     setBreakpoint();

//     promoVideoCTA.style.visibility = "hidden";
//     document.querySelector('.promo-video__embed').src = 'https://www.youtube.com/embed/3s3UeXjzO74?autoplay=1&controls=1';

//     if (breakpoint == 'xl-screen' || breakpoint == 'l-screen') {
//         anime({
//             targets: '.hero__promo-video',
//             scale: [1, 1.05],
//             easing: 'spring(1, 80, 10, 0)',
//             duration: 500
//         });
//     }

//     window.addEventListener('resize', function () {
//         getViewportWidth();
//         setBreakpoint();
//         if (breakpoint == 'm-screen' || breakpoint == 's-screen') {
//             anime({
//                 targets: '.hero__promo-video',
//                 scale: 1,
//                 easing: 'spring(1, 80, 10, 0)',
//                 duration: 200
//             });
//         } 
//     });
// })