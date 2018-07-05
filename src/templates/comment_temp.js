function generateHotelCommentTemplate(comment) {
	return `
					<div class="comment">
						<div class="comment-header-div"> 
							<span class="comment-author-span"> ${comment.name} </span>
							<span class="review-star-num"> ${comment.stars} </span> 
							<img src="imgs/blue_star.png" class="blue-star"> 
						</div>

						${comment.content}
					</div>`;
}