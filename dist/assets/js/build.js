(function() {
  var el, element, fn, fn1, i, j, len, len1, navElements, navigation, scrollElements, scrollTo, switcher, toTopButton;

  scrollTo = function(element, to, duration) {
    var difference, perTick;
    if (duration < 0) {
      return;
    }
    difference = to - element.scrollTop;
    perTick = difference / duration * 10;
    return setTimeout((function() {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) {
        return;
      }
      return scrollTo(element, to, duration - 10);
    }), 10);
  };

  switcher = document.querySelector("#header-nav-switcher");

  navigation = document.querySelector("#header-nav nav");

  navElements = navigation.querySelectorAll("a");

  switcher.addEventListener("click", function(event) {
    var newState, state;
    state = switcher.getAttribute("data-state");
    newState = state === "on" ? "off" : "on";
    switcher.setAttribute("data-state", newState);
    return navigation.setAttribute("data-state", newState);
  });

  fn = function(element) {
    return element.addEventListener("click", function(event) {
      var section, sectionId;
      sectionId = element.getAttribute("href");
      section = document.querySelector(sectionId);
      if (section) {
        event.preventDefault();
        return scrollTo(document.body, section.offsetTop, 300);
      }
    });
  };
  for (i = 0, len = navElements.length; i < len; i++) {
    element = navElements[i];
    fn(element);
  }

  scrollElements = document.querySelectorAll(".scroll-down");

  fn1 = function(el) {
    return el.addEventListener("click", function() {
      var nextSection, nextSectionId;
      nextSectionId = el.getAttribute("data-next");
      nextSection = document.querySelector(nextSectionId);
      if (nextSection) {
        return scrollTo(document.body, nextSection.offsetTop, 300);
      }
    });
  };
  for (j = 0, len1 = scrollElements.length; j < len1; j++) {
    el = scrollElements[j];
    fn1(el);
  }

  toTopButton = document.querySelector("#back-to-top");

  toTopButton.addEventListener("click", function() {
    return scrollTo(document.body, 0, 300);
  });

}).call(this);
