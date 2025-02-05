jQuery(document).ready(function ($) {
    var $card = $(".Red");
    var $container = $(".cardHover");
    $container.on("mousemove", function (e) {
      $card.css("transform", `rotateY(30deg) rotateX(0deg)`);
    });
    $container.hover(function () {
      $card.toggleClass("has-transform");
    });
    $container.on("mouseleave", function () {
      $card.css("transform", `rotateY(0deg) rotateX(0deg)`);
    });
  });
  jQuery(document).ready(function ($) {
    var $card = $(".blueBH");
    var $container = $(".cardHover1");
    $container.on("mousemove", function (e) {
      $card.css("transform", `rotateY(30deg) rotateX(0deg)`);
    });
    $container.hover(function () {
      $card.toggleClass("has-transform");
    });
    $container.on("mouseleave", function () {
      $card.css("transform", `rotateY(0deg) rotateX(0deg)`);
    });
  });

  // function changeZIndex(element) {
  //     // Toggle the 'active' class on the clicked .venueBox
  //     console.log("kdjfk");
  //     const venueBox = document.querySelector(".enteBox");
  //     venueBox.classList.remove("active");
  //     element.classList.toggle("active");
  // }

  // function changeZIndexEnt(element) {
  //     // Toggle the 'active' class on the clicked .venueBox
  //     console.log("kdjfk");
  //     const venueBox = document.querySelector(".venueBox");
  //     venueBox.classList.remove("active");
  //     element.classList.toggle("active");
  // }
  function changeZIndex(element) {
    console.log("Venue clicked");

    // Select both elements
    const venueBox = document.querySelector(".venueBox");
    const enteBox = document.querySelector(".enteBox");

    // Remove 'active' class from entertainers
    enteBox.classList.remove("active");
    enteBox.classList.add("flot");
    enteBox.classList.remove("right7");

    // Toggle 'active' class for the clicked venue
    //element.classList.toggle("active");
    element.classList.add("active");
    // Adjust classes based on 'active' state
  
  }

  function changeZIndexEnt(element) {
    console.log("Entertainers clicked");

    // Select both elements
    const venueBox = document.querySelector(".venueBox");
    const enteBox = document.querySelector(".enteBox");

    // Remove 'active' class from venue
    venueBox.classList.remove("active");
    venueBox.classList.add("flot");
    venueBox.classList.remove("right7");

    // Toggle 'active' class for the clicked entertainer
    //element.classList.toggle("active");
    element.classList.add("active");
    // Adjust classes based on 'active' state
  
  }


      $(document).ready(function () {
        // Logo Slider
        $("#logoSlider").owlCarousel({
          loop: true,
          margin: 30,
          autoplay: true,
          autoplayTimeout: 2000,
          autoplayHoverPause: true,
          responsive: {
            0: { items: 2 },
            600: { items: 3 },
            1000: { items: 5 },
          },
        });
    
        // Testimonial Slider
        $("#testimonialSlider").owlCarousel({
          loop: true,
          margin: 15,
          nav: true,
          dots: false,
          autoplay: true,
          autoplayTimeout: 3000,
          responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 4 },
          },
        });
      });

      const container = document.querySelector(".visonWrap");
      console.log("elemHeight");
      container.addEventListener("click", (event) => {
        const box1 = document.querySelector(".aboutUser1");
        const box2 = document.querySelector(".aboutUser2");
        if (event.target === box2) {
          box1.classList.remove("aboutUser1");
          box1.classList.add("aboutUser2");
          box2.classList.remove("aboutUser2");
          box2.classList.add("aboutUser1");
        } else if (event.target.closest(".aboutUser2")) {
          box1.classList.remove("aboutUser1");
          box1.classList.add("aboutUser2");
          box2.classList.remove("aboutUser2");
          box2.classList.add("aboutUser1");
        }
        // var elemHeight = box1.offsetHeight;
    
        // box2.style.marginTop = "-39px";
      });
    
      function fixAboutUser() {
        const box1h = document.querySelector(".aboutUser1");
        const box2h = document.querySelector(".aboutUser2");
        var box1Height = box1h.offsetHeight;
        var box2Height = box2h.offsetHeight;
        var lessheight = box1Height;
        if (box2Height < box1Height) {
          lessheight = box2Height;
        }
        console.log(box1Height, box2Height, lessheight);
        box2.style.marginTop = "-" + lessheight + "px";
      }
      fixAboutUser();