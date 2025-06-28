// ──── 1. スプレッドシートID を自分のものに書き換える ────
const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTJD3O6aS5Fn_nO_Kck_nlh1pncM2qi1Ojqhf_kSLrXPWpqLK-gEJdEVE4ibFVrrSRQY-AzNqrNaVUS/pub?output=csv";

let cardData = [];

// ──── 2. PapaParse で CSV を読み込む ────
Papa.parse(csvUrl, {
  download: true,
  header: true,        // 1行目を {日本語: "...", 英語: "..."} のキーにする
  skipEmptyLines: true,
  complete: function(results) {
    // results.data は各行がオブジェクトになった配列
    cardData = results.data.map(row => ({
      jp: row[Object.keys(row)[0]],  // 1列目（日本語）
      en: row[Object.keys(row)[1]]   // 2列目（英語）
    }));
    console.log("読み込んだ件数:", cardData.length);
  }
});

// ──── 3. 検索＆表に表示 ────
const input     = document.getElementById("searchInput");
const tableBody = document.querySelector("#resultsTable tbody");

input.addEventListener("input", () => {
  const kw = input.value.trim();
  // テーブルの中身をクリア
  tableBody.innerHTML = "";
  if (!kw) return;

  // 日本語列にキーワードを含む行をフィルタ
  const hits = cardData.filter(item => item.jp.includes(kw));

  // テーブルの行を追加
  hits.forEach(item => {
    const tr = document.createElement("tr");

    const tdJ = document.createElement("td");
    tdJ.textContent = item.jp;
    tr.appendChild(tdJ);

    const tdE = document.createElement("td");
    tdE.textContent = item.en;
    tr.appendChild(tdE);

    tableBody.appendChild(tr);
  });
});
