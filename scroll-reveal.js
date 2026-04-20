(function () {
  "use strict";

  var nodes = document.querySelectorAll(".scroll-reveal");
  if (!nodes.length) return;

  function revealAll() {
    nodes.forEach(function (el) {
      el.classList.add("scroll-reveal--visible");
    });
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealAll();
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealAll();
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("scroll-reveal--visible");
        io.unobserve(entry.target);
      });
    },
    // Slightly softer trigger helps bottom elements (like footer) reveal
    // consistently on very wide/tall viewports.
    { root: null, rootMargin: "0px 0px -2% 0px", threshold: 0.05 }
  );

  nodes.forEach(function (el) {
    io.observe(el);
  });
})();
