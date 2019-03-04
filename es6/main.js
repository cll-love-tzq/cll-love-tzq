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
    document.querySelector('#countDown').innerHTML = result;
}
window.onload = ()=>{
    document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';
    setInterval(function(){count_down()},1000);
}