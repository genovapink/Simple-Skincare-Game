const startBtn = document.getElementById("startBtn");
const gameplay = document.querySelector(".gameplay");
const message = document.getElementById("message");
const title = document.getElementById("title");
const items = document.querySelectorAll(".item");
const character = document.querySelector(".character");
const instruction = document.getElementById("instruction");

let step = 1;
let wrongAttempts = 0;

const updateCharacter = (img) => {
  character.src = `assets/${img}.png`;
};

const resetGame = () => {
  step = 1;
  wrongAttempts = 0;
  updateCharacter("harlettecharacter");
  items.forEach((item) => {
    item.style.opacity = "1";
    item.style.pointerEvents = "auto";
  });
  gameplay.classList.remove("hidden");
  instruction.innerHTML = "Ayo bantu Harlette urutkan skincare yang benar ya! 💖";
};

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  character.classList.remove("hidden");
  gameplay.classList.remove("hidden");
  instruction.innerHTML = "Ayo bantu Harlette urutkan skincare yang benar ya! 💖";
});

items.forEach((item) => {
  item.addEventListener("click", () => {
    const itemStep = parseInt(item.dataset.step);
    if (itemStep === step) {
      const itemClone = item.cloneNode(true);
      const rect = item.getBoundingClientRect();
      itemClone.style.position = "fixed";
      itemClone.style.left = rect.left + "px";
      itemClone.style.top = rect.top + "px";
      itemClone.style.transition = "all 0.8s ease-in-out";
      itemClone.style.zIndex = "1000";
      document.body.appendChild(itemClone);

      const charRect = character.getBoundingClientRect();
      setTimeout(() => {
        itemClone.style.left = charRect.left + charRect.width / 3 + "px";
        itemClone.style.top = charRect.top + charRect.height / 3 + "px";
        itemClone.style.opacity = "0";
        itemClone.style.transform = "scale(0.3)";
      }, 50);

      setTimeout(() => {
        itemClone.remove();
      }, 1000);

      item.style.opacity = "0.5";
      item.style.pointerEvents = "none";
      updateCharacter(`step${step}`);
      step++;

      if (step > 4) {
        gameplay.classList.add("hidden");
        items.forEach(item => item.style.display = "none");
        character.style.display = "none";
        instruction.innerHTML = `<div class='final-message'>Selamat Kamu Glow Up Dengan Harlette!! 🌟</div>`;
      }
    } else {
      wrongAttempts++;
      updateCharacter("wrong");

      if (wrongAttempts >= 2) {
        gameplay.classList.add("hidden");
        items.forEach(item => item.style.display = "none");
        character.style.display = "none";
        instruction.innerHTML = `
          <div class='final-message'>Oops salah lagi! 😢<br>
          <small>Yuk pelajari urutan skincare yang tepat dulu ya!</small></div>
        `;
      } else {
        instruction.innerHTML = "Ups! Urutannya salah, coba lagi ya! ✋";
        setTimeout(resetGame, 1500);
      }
    }
  });
});
