export function installer() {
  const scripts = ["d3.min.js", "usable.js", "stripped.js"];
  for (const script of scripts) {
    const elm = document.createElement(script);
    document.body.appendChild(elm);
  }
}
