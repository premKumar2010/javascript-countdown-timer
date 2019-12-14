let timer;
const enddate=document.querySelector('input[name="enddate"]');
const subContainer=document.querySelector('div.sub-container');
const element={
days:subContainer.querySelector('div:nth-child(1).content > span:nth-child(1)'),
hours:subContainer.querySelector('div:nth-child(2).content > span:nth-child(1)'),
minutes:subContainer.querySelector('div:nth-child(3).content > span:nth-child(1)'),
seconds:subContainer.querySelector('div:nth-child(4).content > span:nth-child(1)')
}

const storageDate=localStorage.getItem('eventDate');

if(storageDate){
  enddate.value=storageDate;
  dateChanged(null, storageDate);
}


/**
* @description
* Calculate the millisecond to second, minute, hour, day
*/
function convertMilliSecond(milliSecond){

    if(!milliSecond){
      return {
          day:0,
          hour:0,
          minute:0,
          second:0
      };
    }


    let seconds= Math.floor(milliSecond/1000);
    let minutes=Math.floor(seconds/60);
    let hours=Math.floor(minutes/60);
    let days=Math.floor(hours/24);

    return {
        day:days,
        hour:(hours%24),
        minute:(minutes%60),
        second:(seconds%60)
    };
}

/**
* @description
* Get the time response and update in dom.
*/
function buildDom(selectedDate){
  const totalMilli=Date.parse(selectedDate)-Date.parse(new Date());
  const response=convertMilliSecond(totalMilli);
  element.seconds.innerHTML=`0${response.second}`.slice(-2);
  element.minutes.innerHTML=`0${response.minute}`.slice(-2);
  element.hours.innerHTML=`0${response.hour}`.slice(-2);
  element.days.innerHTML=`0${response.day}`.slice(-2);

  if((response.day+response.minute+response.hour+response.second)<=0){
    clearInterval(timer);
  }
}


/**
* @description
* handles the change event and triggers to build the timer and update in dom
*/
function dateChanged(event, date){

  if(event){
    event.preventDefault();
    localStorage.setItem('eventDate', this.value);
  }
  clearInterval(timer);
  buildDom(this.value||date);
  timer=setInterval(buildDom, 1000, this.value||date)
}

enddate.addEventListener('change', dateChanged);
