(function () {
    'use strict';

    angular
        .module('boltApp')
        .controller('CreateEventCtrl', function ($scope, $http, $state) {
            var vm = this;

            vm.creatingEvent = creatingEvent;
            vm.getGoogleStaticMapsUrl = getGoogleStaticMapsUrl;
            vm.defaultEvent = {
                eventName: '',
                startDate: '',
                lateFee: 0,
                location: {
                    address: '',
                    longitude: 0,
                    latitude: 0
                },
                participants: [],
                recurring: 'None'
            };
            vm.event = vm.defaultEvent;

            vm.creatingEvent = creatingEvent;

            function creatingEvent() {
                $http
                    .post('/api/events', vm.event)
                    .success(function (response) {
                        alert('Event created successfully!');
                        $state.go('bolt.eventsView');
                    })
                    .error(function (error) {
                        alert('Could not create event.');
                        $state.go('bolt.eventsView');
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
                vm.event.location.longitude = place.geometry.location.F;
                vm.event.location.latitude = place.geometry.location.A;

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


