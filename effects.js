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
  fish.className = "koinoboriEffect";
  fish.textContent = "🎏";

  document.body.appendChild(fish);

  let x = -60;
  const move = setInterval(() => {
    x += 6;
    fish.style.left = x + "px";

    if(x > window.innerWidth){
      clearInterval(move);
      fish.remove();
    }
  }, 30);
}

// 🎏 or 🍀 判定
function showSeasonEffect(reward){
  if(!reward || !reward.src) return;

  const src = reward.src.toLowerCase();

  // 🎏こいのぼり・兜
  if(src.includes("kabuto") || src.includes("koinobori")){
    showKoinobori();
    return;
  }

  // 🍀新緑・母の日
  if(src.includes("mother") || src.includes("shinryoku")){
    showGreenEffect();
    return;
  }
}
