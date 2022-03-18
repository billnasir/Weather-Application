const cityForm=document.querySelector('form');
const card=document.querySelector('.card');
const details=document.querySelector('.weather');


//remove d-none

const updateUI=(data)=>{
  
  let ampm;
   
  // Use destructring to access data
  const {cityDets,weather}=data;
  
  console.log(weather)

  //Offset to find the  time
   const offset=cityDets.TimeZone.GmtOffset;
   const time= calcTime(offset) ;
  
   //To get exact time of different locations 
   let hour = formatTime((time.getHours()));
   //A conditional statement which tell us whether it's AM/PM
   ampm < hour ? ampm='AM': ampm='PM';
   //12 Hour clock format
   const hourin12HrFormat=hour >=13? hour %12 : hour==0 ? hour=12 : hour;
 
   //Get  minutes 
    const minutes = formatTime((time.getMinutes()));
    //Get the date 
   const date=time.toDateString();
   //Use slice to get a certain of the string and replace to format it properly
   const dateComma=date.replace(/ /g, ', ').slice(4)

    



    
  //update details template
  card.innerHTML=`<div class="weather">
  <h2 class="city">${cityDets.EnglishName}</h2>
  <div class="time-date">
   <h2 class="time">${hourin12HrFormat}:${minutes} <span id="am-pm">${ampm}</span></h2>
    <h3 class="date">${dateComma}</h3>
  </div>
 <div class="temp">${weather.Temperature.Metric.Value} &#8451;</div>
 <div class="weather-condition"> <h3 class="weatherstatus">${weather.WeatherText}</h3>
 </div>
 
 <img class="temp-weather" src="icons/${weather.WeatherIcon}.svg" alt="weather icon" class="w-icon">

</div>`
 
//If card contains this class something will display
   if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
  }
}

 
const updateCity=async (city)=>{
  
  const cityDets=await getCity(city);
  const weather=await getWeather(cityDets.Key);
   const autoSearch=await autoCompleteSearch(city);

 
  return{ cityDets, weather,autoSearch}
 }


cityForm.addEventListener('submit', e=>{
  //prevent default action
  e.preventDefault();

  //get city value
  const city=cityForm.search.value.trim();
  cityForm.reset();

 
  //update the ui with new city
  updateCity(city)
  .then(data => updateUI(data))
  .catch(err => console.log(err))
 })


  //This function is to get the time of different locations
 const calcTime=(offset)=>{
  const b=new Date()
  const utc= b.getTime()+(b.getTimezoneOffset()*60000);
   var nd=new Date(utc+(3600000 *offset))

 
   return nd
  }


  //format time if number is less than 10 add 0
  const formatTime=(time)=>{
    if(time <10){
      return '0' + time
    }
    return time;
  }

  
 