// 宇宙銀行 通帳・残高・履歴

const BALANCE_KEY = "spaceBankBalance_v1";
const HISTORY_KEY = "spaceBankHistory_v1";

function formatYen(num){
  return "¥" + Number(num || 0).toLocaleString("ja-JP");
}

function getBalance(){
  return Number(localStorage.getItem(BALANCE_KEY) || 0);
}

function setBalance(num){
  localStorage.setItem(BALANCE_KEY, String(num));
}

function getHistory(){
  try{
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  }catch(err){
    return [];
  }
}

function setHistory(arr){
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr));
}

function addHistory(item){
  const list = getHistory();
  list.unshift(item);
  setHistory(list.slice(0, 20));
}

function addToBalance(value, title){
  const current = getBalance();
  const next = current + value;

  setBalance(next);

  addHistory({
    title,
    value,
    date: new Date().toLocaleString("ja-JP")
  });

  return next;
}

function getTodayIncome(){
  const list = getHistory();
  const today = new Date().toLocaleDateString("ja-JP");

  return list
    .filter(item => item.value > 0 && item.date && item.date.startsWith(today))
    .reduce((sum, item) => sum + item.value, 0);
}

function updateTodayIncome(){
  const todayIncomeEl = document.getElementById("todayIncome");

  if(todayIncomeEl){
    todayIncomeEl.textContent = "+" + formatYen(getTodayIncome());
  }
}

function renderPassbook(){
  const passbookBalance = document.getElementById("passbookBalance");
  const historyList = document.getElementById("historyList");

  if(passbookBalance){
    passbookBalance.textContent = formatYen(getBalance());
  }

  updateTodayIncome();

  if(!historyList) return;

  const list = getHistory();
  historyList.innerHTML = "";

  if(!list.length){
    historyList.innerHTML = '<div class="emptyState">まだ受け取り履歴はないよ🐾</div>';
    return;
  }

  list.forEach(item => {
    const row = document.createElement("div");
    row.className = "historyItem";

    const name = document.createElement("div");
    name.className = "name";
    name.innerHTML =
      `${item.title}<br><span style="color:var(--muted);font-size:11px;">${item.date}</span>`;

    const val = document.createElement("div");
    val.className = "val";

    if(item.value < 0){
      val.textContent = "-" + formatYen(Math.abs(item.value)).replace("¥", "¥");
    }else{
      val.textContent = "+" + formatYen(item.value).replace("¥", "¥");
    }

    row.appendChild(name);
    row.appendChild(val);
    historyList.appendChild(row);
  });
}

function openPassbook(){
  const passbookBack = document.getElementById("passbookBack");
  renderPassbook();

  if(passbookBack){
    passbookBack.style.display = "flex";
  }
}

function closePassbook(){
  const passbookBack = document.getElementById("passbookBack");

  if(passbookBack){
    passbookBack.style.display = "none";
  }
}

function resetBank(){
  if(confirm("宇宙銀行口座をリセットしますか？")){
    localStorage.removeItem(BALANCE_KEY);
    localStorage.removeItem(HISTORY_KEY);
    localStorage.removeItem("spaceBankCollection_v1");
    location.reload();
  }
}
