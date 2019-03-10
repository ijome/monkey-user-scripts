// ==UserScript==
// @name            papershift-app
// @description     Formats the decimal time on the page 'time_trackings'
// @require         https://code.jquery.com/jquery-3.3.1.min.js
// @require         https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js
// @match           https://app.papershift.com/*
// ==/UserScript==
/* jshint -W097 */
/* global $, _, moment */
"use strict";

const monkey = "🐵";
const bananas = "🍌";

const timeFormat = "HH:mm [h]";

console.log(monkey);

waitForElement("#index_table", addButton);

function addButton() {
  const buttonId = "monkey-clock";
  const buttonCss = "";
  const buttonText = "Zeitformat ändern";

  const buttonHtml = `
    <li id="${buttonId}" class="${buttonCss}"
        title="${monkey}">
        <a href="#">
          ${buttonText}
        </a>
      </li>
    `;

  $("ul.navbar-nav").prepend(buttonHtml);

  $("#" + buttonId).on("click", function() {
    changeTime();
  });
}

function changeTime() {
  $("#index_table .entry .brutto, #index_table .entry .netto_time").each(
    function() {
      let node = $(this);
      const monkeyTime = toMonkeyTime(node.text());
      node
        .prop("title", bananas + " " + monkeyTime.asFloat)
        .data("monkey-time", monkeyTime)
        .text(monkeyTime.asFormatted);
    }
  );
}

function toMonkeyTime(floatText) {
  const asFloat = parseFloat(floatText);
  const asMoment = decimalTimeToMoment(asFloat);
  const asFormatted = asMoment.format(timeFormat);
  return {
    asFloat,
    asMoment,
    asFormatted
  };
}

function decimalTimeToMoment(decimalTime) {
  const hours = parseInt(decimalTime);
  const decimalMinutes = decimalTime - hours;
  const minutes = decimalMinutes * 60;
  return moment()
    .hours(hours)
    .minutes(minutes);
}

function waitForElement(selector, callback) {
  if ($(selector).length) {
    callback();
  } else {
    setTimeout(() => {
      waitForElement(selector, callback);
    }, 100);
  }
}
