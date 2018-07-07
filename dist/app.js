"use strict";

var loadJSON = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file, callback) {
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return fetch(file).then(function (response) {
							response.json().then(function (response) {
								callback(JSON.stringify(response));
							});
						}).catch(function (err) {
							console.log('Fetch Error :', err);
						});

					case 2:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function loadJSON(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

/* from stackoverflow */
var loadHTML = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(anchor, element) {
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.next = 2;
						return fetch("pages/" + anchor.substr(1) + ".html").then(function (res) {
							return res.text();
						}).then(function (data) {
							element.innerHTML = data;
						});

					case 2:
					case "end":
						return _context2.stop();
				}
			}
		}, _callee2, this);
	}));

	return function loadHTML(_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}();

/* from stackoverflow */


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function displayForm(id) {
	var element = document.getElementById(id);
	element.style.display = "block";
}

function hideModal() {
	setTimeout(function () {
		if (document.getElementById("reg-modal-wrap")) document.getElementById("reg-modal-wrap").style.display = "none";
		if (document.getElementById("login-modal-wrap")) document.getElementById("login-modal-wrap").style.display = "none";
	}, 100);
}

function forgotPass() {
	document.getElementById("forgot-pass").style.color = "#7109B0";
	setTimeout(function () {
		document.getElementById("password-sent").style.display = "block";
	}, 1000);
}

window.onclick = function (event) {
	var regModal = document.getElementById("reg-modal-wrap");
	var logModal = document.getElementById("login-modal-wrap");
	if (event.target == regModal || event.target == logModal) {
		setTimeout(function () {
			event.target.style.display = "none";
		}, 100);
	}
};

document.addEventListener("DOMContentLoaded", function (event) {
	function initialize() {
		var inputField = document.getElementById('location');
		var autocomplete = new google.maps.places.Autocomplete(inputField);
	}

	google.maps.event.addDomListener(window, 'load', initialize);

	document.getElementById("register").addEventListener("click", function () {
		displayForm("reg-modal-wrap");
	});

	document.getElementById("login").addEventListener("click", function () {
		displayForm("login-modal-wrap");
	});

	Array.from(document.getElementsByClassName("close")).forEach(function (el) {
		el.addEventListener("click", function () {
			hideModal();
		});
	});

	document.getElementById("forgot-pass").addEventListener("click", function () {
		forgotPass();
	});

	document.getElementById("main-search-button").addEventListener("click", function () {

		window.location.hash = "#search";
	});
});

function loadTopHotels() {
	loadJSON('content/hotels.json', function (response) {
		var arr = JSON.parse(response)["hotels"];
		for (var row = 0; row < 2; row++) {
			for (var col = 0; col < 3; col++) {
				var currentRow = document.getElementsByClassName("top-hotels-row")[row];
				currentRow.innerHTML += generateTopHotelTemplate(arr[row * 3 + col]);
			}
		}
	});
}

function loadSearchedHotels() {
	loadJSON('content/hotels.json', function (response) {
		var arr = JSON.parse(response)["hotels"];
		var divToAdd = document.getElementById("searched-hotels-content");
		for (var i = 0; i < arr.length; i++) {
			divToAdd.innerHTML += generateSearchedHotelTemplate(arr[i]);
		}

		var _loop = function _loop(_i) {
			var currentElem = document.getElementsByClassName("searched-hotel-more")[_i];
			currentElem.addEventListener("click", function () {
				window.location.hash += "#" + (_i + 1);
			});
		};

		for (var _i = 0; _i < arr.length; _i++) {
			_loop(_i);
		}
	});
}

function loadTeamMembers() {
	loadJSON('content/team.json', function (response) {
		var arr = JSON.parse(response)["members"];
		var element = document.getElementById("our-team");
		for (var i = 0; i < arr.length; i++) {
			element.innerHTML += generateTeamMemberTemplate(arr[i]);
		}
	});
}

function generateHotelModalNestedTemplates(data, templateGenerator) {
	var res = "";
	for (var i = 0; i < data.length; i++) {
		res += templateGenerator(data[i]);
	}

	return res;
}

window.addEventListener("hashchange", route);

if (location.hash) {
	route();
} else {
	loadTopHotels();
}function isNormalInteger(str) {
	var n = Math.floor(Number(str));
	return n !== Infinity && String(n) === str && n >= 0;
}

function route() {
	var element = document.getElementById("top-hotels-div");
	var anchor = location.hash;
	if (isNormalInteger(anchor.substr(anchor.lastIndexOf("#") + 1))) {
		loadJSON('content/hotel_modals.json', function (response) {
			var arr = JSON.parse(response)["hotelModals"];
			var element = document.getElementById("all-headers");
			element.innerHTML = generateHotelModalTemplate(arr[anchor.substr(anchor.lastIndexOf("#") + 1) - 1]) + element.innerHTML;
			document.getElementById("modal-exit-button").addEventListener("click", function () {
				var elem = document.getElementById("single-hotel-modal");
				elem.parentNode.removeChild(elem);
				window.location.hash = anchor.substr(0, anchor.lastIndexOf("#"));
			});
		});
	} else {
		loadHTML(anchor, element);
		if (anchor == "#home") {
			loadTopHotels();
		} else if (anchor == "#search") {
			loadSearchedHotels();
		} else if (anchor == "#about") {
			loadTeamMembers();
		}
	}
}
"use strict";

function generateHotelCommentTemplate(comment) {
	return "\n\t\t\t\t\t<div class=\"comment\">\n\t\t\t\t\t\t<div class=\"comment-header-div\"> \n\t\t\t\t\t\t\t<span class=\"comment-author-span\"> " + comment.name + " </span>\n\t\t\t\t\t\t\t<span class=\"review-star-num\"> " + comment.stars + " </span> \n\t\t\t\t\t\t\t<img src=\"imgs/blue_star.png\" class=\"blue-star\"> \n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t" + comment.content + "\n\t\t\t\t\t</div>";
}
'use strict';

