"use strict";

function count_down() {
  var wedding_date = new Date('June 30, 2019');
  var today = new Date();
  var main = Date.parse(wedding_date) - Date.parse(today);
  var ct = {
    day: Math.floor(main / (1000 * 60 * 60 * 24)),
    hour: Math.floor(main / (1000 * 60 * 60) % 24),
    minutes: Math.floor(main / 1000 / 60 % 60),
    seconds: Math.floor(main / 1000 % 60)
  };
  console.log(main + '\n' + ct.day);
  document.querySelector('#countDown').innerHTML = "\u8DDD\u79BB\u5A5A\u793C\u8FD8\u6709".concat(ct.day, "\u5929").concat(ct.hour, "\u5C0F\u65F6").concat(ct.minutes, "\u5206\u949F").concat(ct.seconds, "\u79D2");
}

window.onload = function () {
  setInterval(function () {
    count_down();
  }, 1000);
};