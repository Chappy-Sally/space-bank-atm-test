// 🍀新緑・母の日エフェクト
function showGreenEffect(){
  for(let i = 0; i < 20; i++){
    const el = document.createElement("div");
    el.className = "greenEffect";
    el.textContent = "🍀";

    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDuration = (2 + Math.random() * 3) + "s";

    document.body.appendChild(el);

    setTimeout(() => el.remove(), 4000);
  }
}

// 🎏兜・こいのぼりエフェクト
function showKoinobori(){
  const fish = document.createElement("div");
  fish.text
