(function ($) {

    $(document).ready(function () {
        // Filter trial search toggles
        $('.clinical-trials-filter__control').click(function (e) {
            $('.clinical-trials-filter__form').toggleClass('clinical-trials-filter__form--mobile-hidden');
        });

        // Expand truncated field
        $('.health-field--truncate__control').click(function (e) {
            e.preventDefault();
            var $target = $(this).prev();

            if ($target.hasClass('health-field--truncate--closed')) {
                $target.removeClass('health-field--truncate--closed')
                $(this)
                    .removeClass('health-field--truncate__control--closed')
                    .attr('aria-expanded', 'true')
                    .html('view less');
            } else {
                $target.addClass('health-field--truncate--closed');
                $(this)
                    .addClass('health-field--truncate__control--closed')
                    .attr('aria-expanded', 'false')
                    .html('view more');
            }
        });

    });

})(jQuery);

console.log("Script loaded");