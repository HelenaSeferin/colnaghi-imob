(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }
 
  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle ', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })


  on('click', '.bi-x ', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
  })


   on('click', '.close-menu ', function(e) {
    if ($(window).width() <= 1024) {
      select('#navbar').classList.toggle('navbar-mobile')
    }   
   })
  
  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(function() {
      preloader.remove()
    }, 1000);
    });
  }

  /**
   * Initiate  glightbox 
   */
  // const glightbox = GLightbox({
  //   selector: '.glightbox'
  // });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  $(".image-box").click(function(event) {
    var previewImg = $(this).children("img");
  
    $(this)
      .siblings()
      .children("input")
      .trigger("click");
  
    $(this)
      .siblings()
      .children("input")
      .change(function() {
        var reader = new FileReader();
  
        reader.onload = function(e) {
          var urll = e.target.result;
          $(previewImg).attr("src", urll);
          // previewImg.parent().css("background", "transparent");
          previewImg.show();
          // previewImg.siblings("p").hide();
          $('.upload-hide').hide();
        };
        reader.readAsDataURL(this.files[0]);
      });
  });
  

  $('.carousel-properties').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true
  });

  $('.carousel-bairros').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
     
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  });


  $('.slide').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    variableWidth: true,
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 3,
        }
      },      
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });


  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    slidesPerView: 3, 
    // centeredSlides: true,
    autoplay: false,
    
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });
      

  /**
   * Portfolio details slider
   */
   new Swiper('.portfolio-details-slider2', {
    speed: 400,
    loop: false,
    slidesPerView: 2, 
    // centeredSlides: true,
    autoplay: false,
    
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      2000: {
        slidesPerView: 2, 
      },
      1024: {
        slidesPerView: 2, 
      },
      768: {
        slidesPerView: 1, 
      },
     450: {
      slidesPerView: 1,
      }
    }
  });

  /**
   * FAVORITAR
   */

  $(".heart.fa").click(function() {
    $(this).toggleClass("fa-heart fa-heart-o");
  });


    /**
   * FORM ATIVAR OPÇÃO DE VISITA
   */

  $(".step-week-content .step-week").click(function() {
    $(this).toggleClass("active");
  });

  $(".step-when-content .step-when").click(function() {
    $(this).toggleClass("active");
  });

  /**
   * BOTÃO SUCESSO ENVIO NEWS
   */

  $( ".btn-news" ).click(function() {
    $( ".form-sucess" ).first().fadeIn( "slow" );
    $( ".form-news" ).hide();
  });

  $( ".form-new" ).click(function() {
    $( ".form-news" ).first().fadeIn( "slow" );
    $( ".form-sucess" ).hide();
  });

  $( "#modal-form .next" ).click(function() {
    $( "#modal-form .step-one" ).hide();
    $( "#modal-form .step-two" ).show();
  });

  $( "#modal-form .form-send" ).click(function() {
    $( "#modal-form .step-two" ).hide();
    $( "#modal-form .step-success" ).show();
  });

  $( ".product-header-item.maps" ).click(function() {
    $( ".gallery-product" ).hide();
    $( ".maps-img--active" ).show();
    $( ".maps-img" ).hide();
    $( ".photo-img--active" ).hide();
    $( ".maps-hide " ).show();
    $( ".photo-img " ).show();
    $(this).addClass('active-btn');
    $('.product-header-item.photos').removeClass('active-btn');
  });


  $( ".product-header-item.photos" ).click(function() {
    $( ".maps-hide " ).hide();
    $( ".gallery-product" ).show();
    $( ".maps-img--active" ).hide();
    $( ".photo-img--active" ).show();
    $( ".photo-img" ).hide();
    $( ".maps-img" ).show();
    $(this).addClass('active-btn');
    $('.product-header-item.maps').removeClass('active-btn');
   
  });

  $( ".block-local" ).click(function() {
    $( "#modal-form .step-one" ).hide();
    $( "#modal-form .step-two" ).show();
  });



   $(document).ready(function() { 
    $(window).bind("resize", function () {
      if ($(this).width() >= 767 &&  $(this).width() <= 1500) {
       
        $(window).on('scroll', function() {
          let height = $(document).height() -$(this).height();
          let scroll = $(this).scrollTop();
          let percent = Math.round( scroll / height *100 );
      
          if( percent <= 20 ){
            $('.product .product-box').removeClass('sticky').removeClass('bottom');
          } else {
            if( percent > 20 && percent < 50 ) {
              $('.product .product-box').removeClass('bottom').addClass('sticky');      
            } else {
              $('.product .product-box').removeClass('sticky').addClass('bottom');  
            }
          }    

        });          
          
      } else {        
          $('.product .product-box').removeClass('bottom').removeClass('sticky');      
      }

      if ($(this).width() >= 1501 ) {
        $(window).on('scroll', function() {
          let height = $(document).height() -$(this).height();
          let scroll = $(this).scrollTop();
          let percent = Math.round( scroll / height *100 );
      
          if( percent <= 20 ){
            $('.product .product-box').removeClass('sticky').removeClass('bottom');
          } else {
            if( percent > 20 && percent < 56 ) {
              $('.product .product-box').removeClass('bottom').addClass('sticky');  
            } else {
              $('.product .product-box').removeClass('sticky').addClass('bottom');  
            }
          }   
          
          if( percent <= 10 ){
            $('#section-tab ul').removeClass('sticky2').removeClass('bottom');
          } else {
            if( percent > 10 && percent < 90 ) {
              $('#section-tab ul').removeClass('bottom').addClass('sticky2');  
            } else {
              $('#section-tab ul').addClass('sticky2');  
            }
          }  
        });
      }   
    }).resize();
  })
 
  $(document).ready(function(){
    $('.slider-modal').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      autoplay: true
     
    });
  
    $('.testemonials-video').slick({
      centerMode: true,
      centerPadding: '0',
      slidesToShow: 3,
      // initialSlide: 1,
      arrows: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '0',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: true,
            centerMode: false,
            centerPadding: '20px',
            slidesToShow: 1
          }
        }
      ]
    });

  });

