
(function() {
    angular.module('InspirationalApp', ["ui.router","controllers"])
        .config(routerConfig)
        
        function routerConfig($stateProvider,$urlRouterProvider){
            
            $stateProvider
                .state('home',{
                    url: "/",
                    templateUrl: "home.html"
                    
                })
                
                $urlRouterProvider.otherwise('/')
                
        }
}())