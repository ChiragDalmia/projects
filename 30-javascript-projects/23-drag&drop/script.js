window.onload = function () {

// item i want to drag
let listItems = document.querySelectorAll(".js-list-item");
let rightBox = document.querySelector("#right");
let leftBox = document.querySelector("#left");

// for desktop
let selectedItem = null;

function appendFirst(parent, child) {
  if (child) {
    parent.appendChild(child);
    child = null;
  }
}

for (let listItem of listItems) {
  listItem.addEventListener("dragstart", (e) => {
    selectedItem = e.target;
  });
}


rightBox.addEventListener("dragover", (e) => {
  e.preventDefault();
});

rightBox.addEventListener("drop", (e) => {
  e.preventDefault();
  appendFirst(rightBox, selectedItem);
});

leftBox.addEventListener("dragover", (e) => {
  e.preventDefault();
});

leftBox.addEventListener("drop", (e) => {
  e.preventDefault();
  appendFirst(leftBox, selectedItem);
});

// for mobile
let selectedItemMobile = null;

for (let listItem of listItems) {
  listItem.addEventListener("touchstart", (e) => {
    selectedItemMobile = e.target;
  });

  listItem.addEventListener("touchmove", (e) => {
    e.preventDefault();
    let touchLocation = e.targetTouches[0];
    selectedItemMobile.style.position = "absolute";
    selectedItemMobile.style.left = touchLocation.pageX - 50 + "px";
    selectedItemMobile.style.top = touchLocation.pageY - 50 + "px";
  });

  listItem.addEventListener("touchend", (e) => {
    const touchLocation = e.changedTouches[0];
    const targetRectRight = rightBox.getBoundingClientRect();
    const targetRectLeft = leftBox.getBoundingClientRect();
    selectedItemMobile.style.position = "static";
    if (touchLocation.pageX > targetRectRight.left &&     
        touchLocation.pageX < targetRectRight.right &&
        touchLocation.pageY > targetRectRight.top && touchLocation.pageY < targetRectRight.bottom) {
      appendFirst(rightBox, selectedItemMobile);
    } else if (touchLocation.pageX > targetRectLeft.left && touchLocation.pageX < targetRectLeft.right &&
               touchLocation.pageY > targetRectLeft.top && touchLocation.pageY < targetRectLeft.bottom) {
      appendFirst(leftBox, selectedItemMobile);
    }
  });
}


let swapIcon = document.querySelector(".swap");

// for viewwidth < 568px add class to swap icon
// change dynamically while resizing
function addClass() {
  if (window.innerWidth < 568) {
    swapIcon.classList.add("fa-rotate-90");
    swapIcon.classList.remove("fa-flip");
  } else {
    swapIcon.classList.remove("fa-rotate-90");
    swapIcon.classList.add("fa-flip");
  }
}
window.addEventListener("resize", addClass);
addClass();

}