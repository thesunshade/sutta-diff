export function setColorScheme(colorScheme) {
  switch (colorScheme) {
    case "red-green":
      document.body.classList.remove("red-blue", "monochrome");
      document.body.classList.add("red-green");
      break;
    case "red-blue":
      document.body.classList.remove("red-green", "monochrome");
      document.body.classList.add("red-blue");
      break;
    case "monochrome":
      document.body.classList.remove("red-blue", "red-green");
      document.body.classList.add("monochrome");
      break;
  }
}
