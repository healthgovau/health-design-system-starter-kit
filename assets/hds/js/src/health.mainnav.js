var health = health || {};

(function ($, once) {

  /**
   * Add an autocomplete dropdown to a text input.
   *
   * @param selector
   *   jQuery selector.
   * @param source
   *   Callback function or array of terms.
   *
   * @see https://api.jqueryui.com/autocomplete/
   */
  health.searchAutocomplete = function (selector, source) {
    $(once('healthSearchAutocomplete', selector)).autocomplete({
      source: source,
      minLength: 2,
      classes: {
        "ui-autocomplete": "au-body au-link-list"
      },
      // When the user selects a value, submit the form.
      select: function (event, ui) {
        $(this).val(ui.item.value);
        $(event.target).parents('form').submit();
      },
      // Show loading spinner.
      search: function (event, ui) {
        $(event.target).parents('form').find('.health-loading').toggleClass('health-loading--active');
      },
      // Hide loading spinner.
      response: function (event, ui) {
        $(event.target).parents('form').find('.health-loading').toggleClass('health-loading--active');
      }
    });
  };

  /**
   * Move the search box depending on if we are looking at mobile or desktop.
   */
  function healthSearchResize() {
    // Desktop
    if ($(window).width() > 769) {
      if ($('.au-main-nav .health-search--global').length !== 0) {
        $('.health-search--global').insertAfter('.health-sub-nav').show();
      }
      $('.health-facet').removeClass('health-facet--mobile-hidden');
    }
    // Mobile
    else {
      if ($('.au-main-nav .health-search--global').length === 0) {
        $('.health-search--global').insertAfter('#main-nav-default').hide();
      }
      // If mobile filters are closed, then hide the facets.
      if (!$('.health-filter').hasClass('health-filter--open')) {
        $('.health-facet').addClass('health-facet--mobile-hidden');
      }
    }
  }

  /**
   * Limit the number of options displayed in a facet group by providing a show more and show less link.
   *
   * @param selector
   * @param limit
   */
  health.facetShowMore = function (selector, limit) {
    $(once('healthFacetShowMore', selector)).each(function () {
      var
        limit_css = limit - 1,
        facet = $(this);

      // Hide filters beyond the limit.
      facet.find('.au-control-input:gt(' + limit_css + ')').hide();

      // Add a 'Show more' button if the facet has more than the limit.
      facet.filter(function () {
        return facet.find('.au-control-input').length > limit;
      }).each(function () {
        $('<button aria-controls="' + facet.attr('id') + '" class="health-facet__more au-btn au-btn--tertiary">').text('Show more').click(function () {
          if (facet.find('.au-control-input:hidden').length > 0) {
            facet.find('.au-control-input:gt(' + limit_css + ')').show();
            $(this).addClass('open').text('Show less');
          } else {
            facet.find('.au-control-input:gt(' + limit_css + ')').hide();
            $(this).removeClass('open').text('Show more');
          }
          return false;
        }).insertAfter(facet.find('.health-facet__list'));
      });
    });
  };

  function dropdown() {
    // Set classes
    $(".au-main-nav__dropdown--open").removeClass('au-main-nav__dropdown--open');
    $(".au-main-nav__dropdown-control--active").removeClass('au-main-nav__dropdown-control--active');
    // ARIA
  }

  $(document).ready(function () {

    var resizeTimer; // Set resizeTimer to empty so it resets on page load
    // On resize, run the function and reset the timeout
    $(window).resize(function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(healthSearchResize, 250);
    });
    healthSearchResize();

    // Copy across the elements from the sub menu into the main nav.
    // Only show them in the mobile menu.
    $('.health-sub-nav ul.au-link-list li').clone().insertAfter('.au-main-nav ul li:last-of-type').addClass('au-main-nav--mobile-only');

    // Search button handler.
    $('.au-main-nav__toggle--search').click(function (e) {
      $('.health-search--global').toggle();
      $(this).find('span.svg-inline--fa').toggle();
    });

    // Filter toggles.
    $('.health-filter').click(function (e) {
      $(this).toggleClass('health-filter--open');;
      $('.health-facet').toggleClass('health-facet--mobile-hidden');
    });

    // Add correct grid class to second refine search in listings.
    $('.region-navigation #search-api-page-search-form-default-search--2').addClass('col-xs-12');


    // Add IDs/aria to dropdown control/nav
    var dropdownControls = $('.au-main-nav__dropdown-control');
    dropdownControls.each(function (i) {
      $(this).attr("id", "dropdown-control-" + i);
      $(this).find(".au-main-nav__dropdown").attr("aria-labelledby", "dropdown-control-" + i);
    });

    // Add click event handlers for all the buttons
    $(".au-main-nav__dropdown-control > a").on("click", function (event) {
      event.preventDefault();
      $control = $(this).parent('.au-main-nav__dropdown-control');
      $controlId = $(this).attr('id');
      // $dropdown = $(this).next('.au-main-nav__dropdown');

      $.each(dropdownControls, function (index, element) {
        // Selected current
        if ($(this).attr("id") === $control.attr("id")) {
          console.log("Clicked element " + index);
          $control.toggleClass('au-main-nav__dropdown-control--active');
          // $dropdown.toggleClass("au-main-nav__dropdown--open");
        } else {
          $(this).removeClass('au-main-nav__dropdown-control--active');
          // $(this).next('.au-main-nav__dropdown').removeClass('au-main-nav__dropdown--open');
        }
      });

    });

    // Add a click event handler for the document to close any open dropdowns when clicking outside
    $(document).on("click", function (event) {
      event.preventDefault();
      console.log("Clicked document");
      var $target = $(event.target);
      if (!$target.closest(".au-main-nav__dropdown-control > a").length) {
        console.log("Not in target area");
        // $(".au-main-nav__dropdown--open").removeClass('au-main-nav__dropdown--open');
        $(".au-main-nav__dropdown-control--active").removeClass('au-main-nav__dropdown-control--active');
      } else {
        if (!$target.closest(".au-main-nav__dropdown-control--active > a").length) {
          console.log("here");
          // $(this).parent().removeClass('au-main-nav__dropdown-control--active');
        }
      }
    });

  });

})(jQuery, once);
