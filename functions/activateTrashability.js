import { suttaOneContent, params, suttaTwoContent } from "../index.js";

export function activateTrashability() {
  document.getElementById("trash-one").addEventListener("click", e => {
    e.preventDefault();
    suttaOneContent.innerHTML = "";
    params.delete("one");
    window.history.replaceState(null, null, "?" + params);
  });

  document.getElementById("trash-two").addEventListener("click", e => {
    e.preventDefault();
    suttaTwoContent.innerHTML = "";
    params.delete("two");
    window.history.replaceState(null, null, "?" + params);
  });
}
