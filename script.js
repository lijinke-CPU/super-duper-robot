/* ===== 拾光书房 · 公共渲染脚本 ===== */

function starsHtml(r) {
  var full = Math.floor(r), half = r - full >= 0.5 ? 1 : 0, empty = 5 - full - half;
  return "★".repeat(full) + (half ? "☆" : "") + "☆".repeat(empty);
}

function cardHtml(it) {
  var tagHtml = it.tags.map(function (t, i) {
    return '<span class="tag c' + ((i % 4) + 1) + '">' + t + '</span>';
  }).join("");
  return '<div class="card">' +
    '<div class="cover"><img src="' + coverOf(it) + '" alt="' + it.title + '">' +
    '<span class="badge">' + KIND_NAME[it.kind] + '</span>' +
    '<div class="cover-ov"><b>' + it.title + '</b><span>' + it.author + '</span></div></div>' +
    '<div class="body">' +
    '<h3>' + it.title + '</h3>' +
    '<div class="meta">' + it.author + ' ｜ ' + CAT_NAME[it.cat] + '</div>' +
    '<p>' + it.intro + '</p>' +
    '<div class="tags">' + tagHtml + '</div>' +
    '<div class="foot"><span class="stars">' + starsHtml(it.rating) + '</span>' +
    '<a class="btn" href="detail.html?id=' + it.id + '">查看详情 →</a></div>' +
    '</div></div>';
}

/* 渲染某分类列表（供专栏页使用）；subs 可选：只渲染细分归属内的条目 */
function renderCategory(cat, elId, subs) {
  var el = document.getElementById(elId);
  if (!el) return;
  var list = DB.filter(function (it) {
    if (it.cat !== cat) return false;
    if (subs && subs.length) {
      return subsOf(it).some(function (s) { return subs.indexOf(s) !== -1; });
    }
    return true;
  });
  el.innerHTML = list.map(cardHtml).join("");
}
