

function getActivitiesCarousel() {
	document.getElementById("activities-carousel").innerHTML = `<div class="fade-in">
	<div class="my-square">
	<div class="my-square-content box color1">
                <div class="img-hover-zoom--brightness">
 <a onclick='openUrl("homepage", "carousel", "questions.html")'>
  <img class="myimg" src="questions.png">
  </a>
</div>
		</div>
    </div>
    <div class="my-square">
        <div class="my-square-content box color2">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("homepage", "carousel", "describePhoto.html")'>
  <img class="myimg" src="describePhoto-new.png">
  </a>
</div>
		</div>
    </div>
    <div class="my-square">
        <div class="my-square-content box color3">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("homepage", "carousel", "three.html")'>
  <img class="myimg" src="three-new.png">
  </a>
</div>
		</div>
    </div>
    <div class="my-square">
        <div class="my-square-content box color4">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("homepage", "carousel", "discussions.html")'>
  <img class="myimg" src="debates.png">
  </a>
</div>
		</div>
    </div>
    <div class="my-square ">
        <div class="my-square-content box color5">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("homepage", "carousel", "21questions.html")'>
  <img class="myimg" src="famous.png">
  </a>
</div>
		</div>
    </div>
    <div class="my-square ">
        <div class="my-square-content box color6">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("homepage", "carousel", "story.html")'>
  <img class="myimg" src="story.png">
  </a>
</div>
		</div>
    </div>
    <div class="my-square">
        <div class="my-square-content box color1">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("homepage", "carousel", "songs.html")'>
  <img class="myimg" src="songs.png">
  </a>
</div>
		</div>
    </div>
	<div class="my-square">
        <div class="my-square-content box color2">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("homepage", "carousel", "countryCity.html")'>
  <img class="myimg" src="countryCity.png">
  </a>
</div>
		</div>
    </div>
	<div class="my-square">
        <div class="my-square-content box color3">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("homepage", "carousel", "jokes.html")'>
  <img class="myimg" src="jokes.png">
  </a>
</div>
		</div>
    </div>
		<div class="my-square">
        <div class="my-square-content box color4">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("homepage", "carousel", "picture.html")'>
  <img class="myimg" src="photos.png">
  </a>
</div>
		</div>
    </div>
		<div class="my-square">
        <div class="my-square-content box color5">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("homepage", "carousel", "slang.html")'>
  <img class="myimg" src="slang.png">
  </a>
</div>
		</div>
    </div>
	<div class="my-square">
        <div class="my-square-content box color6">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("homepage", "carousel", "sayings.html")'>
  <img class="myimg" src="sayings.png">
  </a>
</div>
		</div>
    </div>
	<div class="my-square">
        <div class="my-square-content box color1">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("homepage", "carousel", "fastest.html")'>
  <img class="myimg" src="fastest.png">
  </a>
</div>
		</div>
    </div>
	<div class="my-square">
        <div class="my-square-content box color2">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("homepage", "carousel", "truth-or-lie.html")'>
  <img class="myimg" src="truthorlie.png">
  </a>
</div>
		</div>
    </div>
	<div class="my-square">
        <div class="my-square-content box color3">
		<div class="img-hover-zoom--brightness">
  <a onclick='openUrl("homepage", "carousel", "wind.html")'>
  <img class="myimg" src="wind.png">
  </a>
</div>
		</div>
    </div>
    <!-- you need to fill the last row with empty squares like this <div class="my-square empty-square"> </div> -->
	</div>
	<div class="container-fluid"><!-- /just for margin from the footer -->
  </div>`;
  saveAction("homepage", "homepage_page_open", null);
}