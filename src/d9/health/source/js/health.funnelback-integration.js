/**
 * @file
 * Provides Funnelback search integration functionality.
 */

const health = health || {};

(($, Drupal) => {
  Drupal.behaviors.healthFunnelbackIntegration = {
    attach: (context, settings) => {
      // Get search scope.
      const searchScopeSettings = settings.health.funnelback_search_scope;
      const $searchForm = $("#funnelback-query", context).parents("form");
      const $searchScopeField = $("*[name='search_scope']", $searchForm);

      // Set autocomplete on search form.
      health.searchAutocomplete("#funnelback-query, #query-inner", (request, response) => {
        const searchScopeIndex = $searchScopeField.val();
        const settings = searchScopeSettings[searchScopeIndex];

        if (settings["autocomplete"] === true) {
          // Autocomplete is enabled so fetch autocomplete results.
          const searchTerm = Drupal.checkPlain(request.term)
          const url = `${settings["endpoint"]}/s/suggest.json?collection=${settings["collection"]}&profile=${settings["profile"]}&partial_query=${searchTerm}`;

          $.ajax({
            url: url,
            dataType: "json",
            success: (data) => {
              response(data);
            }
          });
        }
        else {
          // Autocomplete is not enabled so don't fetch results.
          response(null);
        }
      });
    }
  };
})(jQuery, Drupal);
