
let mode = "gate";
let pin = "";
let rewardTimers = [];

const app = document.getElementById("app");
const heroImg = document.getElementById("heroImg");
const heroLabel = document.getElementById("heroLabel");
const heroTitle = document.getElementById("heroTitle");
const heroSub = document.getElementById("heroSub");
const gateAction = document.getElementById("gateAction");
const btnEnter = document.getElementById("btnEnter");

const atmWrap = document.getElementById("atmWrap");
const pinView = document.getElementById("pinView");
const pinDots = document.getElementById("pinDots");
const keypad = document.getElementById("keypad");
const btnEnterReward = document.getElementById("btnEnterReward");
const hintLine = document.getElementById("hintLine");

const rewardStage = document.getElementById("rewardStage");
const rewardArea = document.getElementById("rewardArea");
const rewardTitle = document.getElementById("rewardTitle");
const rewardSub = document.getElementById("rewardSub");
const btnRewardAgain = document.getElementById("btnRewardAgain");
const btnBackATM = document.getElementById("btnBackATM");
const btnNotice = document.getElementById("btnNotice");
const btnReset = document.getElementById("btnReset");

const btnHomeTop = document.getElementById("btnHomeTop");
const btnPassbookTop = document.getElementById("btnPassbookTop");
const btnShop = document.getElementById("btnShop");
const passbookBack = document.getElementById("passbookBack");
const passbookClose = document.getElementById("passbookClose");
const btnCopyBalance = document.getElementById("btnCopyBalance");

function cacheBust(path){
  return path + "?v=" + Date.now();
}

function clearTimers(){
  rewardTimers.forEach(t => clearTimeout(t));
  rewardTimers = [];
}

function setHero(src, title, sub){
  heroImg.src = cacheBust(src);
  heroTitle.textContent = title;
  heroSub.textContent = sub;
}

function setMode(next){
  clearTimers();
  mode = next;

  if(mode === "gate"){
    app.classList.add("gateMode");
    heroLabel.style.display = "none";
    setHero(IMG.gate, "", "");
    gateAction.style.display = "flex";
    atmWrap.style.display = "none";
    rewardStage.style.display = "none";
    pin = "";
    updatePinUI();
  }

  if(mode === "atm"){
    app.classList.remove("gateMode");
    heroLabel.style.display = "block";
    setHero(IMG.atm, "宇宙銀行ATM", "好きな4桁を入力してね。");
    gateAction.style.display = "none";
    atmWrap.style.display = "block";
    rewardStage.style.display = "none";
    updatePinUI();
  }

  if(mode === "reward"){
    app.classList.remove("gateMode");
    heroLabel.style.display = "none";
    setHero(IMG.gate, "", "");
    gateAction.style.display = "none";
    atmWrap.style.display = "none";
    rewardStage.style.display = "block";
  }
}

function updatePinUI(){
  pinView.textContent = (pin + "----").slice(0, 4);

  const dots = [];
  for(let i = 0; i < 4; i++){
    dots.push(i < pin.length ? "●" : "◯");
  }

  pinDots.textContent = dots.join(" ");
  btnEnterReward.style.opacity = pin.length === 4 ? "1" : ".55";
  hintLine.innerHTML = "・暗証番号は4桁<br>・好きな4桁を入力して ↩ を押すと受け取り開始";
}

function clearRewardArea(){
  rewardArea.innerHTML = "";
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  rewardArea.appendChild(sparkle);
}

function moneyRainStage(){
  const icons = ["💴", "🪙", "💴", "🪙", "💰"];

  for(let i = 0; i < 24; i++){
    const timer = setTimeout(() => {
      const el = document.createElement("div");
      el.className = "moneyRain";
      el.textContent = icons[Math.floor(Math.random() * icons.length)];
      el.style.left = Math.random() * 90 + "%";
      rewardArea.appendChild(el);
      setTimeout(() => el.remove(), 2400);
    }, i * 75);

    rewardTimers.push(timer);
  }
}

