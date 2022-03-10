export default class App {
    constructor(API_KEY){
        this.API_KEY = API_KEY;
        this.lat = 0;
        this.lng = 0;
        this.getLocation();
    }

    getLocation(){
        console.log('getting location');
        navigator.geolocation.getCurrentPosition(this.locationSucces, this.locationError);
        this.locationSucces.bind(this);
        this.locationError.bind(this);
    
    }

    locationSucces(location){
        this.lat = location.coords.latitude;
        this.lng = location.coords.longitude;
        this.getWeather();
    }

    getWeather() {
        
        console.log("getting weather");
        let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${this.lat}&lon=${this.lng}&appid=${this.API_KEY}`;
        fetch(url).then( res => {
            return res.json();
     }).then( json => {
         console.log(json);
         this.printWeather(json);
     }).catch( err => {
         console.log(err);
     }).finally() =>{
         console.log("Finally done");
     };
    }

    printWeather(json){
        let summary = json.weather[0].description;
        let summary = Math.round(json.main.temp);
        document.querySelector("h1").innerHTML = summary;
        document.querySelector("h1").innerHTML = temp + "° C";
        console.log(summary);
    }

    locationError(err){
        console.log(err);
    }
}