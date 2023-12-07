import { a, b, result } from "../index.js";

export function changed() {
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
