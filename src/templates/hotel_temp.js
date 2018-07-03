function generateTopHotelTemplate(hotel) {
	return `
		<div class="top-hotel-single-outter">
			<div class="top-hotel-single">
				<div class="top-hotel-header">
					<img src="${hotel.imagePath}">
					<div class="top-hotel-header-price-info">
						<a> $${hotel.priceMin}-$${hotel.priceMax} </a> <label> | Per Night </label>
					</div>
				</div>
				<div class="top-hotel-content">
					<ul>
						<li class="top-hotel-name"> <a> ${hotel.name} </a> </li>
						<li> <label class="country-name-label"> Country: </label> <a class="country-name-value"> ${hotel.country} </a> </li>
						<li> <label class="city-name-label"> City: </label> <a class="city-name-value"> ${hotel.city} </a> </li>
					</ul>
				</div>
			</div>
		</div>
	`;
}
