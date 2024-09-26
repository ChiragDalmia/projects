let scrollContainer = document.querySelector(".gallery");
let backBtn = document.querySelector("#backBtn");
let nextBtn = document.querySelector("#nextBtn");
let msg = document.querySelector(".msg");

setTimeout(() => {
  msg.style.display = "none";
}, 2000);

scrollContainer.addEventListener("wheel", (e) => {
  e.preventDefault();
  scrollContainer.scrollLeft += e.deltaY;
  scrollContainer.style.scrollBehavior = "auto";
});

backBtn.addEventListener("click", () => {
  scrollContainer.style.scrollBehavior = "smooth";
  scrollContainer.scrollLeft -= 290;
});

nextBtn.addEventListener("click", () => {
  scrollContainer.style.scrollBehavior = "smooth";
  scrollContainer.scrollLeft += 290;
});

// Arrow key navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    backBtn.click();
  } else if (e.key === "ArrowRight") {
    nextBtn.click();
  }
});