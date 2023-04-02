
function count_down(){
    let wedding_date = new Date('May 18, 2023');
    let today = new Date();
    const main = Date.parse(wedding_date) - Date.parse(today);
    let ct = {
        days:Math.floor(main/(1000 * 60 * 60 * 24)),
        hours: Math.floor((main / (1000 * 60 * 60)) % 24),
        minutes:Math.floor((main / 1000 / 60) % 60),
        seconds:Math.floor((main / 1000) % 60)
    }
    console.log(main+'\n'+ct.day)
    let result = `
        <span title="days">${ct.days}</span>
        <span title="hours">${ct.hours}</span>
        <span title="minutes">${ct.minutes}</span>
        <span title="seconds">${ct.seconds}</span>
    `
    document.querySelector('#countDown').insertAdjacentHTML('beforeend',result)
}

// window.onload=function(){
//   /*循环播放哪些图片*/
//   var imgs=["/img/timeline/1.jpeg",
//         "/img/timeline/2.jpeg",
//         "/img/timeline/3.jpeg",
//         "/img/timeline/4.jpeg",
//         "/img/timeline/4.jpeg"];
//   var i=0;
//   var head=document.getElementById('timeline_container');
//   head.style.background="url(/img/timeline/1.jpg)";
//   function time(){
//     /*当循环超过图片总数时，又重新开始*/
//     if(i>=4){
//       i=0;
//       /*建立图片对象，方便控制图片什么时候加载。
//       这个是为了用来消除切换图片时的白色闪屏问题*/
//       var img=new Image();
//       img.src=imgs[i];
//       img.onload=function(){
//         head.style.background="url("+img.src+")";
//       }
//     }else{
//       var dot=document.getElementById("'dot'+(i+1)");
//       i++;
//       var img=new Image();
//       img.src=imgs[i];
//       img.onload=function(){
//         head.style.backgroundImage="url("+img.src+")";
//         // dot.style.color="green";
//       }
//     }
//   }
//   /*设置循环函数time(),每5秒切换一次*/
//   setInterval(time,1000);
// }



fetch('/js/data.json').then(res=>res.json()).then(initData=>{
  console.log(initData)
  var wi = new Vue({
    el: "#wedding_invitaiton",
    data:initData,
    filters: {
      uppercase: function uppercase(value) {
        if (!value) return '';
        value = value.toUpperCase();
        return value;
      }
    },
    methods: {
      countDownFunc() {
        var wedding_date = new Date('May 18, 2023');
        var today = new Date();
        var main = Date.parse(wedding_date) - Date.parse(today);
        var thisCountDown = this.countDown;
        thisCountDown.days.value = Math.floor(main / (1000 * 60 * 60 * 24));
        thisCountDown.hours.value = Math.floor(main / (1000 * 60 * 60) % 24);
        thisCountDown.minutes.value = Math.floor(main / 1000 / 60 % 60);
        thisCountDown.seconds.value = Math.floor(main / 1000 % 60);
      },
      _countDownFunc() {
        var that = this;
        setInterval(function () {
          that.countDownFunc();
        }, 1000);
      },
      timeline(top) {
        var timeline_rows = Array.from(document.querySelectorAll('.timeline_row'));
        timeline_rows.forEach(function (t, i) {
          if (t.offsetTop < top - t.offsetHeight-100) {
            t.classList.add('flipInX');
          }
        });
        if (top > document.getElementById('dot1').offsetTop) {
          document.getElementsByClassName('photos')[0].classList.add('active');
        }
      },

      storyPic(index) {
        console.log("sdsdsdsd:"+index);
        var timeline_cover = document.getElementById('timeline_cover');
        timeline_cover.style.backgroundImage="url(/img/timeline/4.jpeg)";
        timeline_cover.style.backgroundSize="cover";
      },

      choosePic(index) {
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
      loadResources() {
        var images_array = [this.couple_info.groom.avatar,this.couple_info.bride.avatar,"/img/timelineBg.jpg","/img/bg.jpg"];
        this.gallery.forEach((item,index)=>{
          images_array.push(item.src);
        })
        console.log(images_array)
        let loadedNum = 0
        images_array.forEach((src)=>{
          let image = new Image();
          image.src = src;
          image.addEventListener('load',()=>{
            loadedNum++
            console.log(loadedNum + "--" +images_array.length)
            if(loadedNum == images_array.length){
              let wattingForHide = Array.from(document.getElementsByClassName('wattingForHide'));
              let wattingForHideNum = 0;
              wattingForHide.forEach((ele,i)=>{                
                ele.classList.remove('tada','infinite');
                ele.classList.add('fadeOut');
                wattingForHideNum++
              })
              if(wattingForHideNum == wattingForHide.length){
                document.getElementById('bgm').oncanplaythrough = 
                setTimeout(()=>{                  
                  wattingForHide.forEach((ele,i)=>{
                    ele.style.display = 'none';
                  })
                  document.querySelector('.playH5').classList.add('fadeIn');
                  document.querySelector('.playH5').style.display = 'block';
                  document.querySelector('.playH5').onclick = ()=>{
                    document.getElementById('bgm').play();
                    document.getElementById('musicControl').classList.add('active');
                    this.noReady = true;
                    document.querySelector('#ready').style.opacity = 0;
                    setTimeout(function(){
                      document.querySelector('#ready').remove();
                    },500)
                  }
                },1500);
              }              
            }
          })          
        })
      },      
      throttle(fun, delay) {
        let last, deferTimer
        return function (args) {
            let that = this
            let _args = arguments
            let now = +new Date()
            if (last && now < last + delay) {
                clearTimeout(deferTimer)
                deferTimer = setTimeout(function () {
                    last = now
                    fun.apply(that, _args)
                }, delay)
            }else {
                last = now
                fun.apply(that,_args)
            }
        }
    }
    },
    created(){
      console.log(this.data)
      this.loadResources()  
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
    mounted(){
      Array.from(document.querySelectorAll('.phone')).forEach((p,i)=>{
        console.log(p)
        p.onclick = ()=>{
          console.log(p.getAttribute('title'))
          window.open("tel:"+p.getAttribute('title'))
        }
      })
    }
  });
})
let musicStatus = true
function musicControl(){
  if(musicStatus){
    document.getElementById('bgm').pause();
    document.getElementById('musicControl').classList.remove('active');
  }else{
    document.getElementById('bgm').play();
    document.getElementById('musicControl').classList.add('active');
  }
}