function generateHotelModalTemplate(hotel) {
	return '\n\t\t<div class="modal hotel-modal-wrap" id="single-hotel-modal">\n\t\t\t<div class="hotel-modal"> \n\t\t\t\t<div class="close"> <button id="modal-exit-button"> &times; </button> </div> \n\t\t\t\t<div class="hotel-name-div"> ' + hotel.name + ' </div>\n\t\t\t\t<div class="hotel-stars-div"> \n\t\t\t\t\t<img src="imgs/star.png" class="star-logo">\n\t\t\t\t\t' + (hotel.stars > 1 ? '<img src="imgs/star.png" class="star-logo">' : '') + '\n\t\t\t\t\t' + (hotel.stars > 2 ? '<img src="imgs/star.png" class="star-logo">' : '') + '\n\t\t\t\t\t' + (hotel.stars > 3 ? '<img src="imgs/star.png" class="star-logo">' : '') + '\n\t\t\t\t\t' + (hotel.stars > 4 ? '<img src="imgs/star.png" class="star-logo">' : '') + '\n\t\t\t\t</div> \n\t\t\t\t<div class="general-info">\n\t\t\t\t\t<div class="hotel-contact-wrap">\n\t\t\t\t\t\t<div class="hotel-contact-div">\n\t\t\t\t\t\t\t<img src="imgs/location_logo.png" class="hotel-contact-logo">\n\t\t\t\t\t\t\t<span class="hotel-contact-span"> ' + hotel.address + ' </span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="hotel-contact-div">\n\t\t\t\t\t\t\t<img src="imgs/phone_logo.png" class="hotel-contact-logo">\n\t\t\t\t\t\t\t<span class="hotel-contact-span"> ' + hotel.number + ' </span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="user-rating-div"> \n\t\t\t\t\t\t<img src="imgs/user_rating_logo.png" class="rating-logo">\n\t\t\t\t\t\t<div class="user-rating"> ' + hotel.rating + '/5 (' + hotel.numReviews + ' reviews) </div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="services"> \n\t\t\t\t\t\t<div class="left-col"> \n\t\t\t\t\t\t\t' + generateHotelModalNestedTemplates(hotel.services.slice(0, hotel.services.length / 2), generateHotelServiceTemplate) + '\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<div class="right-col"> \n\t\t\t\t\t\t\t' + generateHotelModalNestedTemplates(hotel.services.slice(hotel.services.length / 2, hotel.services.length), generateHotelServiceTemplate) + '\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="rooms-div"> \n\t\t\t\t\t<div class="rooms-header-div"> Our Rooms </div>\n\n\t\t\t\t\t' + generateHotelModalNestedTemplates(hotel.rooms, generateHotelRoomTemplate) + '\n\t\t\t\t</div>\n\n\t\t\t\t<div class="comments-section"> \n\t\t\t\t\t<div class="comments-header-div"> Comments and Reviews </div>\n\n\t\t\t\t\t<div class="comments"> \n\t\t\t\t\t\t' + generateHotelModalNestedTemplates(hotel.comments, generateHotelCommentTemplate) + '\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="your-review"> \n\t\t\t\t\t\t<input type="text" placeholder="Enter your comment" class="your-review-input">\n\t\t\t\t\t\t<img src="imgs/blue_star.png" class="blue-star blue-star-review">\n\t\t\t\t\t\t<select class="star-select">\n\t\t\t\t\t\t  <option value="one"> 1 </option>\n\t\t\t\t\t\t  <option value="two"> 2 </option>\n\t\t\t\t\t\t  <option value="three"> 3 </option>\n\t\t\t\t\t\t  <option value="four"> 4 </option>\n\t\t\t\t\t\t  <option value="five"> 5 </option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t\t<button class="submit-button post-button"> Add </button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\n\t\t\t</div>\n\t\t</div>';
}
'use strict';

function generateHotelRoomTemplate(room) {
	return '\n\t\t\t\t\t<div class="room"> \n\t\t\t\t\t\t<span class="room-name-span"> ' + room.name + ' </span>\n\t\t\t\t\t\t<button class="submit-button book-button"> Book </button>\n\n\t\t\t\t\t\t<div class="room-images-div"> \n\t\t\t\t\t\t\t' + (room.image1Path ? '<img src="' + room.image1Path + '" class="room-image">' : '') + '\n\t\t\t\t\t\t\t' + (room.image2Path ? '<img src="' + room.image2Path + '" class="room-image">' : '') + '\n\t\t\t\t\t\t\t' + (room.image3Path ? '<img src="' + room.image3Path + '" class="room-image">' : '') + '\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class="room-info"> \n\t\t\t\t\t\t\t<div> Rooms - ' + room.roomNum + ', Area - ' + room.roomAreas + ' </div>\n\t\t\t\t\t\t\t<div> Bedrooms - ' + room.bedroomNum + ', Area - ' + room.bedroomAreas + ' </div>\n\t\t\t\t\t\t\t<div> Beds - ' + room.bedNum + ', ' + room.bedAreas + ' </div>\n\t\t\t\t\t\t\t<div> Bathrooms - ' + room.bathroomNum + ', ' + room.bathroomAreas + ' </div>\n\t\t\t\t\t\t\t<div> Balconies - ' + room.balconyNum + ', ' + room.balconyAreas + ' </div>\n\t\t\t\t\t\t\t<div class="price-div"> Price - ' + room.price + ' per night </div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>';
}
"use strict";

function generateSearchedHotelTemplate(hotel) {
	return "\n\t\t<div class=\"searched-hotel-single\">\n\t\t\t<div class=\"searched-hotel-image\"> \n\t\t\t\t<img src=\"" + hotel.imagePath + "\">\n\t\t\t</div>\n\t\t\t<div class=\"searched-hotel-info\">\n\t\t\t\t\t<h3> " + hotel.name + " </h3> \n\t\t\t\t\t<p> " + hotel.description + " </p> \n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li> <label> Phone: </label> <a> " + hotel.phone + " </a> </li>\n\t\t\t\t\t\t<li> <label> Address: </label>  <a> " + hotel.localAddress + " </a> </li> \n\t\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<button type=\"button\" class=\"searched-hotel-more\"> See more </button>\n\t\t</div>\n\t";
}
"use strict";

