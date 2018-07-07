function generateTeamMemberTemplate(member) {
	return `
		<div class="team-member"> 
		<img src="${member.imgPath}" class="team-member-img">
		<div class="team-member-name"> ${member.name} </div>
		<div class="position"> ${member.position} </div>
		<div class="about-team-member"> 
			${member.about}
		</div>
	</div>`;

}