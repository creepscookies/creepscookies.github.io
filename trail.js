document.addEventListener("DOMContentLoaded", () => {
console.log("running trail.js");

const coords = { x: 0, y: 0 };
console.log("define coords");
const circles = document.querySelectorAll(".circle");
const colors = [
  "#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e", "#ec805d",
  "#e36e5c", "#df685c", "#d5585c", "#d1525c", "#c5415d", "#c03b5d",
  "#b22c5e", "#ac265e", "#9c155f", "#950f5f", "#830060", "#7c0060",
  "#680060", "#60005f", "#48005f", "#3d005e"
];
console.log("define colors");

let lastScrollTop = 0;
let totalScrollY = 0;
console.log("define scroll");

circles.forEach((circle, index) => {
  console.log("circle");
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});
console.log("for each finished");

window.addEventListener("mousemove", (e) => {
  console.log("mouse moved");
  coords.x = e.clientX;
  coords.y = e.clientY + totalScrollY;
});
console.log("on mouse move defined");

window.addEventListener("scroll", () => {
  const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
  totalScrollY = currentScrollTop;

  const currentScrollTop2 = window.scrollY || document.documentElement.scrollTop;
  scrollAmount = currentScrollTop2 - lastScrollTop;
  lastScrollTop = currentScrollTop2;

  coords.y += scrollAmount;
});
console.log("on scroll defined");

function animateCircles() {
  let x = coords.x;
  let y = coords.y;
  circles.forEach(function (circle, index) {
    const color = colors[index % colors.length]; // Get color from array
    circle.style.backgroundColor = color;
    circle.style.boxShadow = `0 0 30px ${color}, 0 0 60px ${color}, 0 0 90px ${color}`;
});
  circles.forEach((circle, index) => {
    circle.style.left = `${x - 12}px`;
    circle.style.top = `${y - 12}px`;
    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}
console.log("animated circles function defined");

animateCircles();
console.log("animate circles called");
});
