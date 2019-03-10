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
  console.clear();
  console.log("🐵");

  const jsAsFunction = () => {
    $("#index_table .entry td.brutto").each(function() {
      let node = $(this);
      const decimalTime = node.html();
      console.log({ decimalTime });
    });
  };

  waitForElement("#index_table", () => {
    addJsAsFunction(jsAsFunction);
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

  function addCssAsString(cssAsString) {
    $("<style/>", { type: "text/css" })
      .html(cssAsString)
      .appendTo("head");
  }

  function addJsAsFunction(jsAsFunction) {
    addJsAsString("(" + jsAsFunction.toString() + ")();");
  }

  function addJsAsString(jsAsString) {
    $("<script/>", { type: "application/javascript" })
      .html(jsAsString)
      .appendTo("head");
  }
});
