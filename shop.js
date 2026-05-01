const COLLECTION_KEY = "spaceBankCollection_v1";

function getCollection(){
  try{
    return JSON.parse(localStorage.getItem(COLLECTION_KEY) || "[]");
  }catch(err){
    return [];
  }
}

function setCollection(arr){
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(arr));
}

function renderCollection(){
  const grid = document.getElementById("collectionGrid");
  if(!grid) return;

  const owned = getCollection();
  grid.innerHTML = "";

  shopItems.forEach(item => {
    const box = document.createElement("div");
    box.className = "collectionItem";

    const img = document.createElement("img");
    img.src = item.src;

    const name = document.createElement("div");
    name.className = "collectionName";

    if(owned.includes(item.id)){
      name.textContent = item.name;
    }else{
      img.style.opacity = "0.2";
      name.textContent = "？？？";
    }

    box.appendChild(img);
    box.appendChild(name);
    grid.appendChild(box);
  });
}

function buyItem(item){
  const balance = getBalance();

  if(balance < item.price){
    alert("残高が足りないよ🐾");
    return;
  }

  const owned = getCollection();

  if(owned.includes(item.id)){
    alert("もう持ってるよ✨");
    return;
  }

  setBalance(balance - item.price);
  owned.push(item.id);
  setCollection(owned);

  addHistory({
    title: item.name + " を購入",
    value: -item.price,
    date: new Date().toLocaleString("ja-JP")
  });

  renderCollection();
  updateTodayIncome();

  alert("✨宇宙銀行ATM✨\n\n" + item.name + " を購入しました💰");
}

function openShop(){
  const itemsText = shopItems
    .map((item, index) =>
      `${index + 1}. ${item.name}\n　 ${formatYen(item.price)}`
    )
    .join("\n\n");

  const num = prompt(
    "宇宙銀行ショッピング🌈\n欲しいアイテムの番号を入力してね\n\n" + itemsText
  );

  const item = shopItems[Number(num) - 1];

  if(item){
    buyItem(item);
  }
}
