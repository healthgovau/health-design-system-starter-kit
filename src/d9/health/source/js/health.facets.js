/**
 * @file
 * Provides custom search facets related functionality.
 */

let health = health || {};

(($, Drupal) => {

  Drupal.behaviors.healthFacets = {
    attach: (context, settings) => {

      // Show limit facets.
      health.facetShowMore('.health-facet', 8);
    }
  };

})(jQuery, Drupal);
