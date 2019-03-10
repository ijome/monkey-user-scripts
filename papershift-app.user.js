// ==UserScript==
// @name            papershift-app
// @description     Replaces decimal time with standard time
// @require         https://code.jquery.com/jquery-3.3.1.min.js
// @require         https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js
// @match           https://app.papershift.com/*
// @noframes
// ==/UserScript==
/* jshint -W097 */
/*global $: false */
"use strict";

$(function() {
  console.log("🐵");

  const js = `
    $('#index_table .entry td.brutto').each(function() {
      let node = $(this);
      const decimalTime = node.html();
      console.log({decimalTime});
    });
  `;

  waitForElement("#index_table", () => {
    addJs(js);
  });

  function waitForElement(selector, callback) {
    if ($(selector).length) {
      callback();
    } else {
      setTimeout(() => {
        waitForElement(selector, callback);
      }, 100);
    }
  }

  function addCss(css) {
    $("<style/>", { type: "text/css" })
      .html(css)
      .appendTo("head");
  }

  function addJs(js) {
    $("<script/>", { type: "application/javascript" })
      .html(js)
      .appendTo("head");
  }
});
