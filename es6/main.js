function count_down(){
    let wedding_date = new Date('June 30, 2019');
    let today = new Date();
    const main = Date.parse(wedding_date) - Date.parse(today);
    let ct = {
        day:Math.floor(main/(1000 * 60 * 60 * 24)),
        hour: Math.floor((main / (1000 * 60 * 60)) % 24),
        minutes:Math.floor((main / 1000 / 60) % 60),
        seconds:Math.floor((main / 1000) % 60)
    }
    console.log(main+'\n'+ct.day)
    document.querySelector('#countDown').innerHTML = `距离婚礼还有${ct.day}天${ct.hour}小时${ct.minutes}分钟${ct.seconds}秒`
}
window.onload = ()=>{
    setInterval(function(){count_down()},1000);
}