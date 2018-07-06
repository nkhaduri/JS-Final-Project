document.getElementById("register").addEventListener("click", () => {
	displayForm("reg-modal-wrap")
});

document.getElementById("login").addEventListener("click", () => {
	displayForm("login-modal-wrap")
});

Array.from(document.getElementsByClassName("close")).forEach((el) => {
  el.addEventListener("click", () => {
  	hideModal();
  });
});

document.getElementById("forgot-pass").addEventListener("click", () => {
	forgotPass();
});

function displayForm(id) {
	let element = document.getElementById(id); 
	element.style.display = "block";
}

function hideModal() {
	setTimeout(() => {	
		document.getElementById("reg-modal-wrap").style.display = "none";
		document.getElementById("login-modal-wrap").style.display = "none";
		document.getElementById("hotel-modal-wrap").style.display = "none";
	}, 100);
}

function forgotPass() {
	document.getElementById("forgot-pass").style.color = "#7109B0";
	setTimeout(() => {
		document.getElementById("password-sent").style.display = "block";
	}, 1000);
}

window.onclick = (event) => {
	let regModal = document.getElementById("reg-modal-wrap");
	let logModal = document.getElementById("login-modal-wrap");
	if (event.target == regModal || event.target == logModal) {
    setTimeout(() => {
    	event.target.style.display = "none";
		}, 100);
  }
}

function loadJSON(file, callback) {
	fetch(file)
	.then((response) => {
		response
		.json()
		.then((response) => {
			callback(JSON.stringify(response));
		});
    }).catch((err) => {
    	console.log('Fetch Error :', err);
	});
}

document.addEventListener("DOMContentLoaded", (event) => {
	function initialize() {
    	let inputField = document.getElementById('location');
    	let autocomplete = new google.maps.places.Autocomplete(inputField);
 	}
  
 	google.maps.event.addDomListener(window, 'load', initialize);

	/*loadJSON('content/hotel_modals.json', (response) => {
    let arr = JSON.parse(response)["hotelModals"];
    let element = document.getElementById("all-headers");
    for(let i = 0; i < arr.length; i++) {
    	element.innerHTML = generateHotelModalTemplate(arr[i]) + element.innerHTML;
    }
	}); */

});

function loadTopHotels() {
	loadJSON('content/hotels.json', (response) => {
    let arr = JSON.parse(response)["hotels"];
    for(let row = 0; row < 2; row++){
			for(let col = 0; col < 3; col++) {
				let currentRow = document.getElementsByClassName("top-hotels-row")[row];
	   			currentRow.innerHTML += generateTopHotelTemplate(arr[col]);
			}
		}
	});
}

function generateHotelModalNestedTemplates(data, templateGenerator) {
	let res = ``;
	for(let i = 0; i < data.length; i++) {
		res += templateGenerator(data[i]);
	}

	return res;
}

window.addEventListener("hashchange", route);

if(location.hash) {
	route();
} else {
	loadTopHotels();
}

/* from stackoverflow */
function loadHTML(anchor, element) {
	fetch("pages/" + anchor.substr(1) + ".html")
	.then((res) => {
		return res.text();
	}).then((data) => {
    element.innerHTML = data; 	
	});
}

function route() {
	let element = document.getElementById("top-hotels-div");
	let anchor = location.hash;
	loadHTML(anchor, element);
	if(anchor == "#home") {
		loadTopHotels();
	} else if (anchor == "#contact") {
		

	}
}