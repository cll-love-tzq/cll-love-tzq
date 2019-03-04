"use strict";

function count_down() {
  var wedding_date = new Date('June 30, 2019');
  var today = new Date();
  var main = Date.parse(wedding_date) - Date.parse(today);
  var ct = {
    days: Math.floor(main / (1000 * 60 * 60 * 24)),
    hours: Math.floor(main / (1000 * 60 * 60) % 24),
    minutes: Math.floor(main / 1000 / 60 % 60),
    seconds: Math.floor(main / 1000 % 60)
  };
  console.log(main + '\n' + ct.day);
  var result = "\n        <span title=\"days\">".concat(ct.days, "</span>\n        <span title=\"hours\">").concat(ct.hours, "</span>\n        <span title=\"minutes\">").concat(ct.minutes, "</span>\n        <span title=\"seconds\">").concat(ct.seconds, "</span>\n    ");
  document.querySelector('#countDown').innerHTML = result;
}

window.onload = function () {
  document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';
  setInterval(function () {
    count_down();
  }, 1000);
};