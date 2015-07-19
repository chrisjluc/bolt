(function () {
	'use strict';

	angular
		.module('boltApp')
		.controller('PaymentsCtrl', function ($scope, $http, payments) {
			var vm = this;

			vm.payments = payments;
			vm.unpaidPayments = filterPayments('unpaid');
			vm.paidPayments = filterPayments('paid');

			function filterPayments(status) {
				return _.filter(payments, function (payment) {
					return payment.status === status;
				});
			}
		});
})();


