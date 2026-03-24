// 🎯 宇宙宝くじ（購入して抽選 / キャリーオーバー貯まる版）

const LOTTERY_PRICE = 10000;          // 1回の購入金額
const CARRY_KEY = "spaceBankCarry_v1";
const CARRY_ADD = 100000;             // ハズレ1回ごとに増える額

function getCarryOver(){
  return Number(localStorage.getItem(CARRY_KEY) || 0);
}

function setCarryOver(num){
  localStorage.setItem(CARRY_KEY, String(num));
}

function playLottery(){

  const balance = getBalance();

  // 💰残高チェック
  if(balance < LOTTERY_PRICE){
    alert("残高が足りないよ🐾");
    return;
  }

  // 💸宝くじ購入
  setBalance(balance - LOTTERY_PRICE);

  addHistory({
    title: "宇宙宝くじ購入",
    value: -LOTTERY_PRICE,
    date: new Date().toLocaleString("ja-JP")
  });

  updateTodayIncome();

  // 現在のキャリー額
  let carry = getCarryOver();

  // 🎁結果リスト
  const results = [
    {
      type: "lose",
      text: "💫キャリーオーバー発生中🌈\nお金が解放されたがっている🤣",
      value: 0,
      src: "images/kuji_over.png",
      chance: 40
    },
    {
      type: "win",
      text: "ワクワク賞✨",
      value: 30000,
      src: "images/kuji_wakuwaku.png",
      chance: 25
    },
    {
      type: "win",
      text: "やったー当選🎉",
      value: 1000000,
      src: "images/kuji_yattar.png",
      chance: 20
    },
    {
      type: "win",
      text: "BIG当選💰",
      value: 100000000,
      src: "images/kuji_big.png",
      chance: 10
    },
    {
      type: "win",
      text: "🌈キャリーオーバー解放✨",
      value: 888888888,
      src: "images/kuji_garapon.png",
      chance: 5
    }
  ];

  const area = document.getElementById("rewardArea");

  // 🎬画面切り替え
  setMode("reward");
  area.innerHTML = "";

  // 🎰ガラガラ演出
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

  // 🎯抽選
  const result = getRandomReward(results);

  // ⏰1.5秒後に結果表示
  setTimeout(() => {

    img.classList.remove("garagara");
    img.src = result.src;
    title.textContent = result.text;

    const value = document.createElement("div");
    value.className = "mainRewardValue";

    // ハズレ
    if(result.type === "lose"){
      carry += CARRY_ADD;
      setCarryOver(carry);

      value.innerHTML =
        "現在のキャリーオーバー<br>" +
        "+" + formatYen(carry);

      addHistory({
        title: "キャリーオーバー発生中",
        value: 0,
        date: new Date().toLocaleString("ja-JP")
      });
    }

    // 当たり
    if(result.type === "win"){
      const totalWin = result.value + carry;

      addToBalance(totalWin, "宇宙宝くじ当選");
      updateTodayIncome();

      if(carry > 0){
        value.innerHTML =
          "+" + formatYen(result.value) +
          "<br>🌈キャリーオーバー解放 +" + formatYen(carry);
      }else{
        value.textContent = "+" + formatYen(result.value);
      }

      // キャリー解放後はリセット
      setCarryOver(0);
    }

    wrap.appendChild(value);

  }, 1500);
}


// 🎯ボタン接続
window.addEventListener("load", () => {
  const btn = document.getElementById("btnLottery");
  if (btn) {
    btn.addEventListener("click", playLottery);
  } else {
    console.warn("btnLottery 見つからない🐶");
  }
});
