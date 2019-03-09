// ==UserScript==
// @name          mdn-web-docs
// @description   Removes annoying sections
// @require		    https://code.jquery.com/jquery-3.3.1.min.js
// @match         https://developer.mozilla.org/*
// @noframes
// ==/UserScript==
/* jshint -W097 */
/*global $: false */
"use strict";

$(function() {
  console.log("🐵");

  addCss(`
    #contribution-popover-container { 
      display: none; 
    }
  `);

  function addCss(css) {
    $("<style/>", { type: "text/css" })
      .html(css)
      .appendTo("head");
  }
});
