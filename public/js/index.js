$(document).ready(function () {

	$.fn.isOnScreen = function(x_offset, y_offset) {
    if(x_offset == null || typeof x_offset == 'undefined') x_offset = 1;
    if(y_offset == null || typeof y_offset == 'undefined') y_offset = 1;

    var win = $(window),
        viewport = {
          top : win.scrollTop(),
          left : win.scrollLeft()
        },
        height = this.outerHeight(),
        width = this.outerWidth(),
        bounds = this.offset(),
        visible,
        deltas;

    var marginHeader = 100;
    
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height() - marginHeader;

    if(!width || !height) return false;

    bounds.right = bounds.left + width;
    bounds.bottom = bounds.top + height - marginHeader;

    visible = (
      !(viewport.right < bounds.left || 
      viewport.left > bounds.right || 
      viewport.bottom < bounds.top || 
      viewport.top > bounds.bottom)
    );

    if(!visible) return false;

    deltas = {
      top:    Math.min(1, (bounds.bottom - viewport.top) / height),
      bottom: Math.min(1, (viewport.bottom - bounds.top) / height),
      left:   Math.min(1, (bounds.right - viewport.left) / width),
      right:  Math.min(1, (viewport.right - bounds.left) / width)
    };

    return (deltas.left * deltas.right) >= x_offset && (deltas.top * deltas.bottom) >= y_offset;
  };
  
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

$(window).on("scroll", function () {
    checkNavbar();
});

function checkNavbar() {
	$("section").each(function () {
		if ($(this).isOnScreen(0,0)) {
			var navBarLink = $("a[href='#" + $(this).attr("id") + "']");

			$(".nav-item.active").removeClass("active");
			navBarLink.parent().addClass("active");

			return false;
		}
		
	});
}

checkNavbar();

$("#gform").submit(function(e){

	e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');
    Swal.fire({
      title: 'Please Wait !',
      html: 'sending . . .',
      allowOutsideClick: false,
      showCancelButton: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      },
	  });

    var templateParams = {
      from_name: $('#form-name').val(),
      from_email: $('#form-email').val(),
      message: $('#form-message').val()
  };

    emailjs.send('service_arzpgbq', 'template_p205pcp', templateParams)
    .then(function(response) {

      $('#form-email').val('');
			$('#form-name').val('');
			$('#form-message').val('');

      Swal.close();

      Swal.fire(
        'Success',
        'Your message was sent successfully!',
        'success'
      )

    }, function(error) {
      Swal.close();

       console.log('FAILED...', error);

       Swal.fire(
        'Error',
        'Your message was failed to sent ! ' + error,
        'error'
        )

    });

	return false;
});

$(".project-card" ).hover(
  function() {

    $( this ).find('.project-detail').css({
      "opacity":"1",
      "transform": "translateY(0%)"
    });

  }, function() {

    $( this ).find('.project-detail').css({
      "opacity":"0",
      "transform": "translateY(10%)"
    });

  }
);

$(".project-card").click(function(){

  $("#project-detail-container").removeClass("d-none");
  $("#project-detail").addClass("fadeInLeft");
  $("body").css({
    "overflow":"hidden"
  });

  // parsing data card into detail
  var title = $( this ).find('.title-project').text();
  var img = $( this ).find('.img-project').attr("src");
  var about = $( this ).find('.about-data').text();
  var stacks = $( this ).find('.stacks-data').html();
  var website = $( this ).find('.website-data').text();
  var github = $( this ).find('.github-data').text();

  $("#detail-title").text(title);
  $("#detail-img").attr("src",img);
  $("#detail-about").text(about);
  $("#detail-stacks").html(stacks);
  $("#detail-website").text(website);
  $("#detail-website").attr("href",website);
  $("#detail-github").text(github);
  $("#detail-github").attr("href",github);

  if(github == ""){
    $("#container-github").addClass("d-none");
  }else{
    $("#container-github").removeClass("d-none");
  }

});


$('#project-detail').click(function(event){
  event.stopPropagation();
});

$("#project-detail-container").click(function(){

  $("#project-detail-container").addClass("d-none");
  $("#project-detail").removeClass("fadeInLeft");
  $("body").css({
    "overflow":""
  });
  
});

});