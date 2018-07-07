function generateHotelModalTemplate(hotel) {
	return `
		<div class="modal hotel-modal-wrap" id="single-hotel-modal">
			<div class="hotel-modal"> 
				<div class="close"> <button id="modal-exit-button"> x </button> </div> 
				<div class="hotel-name-div"> ${hotel.name} </div>
				<div class="hotel-stars-div"> 
					<img src="imgs/star.png" class="star-logo">
					${hotel.stars > 1 ? `<img src="imgs/star.png" class="star-logo">` : ''}
					${hotel.stars > 2 ? `<img src="imgs/star.png" class="star-logo">` : ''}
					${hotel.stars > 3 ? `<img src="imgs/star.png" class="star-logo">` : ''}
					${hotel.stars > 4 ? `<img src="imgs/star.png" class="star-logo">` : ''}
				</div> 
				<div class="general-info">
					<div class="hotel-contact-wrap">
						<div class="hotel-contact-div">
							<img src="imgs/location_logo.png" class="hotel-contact-logo">
							<span class="hotel-contact-span"> ${hotel.address} </span>
						</div>
						<div class="hotel-contact-div">
							<img src="imgs/phone_logo.png" class="hotel-contact-logo">
							<span class="hotel-contact-span"> ${hotel.number} </span>
						</div>
					</div>

					<div class="user-rating-div"> 
						<img src="imgs/user_rating_logo.png" class="rating-logo">
						<div class="user-rating"> ${hotel.rating}/5 (${hotel.numReviews} reviews) </div>
					</div>

					<div class="services"> 
						<div class="left-col"> 
							${generateHotelModalNestedTemplates((hotel.services).slice(0, (hotel.services).length/2), generateHotelServiceTemplate) }
						</div>
						
						<div class="right-col"> 
							${generateHotelModalNestedTemplates((hotel.services).slice((hotel.services).length/2, (hotel.services).length), 
								generateHotelServiceTemplate) }
						</div>
					</div>
				</div>

				<div class="rooms-div"> 
					<div class="rooms-header-div"> Our Rooms </div>

					${generateHotelModalNestedTemplates(hotel.rooms, generateHotelRoomTemplate) }
				</div>

				<div class="comments-section"> 
					<div class="comments-header-div"> Comments and Reviews </div>

					<div class="comments"> 
						${generateHotelModalNestedTemplates(hotel.comments, generateHotelCommentTemplate) }
					</div>

					<div class="your-review"> 
						<input type="text" placeholder="Enter your comment" class="your-review-input">
						<img src="imgs/blue_star.png" class="blue-star blue-star-review">
						<select class="star-select">
						  <option value="one"> 1 </option>
						  <option value="two"> 2 </option>
						  <option value="three"> 3 </option>
						  <option value="four"> 4 </option>
						  <option value="five"> 5 </option>
						</select>
						<button class="submit-button post-button"> Add </button>
					</div>
				</div>


			</div>
		</div>`;
}