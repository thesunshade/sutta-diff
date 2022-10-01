import { buildSutta } from "./buildSutta.js";
// import { JsDiff } from "./diff.js";

const form1 = document.getElementById("sutta-one-form");
const suttaOneCitation = document.getElementById("sutta-one-citation");
const suttaOneContent = document.getElementById("sutta-one-content");

const form2 = document.getElementById("sutta-two-form");
const suttaTwoCitation = document.getElementById("sutta-two-citation");
const suttaTwoContent = document.getElementById("sutta-two-content");

document.getElementById("trash-one").addEventListener("click", () => (suttaOneContent.innerHTML = ""));
document.getElementById("trash-two").addEventListener("click", () => (suttaTwoContent.innerHTML = ""));

const compareButton = document.getElementById("compare-button");
const languageSelector = document.getElementById("language");
let language = "en";
languageSelector.addEventListener("change", e => {
  language = e.target.value;
});

form1.addEventListener("submit", e => {
  e.preventDefault();
  if (suttaOneCitation.value) {
    buildSutta(suttaOneCitation.value, suttaOneContent, language);
  }
});
form2.addEventListener("submit", e => {
  e.preventDefault();
  if (suttaTwoCitation.value) {
    buildSutta(suttaTwoCitation.value, suttaTwoContent, language);
  }
});

/* -------ORIGINAL------------*/
const a = suttaOneContent;
const b = suttaTwoContent;
const result = document.getElementById("comparidon-content");

compareButton.addEventListener("click", () => {
  changed();
});

function changed() {
  var diff = JsDiff[window.diffType](a.textContent, b.textContent);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < diff.length; i++) {
    if (diff[i].added && diff[i + 1] && diff[i + 1].removed) {
      var swap = diff[i];
      diff[i] = diff[i + 1];
      diff[i + 1] = swap;
    }

    var node;
    if (diff[i].removed) {
      node = document.createElement("del");
      node.appendChild(document.createTextNode(diff[i].value));
    } else if (diff[i].added) {
      node = document.createElement("ins");
      node.appendChild(document.createTextNode(diff[i].value));
    } else {
      node = document.createTextNode(diff[i].value);
    }
    fragment.appendChild(node);
  }

  result.textContent = "";
  result.appendChild(fragment);
}

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