function generateTopHotelTemplate(hotel) {
	return "\n\t\t<div class=\"top-hotel-single-outter\">\n\t\t\t<div class=\"top-hotel-single\">\n\t\t\t\t<div class=\"top-hotel-header\">\n\t\t\t\t\t<img src=\"" + hotel.imagePath + "\">\n\t\t\t\t\t<div class=\"top-hotel-header-price-info\">\n\t\t\t\t\t\t<a> $" + hotel.priceMin + "-$" + hotel.priceMax + " </a> <label> | Per Night </label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"top-hotel-content\">\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li class=\"top-hotel-name\"> <a href=\"#home#" + hotel.id + "\"> " + hotel.name + " </a> </li>\n\t\t\t\t\t\t<li> <label class=\"country-name-label\"> Country: </label> <a class=\"country-name-value\"> " + hotel.country + " </a> </li>\n\t\t\t\t\t\t<li> <label class=\"city-name-label\"> City: </label> <a class=\"city-name-value\"> " + hotel.city + " </a> </li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t";
}
"use strict";

function generateHotelServiceTemplate(service) {
	return "\n\t\t\t\t\t<div class=\"service-entry\"> \n\t\t\t\t\t\t<img src=\"" + service.logoPath + "\" class=\"service-logo\">\n\t\t\t\t\t\t<span class=\"service-span\"> " + service.name + " </span>\n\t\t\t\t\t\t<img src=\"" + service.yesNoPath + "\" class=\"yes-no-logo\">\n\t\t\t\t\t</div> ";
}
"use strict";

