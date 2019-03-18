function count_down(){
    let wedding_date = new Date('June 30, 2019');
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
var wi = new Vue({
    el:"#wedding_invitaiton",
    data:{
        text:123,
        countDown: {
            days:{
              title:"Days",
              value:0
            },
            hours:{
              title:"Hours",
              value:0
            },
            minutes: {
              title:"Minutes",
              value:0
            },
            seconds: {
              title:"Seconds",
              value:0
            }
          },
        couple_info:{
            groom:{
                title:"The Groom",
                name:"兰如青",
                phone:"15040501365",
                avatar:'./../img/lrq.jpg'
            },
            bride:{
                title:"The Bride",
                name:"梅思雨",
                phone:"13940943132",
                avatar:'./../img/msy.jpg'
            }
        }
    },
    methods:{
        countDownFunc(){
            let wedding_date = new Date('June 30, 2019');
            let today = new Date();
            const main = Date.parse(wedding_date) - Date.parse(today);
            var thisCountDown = this.countDown
            thisCountDown.days.value = Math.floor(main / (1000 * 60 * 60 * 24));
            thisCountDown.hours.value = Math.floor(main / (1000 * 60 * 60) % 24);
            thisCountDown.minutes.value = Math.floor(main / 1000 / 60 % 60);
            thisCountDown.seconds.value = Math.floor(main / 1000 % 60);
        },
        _countDownFunc(){
            let that = this;
            setInterval(()=>{that.countDownFunc()},1000);
        }
    },
    created(){
        document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';
        this. _countDownFunc()
    },
})