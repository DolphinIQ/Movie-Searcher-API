window.onload = () => {
	var background = document.querySelector(".body-bg");
	var body = document.body;
	var html = document.documentElement;

	var Height = Math.max( body.scrollHeight, body.offsetHeight, 
								  html.clientHeight, html.scrollHeight, html.offsetHeight );
	
	document.addEventListener('resize', resize);
	
	var resize = () => {
		background.style.height = Height.toString() + "px";
	}

	resize();
}