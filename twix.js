const percent = 68;

const circle = document.querySelector(".progress");

const radius = 70;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = circumference;

const offset =
  circumference -
  (percent / 100) * circumference;

circle.style.strokeDashoffset = offset;