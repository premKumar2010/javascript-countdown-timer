const enddate=document.querySelector('input[name="enddate"]');
const subContainer=document.querySelector('div.sub-container');
const element={
days:subContainer.querySelector('div:nth-child(1).content > span:nth-child(1)'),
hours:subContainer.querySelector('div:nth-child(2).content > span:nth-child(2)'),
minutes:subContainer.querySelector('div:nth-child(3).content > span:nth-child(3)'),
seconds:subContainer.querySelector('div:nth-child(4).content > span:nth-child(4)')
}

function dateChanged(event){
  console.log('value', event.target.value);
}

enddate.addEventListener('change', dateChanged);
