function playLottery(){

  const results = [
    { text:"ハズレ…🐶", value:0, src:"images/kuji_syonbori.png", chance:40 },
    { text:"ワクワク賞✨", value:30000, src:"images/kuji_wakuwaku.png", chance:25 },
    { text:"やったー当選🎉", value:1000000, src:"images/kuji_yattar.png", chance:20 },
    { text:"BIG当選💰", value:100000000, src:"images/kuji_big.png", chance:10 },
    { text:"キャリーオーバー解放🌈", value:888888888, src:"images/kuji_garapon.png", chance:5 }
  ];

  const area = document.getElementById("rewardArea");

  setMode("reward");
  area.innerHTML = "";

  // 🌟 ガラガラ表示
  const wrap = document.createElement("div");
  wrap.className = "mainRewardWrap";

  const img = document.createElement("img");
  img.src = "images/kuji_garapon.png";
  img.className = "mainRewardImage garagara";

  const title = document.createElement("div");
  title.className = "mainRewardTitle";
  title.textContent = "🎯ガラガラガラ…";

  wrap.appendChild(img);
  wrap.appendChild(title);
  area.appendChild(wrap);

  // 🎯結果抽選
  const result = getRandomReward(results);

  // ⏰1.5秒後に結果表示
  setTimeout(() => {

    img.classList.remove("garagara");
    img.src = result.src;

    title.textContent = result.text;

    let value = document.createElement("div");
    value.className = "mainRewardValue";

    if(result.value > 0){
      value.textContent = "+" + formatYen(result.value);
      addToBalance(result.value, "宇宙宝くじ当選");
    }else{
      value.textContent = "またチャレンジ🐾";
    }

    wrap.appendChild(value);

  }, 1500);
}
