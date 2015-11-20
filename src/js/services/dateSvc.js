
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
				'name': '01'
			}, {
				'name': '02'
			},{
				'name': '03'
			}, {
				'name': '04'
			},{
				'name': '05'
			}, {
				'name': '06'
			},{
				'name': '07'
			}],
			'dayData': [{
				'name': '01'
			}, {
				'name': '02'
			},{
				'name': '03'
			}, {
				'name': '04'
			},{
				'name': '05'
			}, {
				'name': '06'
			},{
				'name': '07'
			}]
		};
	});
});