// levAIup v3 — Multi-Language RPG Learning App

// ===== RPG LEVEL SYSTEM =====
const LEVELS = [
  { lvl:1, name:'Beginner',     badge:'🌱', min:0,    max:100  },
  { lvl:2, name:'Explorer',     badge:'🗺️', min:100,  max:250  },
  { lvl:3, name:'Apprentice',   badge:'📚', min:250,  max:500  },
  { lvl:4, name:'Warrior',      badge:'⚔️', min:500,  max:900  },
  { lvl:5, name:'Scholar',      badge:'🎓', min:900,  max:1500 },
  { lvl:6, name:'Sage',         badge:'🔮', min:1500, max:2500 },
  { lvl:7, name:'Champion',     badge:'🏆', min:2500, max:4000 },
  { lvl:8, name:'Grand Master', badge:'👑', min:4000, max:6000 },
  { lvl:9, name:'Legend',       badge:'⭐', min:6000, max:10000},
];

// ===== LANGUAGE PAIRS =====
const LANG_PAIRS = [
  { from:'🇨🇳', to:'🇬🇧', fromName:'Chinese (中文)', code:'zh', active:true  },
  { from:'🇬🇧', to:'🇨🇳', fromName:'English → ZH',  code:'en', active:false },
  { from:'🇯🇵', to:'🇬🇧', fromName:'Japanese (日本語)',code:'ja', active:false, locked:true },
  { from:'🇰🇷', to:'🇬🇧', fromName:'Korean (한국어)', code:'ko', active:false, locked:true },
  { from:'🇪🇸', to:'🇬🇧', fromName:'Spanish (ES)',   code:'es', active:false, locked:true },
];
let langIndex = 0;

// ===== DAILY MISSIONS =====
const MISSIONS_DEF = [
  { id:'cards10', icon:'📱', title:'Study 10 cards',        target:10, color:'accent', xp:50  },
  { id:'quiz5',   icon:'🎯', title:'Answer 5 quiz Qs',      target:5,  color:'green',  xp:75  },
  { id:'streak',  icon:'🔥', title:'Maintain your streak',  target:1,  color:'yellow', xp:30  },
  { id:'save3',   icon:'🔖', title:'Save 3 cards',          target:3,  color:'accent', xp:40  },
];

// ===== STATE =====
let currentIndex = 0, totalXP = 0, currentStreak = 1;
let liked = new Set(), saved = new Set();
let currentView = 'feed', isAnimating = false;
let cardsStudiedToday = 0, quizAnsweredToday = 0;
let quizLang = 'zh', quizIndex = 0, quizScore = 0, quizStreakQ = 0, quizXPEarned = 0, quizCards = [];

