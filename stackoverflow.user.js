// ==UserScript==
// @name          stackoverflow
// @description   Removes annoying sections
// @require		    https://code.jquery.com/jquery-3.3.1.min.js
// @match         *://stackoverflow.com/*
// @noframes
// ==/UserScript==
/* jshint -W097 */
/*global $: false */
("use strict");

$(function() {
  console.log("🐵");

  addCss(`
    #left-sidebar { 
      display: none; 
    }
  `);

  function addCss(css) {
    $("<style/>", { type: "text/css" })
      .html(css)
      .appendTo("head");
  }
});
