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

    var marginHeader = 150;
    
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
		onBeforeOpen: () => {
			Swal.showLoading()
		},
	});

    $.ajax({
		type: "POST",
		url: url,
		data: form.serialize(),
		success: function(data)
		{
			$('#form-email').val('');
			$('#form-name').val('');
			$('#form-message').val('');

			Swal.close();

			Swal.fire(
			'Success',
			'Your message was sent successfully!',
			'success'
			)
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
			Swal.close();

			Swal.fire(
			'Error',
			'Your message was failed to sent ! ' + errorThrown,
			'error'
			)
		} 
	});

	return false;
});

});