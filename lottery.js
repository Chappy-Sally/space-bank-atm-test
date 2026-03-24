function playLottery(){

  const results = [
    {
      text:"ハズレ…🐶",
      value:0,
      src:"images/kuji_syonbori.png",
      chance:40
    },
    {
      text:"ワクワク賞✨",
      value:30000,
      src:"images/kuji_wakuwaku.png",
      chance:25
    },
    {
      text:"やったー当選🎉",
      value:1000000,
      src:"images/kuji_yattar.png",
      chance:20
    },
    {
      text:"BIG当選💰",
      value:100000000,
      src:"images/kuji_big.png",
      chance:10
    },
    {
      text:"キャリーオーバー解放🌈",
      value:888888888,
      src:"images/kuji_garapon.png",
      chance:5
    }
  ];

  const result = getRandomReward(results);

  showLotteryResult(result);
}

function showLotteryResult(result){

  const area = document.getElementById("rewardArea");

  area.innerHTML = "";

  const wrap = document.createElement("div");
  wrap.className = "mainRewardWrap";

  const img = document.createElement("img");
  img.src = result.src;
  img.className = "mainRewardImage";

  const title = document.createElement("div");
  title.className = "mainRewardTitle";
  title.textContent = result.text;

  const value = document.createElement("div");
  value.className = "mainRewardValue";

  if(result.value > 0){
    value.textContent = "+" + formatYen(result.value);
    addToBalance(result.value, "宇宙宝くじ当選");
  }else{
    value.textContent = "またチャレンジ🐾";
  }

  wrap.appendChild(img);
  wrap.appendChild(title);
  wrap.appendChild(value);

  area.appendChild(wrap);

  setMode("reward");
}
