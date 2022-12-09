/**
 * @file
 * Apply JQuery DataTables JS and CSS to identified HTML tables.
 *
 * This file applies the a default subset of the logic and presentation
 * that resides externally in a CDN, to those tables on the Drupal page
 * that are so identified.
 *
 * Note: The 'content - table' paragraph bundle has a checkbox field,
 * labelled "Apply DataTables", invites authors to require that
 * JQuery DataTables functionality is available to the HTML table.
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.health_datatables = {
    attach: function (context) {
      // Invoke DataTable plugin upon each identified table.
      // Use styling per https://datatables.net/manual/styling/classes.
      var $activeTables = $("table[data-tablenumber]", context);
      $activeTables.addClass(['compact','hover']);
      $activeTables.DataTable({
        paging: false,
        scrollx: true
      });

      // Introduce AU design system classes to form fields of DataTables plugin.
      // Remove the "Rows per page" select field for now - not working.
      $('.dataTables_length').remove();

      // "Table search" text field.
      var $dataTablesFilter = $('.dataTables_filter');
      $dataTablesFilter.addClass('au-form__item');
      $dataTablesFilter.find('input[type="search"]').addClass('au-text-input');

      // Remove the pagination info beneath the table for now.
      $('.dataTables_paginate').remove();

      // Remove the table info statement for now - not working.
      $('.dataTables_info').remove();
    }
  }
})(jQuery, Drupal);
