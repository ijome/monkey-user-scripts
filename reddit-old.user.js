// ==UserScript==
// @name          reddit-old
// @description   Removes annoying sections
// @require		    https://code.jquery.com/jquery-3.3.1.min.js
// @match         https://old.reddit.com/*
// @noframes
// ==/UserScript==
/* jshint -W097 */
/*global $: false */
"use strict";

$(function() {
  console.log("🐵");

  addCss(`
    .side { 
      display: none; 
    }
  `);

  addJs(`
		$('.infobar').hide();
	`);

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
