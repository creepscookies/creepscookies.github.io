document.addEventListener("DOMContentLoaded", () => {
  console.log("running trail.js");

  const coords = { x: 0, y: 0 };
  const circles = document.querySelectorAll(".circle");
  const colors = [
    "#FFD700", "#FDDC5C", "#FCD947", "#FAD32E", "#F8CC14", "#F7C500",
    "#E5B800", "#D4A900", "#C29A00", "#B18B00", "#9F7C00", "#8E6D00",
    "#7C5E00", "#6B4F00", "#593F00", "#482F00", "#362000", "#251100",
    "#150500", "#0A0300", "#070200", "#030100"
  ];

  let lastScrollTop = 0;
  let totalScrollY = 0;

  circles.forEach((circle, index) => {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[index % colors.length];
  });

  window.addEventListener("mousemove", (e) => {
    // Set coords using the current scroll offset
    coords.x = e.clientX;
    coords.y = e.clientY + totalScrollY;
  });

  window.addEventListener("scroll", () => {
    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
    let scrollAmount = currentScrollTop - lastScrollTop;
    lastScrollTop = currentScrollTop;
    totalScrollY = currentScrollTop; // Update the scroll offset for mousemove events

    // Adjust coords.y by the scroll change
    coords.y += scrollAmount;
  });

  function animateCircles() {
    let x = coords.x;
    let y = coords.y;
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

  animateCircles();

  circles.forEach((circle, index) => {
    const color = colors[index % colors.length];
    circle.style.boxShadow = `0 0 30px ${color}, 0 0 60px ${color}, 0 0 90px ${color}`;
  });

  document.querySelectorAll("button, a").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      circles.forEach((circle) => {
        circle.style.transition = "box-shadow 0.3s ease-in-out";
        circle.style.boxShadow = "none";
      });
    });
    element.addEventListener("mouseleave", () => {
      circles.forEach((circle, index) => {
        const color = colors[index % colors.length];
        circle.style.boxShadow = `0 0 30px ${color}, 0 0 60px ${color}, 0 0 90px ${color}`;
      });
    });
  });
});
