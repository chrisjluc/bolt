(function () {
    'use strict';

    angular
        .module('boltApp')
        .controller('CreateEventCtrl', function ($scope, $http) {
            var vm = this;

            vm.creatingEvent = creatingEvent;
            vm.getGoogleStaticMapsUrl = getGoogleStaticMapsUrl;
            vm.event = {
                eventName: '',
                startDate: '',
                lateFee: 0,
                location: {
                  address: '',
                  latitude: 43.653226,
                  longitude: -79.38318429999998
                },
                participants: [],
                recurring: 'None'
            };

            initialize();
            vm.mapsUrl = getGoogleStaticMapsUrl();

            function creatingEvent() {
                var request = vm.event;
                $http
                    .post('/api/events', request)
                    .success(function (response) {
                        console.log(response);
                    })
                    .error(function (error) {

                    })
            }

            // This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

            var autocomplete;

            function initialize() {
                // Create the autocomplete object, restricting the search
                // to geographical location types.
                autocomplete = new google.maps.places.Autocomplete(
                    (document.getElementById('autocomplete')),
                    { types: [] });
                // When the user selects an address from the dropdown,
                // populate the address fields in the form.
                google.maps.event.addListener(autocomplete, 'place_changed', function() {
                    fillInAddress()
                });
            }

            function fillInAddress() {
                // Get the place details from the autocomplete object.
                var place = autocomplete.getPlace();

                vm.event.location.address = place.formatted_address;
                vm.event.location.longitude = place.geometry.location.A;
                vm.event.location.latitude = place.geometry.location.F;

                setMapsUrl();
            }

            function getGoogleStaticMapsUrl(){
                var longitude = vm.event.location.longitude;
                var latitude = vm.event.location.latitude;
                return 'https://maps.googleapis.com/maps/api/staticmap?center=' + latitude + ',' + longitude + '&zooom=14&size=400x400&maptype=roadmap&markers=color:blue%7Clabel:A%7C' + latitude + ',' + longitude;
            }

            function setMapsUrl() {
                vm.mapsUrl = getGoogleStaticMapsUrl();
            }
        });
})();


