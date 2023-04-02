"use strict";

function count_down() {
  var wedding_date = new Date('May 18, 2023');
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
  document.querySelector('#countDown').insertAdjacentHTML('beforeend', result);
}

fetch('/js/data.json').then(function (res) {
  return res.json();
}).then(function (initData) {
  console.log(initData);
  var wi = new Vue({
    el: "#wedding_invitaiton",
    data: initData,
    filters: {
      uppercase: function uppercase(value) {
        if (!value) return '';
        value = value.toUpperCase();
        return value;
      }
    },
    methods: {
      countDownFunc: function countDownFunc() {
        var wedding_date = new Date('May 18, 2023');
        var today = new Date();
        var main = Date.parse(wedding_date) - Date.parse(today);
        var thisCountDown = this.countDown;
        thisCountDown.days.value = Math.floor(main / (1000 * 60 * 60 * 24));
        thisCountDown.hours.value = Math.floor(main / (1000 * 60 * 60) % 24);
        thisCountDown.minutes.value = Math.floor(main / 1000 / 60 % 60);
        thisCountDown.seconds.value = Math.floor(main / 1000 % 60);
      },
      _countDownFunc: function _countDownFunc() {
        var that = this;
        setInterval(function () {
          that.countDownFunc();
        }, 1000);
      },
      timeline: function timeline(top) {
        var timeline_rows = Array.from(document.querySelectorAll('.timeline_row'));
        timeline_rows.forEach(function (t, i) {
          if (t.offsetTop < top - t.offsetHeight - 100) {
            t.classList.add('flipInX');
          }
        });

        if (top > document.getElementById('dot1').offsetTop) {
          document.getElementsByClassName('photos')[0].classList.add('active');
        }
      },
      choosePic: function choosePic(index) {
        var ctrls = Array.from(document.querySelectorAll('.gallery_ctrls'));
        var pictures = Array.from(document.querySelectorAll('.photos'));
        ctrls.forEach(function (c, i) {
          c.classList.remove('active');
        });
        pictures.forEach(function (c, i) {
          c.classList.remove('active');
        });
        ctrls[index].classList.add('active');
        pictures[index].classList.add('active');
      },
      loadResources: function loadResources() {
        var _this = this;

        var images_array = [this.couple_info.groom.avatar, this.couple_info.bride.avatar, "/img/timelineBg.jpg", "/img/bg.jpg"];
        this.gallery.forEach(function (item, index) {
          images_array.push(item.src);
        });
        console.log(images_array);
        var loadedNum = 0;
        images_array.forEach(function (src) {
          var image = new Image();
          image.src = src;
          image.addEventListener('load', function () {
            loadedNum++;
            console.log(loadedNum + "--" + images_array.length);

            if (loadedNum == images_array.length) {
              var wattingForHide = Array.from(document.getElementsByClassName('wattingForHide'));
              var wattingForHideNum = 0;
              wattingForHide.forEach(function (ele, i) {
                ele.classList.remove('tada', 'infinite');
                ele.classList.add('fadeOut');
                wattingForHideNum++;
              });

              if (wattingForHideNum == wattingForHide.length) {
                document.getElementById('bgm').oncanplaythrough = setTimeout(function () {
                  wattingForHide.forEach(function (ele, i) {
                    ele.style.display = 'none';
                  });
                  document.querySelector('.playH5').classList.add('fadeIn');
                  document.querySelector('.playH5').style.display = 'block';

                  document.querySelector('.playH5').onclick = function () {
                    document.getElementById('bgm').play();
                    document.getElementById('musicControl').classList.add('active');
                    _this.noReady = true;
                    document.querySelector('#ready').style.opacity = 0;
                    setTimeout(function () {
                      document.querySelector('#ready').remove();
                    }, 500);
                  };
                }, 1500);
              }
            }
          });
        });
      },
      throttle: function throttle(fun, delay) {
        var last, deferTimer;
        return function (args) {
          var that = this;
          var _args = arguments;
          var now = +new Date();

          if (last && now < last + delay) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
              last = now;
              fun.apply(that, _args);
            }, delay);
          } else {
            last = now;
            fun.apply(that, _args);
          }
        };
      }
    },
    created: function created() {
      console.log(this.data);
      this.loadResources();

      if (document.body.clientWidth <= 580) {
        document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 12 + 'px';
        console.log('mobile');
      } else if (document.body.clientWidth <= 1000) {
        document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 15 + 'px';
        console.log('tablet');
      } else {
        document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 20 + 'px';
        console.log('pc');
      }

      document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';

      this._countDownFunc();

      window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        wi.throttle(wi.timeline(scrollTop), 2000);
      };
    },
    mounted: function mounted() {
      Array.from(document.querySelectorAll('.phone')).forEach(function (p, i) {
        console.log(p);

        p.onclick = function () {
          console.log(p.getAttribute('title'));
          window.open("tel:" + p.getAttribute('title'));
        };
      });
    }
  });
});
var musicStatus = true;

function musicControl() {
  if (musicStatus) {
    document.getElementById('bgm').pause();
    document.getElementById('musicControl').classList.remove('active');
  } else {
    document.getElementById('bgm').play();
    document.getElementById('musicControl').classList.add('active');
  }
}