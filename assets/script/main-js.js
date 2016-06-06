/**
 * Created by Damith on 6/6/2016.
 */

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#scrollToTop').fadeIn();
        } else {
            $('#scrollToTop').fadeOut();
        }
    });
    $('#scrollToTop').click(function () {
        alert('done');
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });
});