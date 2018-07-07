function generateHotelRoomTemplate(room) {
	return `
					<div class="room"> 
						<span class="room-name-span"> ${room.name} </span>
						<button class="submit-button book-button"> Book </button>

						<div class="room-images-div"> 
							${room.image1Path ? `<img src="${room.image1Path}" class="room-image">` : ''}
							${room.image2Path ? `<img src="${room.image2Path}" class="room-image">` : ''}
							${room.image3Path ? `<img src="${room.image3Path}" class="room-image">` : ''}
						</div>

						<div class="room-info"> 
							<div> Rooms - ${room.roomNum}, Area - ${room.roomAreas} </div>
							<div> Bedrooms - ${room.bedroomNum}, Area - ${room.bedroomAreas} </div>
							<div> Beds - ${room.bedNum}, ${room.bedAreas} </div>
							<div> Bathrooms - ${room.bathroomNum}, ${room.bathroomAreas} </div>
							<div> Balconies - ${room.balconyNum}, ${room.balconyAreas} </div>
							<div class="price-div"> Price - ${room.price} per night </div>
						</div>
					</div>`;
}