// ===== CARDS =====
const CARDS = [
  {type:'vocab',zh:'你好',pinyin:'nǐ hǎo',en:'Hello',tags:['HSK1','Greeting'],example:{zh:'你好！我叫小明。',pinyin:'Nǐ hǎo! Wǒ jiào Xiǎomíng.',en:'Hello! My name is Xiaoming.'}},
  {type:'vocab',zh:'谢谢',pinyin:'xiè xiè',en:'Thank you',tags:['HSK1'],example:{zh:'谢谢你！',pinyin:'Xièxiè nǐ!',en:'Thank you!'}},
  {type:'vocab',zh:'爱',pinyin:'ài',en:'Love',tags:['HSK2','Emotion'],example:{zh:'我爱学中文！',pinyin:'Wǒ ài xué Zhōngwén!',en:'I love learning Chinese!'}},
  {type:'vocab',zh:'朋友',pinyin:'péngyou',en:'Friend',tags:['HSK1'],example:{zh:'他是我的好朋友。',pinyin:'Tā shì wǒ de hǎo péngyou.',en:'He is my good friend.'}},
  {type:'vocab',zh:'旅行',pinyin:'lǚxíng',en:'Travel',tags:['HSK3','Travel'],example:{zh:'我喜欢旅行！',pinyin:'Wǒ xǐhuān lǚxíng!',en:'I love to travel!'}},
  {type:'vocab',zh:'学习',pinyin:'xuéxí',en:'Study / Learn',tags:['HSK1'],example:{zh:'每天学习很重要。',pinyin:'Měitiān xuéxí hěn zhòngyào.',en:'Studying every day is important.'}},
  {type:'vocab',zh:'快乐',pinyin:'kuàilè',en:'Happy',tags:['HSK2','Emotion'],example:{zh:'祝你天天快乐！',pinyin:'Zhù nǐ tiāntiān kuàilè!',en:'Wishing you happiness every day!'}},
  {type:'vocab',zh:'加油',pinyin:'jiā yóu',en:'Keep going!',tags:['Motivation'],example:{zh:'加油！你可以的！',pinyin:'Jiāyóu! Nǐ kěyǐ de!',en:'You can do it!'}},
  {type:'vocab',zh:'美食',pinyin:'měishí',en:'Delicious food',tags:['Food','Culture'],example:{zh:'中国美食太好吃！',pinyin:'Zhōngguó měishí tài hǎochī!',en:'Chinese food is so delicious!'}},
  {type:'vocab',zh:'火锅',pinyin:'huǒguō',en:'Hot pot 🍲',tags:['Food','Culture'],example:{zh:'我最喜欢吃火锅！',pinyin:'Wǒ zuì xǐhuān chī huǒguō!',en:'I love hot pot the most!'}},
  {type:'vocab',zh:'梦想',pinyin:'mèngxiǎng',en:'Dream',tags:['HSK3','Motivation'],example:{zh:'你的梦想是什么？',pinyin:'Nǐ de mèngxiǎng shì shénme?',en:'What is your dream?'}},
  {type:'vocab',zh:'努力',pinyin:'nǔlì',en:'Work hard',tags:['HSK2'],example:{zh:'努力就会成功！',pinyin:'Nǔlì jiù huì chénggōng!',en:'Work hard and you will succeed!'}},
  {type:'vocab',zh:'成功',pinyin:'chénggōng',en:'Success',tags:['HSK3','Motivation'],example:{zh:'坚持就是成功！',pinyin:'Jiānchí jiù shì chénggōng!',en:'Persistence is success!'}},
  {type:'vocab',zh:'世界',pinyin:'shìjiè',en:'World 🌍',tags:['HSK3'],example:{zh:'你好，世界！',pinyin:'Nǐ hǎo shìjiè!',en:'Hello, World!'}},
  {type:'vocab',zh:'语言',pinyin:'yǔyán',en:'Language',tags:['HSK3'],example:{zh:'学语言很有趣！',pinyin:'Xué yǔyán hěn yǒuqù!',en:'Learning languages is fun!'}},
  {type:'vocab',zh:'文化',pinyin:'wénhuà',en:'Culture',tags:['HSK3'],example:{zh:'中国文化很丰富。',pinyin:'Zhōngguó wénhuà hěn fēngfù.',en:'Chinese culture is very rich.'}},
  {type:'vocab',zh:'漂亮',pinyin:'piàoliang',en:'Beautiful',tags:['HSK2'],example:{zh:'这里很漂亮！',pinyin:'Zhèlǐ hěn piàoliang!',en:'This place is beautiful!'}},
  {type:'vocab',zh:'时间',pinyin:'shíjiān',en:'Time',tags:['HSK2'],example:{zh:'时间就是金钱！',pinyin:'Shíjiān jiù shì jīnqián!',en:'Time is money!'}},
  {type:'vocab',zh:'幸福',pinyin:'xìngfú',en:'Happiness',tags:['HSK3'],example:{zh:'愿你幸福！',pinyin:'Yuàn nǐ xìngfú!',en:'Wishing you happiness!'}},
  {type:'vocab',zh:'北京',pinyin:'Běijīng',en:'Beijing 🏙️',tags:['HSK1','City'],example:{zh:'北京是中国的首都。',pinyin:'Běijīng shì Zhōngguó de shǒudū.',en:'Beijing is the capital of China.'}},
  {type:'culture',emoji:'🥢',title:'Chopstick Etiquette',body:'Never stick chopsticks upright in rice — it resembles funeral incense. Always lay them flat.',tip:'筷子 (kuàizi) = Chopsticks'},
  {type:'culture',emoji:'🧧',title:'Red Envelopes (红包)',body:'During Chinese New Year, red envelopes with money bring good luck. WeChat digital red envelopes are now hugely popular!',tip:'恭喜发财！= Wishing you wealth!'},
  {type:'culture',emoji:'🐉',title:'Chinese Dragon (龙)',body:'Unlike Western dragons, Chinese dragons symbolize GOOD luck, power and prosperity. They are celebrated!',tip:'龙 (lóng) = Dragon — a symbol of fortune!'},
  {type:'culture',emoji:'🍵',title:'Tea Culture (茶文化)',body:'China is the birthplace of tea! 绿茶 (green), 红茶 (black), 普洱 (pu-erh). Tea ceremonies are an ancient art.',tip:'请喝茶！(Qǐng hē chá!) = Please have tea!'},
  {type:'grammar',emoji:'💡',title:'The 了 (le) Particle',body:'了 marks a completed action:\n• 我吃了。— I ate.\n• 天黑了。— It got dark.\nThink of 了 as "done!"',tip:'了 = action completed / state changed'},
  {type:'grammar',emoji:'❓',title:'Questions with 吗',body:'Add 吗 to ANY statement to make a yes/no question:\n• 你好。→ 你好吗？\n• 你是学生。→ 你是学生吗？',tip:'吗 = question tag, works like "right?"'},
  {type:'grammar',emoji:'🎯',title:'比 (bǐ) Comparison',body:'A 比 B + adjective = A is more than B:\n• 我比你高。— I\'m taller than you.\n• 北京比上海冷。— Beijing is colder.',tip:'今天比昨天好！= Today is better!'},
  {type:'grammar',emoji:'🔄',title:'Verb + 一下 Softener',body:'一下 makes requests more polite:\n• 等一下！— Wait a sec!\n• 看一下。— Take a look.',tip:'等一下！(Děng yīxià!) = Just a moment!'},
  {type:'travel',emoji:'✈️',title:'Airport Survival Phrases',body:'• 登机口在哪儿？— Where is the gate?\n• 我的行李在哪里？— Where is my luggage?\n• 去哪里坐飞机？— Where to board?',tip:'登机口 (dēngjī kǒu) = Boarding gate'},
  {type:'travel',emoji:'🍜',title:'Ordering Food Like a Local',body:'• 我要这个！— I want this!\n• 不辣！— Not spicy!\n• 好吃！— Delicious!\n• 买单！— Check please!',tip:'有英文菜单吗？= English menu?'},
  {type:'travel',emoji:'🛍️',title:'Bargaining at Markets',body:'• 太贵了！— Too expensive!\n• 便宜一点！— A bit cheaper!\n• 最低多少钱？— Lowest price?',tip:'Start at 40-50% of the asking price!'},
  {type:'travel',emoji:'🏯',title:'Must-Visit in China',body:'🏯 Great Wall (长城) – Beijing\n🐼 Panda Base – Chengdu\n🌊 West Lake (西湖) – Hangzhou\n🌇 The Bund – Shanghai',tip:'长城 (Chángchéng) = The Great Wall'},
  {type:'phrase',zh:'没问题',pinyin:'méi wèntí',en:'No problem!',tags:['Daily','HSK2'],example:{zh:'没问题！我来帮你！',pinyin:'Méi wèntí! Wǒ lái bāng nǐ!',en:'No problem! I\'ll help you!'}},
  {type:'phrase',zh:'随便',pinyin:'suíbiàn',en:'Whatever / Up to you',tags:['Daily'],example:{zh:'吃什么？随便！',pinyin:'Chī shénme? Suíbiàn!',en:'What to eat? Anything!'}},
  {type:'phrase',zh:'慢慢来',pinyin:'màn màn lái',en:'Take it slow',tags:['Mindset'],example:{zh:'学语言慢慢来！',pinyin:'Xué yǔyán màn màn lái!',en:'Learn languages slowly!'}},
  {type:'phrase',zh:'一起加油',pinyin:'yīqǐ jiā yóu',en:'Let\'s all keep going!',tags:['Motivation'],example:{zh:'一起学习，一起加油！',pinyin:'Yīqǐ xuéxí, yīqǐ jiāyóu!',en:'Study together! Go together!'}},
];

