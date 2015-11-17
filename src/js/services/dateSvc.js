
define(['./module'], function(services) {
	services.service('dateService', function() {
		this.dateList = {
			'yearData': [{
				'name': '1990'
			}, {
				'name': '1991'
			},{
				'name': '1992'
			}, {
				'name': '1994'
			},{
				'name': '1995'
			}, {
				'name': '1996'
			},{
				'name': '1997'
			}],
			'monthData': [{
				'name': '1'
			}, {
				'name': '2'
			},{
				'name': '3'
			}, {
				'name': '4'
			},{
				'name': '5'
			}, {
				'name': '6'
			},{
				'name': '7'
			}],
			'dayData': [{
				'name': '1'
			}, {
				'name': '2'
			},{
				'name': '3'
			}, {
				'name': '4'
			},{
				'name': '5'
			}, {
				'name': '6'
			},{
				'name': '7'
			}]
		}
	});
});