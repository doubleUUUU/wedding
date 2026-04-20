(function () {
  "use strict";

  var target = new Date(2026, 5, 13, 0, 0, 0);

  function plural(n, one, few, many) {
    var mod10 = n % 10;
    var mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
    return many;
  }

  var root = document.getElementById("countdown");
  if (!root) return;

  var valueEls = {
    days: root.querySelector('[data-countdown="days"]'),
    hours: root.querySelector('[data-countdown="hours"]'),
    minutes: root.querySelector('[data-countdown="minutes"]'),
    seconds: root.querySelector('[data-countdown="seconds"]'),
  };

  var labelEls = {
    days: root.querySelector('[data-countdown-label="days"]'),
    hours: root.querySelector('[data-countdown-label="hours"]'),
    minutes: root.querySelector('[data-countdown-label="minutes"]'),
    seconds: root.querySelector('[data-countdown-label="seconds"]'),
  };

  function tick() {
    var now = new Date();
    var diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      valueEls.days.textContent = "0";
      valueEls.hours.textContent = "00";
      valueEls.minutes.textContent = "00";
      valueEls.seconds.textContent = "00";
      labelEls.days.textContent = "дней";
      labelEls.hours.textContent = "часов";
      labelEls.minutes.textContent = "минут";
      labelEls.seconds.textContent = "секунд";
      root.setAttribute("aria-label", "Наступил день свадьбы");
      return;
    }

    var totalSec = Math.floor(diff / 1000);
    var d = Math.floor(totalSec / 86400);
    totalSec -= d * 86400;
    var h = Math.floor(totalSec / 3600);
    totalSec -= h * 3600;
    var m = Math.floor(totalSec / 60);
    var s = totalSec - m * 60;

    valueEls.days.textContent = String(d);
    valueEls.hours.textContent = String(h).padStart(2, "0");
    valueEls.minutes.textContent = String(m).padStart(2, "0");
    valueEls.seconds.textContent = String(s).padStart(2, "0");

    labelEls.days.textContent = plural(d, "день", "дня", "дней");
    labelEls.hours.textContent = plural(h, "час", "часа", "часов");
    labelEls.minutes.textContent = plural(m, "минута", "минуты", "минут");
    labelEls.seconds.textContent = plural(s, "секунда", "секунды", "секунд");

    root.setAttribute(
      "aria-label",
      "До свадьбы: " +
        d +
        " " +
        labelEls.days.textContent +
        ", " +
        h +
        " " +
        labelEls.hours.textContent
    );
  }

  tick();
  setInterval(tick, 1000);
})();
