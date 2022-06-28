let health = health || {};

(($, Drupal) => {
  /**
   * Footnotes and references.
   */
  Drupal.behaviors.healthFootnotesAndReferences = {
    attach: (context, settings) => {
      $(document).ready(function () {
        health.tooltip('#content span[title], #content abbr[title]');
      });
    }
  };
})(jQuery, Drupal);
