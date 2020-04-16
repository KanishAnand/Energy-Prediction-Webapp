window.myWidgetParam ? window.myWidgetParam : (window.myWidgetParam = []);
window.myWidgetParam.push({
  id: 11,
  cityid: "1269843",
  appid: "95e286bae5647877dbb924f3779736a8",
  units: "imperial",
  containerid: "openweathermap-widget-11",
});
function replacer() {
  document.body.innerHTML = document.body.innerHTML.replace(/Â/g, "");
}
replacer();
// this was supposed to be
// setInterval(replacer, 500);ok
