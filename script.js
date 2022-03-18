// Variables for the card
const city=document.querySelector('.city');
const time =document.querySelector('.time');
const date=document.querySelector('.date');
const weatherstatus=document.querySelector('.weatherstatus');
const windspeed=document.querySelector('.windspeed');
 
//form id
const form=document.querySelector('#form');
 
//API KEY for Accuweather
const apiKey=`I2YgJluzEURadAneuQZBWGIhn1U0e***`;

 

//get Weather= async(id)
const getWeather= async(id)=>{
  try{
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${apiKey}`;

  const res= await fetch(base + query);
  const data=await res.json();
  
  return data[0];
  
  }catch(err){
    console.log(err);
  }
}

const autoCompleteSearch= async(city)=>{
  const base='http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
  const query=`?apikey=${apiKey}&q=${city}`; 
  
  const res=await fetch( base + query);
  const data= await res.json();

  return data[0];
}

 


//retrieve weather information
const getCity= async(city)=>{
const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
const query=`?apikey=${apiKey}&q=${city}`; 

const res=await fetch(base + query);
const data=await res.json();

return data[0];
}

 
// console.log(autoCompleteSearch('toronto'));
