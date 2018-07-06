document.getElementById("register").addEventListener("click", function() {
	displayForm("reg-modal-wrap")
});

document.getElementById("login").addEventListener("click", function() {
	displayForm("login-modal-wrap")
});

Array.from(document.getElementsByClassName("close")).forEach(function(el) {
  el.addEventListener("click", function() {
  	hideModal();
  });
});

document.getElementById("forgot-pass").addEventListener("click", function() {
	forgotPass();
});

function displayForm(id) {
	let element = document.getElementById(id); 
	element.style.display = "block";
}

function hideModal() {
	setTimeout(function() {	
		document.getElementById("reg-modal-wrap").style.display = "none";
		document.getElementById("login-modal-wrap").style.display = "none";
		document.getElementById("hotel-modal-wrap").style.display = "none";
	}, 100);
}

function forgotPass() {
	document.getElementById("forgot-pass").style.color = "#7109B0";
	setTimeout(function() {
		document.getElementById("password-sent").style.display = "block";
	}, 1000);
}

window.onclick = function(event) {
	let regModal = document.getElementById("reg-modal-wrap");
	let logModal = document.getElementById("login-modal-wrap");
	if (event.target == regModal || event.target == logModal) {
    setTimeout(function() {
    	event.target.style.display = "none";
		}, 100);
  }
}

function loadJSON(file, callback) {
	fetch(file)
	.then(function(response) {
		response
		.json()
		.then(function(response) {
			callback(JSON.stringify(response));
		});
    }).catch(function(err) {
    	console.log('Fetch Error :', err);
	});
}

document.addEventListener("DOMContentLoaded", function(event) {
	loadJSON('content/hotels.json', function(response) {
    let arr = JSON.parse(response)["hotels"];
    for(let row = 0; row < 2; row++){
			for(let col = 0; col < 3; col++) {
				let currentRow = document.getElementsByClassName("top-hotels-row")[row];
	   			currentRow.innerHTML += generateTopHotelTemplate(arr[col]);
			}
		}
	});

	function initialize() {
      let inputField = document.getElementById('location');
      let autocomplete = new google.maps.places.Autocomplete(inputField);
   	}
  
  	google.maps.event.addDomListener(window, 'load', initialize);

	/*loadJSON('content/hotel_modals.json', function(response) {
    let arr = JSON.parse(response)["hotelModals"];
    let element = document.getElementById("all-headers");
    for(let i = 0; i < arr.length; i++) {
    	element.innerHTML = generateHotelModalTemplate(arr[i]) + element.innerHTML;
    }
	}); */

});

function generateHotelModalNestedTemplates(data, templateGenerator) {
	let res = ``;
	for(let i = 0; i < data.length; i++) {
		res += templateGenerator(data[i]);
	}

	return res;
}