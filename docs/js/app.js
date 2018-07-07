function displayForm(id) {
	let element = document.getElementById(id); 
	element.style.display = "block";
}

function hideModal() {
	setTimeout(() => {
		if(document.getElementById("reg-modal-wrap"))	
			document.getElementById("reg-modal-wrap").style.display = "none";
		if(document.getElementById("login-modal-wrap"))
			document.getElementById("login-modal-wrap").style.display = "none";
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

async function loadJSON(file, callback) {
	await fetch(file)
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
	
	document.getElementById("main-search-button").addEventListener("click", () => {
		
		window.location.hash = "#search";
	}); 

});

function loadTopHotels() {
	loadJSON('content/hotels.json', (response) => {
    	let arr = JSON.parse(response)["hotels"];
   		for(let row = 0; row < 2; row++){
			for(let col = 0; col < 3; col++) {
				let currentRow = document.getElementsByClassName("top-hotels-row")[row];
	   			currentRow.innerHTML += generateTopHotelTemplate(arr[row*3+col]);
			}
		}
	});
}

function loadSearchedHotels() {
	loadJSON('content/hotels.json', (response) => {
    	let arr = JSON.parse(response)["hotels"];
    	let divToAdd = document.getElementById("searched-hotels-content");
   		for(let i = 0; i < arr.length; i++){
   			divToAdd.innerHTML += generateSearchedHotelTemplate(arr[i]);
		}
		for(let i = 0; i < arr.length; i++){
			let currentElem = document.getElementsByClassName("searched-hotel-more")[i];
			currentElem.addEventListener("click", () => {
				window.location.hash += "#" + (i+1); 
			}); 
		}
	});
}


function loadTeamMembers() {
	loadJSON('content/team.json', (response) => {
    let arr = JSON.parse(response)["members"];
		let element = document.getElementById("our-team");
    for(let i = 0; i < arr.length; i++){
   		element.innerHTML += generateTeamMemberTemplate(arr[i]);
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
async function loadHTML(anchor, element) {
	await fetch("pages/" + anchor.substr(1) + ".html")
	.then((res) => {
		return res.text();
	}).then((data) => {
   		element.innerHTML = data; 	
	});
}

/* from stackoverflow */
function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
}

function route() {
	let element = document.getElementById("top-hotels-div");
	let anchor = location.hash;
	if(isNormalInteger(anchor.substr(anchor.lastIndexOf("#") + 1))) {
		loadJSON('content/hotel_modals.json', (response) => {
		    let arr = JSON.parse(response)["hotelModals"];
		    let element = document.getElementById("all-headers");
		   	element.innerHTML = generateHotelModalTemplate(arr[anchor.substr(anchor.lastIndexOf("#") + 1)-1]) + element.innerHTML;
		   	document.getElementById("modal-exit-button").addEventListener("click", () => {
		   		let elem = document.getElementById("single-hotel-modal");
				elem.parentNode.removeChild(elem);
				window.location.hash = anchor.substr(0, anchor.lastIndexOf("#")); 
			}); 

		});
	} else {
		loadHTML(anchor, element);
		if(anchor == "#home") {
			loadTopHotels();
		} else if (anchor == "#search") {
			loadSearchedHotels();
		} else if (anchor == "#about") {
			loadTeamMembers();
		}
	}
}