const QUIZ_POOL = CARDS.filter(c => c.type === 'vocab' || c.type === 'phrase');

// ===========================================
// INIT
// ===========================================
function init() {
  loadStorage();
  spawnParticles();
  renderCurrentCard();
  initPointer();
  initWheel();
  initKeys();
  initQuiz();
  renderLangGrid();
  renderMissions();
  renderStats();
}

// ===========================================
// PARTICLES
// ===========================================
function spawnParticles() {
  const c = document.getElementById('particles');
  if (!c) return;
  ['#a78bfa','#38bdf8','#fb7185','#34d399','#fbbf24'].forEach((col, i) => {
    for (let j = 0; j < 4; j++) {
      const p = document.createElement('div');
      const sz = 2 + Math.random() * 4;
      p.className = 'particle';
      p.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;bottom:-10px;background:${col};animation-duration:${7+Math.random()*10}s;animation-delay:${Math.random()*12}s`;
      c.appendChild(p);
    }
  });
}

// ===========================================
// CARD RENDERING
// ===========================================
function renderCurrentCard() {
  const stack = document.getElementById('card-stack');
  if (!stack) return;
  stack.innerHTML = '';
  const el = document.createElement('div');
  el.className = 'lcard current';
  el.innerHTML = buildCard(CARDS[currentIndex]);
  stack.appendChild(el);
  updateProgressBar();
  updateSideButtons();
}

function buildCard(d) {
  if (!d) return '';
  const pair = LANG_PAIRS[langIndex];
  const isENMode = pair.code === 'en';

  if (d.type === 'vocab' || d.type === 'phrase') {
    const front = isENMode ? d.en : d.zh;
    const back = isENMode ? `${d.zh} · ${d.pinyin}` : d.en;
    const isMulti = d.zh.length > 2;
    const charClass = isENMode ? 'en-mode' : (isMulti ? 'multi' : '');
    return `<div class="card-inner"><div class="card-face">
      <span class="card-type-badge badge-${d.type==='phrase'?'phrase':'vocab'}">${d.type==='phrase'?'💬 Phrase':'📝 Vocab'}</span>
      <span class="lang-tag">${pair.from}→${pair.to}</span>
      <div class="card-char ${charClass}">${front}</div>
      ${!isENMode?`<div class="card-pinyin">${d.pinyin}</div>`:''}
      <div class="card-english">${back}</div>
      ${d.example?`<div class="card-example">
        <div class="ex-zh">${d.example.zh}</div>
        <div class="ex-pinyin">${d.example.pinyin}</div>
        <div class="ex-en">${d.example.en}</div>
      </div>`:''}
      <div class="card-tags">${(d.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
    </div></div>`;
  }
  if (['culture','grammar','travel'].includes(d.type)) {
    return `<div class="card-inner"><div class="card-face">
      <span class="card-type-badge badge-${d.type}">${d.type==='culture'?'🌏 Culture':d.type==='grammar'?'📐 Grammar':'✈️ Travel'}</span>
      <div class="card-emoji">${d.emoji}</div>
      <div class="card-title">${d.title}</div>
      <div class="card-body" style="white-space:pre-line">${d.body}</div>
      ${d.tip?`<div class="card-tip">💡 ${d.tip}</div>`:''}
    </div></div>`;
  }
  return '';
}

function updateProgressBar() {
  const pct = ((currentIndex+1)/CARDS.length)*100;
  const fill = document.getElementById('xp-fill');
  // The xp-fill is for XP level, not card progress. Use card-progress label
  const cp = document.getElementById('card-progress');
  if (cp) cp.textContent = `${currentIndex+1} / ${CARDS.length}`;
}

function updateSideButtons() {
  const li = document.getElementById('like-icon'),
        lc = document.getElementById('like-count'),
        si = document.getElementById('save-icon');
  if (li) li.textContent = liked.has(currentIndex) ? '❤️' : '🤍';
  if (lc) lc.textContent = liked.size;
  if (si) si.textContent = saved.has(currentIndex) ? '🔖✅' : '🔖';
}

// ===========================================
// NAVIGATION
// ===========================================
function goNext() {
  if (isAnimating) return;
  if (currentIndex >= CARDS.length - 1) {
    showToast('🎉 All done! Starting over...');
    launchConfetti(); currentIndex = 0;
    renderCurrentCard(); return;
  }
  animateCard('up');
}
function goPrev() {
  if (isAnimating || currentIndex <= 0) return;
  animateCard('down');
}

function animateCard(dir) {
  isAnimating = true;
  const stack = document.getElementById('card-stack');
  const cur = stack?.querySelector('.lcard.current');
  if (!cur) { isAnimating = false; return; }

  cur.classList.remove('current');
  cur.style.transition = 'transform .42s cubic-bezier(.25,.46,.45,.94),opacity .32s ease';
  cur.style.transform = dir === 'up' ? 'translateY(-115%)' : 'translateY(115%)';
  cur.style.opacity = '0';

  dir === 'up' ? currentIndex++ : currentIndex--;

  // XP reward
  addXP(10);
  showXPBurst('+10 XP ⭐');
  cardsStudiedToday++;
  updateMissionProgress();
  saveStorage();

  const nxt = document.createElement('div');
  nxt.className = 'lcard';
  nxt.innerHTML = buildCard(CARDS[currentIndex]);
  nxt.style.transform = dir === 'up' ? 'translateY(115%)' : 'translateY(-115%)';
  nxt.style.opacity = '0';
  stack.appendChild(nxt);

  requestAnimationFrame(() => requestAnimationFrame(() => {
    nxt.style.transition = 'transform .42s cubic-bezier(.25,.46,.45,.94),opacity .32s ease';
    nxt.style.transform = 'translateY(0)'; nxt.style.opacity = '1';
  }));

  setTimeout(() => {
    cur.remove(); nxt.classList.add('current');
    updateProgressBar(); updateSideButtons();
    isAnimating = false;
  }, 440);
}

// ===========================================
// POINTER EVENTS (Edge / Desktop fix)
// ===========================================
function initPointer() {
  const stack = document.getElementById('card-stack');
  if (!stack) return;
  let sy = 0, sx = 0, moved = false;
  stack.addEventListener('pointerdown', e => { sy = e.clientY; sx = e.clientX; moved = false; stack.setPointerCapture(e.pointerId); });
  stack.addEventListener('pointermove', e => { if (Math.abs(e.clientY - sy) > 8) moved = true; });
  stack.addEventListener('pointerup', e => {
    if (!moved) return;
    const dy = sy - e.clientY, dx = Math.abs(sx - e.clientX);
    if (Math.abs(dy) > 40 && Math.abs(dy) > dx) dy > 0 ? goNext() : goPrev();
    moved = false;
  });
}

function initWheel() {
  let last = 0;
  document.addEventListener('wheel', e => {
    if (currentView !== 'feed') return;
    const now = Date.now(); if (now - last < 650) return; last = now;
    e.preventDefault();
    e.deltaY > 0 ? goNext() : goPrev();
  }, { passive: false });
}

function initKeys() {
  document.addEventListener('keydown', e => {
    if (currentView !== 'feed') return;
    if (e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); goNext(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); goPrev(); }
    if (e.key === 'l') toggleLike();
    if (e.key === 's') toggleSave();
    if (e.key === 'p') speakCurrent();
  });
}

// ===========================================
// ACTIONS
// ===========================================
function toggleLike() {
  const icon = document.getElementById('like-icon'), ct = document.getElementById('like-count');
  if (liked.has(currentIndex)) {
    liked.delete(currentIndex);
    if (icon) icon.textContent = '🤍';
  } else {
    liked.add(currentIndex);
    if (icon) { icon.textContent = '❤️'; icon.classList.add('like-pop'); setTimeout(() => icon.classList.remove('like-pop'), 400); }
    addXP(5); showXPBurst('+5 XP ❤️'); floatEmoji('❤️');
  }
  if (ct) ct.textContent = liked.size;
}

function toggleSave() {
  const icon = document.getElementById('save-icon');
  if (saved.has(currentIndex)) {
    saved.delete(currentIndex);
    if (icon) icon.textContent = '🔖';
    showToast('Removed from saved');
  } else {
    saved.add(currentIndex);
    if (icon) icon.textContent = '🔖✅';
    addXP(5); showXPBurst('+5 XP 🔖'); floatEmoji('🔖');
    showToast('✅ Saved!');
  }
  updateMissionProgress();
  saveStorage();
}

function speakCurrent() {
  const c = CARDS[currentIndex];
  if (!c?.zh) return;
  const u = new SpeechSynthesisUtterance(c.zh);
  u.lang = 'zh-CN'; u.rate = 0.8;
  window.speechSynthesis.speak(u);
  floatEmoji('🔊');
}

function shareCard() {
  const c = CARDS[currentIndex];
  const text = c.zh
    ? `🀄 levAIup: ${c.zh} (${c.pinyin||''}) = "${c.en}"\nLearn with me → https://manhcuongk55.github.io/Chinese-level-up-tips/app/`
    : `🀄 levAIup: ${c.title||'Learn Languages!'}\nhttps://manhcuongk55.github.io/Chinese-level-up-tips/app/`;
  if (navigator.share) navigator.share({ text });
  else if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => showToast('📋 Copied!'));
}

// ===========================================
// LANGUAGE CYCLE
// ===========================================
function cycleLang() {
  langIndex = (langIndex + 1) % LANG_PAIRS.length;
  const pair = LANG_PAIRS[langIndex];
  if (pair.locked) { showToast('🔒 Unlock at Level 4!'); langIndex = 0; return; }
  document.getElementById('lang-from-flag').textContent = pair.from;
  document.getElementById('lang-to-flag').textContent = pair.to;
  document.getElementById('lang-name').textContent = pair.fromName;
  document.getElementById('flip-dir').textContent = pair.code.toUpperCase() + ' → ' + LANG_PAIRS.find(l=>l.code!==pair.code&&!l.locked)?.to.replace(/./,'')+'EN';
  renderCurrentCard();
  showToast('🌍 Switched to ' + pair.fromName);
  renderLangGrid();
}

// ===========================================
// QUIZ
// ===========================================
let quizLangMode = 'zh';
function setQuizLang(mode) {
  quizLangMode = mode;
  document.querySelectorAll('.lang-pill').forEach(b => b.classList.remove('active'));
  const el = document.getElementById('qlang-' + mode);
  if (el) el.classList.add('active');
  initQuiz();
}

function initQuiz() {
  quizCards = [...QUIZ_POOL].sort(() => Math.random() - 0.5).slice(0, 10);
  quizIndex = 0; quizScore = 0; quizStreakQ = 0; quizXPEarned = 0;
  document.getElementById('qtotal').textContent = quizCards.length;
  renderQuizCard();
}

function renderQuizCard() {
  if (quizIndex >= quizCards.length) { showQuizResults(); return; }
  const card = quizCards[quizIndex];
  const qEl = document.getElementById('quiz-q');
  const hEl = document.getElementById('quiz-hint');
  document.getElementById('qnum').textContent = quizIndex + 1;

  let question, hint, makeAnswer;
  if (quizLangMode === 'en') {
    // Show English → pick Chinese
    question = card.en; hint = 'Choose the Chinese character';
    qEl.className = 'quiz-q en-q';
    makeAnswer = c => c.zh;
  } else if (quizLangMode === 'mix') {
    const flip = Math.random() > .5;
    question = flip ? card.en : card.zh; hint = flip ? card.pinyin||'' : 'Choose the meaning';
    qEl.className = flip ? 'quiz-q en-q' : 'quiz-q';
    makeAnswer = flip ? c => c.zh : c => c.en;
  } else {
    question = card.zh; hint = card.pinyin || '';
    qEl.className = 'quiz-q';
    makeAnswer = c => c.en;
  }

  qEl.textContent = question;
  hEl.textContent = hint;

  const correct = makeAnswer(card);
  const wrongs = QUIZ_POOL.filter(c => makeAnswer(c) !== correct).sort(() => Math.random()-.5).slice(0,3).map(makeAnswer);
  const options = [...wrongs, correct].sort(() => Math.random()-.5);

  document.getElementById('quiz-opts').innerHTML = options.map(opt =>
    `<button class="quiz-opt" onclick="answerQ('${opt.replace(/'/g,"\\'")}','${correct.replace(/'/g,"\\'")}',this)">${opt}</button>`
  ).join('');
}

function answerQ(chosen, correct, btn) {
  document.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);
  if (chosen === correct) {
    btn.classList.add('correct');
    quizScore += 10; quizStreakQ++; quizXPEarned += 15;
    addXP(15); showXPBurst('+15 XP ✅'); launchConfetti();
    quizAnsweredToday++;
  } else {
    btn.classList.add('wrong'); quizStreakQ = 0;
    document.querySelectorAll('.quiz-opt').forEach(b => { if (b.textContent.trim()===correct) b.classList.add('correct'); });
  }
  document.getElementById('qs-score').textContent = quizScore;
  document.getElementById('qs-streak').textContent = quizStreakQ + '🔥';
  document.getElementById('qs-xp').textContent = quizXPEarned + '⭐';
  updateMissionProgress();
  setTimeout(() => { quizIndex++; renderQuizCard(); }, 1100);
}

function showQuizResults() {
  const pct = Math.round((quizScore/(quizCards.length*10))*100);
  const medal = pct>=90?'🏆':pct>=70?'🥇':pct>=50?'🥈':'💪';
  launchConfetti();
  document.getElementById('quiz-card').innerHTML = `
    <div style="text-align:center;padding:16px 8px">
      <div style="font-size:64px;margin-bottom:10px">${medal}</div>
      <div style="font-size:34px;font-weight:900;color:#a78bfa;margin-bottom:4px">${quizScore} pts</div>
      <div style="font-size:14px;color:rgba(241,245,249,.5);margin-bottom:6px">${pct}% accuracy</div>
      <div style="font-size:13px;color:#fbbf24;font-weight:800;margin-bottom:22px">+${quizXPEarned} XP this round!</div>
      <button onclick="initQuiz()" style="background:rgba(167,139,250,.2);border:1.5px solid rgba(167,139,250,.5);color:#a78bfa;padding:13px 32px;border-radius:20px;font-size:15px;font-weight:800;cursor:pointer;font-family:Inter,sans-serif">🔄 Play Again</button>
    </div>`;
}

// ===========================================
// PROFILE — LANG GRID
// ===========================================
function renderLangGrid() {
  const grid = document.getElementById('lang-grid');
  if (!grid) return;
  const lvl = getLevelData();
  grid.innerHTML = LANG_PAIRS.map((lp, i) => {
    const isActive = i === langIndex;
    const isLocked = lp.locked && lvl.lvl < 4;
    const xpPct = Math.min(100, Math.round((totalXP / 500) * 100));
    return `<div class="lang-card ${isActive?'active':''} ${isLocked?'locked':''}" onclick="selectLang(${i})">
      <div class="lang-card-flag">${lp.from}</div>
      <div class="lang-card-name">${lp.fromName.split('(')[0].trim()}</div>
      <div class="lang-card-level">${isLocked?'Unlock at Lv.4':isActive?'Active — '+lvl.name:'Available'}</div>
      <div class="lang-card-bar"><div class="lang-card-fill" style="width:${isActive?xpPct:0}%"></div></div>
    </div>`;
  }).join('');
}

function selectLang(i) {
  const lp = LANG_PAIRS[i];
  const lvl = getLevelData();
  if (lp.locked && lvl.lvl < 4) { showToast('🔒 Reach Level 4 to unlock!'); return; }
  langIndex = i;
  document.getElementById('lang-from-flag').textContent = lp.from;
  document.getElementById('lang-to-flag').textContent = lp.to;
  document.getElementById('lang-name').textContent = lp.fromName;
  renderCurrentCard();
  renderLangGrid();
  showToast('🌍 Switched to ' + lp.fromName);
}

// ===========================================
// MISSIONS
// ===========================================
function renderMissions() {
  const list = document.getElementById('missions-list');
  if (!list) return;
  list.innerHTML = MISSIONS_DEF.map(m => {
    let prog = 0;
    if (m.id === 'cards10') prog = Math.min(m.target, cardsStudiedToday);
    if (m.id === 'quiz5')   prog = Math.min(m.target, quizAnsweredToday);
    if (m.id === 'streak')  prog = Math.min(m.target, currentStreak > 0 ? 1 : 0);
    if (m.id === 'save3')   prog = Math.min(m.target, saved.size);
    const done = prog >= m.target;
    const pct = Math.round((prog/m.target)*100);
    return `<div class="mission-item ${done?'done':''}">
      <div class="mission-icon">${done?'✅':m.icon}</div>
      <div class="mission-info">
        <div class="mission-title">${m.title}</div>
        <div class="mission-bar-wrap">
          <div class="mission-bar"><div class="mission-fill ${m.color}" style="width:${pct}%"></div></div>
          <div class="mission-txt">${prog}/${m.target}</div>
        </div>
      </div>
      <div class="mission-xp">+${m.xp}</div>
    </div>`;
  }).join('');
}

function updateMissionProgress() {
  renderMissions();
  renderStats();
}

// ===========================================
// STATS
// ===========================================
function renderStats() {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('st-cards', cardsStudiedToday);
  set('st-streak', currentStreak);
  set('st-xp', totalXP);
  set('st-saved', saved.size);
}

// ===========================================
// XP & LEVELS
// ===========================================
function getLevelData() {
  return LEVELS.slice().reverse().find(l => totalXP >= l.min) || LEVELS[0];
}

function updateXPBar() {
  const lvl = getLevelData();
  const next = LEVELS[lvl.lvl] || LEVELS[LEVELS.length-1];
  const inLevel = totalXP - lvl.min;
  const needed = next.min - lvl.min;
  const pct = Math.min(100, Math.round((inLevel / needed) * 100));

  // Top XP bar
  const fill = document.getElementById('xp-fill');
  const label = document.getElementById('xp-level-label');
  const val = document.getElementById('xp-val');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = `Lv.${lvl.lvl} · ${lvl.name}`;
  if (val) val.textContent = `${totalXP} / ${next.min} XP`;

  // Profile level card
  const lb = document.getElementById('level-badge'), ln = document.getElementById('level-name'),
        lnum = document.getElementById('level-num'), lf = document.getElementById('level-fill'),
        lt = document.getElementById('level-xp-txt');
  if (lb) lb.textContent = lvl.badge;
  if (ln) ln.textContent = lvl.name;
  if (lnum) lnum.textContent = `Level ${lvl.lvl}`;
  if (lf) lf.style.width = pct + '%';
  if (lt) lt.textContent = `${inLevel} / ${needed} XP to Level ${lvl.lvl + 1}`;
}

function addXP(amount) {
  const prevLvl = getLevelData().lvl;
  totalXP += amount;
  const newLvl = getLevelData();
  updateXPBar();
  if (newLvl.lvl > prevLvl) {
    // LEVEL UP!
    launchConfetti();
    showToast(`🎉 LEVEL UP! You are now ${newLvl.badge} ${newLvl.name}!`);
    showXPBurst(`🎉 Lv.${newLvl.lvl}!`);
  }
  if (totalXP % 100 === 0 && totalXP > 0) showToast(`⭐ ${totalXP} XP milestone!`);
}

// ===========================================
// STORAGE
// ===========================================
function loadStorage() {
  const d = JSON.parse(localStorage.getItem('levelai_v3') || '{}');
  const today = new Date().toDateString();
  totalXP = d.xp || 0;
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
  if (d.lastDate === today) {
    currentStreak = d.streak || 1;
    cardsStudiedToday = d.cardsToday || 0;
    quizAnsweredToday = d.quizToday || 0;
  } else if (d.lastDate === yesterday.toDateString()) {
    currentStreak = (d.streak || 0) + 1;
  } else {
    currentStreak = 1;
  }
  document.getElementById('streak-count').textContent = currentStreak;
  updateXPBar();
  saveStorage();
}

function saveStorage() {
  localStorage.setItem('levelai_v3', JSON.stringify({
    xp: totalXP, streak: currentStreak, lastDate: new Date().toDateString(),
    cardsToday: cardsStudiedToday, quizToday: quizAnsweredToday
  }));
}

// ===========================================
// TABS
// ===========================================
function switchTab(tab) {
  currentView = tab;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const v = document.getElementById('view-' + tab); if (v) v.classList.add('active');
  ['feed','quiz','profile'].forEach(t => {
    const tb = document.getElementById('tab-'+t), nb = document.getElementById('nav-'+t);
    if (tb) tb.classList.toggle('active', t===tab);
    if (nb) nb.classList.toggle('active', t===tab);
  });
  if (tab === 'profile') { renderLangGrid(); renderMissions(); renderStats(); updateXPBar(); }
  if (tab === 'quiz') initQuiz();
}

// ===========================================
// EFFECTS
// ===========================================
function showXPBurst(msg) {
  const p = document.getElementById('xp-popup');
  if (!p) return;
  p.textContent = msg;
  p.classList.remove('burst');
  void p.offsetWidth;
  p.classList.add('burst');
}

function launchConfetti() {
  const c = document.getElementById('confetti-container');
  if (!c) return;
  const cols = ['#a78bfa','#38bdf8','#fb7185','#34d399','#fbbf24','#fff'];
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.cssText = `left:${Math.random()*100}%;top:-10px;background:${cols[Math.floor(Math.random()*cols.length)]};width:${6+Math.random()*10}px;height:${6+Math.random()*10}px;border-radius:${Math.random()>.5?'50%':'2px'};animation-duration:${1.5+Math.random()*2}s;animation-delay:${Math.random()*.5}s;transform:translateX(${(Math.random()-.5)*200}px)`;
    c.appendChild(p);
    setTimeout(() => p.remove(), 3500);
  }
}

function floatEmoji(e) {
  const el = document.createElement('div');
  el.className = 'float-emoji';
  el.textContent = e;
  el.style.left = (30 + Math.random()*40) + '%';
  el.style.bottom = '120px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

document.addEventListener('DOMContentLoaded', init);
