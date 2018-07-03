document.getElementById("register").addEventListener("click", function() {
	displayForm("reg-modal-wrap")
});

document.getElementById("login").addEventListener("click", function() {
	displayForm("login-modal-wrap")
});

Array.from(document.getElementsByClassName("close")).forEach(function(el) {
  el.addEventListener("click", function() {
  	hideForm();
  });
});

document.getElementById("forgot-pass").addEventListener("click", function() {
	forgotPass();
});

function displayForm(id) {
	let element = document.getElementById(id); 
	element.style.display = "block";
}

function hideForm() {
	setTimeout(function() {	
		document.getElementById("reg-modal-wrap").style.display = "none";
		document.getElementById("login-modal-wrap").style.display = "none";
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

// For reading json file, this material was used 
// https://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript
function loadJSON(file, callback) { 
	let req = new XMLHttpRequest();
	req.overrideMimeType("application/json");
	req.open('GET', file, true);
	req.onreadystatechange = function () {
		if (req.readyState == 4 && req.status == "200") {
		 	callback(req.responseText);
		}
	};
	req.send(null); 
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
});