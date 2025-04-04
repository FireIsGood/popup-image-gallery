function openContentInDialog(_event) {
  const imageDialogTemplate = document.querySelector("#template-image-dialog");
  const figureElem = this;
  const figureImage = figureElem.querySelector("img");
  const figureDescription = figureElem.querySelector("figcaption").innerText;

  // Deep copy the template
  const dialogTemplate = imageDialogTemplate.content.cloneNode(true);
  const dialogElem = dialogTemplate.querySelector("dialog");

  // Set up the contents
  const imageElem = dialogTemplate.querySelector(".dialog-image");
  imageElem.src = figureImage.src;
  imageElem.alt = figureImage.alt;
  imageElem.width = figureImage.width;
  imageElem.height = figureImage.height;

  const descriptionElem = dialogTemplate.querySelector(".dialog-description");
  descriptionElem.innerText = figureDescription;

  // Add methods to close
  dialogElem.addEventListener("click", function (event) {
    // Filter to just clicking the dialog element (aka the backdrop)
    if (event.target === event.currentTarget) {
      dialogElem.close();
    }
  });
  const closeButton = dialogElem.querySelector("button.dialog-close");
  closeButton.addEventListener("click", function (_event) {
    dialogElem.close();
  });

  // Delete after closing
  dialogElem.addEventListener("close", function (_event) {
    this.remove();
  });

  // Add to the bottom of the body
  document.body.append(dialogTemplate);
  dialogElem.showModal(); // Must be used so the ::backdrop exists
}

function init() {
  // Get a list of the figures we want to make dialog-clickable
  const figureList = [...document.querySelectorAll(".image-list figure")];
  for (figure of figureList) {
    // Add the functionality to click on them
    figure.addEventListener("click", openContentInDialog);
  }
}

document.addEventListener("DOMContentLoaded", init);
