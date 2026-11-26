// Japanese phrase-aware line wrapping (BudouX-style, 100% offline, zero dependencies)
// ------------------------------------------------------------------------------------
// Problem: Japanese has no spaces, so browsers break lines between ANY two characters
// (e.g. "シミュレーション" → "シミ / ュレーション", "Spot 7" → "Spot / 7").
// Fix: segment Japanese text with Intl.Segmenter, group words into natural phrases
// (content word + trailing particles), and insert <wbr> ONLY between phrases.
// CSS `word-break: keep-all` (app.css) then forbids every other break point,
// so lines wrap only between whole words/phrases in JA, VI and EN alike.

const JA_RE = /[぀-ヿ㐀-鿿豈-﫿ｦ-ﾟ]/;
const HIRA_ONLY = /^[぀-ゟー]+$/;
const KANJI_ONLY = /^[㐀-鿿豈-﫿々〆ヶ]+$/;
const KANJI_START = /^[\u3400-\u9fff\uf900-\ufaff々〆ヶ]/;
const KATA_ONLY = /^[\u30a1-\u30fa\u30fc-\u30ff\uff66-\uff9f]+$/; // excludes the ・ separator (U+30FB)
const ALNUM_END = /[A-Za-z0-9.,%°×+\-#/]$/;
const ALNUM_START = /^[A-Za-z0-9.,%°×+\-#/]/;
// Characters that must never start a line (closing brackets, small kana, prolonged mark, punctuation)
const NO_START = /^[)\]}）］｝〕〉》」』】〙〗、。，．・：；！？!?:;,.ーぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ々〻゛゜％%]/;
// Characters that must never end a line (opening brackets)
const NO_END = /[(\[{（［｛〔〈《「『【〘〖＃#＄$]$/;
// Single-kanji prefixes that belong to the next word (全GSE, 約30分, 第2, 各Spot, 未申告)
const PREFIX_KANJI = new Set(['全', '各', '約', '第', '計', '総', '非', '未', '再', '新', '旧', '両', '毎', '前', '後', '元', '現', '同', '当', '本', '超', '準', '副', '主', '最', '高', '低']);

// Inside Japanese text, a label followed by a number must stay on one line: Spot 7 · RWY 36 · BAY 01
const LABEL_NUM_RE = /([A-Za-z0-9])\x20(?=[0-9])/g;

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'OPTION', 'OPTGROUP', 'SELECT', 'CODE', 'PRE', 'CANVAS', 'NOSCRIPT', 'TITLE']);
const SVG_NS = 'http://www.w3.org/2000/svg';
const MIN_LEN = 6;

let segmenter = null;
const processed = new WeakSet();

function getSegmenter() {
  if (segmenter !== null) return segmenter;
  try {
    segmenter = (typeof Intl !== 'undefined' && Intl.Segmenter) ? new Intl.Segmenter('ja', { granularity: 'word' }) : false;
  } catch (e) {
    segmenter = false;
  }
  return segmenter;
}

// Split a string into phrases; returns null when no useful break point exists.
export function splitJaPhrases(text) {
  const seg = getSegmenter();
  if (!seg || !text || text.length < MIN_LEN || !JA_RE.test(text)) return null;
  const phrases = [];
  let cur = '';
  let prevSeg = '';
  for (const { segment: s, isWordLike } of seg.segment(text)) {
    let attach = false;
    if (!cur) attach = true;
    else if (!isWordLike) attach = true; // punctuation / spaces stick to the previous phrase
    else if (HIRA_ONLY.test(s)) attach = true; // particles & okurigana: は・を・して・ください
    else if (NO_START.test(s)) attach = true;
    else if (NO_END.test(cur)) attach = true;
    else if (KANJI_ONLY.test(prevSeg) && KANJI_START.test(s)) attach = true; // keep kanji compounds: 誘導|路, 水|濡れ
    else if (KATA_ONLY.test(prevSeg) && KATA_ONLY.test(s)) attach = true; // keep katakana compounds
    else if (ALNUM_END.test(cur) && ALNUM_START.test(s)) attach = true; // 3,500m / B787-9 / A-TWY
    else if (/[0-9０-９]$/.test(cur) && KANJI_ONLY.test(s) && s.length <= 2) attach = true; // counters: 10機・50問・3分
    else if (prevSeg.length === 1 && PREFIX_KANJI.has(prevSeg) && !NO_START.test(s)) attach = true; // 全|GSE
    else if (/\s$/.test(cur)) attach = true; // a real space is already a break opportunity
    if (attach) cur += s;
    else { phrases.push(cur); cur = s; }
    prevSeg = s;
  }
  if (cur) phrases.push(cur);
  return phrases.length > 1 ? phrases : null;
}

function shouldSkip(el) {
  for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
    if (SKIP_TAGS.has(n.tagName) || n.namespaceURI === SVG_NS) return true;
    if (n.isContentEditable || (n.classList && n.classList.contains('no-phrase-wrap'))) return true;
  }
  return false;
}

function processTextNode(node) {
  if (processed.has(node)) return;
  const parent = node.parentElement;
  const text = node.nodeValue;
  if (!parent || !text || text.length < MIN_LEN || !JA_RE.test(text)) return;
  if (shouldSkip(parent)) return;
  const glued = text.replace(LABEL_NUM_RE, '$1\u00a0');
  const phrases = splitJaPhrases(glued);
  processed.add(node);
  if (!phrases && glued !== text) { node.nodeValue = glued; return; }
  if (!phrases) return;
  // Keep the original node as the first phrase so existing references stay valid
  node.nodeValue = phrases[0];
  const frag = document.createDocumentFragment();
  for (let i = 1; i < phrases.length; i++) {
    frag.appendChild(document.createElement('wbr'));
    const tn = document.createTextNode(phrases[i]);
    processed.add(tn);
    frag.appendChild(tn);
  }
  parent.insertBefore(frag, node.nextSibling);
}

function processTree(root) {
  if (!root) return;
  if (root.nodeType === 3) { processTextNode(root); return; }
  if (root.nodeType !== 1 && root.nodeType !== 11) return;
  if (root.nodeType === 1 && shouldSkip(root)) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let n;
  while ((n = walker.nextNode())) {
    if (!processed.has(n) && n.nodeValue.length >= MIN_LEN && JA_RE.test(n.nodeValue)) nodes.push(n);
  }
  nodes.forEach(processTextNode);
}

export function initJaPhraseWrap() {
  if (typeof document === 'undefined' || !document.body || !getSegmenter()) return;
  processTree(document.body);
  const observer = new MutationObserver(records => {
    for (const r of records) {
      if (r.type === 'characterData') {
        processed.delete(r.target);
        processTextNode(r.target);
      } else {
        r.addedNodes.forEach(processTree);
      }
    }
    observer.takeRecords(); // discard mutations caused by our own <wbr> insertion
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
}
