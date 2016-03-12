/**
 * 
 */
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
		templateUrl: 'views/clock.html'
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
