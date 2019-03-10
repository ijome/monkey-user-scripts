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

let switched = false;

console.log(monkey);

waitForElement("#index_table", addButton);

function addButton() {
  const buttonId = "monkey-clock";
  const buttonCss = "";
  const buttonChangeText = "Zeitformat ändern";
  const buttonResetText = "Zeitformat zurücksetzen";

  const buttonHtml = `
    <li id="${buttonId}" class="${buttonCss}"
        title="${monkey}">
        <a href="#">
          ${buttonChangeText}
        </a>
      </li>
    `;

  $("ul.navbar-nav").prepend(buttonHtml);

  $("#" + buttonId).on("click", function() {
    if (switched) {
      location.reload();
    } else {
      changeTime();
      $(this)
        .prop("title", bananas)
        .find("a")
        .text(buttonResetText);
      switched = true;
    }
  });
}

function changeTime() {
  $(`
  #index_table .entry .brutto, 
  #index_table .entry .netto_time,
  #index_table #sum_brutto,
  #index_table #sum_pause,
  #index_table #sum_netto
  `).each(function() {
    let node = $(this);
    const monkeyTime = toMonkeyTime(node.text());
    node
      .prop("title", bananas + " " + monkeyTime.asFloat)
      .data("monkey-time", monkeyTime)
      .text(monkeyTime.asDuration);
  });
  $("#index_table .entry .pause").each(function() {
    let node = $(this);
    let textNode = node.contents().first()[0];
    const monkeyTime = toMonkeyTime(textNode.textContent);
    node
      .prop("title", bananas + " " + monkeyTime.asFloat)
      .data("monkey-time", monkeyTime);
    textNode.textContent = monkeyTime.asDuration + " ";
  });
}

function toMonkeyTime(floatText) {
  const asFloat = parseFloat(floatText);
  const hours = parseInt(asFloat);
  const decimalMinutes = asFloat - hours;
  const minutes = Math.round(decimalMinutes * 60);
  const asDuration = formatDuration(hours, minutes);
  return {
    hours,
    minutes,
    asFloat,
    asDuration
  };
}

function formatDuration(hours, minutes) {
  const hoursText = _.padStart(hours, 2, "0");
  const minutesText = _.padStart(minutes, 2, "0");
  return `${hoursText}:${minutesText} h`;
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
