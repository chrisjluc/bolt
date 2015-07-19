(function () {
	'use strict';

	angular
		.module('boltApp')
		.controller('PaymentsCtrl', function ($scope, $http, paymentsData, clientToken) {
			var vm = this;

			vm.payments = paymentsData;
			vm.clientToken = clientToken;
			vm.unpaidPayments = filterPayments('unpaid');
			vm.paidPayments = filterPayments('paid');

			function filterPayments(status) {
				return _.filter(payments, function (payment) {
					return payment.status === status;
				});
			}

			braintree.setup(vm.clientToken, "dropin", {
				container: "payment-form"
			});
		});
})();


