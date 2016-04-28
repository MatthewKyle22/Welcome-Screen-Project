(function() {
    angular.module('controllers', [])
        .controller('homeController',homeController)
        
        	

        function homeController ($http) {
            var hCtrl = this
            hCtrl.name = "Home Controller"
            hCtrl.background = stateList.CO[Math.floor(Math.random()*stateList.CO.length)]
             console.log(stateList.CO[Math.floor(Math.random()*stateList.CO.length)])
        		
        	var today = new Date()
			var curHr = today.getHours();
			console.log(curHr)
			hCtrl.welcome = gettime(curHr)


			// TIME OF DAY FUNCTION
			function gettime() {
			if(curHr<12){
     		 return "Good Morning"
			}else if(curHr<18){
		      return "Good Afternoon"
			}else{
		      return "Good Evening"
			}
				}



        
 
           $http.get('http://quotes.rest/quote.json?api_key=HYYVimuEVspeQhohiyJ_PQeF')
            .then(function(response){ 
                 console.log('Response from quoteApi', response.data);
                 hCtrl.quote = response.data;
					hCtrl.quote = response.data.contents.quote
					hCtrl.author = response.data.contents.author
            });
    
    






        // GOOGLE LOCATION API
        function displayLocation(latitude,longitude){
        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function(){
          if(request.readyState == 4 && request.status == 200){
            var data = JSON.parse(request.responseText);
            var city = data.results[4];
            var final = (city.formatted_address);
			console.log(final.split(',')[0])

			// WEATHER API
			var doppler= this;
		       $http.get("http://api.openweathermap.org/data/2.5/forecast/city?q=Boulder&units=imperial&APPID=6c47381f22d2fc308cc3d5f06edd3d41")
		        .then(function(response){
				var temp = Math.floor(response.data.list[0].main.temp)
				var sky =  response.data.list[0].weather[0].description
				console.log(temp,sky)
				hCtrl.forcast = "The Current Temperature is " + temp + "℉ in " + final.split(',')[0] + " with a " + sky + "." 

		        })

          }
        };
        request.send();
      };

      var successCallback = function(position){
        var x = position.coords.latitude;
        var y = position.coords.longitude;
        displayLocation(x,y);
      };

      var errorCallback = function(error){
        var errorMessage = 'Unknown error';
        switch(error.code) {
          case 1:
            errorMessage = 'Permission denied';
            break;
          case 2:
            errorMessage = 'Position unavailable';
            break;
          case 3:
            errorMessage = 'Timeout';
            break;
        }
        document.write(errorMessage);
      };

      var options = {
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(successCallback,errorCallback,options);
            
        }



}())