function showRewardImage(reward){
  if(!reward) return;

  rewardArea.innerHTML = "";

  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  rewardArea.appendChild(sparkle);

  const wrap = document.createElement("div");
  wrap.className = "mainRewardWrap";

  const img = document.createElement("img");
  img.src = cacheBust(reward.src);
  img.alt = reward.title;
  img.className = "mainRewardImage";

  const title = document.createElement("div");
  title.className = "mainRewardTitle";

  const value = document.createElement("div");
  value.className = "mainRewardValue";

  if(reward.src.includes("cosmic_bank_office.png")){
    img.src = cacheBust("images/chappy_sally_invitation.png");
    title.textContent = "🌈宇宙銀行から招待状が届きました🌈";
    value.textContent = "頭取ルームへご案内します✨";

    setTimeout(() => {
      img.src = cacheBust("images/cosmic_bank_office.png");
      moneyRainStage();
      title.textContent = "🌈宇宙銀行頭取に招待されました🌈 ご財増しました✨";
      value.textContent = "888,888,888,888";
    }, 1500);
  }else{
    title.textContent = reward.title;
    value.textContent = "+" + formatYen(reward.value);

    if(reward.chestDrop){
      setTimeout(() => {
        img.src = cacheBust("images/cosmic_Takarabako.png");
        title.textContent = "邪鬼が宝箱を落として行った！";
        value.textContent = "+" + formatYen(7777777);
        addToBalance(7777777, "邪鬼が宝箱を落として行った！");
        updateTodayIncome();
      }, 2200);
    }
  }

  wrap.appendChild(img);
  wrap.appendChild(title);
  wrap.appendChild(value);
  rewardArea.appendChild(wrap);

  showSeasonEffect(reward);
}

function getRandomReward(list){
  if(!list || !list.length) return null;

  if(list[0].chance == null){
    return list[Math.floor(Math.random() * list.length)];
  }

  const totalChance = list.reduce((sum, item) => sum + item.chance, 0);
  let random = Math.random() * totalChance;

  for(const item of list){
    if(random < item.chance){
      return item;
    }
    random -= item.chance;
  }

  return list[0];
}

function startRewardFlow(){
  if(pin.length !== 4){
    hintLine.innerHTML = "・暗証番号を4桁入力してね";
    return;
  }

  playRewardSequence();
}

function playRewardSequence(){
  setMode("reward");
  clearRewardArea();

  rewardTitle.textContent = "REWARD";
  rewardSub.textContent = "受取り増す🐶🐾";

  const moneyReward = getRandomReward(IMG.moneyRewards);
  const bonusReward = getRandomReward(IMG.bonusRewards);

  if(moneyReward){
    addToBalance(moneyReward.value, moneyReward.title);
  }

  if(bonusReward){
    addToBalance(bonusReward.value, bonusReward.title);
  }

  updateTodayIncome();

  rewardTimers.push(setTimeout(() => {
    moneyRainStage();
  }, 450));

  rewardTimers.push(setTimeout(() => {
    rewardSub.textContent = "金額の受け取り完了だよ💴";
    showRewardImage(moneyReward);
  }, 1600));

  rewardTimers.push(setTimeout(() => {
    rewardSub.textContent = "さらにごほうびが届いたよ✨";
    showRewardImage(bonusReward);
  }, 4200));
}

function showNotice(){
  alert(
    "✨ご利用について✨\n\n" +
    "このアプリは豊かさを楽しく体験するための無料エンタメアプリです。\n" +
    "実際のお金の入金や金融サービスではありません。\n\n" +
    "販売・転載・改変しての再配布はご遠慮ください。\n" +
    "本アプリの利用によって生じた結果について責任を負いかねます。"
  );
}

btnEnter.addEventListener("click", () => setMode("atm"));
btnEnterReward.addEventListener("click", startRewardFlow);
btnBackATM.addEventListener("click", () => setMode("atm"));
btnRewardAgain.addEventListener("click", playRewardSequence);
btnHomeTop.addEventListener("click", () => setMode("gate"));

btnPassbookTop.addEventListener("click", openPassbook);
passbookClose.addEventListener("click", closePassbook);

passbookBack.addEventListener("click", (e) => {
  if(e.target === passbookBack){
    closePassbook();
  }
});

btnNotice.addEventListener("click", showNotice);
btnReset.addEventListener("click", resetBank);
btnShop.addEventListener("click", openShop);

keypad.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if(!b) return;

  const k = b.dataset.k || b.textContent;

  if(k === "clear" || k === "けす"){
    pin = "";
    updatePinUI();
    return;
  }

  if(pin.length < 4 && /^[0-9]$/.test(k)){
    pin += k;
    updatePinUI();
  }
});

btnCopyBalance.addEventListener("click", async () => {
  const text = "宇宙銀行の残高は " + formatYen(getBalance()) + " だよ✨";

  try{
    await navigator.clipboard.writeText(text);
    btnCopyBalance.textContent = "残高をコピーしたよ";
    setTimeout(() => btnCopyBalance.textContent = "残高をチェック", 1600);
  }catch(err){
    btnCopyBalance.textContent = "残高は " + formatYen(getBalance());
    setTimeout(() => btnCopyBalance.textContent = "残高をチェック", 1600);
  }
});

heroImg.addEventListener("error", () => {
  console.warn("HERO画像が見つからないかも：", heroImg.src);
});

renderCollection();
updateTodayIncome();
setMode("gate");
