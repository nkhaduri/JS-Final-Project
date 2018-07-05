function generateHotelServiceTemplate(service) {
	return `
					<div class="service-entry"> 
						<img src="${service.logoPath}" class="service-logo">
						<span class="service-span"> ${service.name} </span>
						<img src="${service.yesNoPath}" class="yes-no-logo">
					</div> `;
}