function generateTeamMemberTemplate(member) {
	return "\n\t\t<div class=\"team-member\"> \n\t\t<img src=\"" + member.imgPath + "\" class=\"team-member-img\">\n\t\t<div class=\"team-member-name\"> " + member.name + " </div>\n\t\t<div class=\"position\"> " + member.position + " </div>\n\t\t<div class=\"about-team-member\"> \n\t\t\t" + member.about + "\n\t\t</div>\n\t</div>";
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL2FwcC5qcyIsInRlbXBsYXRlcy9jb21tZW50X3RlbXAuanMiLCJ0ZW1wbGF0ZXMvaG90ZWxfbW9kYWxfdGVtcC5qcyIsInRlbXBsYXRlcy9ob3RlbF9yb29tX3RlbXAuanMiLCJ0ZW1wbGF0ZXMvaG90ZWxfc2VhcmNoZWRfdGVtcC5qcyIsInRlbXBsYXRlcy9ob3RlbF90ZW1wLmpzIiwidGVtcGxhdGVzL3NlcnZpY2VfdGVtcC5qcyIsInRlbXBsYXRlcy90ZWFtX21lbWJlcl90ZW1wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBsb2FkSlNPTiA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIF9yZWYgPSBfYXN5bmNUb0dlbmVyYXRvciggLyojX19QVVJFX18qL3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUoZmlsZSwgY2FsbGJhY2spIHtcblx0XHRyZXR1cm4gcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gX2NhbGxlZSQoX2NvbnRleHQpIHtcblx0XHRcdHdoaWxlICgxKSB7XG5cdFx0XHRcdHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcblx0XHRcdFx0XHRjYXNlIDA6XG5cdFx0XHRcdFx0XHRfY29udGV4dC5uZXh0ID0gMjtcblx0XHRcdFx0XHRcdHJldHVybiBmZXRjaChmaWxlKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdFx0XHRcdFx0XHRyZXNwb25zZS5qc29uKCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFjayhKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ0ZldGNoIEVycm9yIDonLCBlcnIpO1xuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRjYXNlIDI6XG5cdFx0XHRcdFx0Y2FzZSBcImVuZFwiOlxuXHRcdFx0XHRcdFx0cmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sIF9jYWxsZWUsIHRoaXMpO1xuXHR9KSk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIGxvYWRKU09OKF94LCBfeDIpIHtcblx0XHRyZXR1cm4gX3JlZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHR9O1xufSgpO1xuXG4vKiBmcm9tIHN0YWNrb3ZlcmZsb3cgKi9cbnZhciBsb2FkSFRNTCA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIF9yZWYyID0gX2FzeW5jVG9HZW5lcmF0b3IoIC8qI19fUFVSRV9fKi9yZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBfY2FsbGVlMihhbmNob3IsIGVsZW1lbnQpIHtcblx0XHRyZXR1cm4gcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gX2NhbGxlZTIkKF9jb250ZXh0Mikge1xuXHRcdFx0d2hpbGUgKDEpIHtcblx0XHRcdFx0c3dpdGNoIChfY29udGV4dDIucHJldiA9IF9jb250ZXh0Mi5uZXh0KSB7XG5cdFx0XHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRcdFx0X2NvbnRleHQyLm5leHQgPSAyO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZldGNoKFwicGFnZXMvXCIgKyBhbmNob3Iuc3Vic3RyKDEpICsgXCIuaHRtbFwiKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlcy50ZXh0KCk7XG5cdFx0XHRcdFx0XHR9KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQuaW5uZXJIVE1MID0gZGF0YTtcblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRcdGNhc2UgXCJlbmRcIjpcblx0XHRcdFx0XHRcdHJldHVybiBfY29udGV4dDIuc3RvcCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSwgX2NhbGxlZTIsIHRoaXMpO1xuXHR9KSk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIGxvYWRIVE1MKF94MywgX3g0KSB7XG5cdFx0cmV0dXJuIF9yZWYyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdH07XG59KCk7XG5cbi8qIGZyb20gc3RhY2tvdmVyZmxvdyAqL1xuXG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7IHJldHVybiBmdW5jdGlvbiAoKSB7IHZhciBnZW4gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyBmdW5jdGlvbiBzdGVwKGtleSwgYXJnKSB7IHRyeSB7IHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTsgdmFyIHZhbHVlID0gaW5mby52YWx1ZTsgfSBjYXRjaCAoZXJyb3IpIHsgcmVqZWN0KGVycm9yKTsgcmV0dXJuOyB9IGlmIChpbmZvLmRvbmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0gZWxzZSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSwgZnVuY3Rpb24gKGVycikgeyBzdGVwKFwidGhyb3dcIiwgZXJyKTsgfSk7IH0gfSByZXR1cm4gc3RlcChcIm5leHRcIik7IH0pOyB9OyB9XG5cbmZ1bmN0aW9uIGRpc3BsYXlGb3JtKGlkKSB7XG5cdHZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXHRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG59XG5cbmZ1bmN0aW9uIGhpZGVNb2RhbCgpIHtcblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVnLW1vZGFsLXdyYXBcIikpIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVnLW1vZGFsLXdyYXBcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2luLW1vZGFsLXdyYXBcIikpIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4tbW9kYWwtd3JhcFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdH0sIDEwMCk7XG59XG5cbmZ1bmN0aW9uIGZvcmdvdFBhc3MoKSB7XG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9yZ290LXBhc3NcIikuc3R5bGUuY29sb3IgPSBcIiM3MTA5QjBcIjtcblx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZC1zZW50XCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdH0sIDEwMDApO1xufVxuXG53aW5kb3cub25jbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xuXHR2YXIgcmVnTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlZy1tb2RhbC13cmFwXCIpO1xuXHR2YXIgbG9nTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2luLW1vZGFsLXdyYXBcIik7XG5cdGlmIChldmVudC50YXJnZXQgPT0gcmVnTW9kYWwgfHwgZXZlbnQudGFyZ2V0ID09IGxvZ01vZGFsKSB7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRldmVudC50YXJnZXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH0sIDEwMCk7XG5cdH1cbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uIChldmVudCkge1xuXHRmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuXHRcdHZhciBpbnB1dEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2F0aW9uJyk7XG5cdFx0dmFyIGF1dG9jb21wbGV0ZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlKGlucHV0RmllbGQpO1xuXHR9XG5cblx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIod2luZG93LCAnbG9hZCcsIGluaXRpYWxpemUpO1xuXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVnaXN0ZXJcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRkaXNwbGF5Rm9ybShcInJlZy1tb2RhbC13cmFwXCIpO1xuXHR9KTtcblxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2luXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG5cdFx0ZGlzcGxheUZvcm0oXCJsb2dpbi1tb2RhbC13cmFwXCIpO1xuXHR9KTtcblxuXHRBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjbG9zZVwiKSkuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcblx0XHRlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0aGlkZU1vZGFsKCk7XG5cdFx0fSk7XG5cdH0pO1xuXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9yZ290LXBhc3NcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRmb3Jnb3RQYXNzKCk7XG5cdH0pO1xuXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbi1zZWFyY2gtYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG5cblx0XHR3aW5kb3cubG9jYXRpb24uaGFzaCA9IFwiI3NlYXJjaFwiO1xuXHR9KTtcbn0pO1xuXG5mdW5jdGlvbiBsb2FkVG9wSG90ZWxzKCkge1xuXHRsb2FkSlNPTignY29udGVudC9ob3RlbHMuanNvbicsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdHZhciBhcnIgPSBKU09OLnBhcnNlKHJlc3BvbnNlKVtcImhvdGVsc1wiXTtcblx0XHRmb3IgKHZhciByb3cgPSAwOyByb3cgPCAyOyByb3crKykge1xuXHRcdFx0Zm9yICh2YXIgY29sID0gMDsgY29sIDwgMzsgY29sKyspIHtcblx0XHRcdFx0dmFyIGN1cnJlbnRSb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidG9wLWhvdGVscy1yb3dcIilbcm93XTtcblx0XHRcdFx0Y3VycmVudFJvdy5pbm5lckhUTUwgKz0gZ2VuZXJhdGVUb3BIb3RlbFRlbXBsYXRlKGFycltyb3cgKiAzICsgY29sXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gbG9hZFNlYXJjaGVkSG90ZWxzKCkge1xuXHRsb2FkSlNPTignY29udGVudC9ob3RlbHMuanNvbicsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHRcdHZhciBhcnIgPSBKU09OLnBhcnNlKHJlc3BvbnNlKVtcImhvdGVsc1wiXTtcblx0XHR2YXIgZGl2VG9BZGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaGVkLWhvdGVscy1jb250ZW50XCIpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRkaXZUb0FkZC5pbm5lckhUTUwgKz0gZ2VuZXJhdGVTZWFyY2hlZEhvdGVsVGVtcGxhdGUoYXJyW2ldKTtcblx0XHR9XG5cblx0XHR2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChfaSkge1xuXHRcdFx0dmFyIGN1cnJlbnRFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNlYXJjaGVkLWhvdGVsLW1vcmVcIilbX2ldO1xuXHRcdFx0Y3VycmVudEVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhhc2ggKz0gXCIjXCIgKyAoX2kgKyAxKTtcblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHRmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJyLmxlbmd0aDsgX2krKykge1xuXHRcdFx0X2xvb3AoX2kpO1xuXHRcdH1cblx0fSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRUZWFtTWVtYmVycygpIHtcblx0bG9hZEpTT04oJ2NvbnRlbnQvdGVhbS5qc29uJywgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0dmFyIGFyciA9IEpTT04ucGFyc2UocmVzcG9uc2UpW1wibWVtYmVyc1wiXTtcblx0XHR2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3VyLXRlYW1cIik7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcblx0XHRcdGVsZW1lbnQuaW5uZXJIVE1MICs9IGdlbmVyYXRlVGVhbU1lbWJlclRlbXBsYXRlKGFycltpXSk7XG5cdFx0fVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVIb3RlbE1vZGFsTmVzdGVkVGVtcGxhdGVzKGRhdGEsIHRlbXBsYXRlR2VuZXJhdG9yKSB7XG5cdHZhciByZXMgPSBcIlwiO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRyZXMgKz0gdGVtcGxhdGVHZW5lcmF0b3IoZGF0YVtpXSk7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgcm91dGUpO1xuXG5pZiAobG9jYXRpb24uaGFzaCkge1xuXHRyb3V0ZSgpO1xufSBlbHNlIHtcblx0bG9hZFRvcEhvdGVscygpO1xufWZ1bmN0aW9uIGlzTm9ybWFsSW50ZWdlcihzdHIpIHtcblx0dmFyIG4gPSBNYXRoLmZsb29yKE51bWJlcihzdHIpKTtcblx0cmV0dXJuIG4gIT09IEluZmluaXR5ICYmIFN0cmluZyhuKSA9PT0gc3RyICYmIG4gPj0gMDtcbn1cblxuZnVuY3Rpb24gcm91dGUoKSB7XG5cdHZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3AtaG90ZWxzLWRpdlwiKTtcblx0dmFyIGFuY2hvciA9IGxvY2F0aW9uLmhhc2g7XG5cdGlmIChpc05vcm1hbEludGVnZXIoYW5jaG9yLnN1YnN0cihhbmNob3IubGFzdEluZGV4T2YoXCIjXCIpICsgMSkpKSB7XG5cdFx0bG9hZEpTT04oJ2NvbnRlbnQvaG90ZWxfbW9kYWxzLmpzb24nLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcblx0XHRcdHZhciBhcnIgPSBKU09OLnBhcnNlKHJlc3BvbnNlKVtcImhvdGVsTW9kYWxzXCJdO1xuXHRcdFx0dmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFsbC1oZWFkZXJzXCIpO1xuXHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSBnZW5lcmF0ZUhvdGVsTW9kYWxUZW1wbGF0ZShhcnJbYW5jaG9yLnN1YnN0cihhbmNob3IubGFzdEluZGV4T2YoXCIjXCIpICsgMSkgLSAxXSkgKyBlbGVtZW50LmlubmVySFRNTDtcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwtZXhpdC1idXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpbmdsZS1ob3RlbC1tb2RhbFwiKTtcblx0XHRcdFx0ZWxlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW0pO1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaGFzaCA9IGFuY2hvci5zdWJzdHIoMCwgYW5jaG9yLmxhc3RJbmRleE9mKFwiI1wiKSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHRsb2FkSFRNTChhbmNob3IsIGVsZW1lbnQpO1xuXHRcdGlmIChhbmNob3IgPT0gXCIjaG9tZVwiKSB7XG5cdFx0XHRsb2FkVG9wSG90ZWxzKCk7XG5cdFx0fSBlbHNlIGlmIChhbmNob3IgPT0gXCIjc2VhcmNoXCIpIHtcblx0XHRcdGxvYWRTZWFyY2hlZEhvdGVscygpO1xuXHRcdH0gZWxzZSBpZiAoYW5jaG9yID09IFwiI2Fib3V0XCIpIHtcblx0XHRcdGxvYWRUZWFtTWVtYmVycygpO1xuXHRcdH1cblx0fVxufSIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZUhvdGVsQ29tbWVudFRlbXBsYXRlKGNvbW1lbnQpIHtcblx0cmV0dXJuIFwiXFxuXFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiY29tbWVudFxcXCI+XFxuXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwiY29tbWVudC1oZWFkZXItZGl2XFxcIj4gXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PHNwYW4gY2xhc3M9XFxcImNvbW1lbnQtYXV0aG9yLXNwYW5cXFwiPiBcIiArIGNvbW1lbnQubmFtZSArIFwiIDwvc3Bhbj5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8c3BhbiBjbGFzcz1cXFwicmV2aWV3LXN0YXItbnVtXFxcIj4gXCIgKyBjb21tZW50LnN0YXJzICsgXCIgPC9zcGFuPiBcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8aW1nIHNyYz1cXFwiaW1ncy9ibHVlX3N0YXIucG5nXFxcIiBjbGFzcz1cXFwiYmx1ZS1zdGFyXFxcIj4gXFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxuXFxuXFx0XFx0XFx0XFx0XFx0XFx0XCIgKyBjb21tZW50LmNvbnRlbnQgKyBcIlxcblxcdFxcdFxcdFxcdFxcdDwvZGl2PlwiO1xufSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZ2VuZXJhdGVIb3RlbE1vZGFsVGVtcGxhdGUoaG90ZWwpIHtcblx0cmV0dXJuICdcXG5cXHRcXHQ8ZGl2IGNsYXNzPVwibW9kYWwgaG90ZWwtbW9kYWwtd3JhcFwiIGlkPVwic2luZ2xlLWhvdGVsLW1vZGFsXCI+XFxuXFx0XFx0XFx0PGRpdiBjbGFzcz1cImhvdGVsLW1vZGFsXCI+IFxcblxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJjbG9zZVwiPiA8YnV0dG9uIGlkPVwibW9kYWwtZXhpdC1idXR0b25cIj4gJnRpbWVzOyA8L2J1dHRvbj4gPC9kaXY+IFxcblxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJob3RlbC1uYW1lLWRpdlwiPiAnICsgaG90ZWwubmFtZSArICcgPC9kaXY+XFxuXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cImhvdGVsLXN0YXJzLWRpdlwiPiBcXG5cXHRcXHRcXHRcXHRcXHQ8aW1nIHNyYz1cImltZ3Mvc3Rhci5wbmdcIiBjbGFzcz1cInN0YXItbG9nb1wiPlxcblxcdFxcdFxcdFxcdFxcdCcgKyAoaG90ZWwuc3RhcnMgPiAxID8gJzxpbWcgc3JjPVwiaW1ncy9zdGFyLnBuZ1wiIGNsYXNzPVwic3Rhci1sb2dvXCI+JyA6ICcnKSArICdcXG5cXHRcXHRcXHRcXHRcXHQnICsgKGhvdGVsLnN0YXJzID4gMiA/ICc8aW1nIHNyYz1cImltZ3Mvc3Rhci5wbmdcIiBjbGFzcz1cInN0YXItbG9nb1wiPicgOiAnJykgKyAnXFxuXFx0XFx0XFx0XFx0XFx0JyArIChob3RlbC5zdGFycyA+IDMgPyAnPGltZyBzcmM9XCJpbWdzL3N0YXIucG5nXCIgY2xhc3M9XCJzdGFyLWxvZ29cIj4nIDogJycpICsgJ1xcblxcdFxcdFxcdFxcdFxcdCcgKyAoaG90ZWwuc3RhcnMgPiA0ID8gJzxpbWcgc3JjPVwiaW1ncy9zdGFyLnBuZ1wiIGNsYXNzPVwic3Rhci1sb2dvXCI+JyA6ICcnKSArICdcXG5cXHRcXHRcXHRcXHQ8L2Rpdj4gXFxuXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cImdlbmVyYWwtaW5mb1wiPlxcblxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJob3RlbC1jb250YWN0LXdyYXBcIj5cXG5cXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwiaG90ZWwtY29udGFjdC1kaXZcIj5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8aW1nIHNyYz1cImltZ3MvbG9jYXRpb25fbG9nby5wbmdcIiBjbGFzcz1cImhvdGVsLWNvbnRhY3QtbG9nb1wiPlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDxzcGFuIGNsYXNzPVwiaG90ZWwtY29udGFjdC1zcGFuXCI+ICcgKyBob3RlbC5hZGRyZXNzICsgJyA8L3NwYW4+XFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxuXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cImhvdGVsLWNvbnRhY3QtZGl2XCI+XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PGltZyBzcmM9XCJpbWdzL3Bob25lX2xvZ28ucG5nXCIgY2xhc3M9XCJob3RlbC1jb250YWN0LWxvZ29cIj5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8c3BhbiBjbGFzcz1cImhvdGVsLWNvbnRhY3Qtc3BhblwiPiAnICsgaG90ZWwubnVtYmVyICsgJyA8L3NwYW4+XFxuXFx0XFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxuXFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxuXFxuXFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInVzZXItcmF0aW5nLWRpdlwiPiBcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8aW1nIHNyYz1cImltZ3MvdXNlcl9yYXRpbmdfbG9nby5wbmdcIiBjbGFzcz1cInJhdGluZy1sb2dvXCI+XFxuXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInVzZXItcmF0aW5nXCI+ICcgKyBob3RlbC5yYXRpbmcgKyAnLzUgKCcgKyBob3RlbC5udW1SZXZpZXdzICsgJyByZXZpZXdzKSA8L2Rpdj5cXG5cXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXG5cXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwic2VydmljZXNcIj4gXFxuXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cImxlZnQtY29sXCI+IFxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdCcgKyBnZW5lcmF0ZUhvdGVsTW9kYWxOZXN0ZWRUZW1wbGF0ZXMoaG90ZWwuc2VydmljZXMuc2xpY2UoMCwgaG90ZWwuc2VydmljZXMubGVuZ3RoIC8gMiksIGdlbmVyYXRlSG90ZWxTZXJ2aWNlVGVtcGxhdGUpICsgJ1xcblxcdFxcdFxcdFxcdFxcdFxcdDwvZGl2PlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcblxcdFxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJyaWdodC1jb2xcIj4gXFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0JyArIGdlbmVyYXRlSG90ZWxNb2RhbE5lc3RlZFRlbXBsYXRlcyhob3RlbC5zZXJ2aWNlcy5zbGljZShob3RlbC5zZXJ2aWNlcy5sZW5ndGggLyAyLCBob3RlbC5zZXJ2aWNlcy5sZW5ndGgpLCBnZW5lcmF0ZUhvdGVsU2VydmljZVRlbXBsYXRlKSArICdcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXG5cXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicm9vbXMtZGl2XCI+IFxcblxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJyb29tcy1oZWFkZXItZGl2XCI+IE91ciBSb29tcyA8L2Rpdj5cXG5cXG5cXHRcXHRcXHRcXHRcXHQnICsgZ2VuZXJhdGVIb3RlbE1vZGFsTmVzdGVkVGVtcGxhdGVzKGhvdGVsLnJvb21zLCBnZW5lcmF0ZUhvdGVsUm9vbVRlbXBsYXRlKSArICdcXG5cXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXG5cXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwiY29tbWVudHMtc2VjdGlvblwiPiBcXG5cXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwiY29tbWVudHMtaGVhZGVyLWRpdlwiPiBDb21tZW50cyBhbmQgUmV2aWV3cyA8L2Rpdj5cXG5cXG5cXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwiY29tbWVudHNcIj4gXFxuXFx0XFx0XFx0XFx0XFx0XFx0JyArIGdlbmVyYXRlSG90ZWxNb2RhbE5lc3RlZFRlbXBsYXRlcyhob3RlbC5jb21tZW50cywgZ2VuZXJhdGVIb3RlbENvbW1lbnRUZW1wbGF0ZSkgKyAnXFxuXFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxuXFxuXFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInlvdXItcmV2aWV3XCI+IFxcblxcdFxcdFxcdFxcdFxcdFxcdDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBjb21tZW50XCIgY2xhc3M9XCJ5b3VyLXJldmlldy1pbnB1dFwiPlxcblxcdFxcdFxcdFxcdFxcdFxcdDxpbWcgc3JjPVwiaW1ncy9ibHVlX3N0YXIucG5nXCIgY2xhc3M9XCJibHVlLXN0YXIgYmx1ZS1zdGFyLXJldmlld1wiPlxcblxcdFxcdFxcdFxcdFxcdFxcdDxzZWxlY3QgY2xhc3M9XCJzdGFyLXNlbGVjdFwiPlxcblxcdFxcdFxcdFxcdFxcdFxcdCAgPG9wdGlvbiB2YWx1ZT1cIm9uZVwiPiAxIDwvb3B0aW9uPlxcblxcdFxcdFxcdFxcdFxcdFxcdCAgPG9wdGlvbiB2YWx1ZT1cInR3b1wiPiAyIDwvb3B0aW9uPlxcblxcdFxcdFxcdFxcdFxcdFxcdCAgPG9wdGlvbiB2YWx1ZT1cInRocmVlXCI+IDMgPC9vcHRpb24+XFxuXFx0XFx0XFx0XFx0XFx0XFx0ICA8b3B0aW9uIHZhbHVlPVwiZm91clwiPiA0IDwvb3B0aW9uPlxcblxcdFxcdFxcdFxcdFxcdFxcdCAgPG9wdGlvbiB2YWx1ZT1cImZpdmVcIj4gNSA8L29wdGlvbj5cXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L3NlbGVjdD5cXG5cXHRcXHRcXHRcXHRcXHRcXHQ8YnV0dG9uIGNsYXNzPVwic3VibWl0LWJ1dHRvbiBwb3N0LWJ1dHRvblwiPiBBZGQgPC9idXR0b24+XFxuXFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxuXFx0XFx0XFx0XFx0PC9kaXY+XFxuXFxuXFxuXFx0XFx0XFx0PC9kaXY+XFxuXFx0XFx0PC9kaXY+Jztcbn0iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlSG90ZWxSb29tVGVtcGxhdGUocm9vbSkge1xuXHRyZXR1cm4gJ1xcblxcdFxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XCJyb29tXCI+IFxcblxcdFxcdFxcdFxcdFxcdFxcdDxzcGFuIGNsYXNzPVwicm9vbS1uYW1lLXNwYW5cIj4gJyArIHJvb20ubmFtZSArICcgPC9zcGFuPlxcblxcdFxcdFxcdFxcdFxcdFxcdDxidXR0b24gY2xhc3M9XCJzdWJtaXQtYnV0dG9uIGJvb2stYnV0dG9uXCI+IEJvb2sgPC9idXR0b24+XFxuXFxuXFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cInJvb20taW1hZ2VzLWRpdlwiPiBcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQnICsgKHJvb20uaW1hZ2UxUGF0aCA/ICc8aW1nIHNyYz1cIicgKyByb29tLmltYWdlMVBhdGggKyAnXCIgY2xhc3M9XCJyb29tLWltYWdlXCI+JyA6ICcnKSArICdcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQnICsgKHJvb20uaW1hZ2UyUGF0aCA/ICc8aW1nIHNyYz1cIicgKyByb29tLmltYWdlMlBhdGggKyAnXCIgY2xhc3M9XCJyb29tLWltYWdlXCI+JyA6ICcnKSArICdcXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQnICsgKHJvb20uaW1hZ2UzUGF0aCA/ICc8aW1nIHNyYz1cIicgKyByb29tLmltYWdlM1BhdGggKyAnXCIgY2xhc3M9XCJyb29tLWltYWdlXCI+JyA6ICcnKSArICdcXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXG5cXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicm9vbS1pbmZvXCI+IFxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDxkaXY+IFJvb21zIC0gJyArIHJvb20ucm9vbU51bSArICcsIEFyZWEgLSAnICsgcm9vbS5yb29tQXJlYXMgKyAnIDwvZGl2PlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDxkaXY+IEJlZHJvb21zIC0gJyArIHJvb20uYmVkcm9vbU51bSArICcsIEFyZWEgLSAnICsgcm9vbS5iZWRyb29tQXJlYXMgKyAnIDwvZGl2PlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDxkaXY+IEJlZHMgLSAnICsgcm9vbS5iZWROdW0gKyAnLCAnICsgcm9vbS5iZWRBcmVhcyArICcgPC9kaXY+XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PGRpdj4gQmF0aHJvb21zIC0gJyArIHJvb20uYmF0aHJvb21OdW0gKyAnLCAnICsgcm9vbS5iYXRocm9vbUFyZWFzICsgJyA8L2Rpdj5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2PiBCYWxjb25pZXMgLSAnICsgcm9vbS5iYWxjb255TnVtICsgJywgJyArIHJvb20uYmFsY29ueUFyZWFzICsgJyA8L2Rpdj5cXG5cXHRcXHRcXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVwicHJpY2UtZGl2XCI+IFByaWNlIC0gJyArIHJvb20ucHJpY2UgKyAnIHBlciBuaWdodCA8L2Rpdj5cXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L2Rpdj5cXG5cXHRcXHRcXHRcXHRcXHQ8L2Rpdj4nO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVNlYXJjaGVkSG90ZWxUZW1wbGF0ZShob3RlbCkge1xuXHRyZXR1cm4gXCJcXG5cXHRcXHQ8ZGl2IGNsYXNzPVxcXCJzZWFyY2hlZC1ob3RlbC1zaW5nbGVcXFwiPlxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcInNlYXJjaGVkLWhvdGVsLWltYWdlXFxcIj4gXFxuXFx0XFx0XFx0XFx0PGltZyBzcmM9XFxcIlwiICsgaG90ZWwuaW1hZ2VQYXRoICsgXCJcXFwiPlxcblxcdFxcdFxcdDwvZGl2PlxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcInNlYXJjaGVkLWhvdGVsLWluZm9cXFwiPlxcblxcdFxcdFxcdFxcdFxcdDxoMz4gXCIgKyBob3RlbC5uYW1lICsgXCIgPC9oMz4gXFxuXFx0XFx0XFx0XFx0XFx0PHA+IFwiICsgaG90ZWwuZGVzY3JpcHRpb24gKyBcIiA8L3A+IFxcblxcdFxcdFxcdFxcdFxcdDx1bD5cXG5cXHRcXHRcXHRcXHRcXHRcXHQ8bGk+IDxsYWJlbD4gUGhvbmU6IDwvbGFiZWw+IDxhPiBcIiArIGhvdGVsLnBob25lICsgXCIgPC9hPiA8L2xpPlxcblxcdFxcdFxcdFxcdFxcdFxcdDxsaT4gPGxhYmVsPiBBZGRyZXNzOiA8L2xhYmVsPiAgPGE+IFwiICsgaG90ZWwubG9jYWxBZGRyZXNzICsgXCIgPC9hPiA8L2xpPiBcXG5cXHRcXHRcXHRcXHRcXHQ8L3VsPlxcblxcdFxcdFxcdDwvZGl2PlxcblxcdFxcdFxcdDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwic2VhcmNoZWQtaG90ZWwtbW9yZVxcXCI+IFNlZSBtb3JlIDwvYnV0dG9uPlxcblxcdFxcdDwvZGl2PlxcblxcdFwiO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVRvcEhvdGVsVGVtcGxhdGUoaG90ZWwpIHtcblx0cmV0dXJuIFwiXFxuXFx0XFx0PGRpdiBjbGFzcz1cXFwidG9wLWhvdGVsLXNpbmdsZS1vdXR0ZXJcXFwiPlxcblxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcInRvcC1ob3RlbC1zaW5nbGVcXFwiPlxcblxcdFxcdFxcdFxcdDxkaXYgY2xhc3M9XFxcInRvcC1ob3RlbC1oZWFkZXJcXFwiPlxcblxcdFxcdFxcdFxcdFxcdDxpbWcgc3JjPVxcXCJcIiArIGhvdGVsLmltYWdlUGF0aCArIFwiXFxcIj5cXG5cXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJ0b3AtaG90ZWwtaGVhZGVyLXByaWNlLWluZm9cXFwiPlxcblxcdFxcdFxcdFxcdFxcdFxcdDxhPiAkXCIgKyBob3RlbC5wcmljZU1pbiArIFwiLSRcIiArIGhvdGVsLnByaWNlTWF4ICsgXCIgPC9hPiA8bGFiZWw+IHwgUGVyIE5pZ2h0IDwvbGFiZWw+XFxuXFx0XFx0XFx0XFx0XFx0PC9kaXY+XFxuXFx0XFx0XFx0XFx0PC9kaXY+XFxuXFx0XFx0XFx0XFx0PGRpdiBjbGFzcz1cXFwidG9wLWhvdGVsLWNvbnRlbnRcXFwiPlxcblxcdFxcdFxcdFxcdFxcdDx1bD5cXG5cXHRcXHRcXHRcXHRcXHRcXHQ8bGkgY2xhc3M9XFxcInRvcC1ob3RlbC1uYW1lXFxcIj4gPGEgaHJlZj1cXFwiI2hvbWUjXCIgKyBob3RlbC5pZCArIFwiXFxcIj4gXCIgKyBob3RlbC5uYW1lICsgXCIgPC9hPiA8L2xpPlxcblxcdFxcdFxcdFxcdFxcdFxcdDxsaT4gPGxhYmVsIGNsYXNzPVxcXCJjb3VudHJ5LW5hbWUtbGFiZWxcXFwiPiBDb3VudHJ5OiA8L2xhYmVsPiA8YSBjbGFzcz1cXFwiY291bnRyeS1uYW1lLXZhbHVlXFxcIj4gXCIgKyBob3RlbC5jb3VudHJ5ICsgXCIgPC9hPiA8L2xpPlxcblxcdFxcdFxcdFxcdFxcdFxcdDxsaT4gPGxhYmVsIGNsYXNzPVxcXCJjaXR5LW5hbWUtbGFiZWxcXFwiPiBDaXR5OiA8L2xhYmVsPiA8YSBjbGFzcz1cXFwiY2l0eS1uYW1lLXZhbHVlXFxcIj4gXCIgKyBob3RlbC5jaXR5ICsgXCIgPC9hPiA8L2xpPlxcblxcdFxcdFxcdFxcdFxcdDwvdWw+XFxuXFx0XFx0XFx0XFx0PC9kaXY+XFxuXFx0XFx0XFx0PC9kaXY+XFxuXFx0XFx0PC9kaXY+XFxuXFx0XCI7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlSG90ZWxTZXJ2aWNlVGVtcGxhdGUoc2VydmljZSkge1xuXHRyZXR1cm4gXCJcXG5cXHRcXHRcXHRcXHRcXHQ8ZGl2IGNsYXNzPVxcXCJzZXJ2aWNlLWVudHJ5XFxcIj4gXFxuXFx0XFx0XFx0XFx0XFx0XFx0PGltZyBzcmM9XFxcIlwiICsgc2VydmljZS5sb2dvUGF0aCArIFwiXFxcIiBjbGFzcz1cXFwic2VydmljZS1sb2dvXFxcIj5cXG5cXHRcXHRcXHRcXHRcXHRcXHQ8c3BhbiBjbGFzcz1cXFwic2VydmljZS1zcGFuXFxcIj4gXCIgKyBzZXJ2aWNlLm5hbWUgKyBcIiA8L3NwYW4+XFxuXFx0XFx0XFx0XFx0XFx0XFx0PGltZyBzcmM9XFxcIlwiICsgc2VydmljZS55ZXNOb1BhdGggKyBcIlxcXCIgY2xhc3M9XFxcInllcy1uby1sb2dvXFxcIj5cXG5cXHRcXHRcXHRcXHRcXHQ8L2Rpdj4gXCI7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlVGVhbU1lbWJlclRlbXBsYXRlKG1lbWJlcikge1xuXHRyZXR1cm4gXCJcXG5cXHRcXHQ8ZGl2IGNsYXNzPVxcXCJ0ZWFtLW1lbWJlclxcXCI+IFxcblxcdFxcdDxpbWcgc3JjPVxcXCJcIiArIG1lbWJlci5pbWdQYXRoICsgXCJcXFwiIGNsYXNzPVxcXCJ0ZWFtLW1lbWJlci1pbWdcXFwiPlxcblxcdFxcdDxkaXYgY2xhc3M9XFxcInRlYW0tbWVtYmVyLW5hbWVcXFwiPiBcIiArIG1lbWJlci5uYW1lICsgXCIgPC9kaXY+XFxuXFx0XFx0PGRpdiBjbGFzcz1cXFwicG9zaXRpb25cXFwiPiBcIiArIG1lbWJlci5wb3NpdGlvbiArIFwiIDwvZGl2PlxcblxcdFxcdDxkaXYgY2xhc3M9XFxcImFib3V0LXRlYW0tbWVtYmVyXFxcIj4gXFxuXFx0XFx0XFx0XCIgKyBtZW1iZXIuYWJvdXQgKyBcIlxcblxcdFxcdDwvZGl2PlxcblxcdDwvZGl2PlwiO1xufSJdfQ==
