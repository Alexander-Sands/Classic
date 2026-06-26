// JavaScript (ES6+)
// ====================================================

document.addEventListener('DOMContentLoaded', () => {
    const Navbar = document.querySelector('#navbar');
    const myHeader = document.querySelector('.header');

    myHeader.style.height = `${window.innerHeight}px`;

    // ====================================================
    
    window.addEventListener('resize', function () {
        myHeader.style.height = `${window.innerHeight}px`;
    });

    // ====================================================

    const menu = document.querySelector('.navbar .links');
    const menuBtn = document.querySelector('.toggle-menu');
    const overlay = document.querySelector('.menu-overlay');
    const icon = menuBtn.querySelector('i');

    menu.addEventListener('click', e => {
        // e.preventDefault();

        const link = e.target.closest('a');
        if (!link) return;

        // Active Link
        menu.querySelector('.active')?.classList.remove('active');
        link.parentElement.classList.add('active');

        // Smooth Scroll
        // document.getElementById(link.dataset.value)
        // ?.scrollIntoView({
        //     behavior: 'smooth'
        // });
    });

    // Toggle Menu
    // ---------------------------
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('open');
        overlay.classList.toggle('show');

        if (menu.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    function closeMenu() {
        menu.classList.remove('open');
        overlay.classList.remove('show');

        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }

    overlay.addEventListener('click', closeMenu);
    document.querySelectorAll('.links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ====================================================

    // Swiper
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        speed: 800,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // scrollbar: {
        //     el: '.swiper-scrollbar',
        // },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });

    // ====================================================

    // Auto Slider [Testimonials]
    const slides = document.querySelectorAll('.slider2 .slide');
    let current = 0;
    const delay = 4000;

    function showSlide(nextIndex) {
        const currentSlide = slides[current];
        const nextSlide = slides[nextIndex];

        currentSlide.style.opacity = '0';

        setTimeout(() => {
            currentSlide.classList.remove('active');
            currentSlide.style.display = 'none';

            nextSlide.style.display = 'block';
            nextSlide.offsetHeight;

            nextSlide.classList.add('active');
            nextSlide.style.opacity = '1';

            current = nextIndex;
        }, 600);
    }

    function nextSlide() {
        let next = (current + 1) % slides.length;
        showSlide(next);
    }

    // slides.forEach(s => {
    //     s.style.display = 'none';
    //     s.style.opacity = '0';
    // });

    // slides[0].style.display = 'block';
    // slides[0].classList.add('active');
    // slides[0].style.opacity = '1';
    
    let interval = setInterval(nextSlide, delay);

    document.querySelector(".slider2").addEventListener("mouseenter", () => {
        clearInterval(interval);
    });

    document.querySelector(".slider2").addEventListener("mouseleave", () => {
        interval = setInterval(nextSlide, delay);
    });

    // ====================================================

    // JS (FLIP Shuffle)
    // ---------------------------------------------------
    // const filters = document.querySelectorAll(".filter");
    // const items = [...document.querySelectorAll(".mix")];
    // filters.forEach(filter => {
    //     filter.addEventListener("click", () => {
    //         // Prevent re-execution on the same filter
    //         if (filter.classList.contains("selected")) return;
    //         // Active Button
    //         document
    //             .querySelector(".filter.selected")
    //             ?.classList.remove("selected");
    //         filter.classList.add("selected");
    //         const selector = filter.dataset.filter;
    //         // Cancel all previous actions
    //         items.forEach(item => {
    //             item.getAnimations().forEach(anim => anim.cancel());
    //         });
    //         // FIRST
    //         const firstRects = new Map();
    //         items.forEach(item => {
    //             firstRects.set(
    //                 item,
    //                 item.getBoundingClientRect()
    //             );
    //         });
    //         // Filter application
    //         items.forEach(item => {
    //             const shouldShow =
    //                 selector === "all" ||
    //                 item.matches(selector);
    //             item.dataset.show = shouldShow;
    //             if (shouldShow) {
    //                 item.style.display = "";
    //             }
    //         });
    //         // Allow the browser to recalculate the layout.
    //         requestAnimationFrame(() => {
    //             // FLIP
    //             items.forEach((item, index) => {
    //                 if (item.dataset.show !== "true") return;
    //                 const first = firstRects.get(item);
    //                 const last = item.getBoundingClientRect();
    //                 const dx = first.left - last.left;
    //                 const dy = first.top - last.top;
    //                 item.animate(
    //                     [
    //                         {
    //                             transform: `translate(${dx}px, ${dy}px)`
    //                         },
    //                         {
    //                             transform: "translate(0,0)"
    //                         }
    //                     ],
    //                     {
    //                         duration: 650,
    //                         delay: index * 25,
    //                         easing: "cubic-bezier(.22,1,.36,1)"
    //                     }
    //                 );
    //             });
    //             // SHOW ITEMS
    //             items.forEach(item => {
    //                 if (item.dataset.show === "true") {
    //                     item.animate(
    //                         [
    //                             {
    //                                 opacity: 0,
    //                                 transform: "scale(.9)"
    //                             },
    //                             {
    //                                 opacity: 1,
    //                                 transform: "scale(1)"
    //                             }
    //                         ],
    //                         {
    //                             duration: 350,
    //                             easing: "ease-out"
    //                         }
    //                     );
    //                 }
    //             });
    //             // HIDE ITEMS
    //             items.forEach(item => {
    //                 if (item.dataset.show !== "true") {
    //                     const hideAnim = item.animate(
    //                         [
    //                             {
    //                                 opacity: 1,
    //                                 transform: "scale(1)"
    //                             },
    //                             {
    //                                 opacity: 0,
    //                                 transform: "scale(.85)"
    //                             }
    //                         ],
    //                         {
    //                             duration: 250,
    //                             easing: "ease-in",
    //                             fill: "forwards"
    //                         }
    //                     );
    //                     hideAnim.onfinish = () => {
    //                         if (item.dataset.show === "false") {
    //                             item.style.display = "none";
    //                         }
    //                     };
    //                 }
    //             });
    //         });
    //     });
    // });

    // ====================================================

    // Projects Section // MixItUP
    const toggle = document.querySelector(".filter-toggle");
    const sheet = document.querySelector(".filter-sheet");
    const filterOverlay = document.querySelector(".filter-overlay");
    const closeBtn = document.querySelector(".close-filter");
    const filterTitle = document.querySelector(".filter-title");
    const shuffleContainer = document.querySelector(".shuffle");
    const allItem = document.querySelector(".projects-filters li.all");
    const boxShuffle = document.querySelector("#box-shuffle");

    const mixer = mixitup(boxShuffle, {
        selectors: {
            target: '.mix'
        },
        animation: {
            duration: 400,
            effects: 'fade scale(0.95)',
            easing: 'ease'
        }
    });

    // open / close sheet
    const open = () => { 
        sheet.classList.add("show") 
        filterOverlay.classList.add("show")
    };
    const close = () => {
        sheet.classList.remove("show")
        filterOverlay.classList.remove("show")
    };

    // update UI
    const setActive = (item) => {
        document.querySelector(".shuffle li.selected")?.classList.remove("selected");
        item.classList.add("selected");
        filterTitle.textContent = item.textContent.trim();
    };

    // reset
    const reset = () => {
        mixer.filter("all");
        setActive(allItem);
    };

    // events
    toggle.onclick = open;
    closeBtn.onclick = filterOverlay.onclick = close;

    shuffleContainer.addEventListener("click", (e) => {
        const item = e.target.closest("li");
        if (!item) return;

        if (item.classList.contains("selected")) {
            reset();
        } else {
            mixer.filter(item.dataset.filter);
            setActive(item);
        }

        close();
    });

});

// ***********************************************************************************************************
// ***********************************************************************************************************

// JQuery Code 
// ====================================================

// /*global $, alert, console*/
// $(function () {
//     'use strict';
    
//     let myHeader = $('.header');
//     let mySlider = $('.slider');

//     myHeader.height($(window).height());

//     // ====================================================

//     $(window).resize(function () {
//         myHeader.height($(window).height());
        
//         // Adjust Bx Slider List Item Center || TODO: classic.css
//         mySlider.each(function () {
//             $(this).css('top', 50% + (myHeader.height() - $('.slider li').height()) / 2);
//         });
//     });  

//     // ====================================================

//     $('.navbar .links li a').click(function (e) {
//         // e.preventDefault();
        
//         // Changing active element
//         // ---------------------------
//         $(this).parent().addClass('active').siblings().removeClass('active');
        
//         // Smooth Scroll To Div || TODO: classic.css
//         // ---------------------------
//         // $('html, body').animate({
//         //     scrollTop: $('#' + $(this).data('value')).offset().top
//         // }, 1000);
//     });

//     // Toggle Menu
//     // ---------------------------
//     $('.navbar .toggle-menu').click(function (e) {
//         e.preventDefault();
//         // Links Add Active Class
//         $('.navbar .links').fadeToggle(500);
//     });

//     // ====================================================

//     // Trigger The Bx Slider
//     // ---------------------------
//     mySlider.bxSlider({
//         pager: false
//     });

//     // Adjust Bx Slider List Item Center || TODO: classic.css
//     mySlider.each(function () {
//         $(this).css('paddingTop', (myHeader.height() - $('.slider li').height()) / 2);
//     });
    
//     // ====================================================

//     // Auto Slider [Testimonials]
//     // ---------------------------
//     (function autoSlider() {
//         $('.slider2 .active').each(function () {  
//             if (!$(this).is(':last-child')) {    
//                 $(this).delay(4000).fadeOut(500, function () {
//                     $(this).removeClass('active').next().addClass('active').fadeIn(500);
//                     autoSlider();
//                 });
//             } else {
//                 $(this).delay(4000).fadeOut(500, function () {
//                     $(this).removeClass('active');
//                     $('.slider2 div').eq(0).addClass('active').fadeIn(500);
//                     autoSlider();
//                 });
//             }
//         });
//     }());

//     // ====================================================

//     // Trigger MixitUp - [Shuffle Plugin]
//     let BoxShuffle = $('#box-shuffle');
//     let mixer = mixitup(BoxShuffle);

//     // Adjust Shuffle Links    
//     $('.shuffle li').click(function () {
//         $(this).addClass('selected').siblings().removeClass('selected');
//     });

//     // ====================================================

//     // Trigger Nice Scroll || TODO: classic.css
//     // $('html').niceScroll({
//     //     cursorcolor: '#4fd0ff',
//     //     cursorwidth: '5px',
//     //     cursorborder: '1px solid #4fd0ff',
//     //     cursorborderradius: '8px',
//     //     zindex: 5
//     // }); 

// });