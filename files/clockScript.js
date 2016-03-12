/**
 * 
 */
var app = angular.module("watchApp", []);
function clock(h, m, s, ms){
	this.hour = h;
	this.min = m;
	this.second = s;
	this.mili = ms;
	
	this.reset = function(){
		this.hour = 0;
		this.min = 0;
		this.second = 0;
		this.mili = 0;			
	}
}
	
app.directive('stopClock',function(){
	return{
		scope:{
			fontColor: '@tcolor',
			fontSize: '@tsize',
			buttonSize: '@bsize',
		},
		controller: 'watchController',
		template: '<div><span style="color:{{fontColor}};font-size:{{fontSize}}px" class="watch">{{clock1.min}} : {{clock1.second}} : {{clock1.mili}}</span><div><button type="button" class="btn btn-success {{buttonSize}} start" ng-click="startWatch()">Start</button><button type="button" class="btn btn-danger {{buttonSize}} stop" ng-click="stopWatch()" style="display:none">Stop</button><button type="button" class="btn btn-warning {{buttonSize}} reset" ng-click="resetWatch()">Reset</button></div></div>'
	};
});

app.controller('watchController',function($scope, $interval){
	$scope.clock1 = new clock(0, 0, 0, 0);
	var interval;
	
	$scope.startWatch = function(){
		$('.start').hide();
		$('.stop').show();
		interval = $interval(function(){ 
			$scope.clock1.mili++;
			
			if($scope.clock1.mili == 100){
				$scope.clock1.mili = 0;
				$scope.clock1.second++;
			}
			
			if($scope.clock1.second == 60){
				$scope.clock1.second = 0;
				$scope.clock1.min++;
			}
			
			if($scope.clock1.min == 60){
				$scope.clock1.min = 0;
				$scope.clock1.hour++;
			}
			
			if($scope.clock1.hour == 12){
				$scope.clock1.hour = 0;
			}
		}, 10);
	}
	
	$scope.stopWatch = function(){
		$('.stop').hide();
		$('.start').show();
		$interval.cancel(interval);
	}
	
	$scope.resetWatch = function(){
		$('.start').show();
		$scope.clock1.reset();
		$scope.stopWatch();
	}
});
