// 🍀新緑・母の日エフェクト
function showGreenEffect(){
  for(let i = 0; i < 24; i++){
    const el = document.createElement("div");
    el.className = "greenEffect";
    el.textContent = "🍀";

    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDuration = (2.8 + Math.random() * 3) + "s";
    el.style.fontSize = (18 + Math.random() * 12) + "px";

    document.body.appendChild(el);

    setTimeout(() => el.remove(), 6000);
  }
}

// 🎏兜・こいのぼりエフェクト：ふわふわ泳ぐ版
function showKoinobori(){
  const fish = document.createElement("div");
  fish.className = "koinoboriEffect";
  fish.textContent = "🎏";

  fish.style.position = "fixed";
  fish.style.left = "-70px";
  fish.style.top = "48%";
  fish.style.fontSize = "44px";
  fish.style.zIndex = "9999";
  fish.style.pointerEvents = "none";
  fish.style.filter = "drop-shadow(0 8px 12px rgba(0,0,0,.35))";

  document.body.appendChild(fish);

  let x = -70;
  let baseY = 48;
  let t = 0;

  const move = setInterval(() => {
    x += 4.5;
    t += 0.12;

    const y = baseY + Math.sin(t) * 4;
    const rotate = Math.sin(t) * 8;

    fish.style.left = x + "px";
    fish.style.top = y + "%";
    fish.style.transform = `rotate(${rotate}deg)`;

    if(x > window.innerWidth + 80){
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