//  const controls = document.querySelectorAll(".tab-control");
//  const tabs = document.querySelectorAll(".tab");


//  for (let i = 1; i < tabs.length; i++) {
//    tabs[i].style.display = "none";
//  }


//  for (let i = 0; i < tabs.length; i++) {
//    tabs[i].setAttribute("value", i);
//  }

//  for (let i = 0; i < controls.length; i++) {
//    controls[i].setAttribute("value", i);
//    controls[i].addEventListener("click", displayTab);
//  }


//  function displayTab() {
//    for (let i = 0; i < tabs.length; i++) {
//      tabs[i].style.display = "none";
//      controls[i].removeAttribute("id");
//    }
//    tabs[this.value].style.display = "block";
//    controls[this.value].setAttribute("id", "control-selected");
//  }

  $(".config").click(function() {
    $("#config").show();
    $(".config").addClass('control-selected');
    $(".home, .perfect, .edit-show").removeClass('control-selected');
    $("#home, #perfect, #favs").hide();
  });

  $( ".home" ).click(function() {
    $( "#home" ).show();
    $(".home").addClass('control-selected');
    $(".config, .perfect, .edit-show, .favs-scroll").removeClass('control-selected');
    $( "#config, #perfect, #favs" ).hide();
  });

  $(".perfect" ).click(function() {
    $( "#perfect" ).show();
    $(".perfect").addClass('control-selected');
    $(".config, .home, .edit-show").removeClass('control-selected');
    $( "#home, #config,  #favs" ).hide();
  });
  
  $( ".edit-show" ).click(function() {
    $( ".form-show-edit" ).css("display", "block");
    $( ".edit-hide" ).hide();
  });

  $( ".favs-modal" ).click(function() {
    $( "#favs" ).show();
    $(".favs-modal").addClass('control-selected');
    $(".config, .home, .edit-show, .perfect").removeClass('control-selected');
    $( "#home, #config, #perfect" ).hide();
  });

  $(document).ready(function(){
    $('.open-modal').click(function(){
      $('#modal-default').modal('show');
     });
  });


  $('.gallery-slide').slick();

  $('.about-gallery-slide').slick();

  $(document).ready(function() { 
    $(window).bind("resize", function () {
      if ($(this).width() <= 1024) {

        $('.gallery').addClass('mobile-slide');
        
        $('.mobile-slide').slick({
          centerMode: true,
          slidesToShow: 3, variableWidth: true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                arrows: false,
                centerMode: true,
                slidesToShow: 3
              }
            },
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                centerMode: true,
                slidesToShow: 2
              }
            },
            {
              breakpoint: 540,
              settings: {
                arrows: false,
                centerMode: true,
                slidesToShow: 3
              }
            }
          ]
        });         
          
      } else {
          $('.gallery').removeClass('mobile-slide');
          $('.filters-box .collapse').addClass('show');
          $('.btn-collapse').hide();
      }

      if ($(this).width() <= 768) {
        // $('.district-item').addClass('district-slide');
        
        $('.district-slide').slick({
          centerMode: true,
          slidesToShow: 3, 
          variableWidth: true,
          responsive: [
          
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              slidesToShow: 2
            }
          }
          ]
      });   
    } else {
        $('.district-item').removeClass('district-slide');
    }
    }).resize();


    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      asNavFor: '.slider-nav',
     
    });
    $('.slider-nav').slick({
      slidesToShow: 10,
      slideToScroll: 1,
      asNavFor: '.slider-for',
      dots: false,
      arrows: false,
      centerMode: true,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 1900,
          settings: {
            slidesToShow: 10
          }
        },
        {
          breakpoint: 1800,
          settings: {
            slidesToShow: 9
          }
        },,
        {
          breakpoint: 1700,
          settings: {
            slidesToShow: 7
          }
        },
        {
          breakpoint: 1620,
          settings: {
            slidesToShow: 7
          }
        },
        {
          breakpoint: 1450,
          settings: {
            slidesToShow: 6,
            centerPadding: '40px',
            centerMode: true,
          }
        },
        ,
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 5,
            centerPadding: '20px',
            centerMode: true,
          }
        },
        
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            centerPadding: '10px',
            centerMode: true,
          }
        },
        
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 4,
            centerPadding: '5px',
            centerMode: true,
          }
        },
        
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 3,
            centerPadding: '5px',
            centerMode: true,
          }
        },
        
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            centerPadding: '5px',
            centerMode: true,
          }
        }
      ]
    });

    function multiplyNode(node, count, deep) {
      for (var i = 0, copy; i < count - 1; i++) {
        copy = node.cloneNode(deep);
        node.parentNode.insertBefore(copy, node);
      }
    }
  
    multiplyNode(document.querySelector('.district-box'), 20, true);
  })
 
   $(".register-data-modal").click(function() {
     $(".register-data").show();   
     $(".register-login, .register-email, .register-password ").hide();
   });

   $(".register-email-modal").click(function() {
    $(".register-email").show();   
    $(".register-login, .register-data, .register-password ").hide();
  });

  $(".register-password-modal").click(function() {
    $(".register-password").show();   
    $(".register-login, .register-email, .register-data ").hide();
  });

  $(".register-login-modal").click(function() {
    $(".register-login").show();   
    $(".register-password, .register-email, .register-data ").hide();
  });


  
})()