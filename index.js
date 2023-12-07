import { activateTrashability } from "./functions/activateTrashability.js";
import { buildSutta } from "./functions/buildSutta.js";
import { changed } from "./functions/changed.js";
import { setColorScheme } from "./setColorScheme.js";

const form1 = document.getElementById("sutta-one-form");
const suttaOneCitation = document.getElementById("sutta-one-citation");
export const suttaOneContent = document.getElementById("sutta-one-content");

const form2 = document.getElementById("sutta-two-form");
const suttaTwoCitation = document.getElementById("sutta-two-citation");
export const suttaTwoContent = document.getElementById("sutta-two-content");

export let params = new URLSearchParams(document.location.search);
const colorSchemeSelector = document.getElementById("color-scheme");

let colorScheme = "red-green";
if (localStorage.colorScheme) {
  console.log("there is local storage");
  colorScheme = localStorage.colorScheme;
}
colorSchemeSelector.value = colorScheme;
setColorScheme(colorScheme);

colorSchemeSelector.addEventListener("change", e => {
  console.log("switched");
  colorScheme = e.target.value;
  localStorage.colorScheme = e.target.value;
  setColorScheme(e.target.value);
});

activateTrashability();

const compareButton = document.getElementById("compare-button");
const languageSelector = document.getElementById("language");
let language = "en";
languageSelector.addEventListener("input", e => {
  language = e.target.value;
  params.set("lang", language);
  //   document.location.search = params;
  window.history.replaceState(null, null, "?" + params);
});

let suttaOne = params.get("one");
let suttaTwo = params.get("two");
let lang = params.get("lang");
console.log(suttaOne, suttaTwo, lang);

if (lang === "en" || lang === "pl") {
  language = lang;
  languageSelector.value = lang;
}

if (suttaOne) {
  suttaOneCitation.value = suttaOne;
  buildSutta(suttaOneCitation.value, suttaOneContent, language);
}

if (suttaTwo) {
  suttaTwoCitation.value = suttaTwo;
  buildSutta(suttaTwoCitation.value, suttaTwoContent, language);
}

if (suttaOne && suttaTwo) {
  setTimeout(() => {
    changed();
  }, 1000);
}

form1.addEventListener("submit", e => {
  e.preventDefault();
  if (suttaOneCitation.value) {
    params.set("one", suttaOneCitation.value);
    // document.location.search = params;
    window.history.replaceState(null, null, "?" + params);
    buildSutta(suttaOneCitation.value, suttaOneContent, language);
  }
});
form2.addEventListener("submit", e => {
  e.preventDefault();
  if (suttaTwoCitation.value) {
    params.set("two", suttaTwoCitation.value);
    window.history.replaceState(null, null, "?" + params);
    // document.location.search = params;
    buildSutta(suttaTwoCitation.value, suttaTwoContent, language);
  }
});

/* -------ORIGINAL------------*/
export const a = suttaOneContent;
export const b = suttaTwoContent;
export const result = document.getElementById("comparidon-content");

compareButton.addEventListener("click", () => {
  changed();
});

window.onload = function () {
  onDiffTypeChange(document.querySelector('#settings [name="diff_type"]:checked'));
  changed();
};

a.onchange = b.onchange = changed;

if ("oninput" in a) {
  a.oninput = b.oninput = changed;
} else {
  a.onkeyup = b.onkeyup = changed;
}

function onDiffTypeChange(radio) {
  window.diffType = radio.value;
}

var radio = document.getElementsByName("diff_type");
for (var i = 0; i < radio.length; i++) {
  radio[i].onchange = function (e) {
    onDiffTypeChange(e.target);
    changed();
  };
}
