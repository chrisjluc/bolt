(function () {
	'use strict';

	angular
		.module('boltApp')
		.controller('PaymentsCtrl', function ($scope, $http, payments, clientToken) {
			var vm = this;

			vm.payments = payments;
			vm.clientToken = clientToken;
			vm.unpaidPayments = filterPayments('unpaid');
			vm.paidPayments = filterPayments('paid');
			vm.total = _.reduce(vm.unpaidPayments, function (total, payment) {
				return total + payment.amount;
			}, 0);

			function filterPayments(status) {
				return _.filter(payments, function (payment) {
					return payment.status === status;
				});
			}

			braintree.setup(vm.clientToken, "dropin", {
				container: "payment-form",
				onPaymentMethodReceived: function (obj) {
					var request = {
						nonce: obj.nonce,
						type: obj.type,
						details: obj.details,
						payments: vm.unpaidPayments,
						total: vm.total
					};
					$http
						.post('/api/payments/pay', request)
						.success(function (response) {
							console.log(response);
							location.reload();
						})
						.error(function (error) {
							console.error(error);
						})
				}
			});
		});
})();


