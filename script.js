// ──── 1. CSV の URL を設定 ────
const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTJD3O6aS5Fn_nO_Kck_nlh1pncM2qi1Ojqhf_kSLrXPWpqLK-gEJdEVE4ibFVrrSRQY-AzNqrNaVUS/pub?output=csv";

let cardData = [];  // あとで CSV から読み込む配列

// ──── 2. PapaParse で CSV を読み込む ────
Papa.parse(csvUrl, {
  download: true,
  header: true,      // 1行目を {日本語: "...", 英語: "..."} のキーにする
  skipEmptyLines: true,
  complete: function(results) {
    // results.data はスプレッドシートの行ごとのオブジェクト配列
    // たとえば { 日本語: "...", 英語: "..." } の形
    cardData = results.data.map(row => ({
      jp: row[Object.keys(row)[0]],
      en: row[Object.keys(row)[1]]
    }));
    console.log("読み込んだ件数:", cardData.length);
  }
});

// ──── 3. 検索して表示 ────
const input = document.getElementById("searchInput");
const jpList = document.getElementById("japaneseList");
const enList = document.getElementById("englishList");

input.addEventListener("input", () => {
  const kw = input.value.trim();
  jpList.innerHTML = "";
  enList.innerHTML = "";

  if (!kw) return;  // キーワードが空なら何もしない

  // 日本語列にキーワードを含む行を探す
  const hits = cardData.filter(item => item.jp.includes(kw));

  // 見つかった件を一覧表示
  hits.forEach(item => {
    const liJ = document.createElement("li");
    liJ.textContent = item.jp;
    jpList.appendChild(liJ);

    const liE = document.createElement("li");
    liE.textContent = item.en;
    enList.appendChild(liE);
  });
});