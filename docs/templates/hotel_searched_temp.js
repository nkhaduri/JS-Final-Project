function generateSearchedHotelTemplate(hotel) {
	return `
		<div class="searched-hotel-single">
			<div class="searched-hotel-image"> 
				<img src="${hotel.imagePath}">
			</div>
			<div class="searched-hotel-info">
					<h3> ${hotel.name} </h3> 
					<p> ${hotel.description} </p> 
					<ul>
						<li> <label> Phone: </label> <a> ${hotel.phone} </a> </li>
						<li> <label> Address: </label>  <a> ${hotel.localAddress} </a> </li> 
					</ul>
			</div>
			<button type="button" class="searched-hotel-more"> See more </button>
		</div>
	`;
}

