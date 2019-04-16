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
  document.querySelector('#countDown').insertAdjacentHTML('beforeend', result);
}

var wi = new Vue({
  el: "#wedding_invitaiton",
  data: {
    text: 123,
    countDown: {
      days: {
        title: "Days",
        value: 0
      },
      hours: {
        title: "Hours",
        value: 0
      },
      minutes: {
        title: "Minutes",
        value: 0
      },
      seconds: {
        title: "Seconds",
        value: 0
      }
    },
    couple_info: {
      groom: {
        title: "The Groom",
        name: "Lan Ruqing",
        phone: "15040501365",
        avatar: '../img/lrq.jpg'
      },
      bride: {
        title: "The Bride",
        name: "Mei Siyu",
        phone: "13940943132",
        avatar: '../img/msy.jpg'
      }
    },
    timeline_nodes: [{
      time: "2010",
      title: "we met at school",
      icon: "icon-school"
    }, {
      time: "Nov 08, 2012",
      title: "we fall in love",
      icon: "icon-aiqingyuehui"
    }, {
      time: "2018",
      title: "We ready to get married",
      icon: "icon-svgmanylove"
    }, {
      time: "Feb 14, 2019",
      title: "We got married",
      icon: "icon-jiehunzhengshu"
    }, {
      time: "Jun 30, 2019",
      title: "Our wedding",
      icon: "icon-bhjwedding"
    }],
    gallery: [{
      title: "sea",
      src: './img/g_sea.jpg'
    }, {
      title: "park",
      src: './img/g_park.jpg'
    }, {
      title: "Formal",
      src: './img/g_formal.jpg'
    }, {
      title: "Valencia",
      src: './img/g_vcf.jpg'
    }, {
      title: "Old Street",
      src: './img/g_street.jpg'
    }]
  },
  filters: {
    uppercase: function uppercase(value) {
      if (!value) return '';
      value = value.toUpperCase();
      return value;
    }
  },
  methods: {
    countDownFunc: function countDownFunc() {
      var wedding_date = new Date('June 30, 2019');
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
        if (t.offsetTop < top - t.offsetHeight) {
          t.classList.add('flipInX');
        }
      });
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
    }
  },
  created: function created() {
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
      wi.timeline(scrollTop);

      if (scrollTop > document.getElementById('dot1').offsetTop) {
        console.log(123);
        document.getElementsByClassName('photos')[0].classList.add('active');
      }
    };
  }
});