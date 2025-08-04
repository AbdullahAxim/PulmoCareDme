document.addEventListener("DOMContentLoaded", () => {
  const viewMoreButtons = document.querySelectorAll(".view-more-btn");
  const overlay = document.querySelector(".product-overlay");
  const popupCard = document.querySelector(".product-popup-card");
  const popupImage = document.querySelector(".popup-image-container img");
  const popupTitle = document.querySelector(".popup-content h3");
  const popupDescription = document.querySelector(".popup-content p");
  const closePopupBtn = document.getElementById("closePopupBtn");

  // Add event listeners to all View More buttons
  viewMoreButtons.forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      const title = card.querySelector("h3").innerText;
      const imageSrc = card.querySelector("img").src;
    const description = card.getAttribute("data-description") || "No detailed description provided.";

      popupImage.src = imageSrc;
      popupTitle.textContent = title;
      popupDescription.textContent = description;

      overlay.style.display = "flex";
    });
  });

  // Close popup
  closePopupBtn.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  // Also close popup when clicking outside the popup card
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
    }
  });
});
