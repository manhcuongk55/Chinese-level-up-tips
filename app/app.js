// =============================================
// HanLearn v2 — Desktop + Mobile Learning App
// Pointer Events, Scroll Wheel, XP Explosions
// =============================================

// ---- STATE ----
let currentIndex = 0;
let liked = new Set();
let saved = new Set();
let currentView = 'feed';
let isAnimating = false;
let quizIndex = 0, quizScore = 0, quizStreak = 0, quizXP = 0, quizCards = [];
let totalXP = 0;

// ---- CARDS DATA ----
const CARDS = [
  { type:'vocab', zh:'你好', pinyin:'nǐ hǎo', en:'Hello', tags:['HSK1','Greeting'],
    example:{zh:'你好！我叫小明。', pinyin:'Nǐ hǎo! Wǒ jiào Xiǎomíng.', en:'Hello! My name is Xiaoming.'} },
  { type:'vocab', zh:'谢谢', pinyin:'xiè xiè', en:'Thank you', tags:['HSK1','Polite'],
    example:{zh:'谢谢你！', pinyin:'Xiè xiè nǐ!', en:'Thank you!'} },
  { type:'vocab', zh:'爱', pinyin:'ài', en:'Love', tags:['HSK2','Emotion'],
    example:{zh:'我爱学中文！', pinyin:'Wǒ ài xué Zhōngwén!', en:'I love learning Chinese!'} },
  { type:'vocab', zh:'朋友', pinyin:'péngyou', en:'Friend', tags:['HSK1','People'],
    example:{zh:'他是我的好朋友。', pinyin:'Tā shì wǒ de hǎo péngyou.', en:'He is my good friend.'} },
  { type:'vocab', zh:'美食', pinyin:'měishí', en:'Delicious food', tags:['Food','Culture'],
    example:{zh:'中国美食太好吃了！', pinyin:'Zhōngguó měishí tài hǎochī le!', en:'Chinese food is so delicious!'} },
  { type:'vocab', zh:'旅行', pinyin:'lǚxíng', en:'Travel / Trip', tags:['HSK3','Travel'],
    example:{zh:'我喜欢旅行。', pinyin:'Wǒ xǐhuān lǚxíng.', en:'I love to travel.'} },
  { type:'vocab', zh:'学习', pinyin:'xuéxí', en:'Study / Learn', tags:['HSK1','Education'],
    example:{zh:'每天学习中文很重要。', pinyin:'Měitiān xuéxí Zhōngwén hěn zhòngyào.', en:'Studying Chinese every day is important.'} },
  { type:'vocab', zh:'快乐', pinyin:'kuàilè', en:'Happy / Joyful', tags:['HSK2','Emotion'],
    example:{zh:'祝你天天快乐！', pinyin:'Zhù nǐ tiāntiān kuàilè!', en:'Wishing you happiness every day!'} },
  { type:'vocab', zh:'加油', pinyin:'jiā yóu', en:'Keep going! / Go!', tags:['Motivation'],
    example:{zh:'考试加油！你可以的！', pinyin:'Kǎoshì jiāyóu! Nǐ kěyǐ de!', en:'Go for the exam! You can do it!'} },
  { type:'vocab', zh:'家', pinyin:'jiā', en:'Home / Family', tags:['HSK1','Family'],
    example:{zh:'我想回家。', pinyin:'Wǒ xiǎng huí jiā.', en:'I want to go home.'} },
  { type:'vocab', zh:'好吃', pinyin:'hǎo chī', en:'Delicious', tags:['HSK1','Food'],
    example:{zh:'这个饺子真好吃！', pinyin:'Zhège jiǎozi zhēn hǎochī!', en:'These dumplings are really delicious!'} },
  { type:'vocab', zh:'漂亮', pinyin:'piàoliang', en:'Beautiful / Pretty', tags:['HSK2','Description'],
    example:{zh:'这里很漂亮！', pinyin:'Zhèlǐ hěn piàoliang!', en:'This place is very beautiful!'} },
  { type:'vocab', zh:'钱', pinyin:'qián', en:'Money', tags:['HSK1','Shopping'],
    example:{zh:'多少钱？', pinyin:'Duōshao qián?', en:'How much is it?'} },
  { type:'vocab', zh:'时间', pinyin:'shíjiān', en:'Time', tags:['HSK2','Time'],
    example:{zh:'时间就是金钱！', pinyin:'Shíjiān jiù shì jīnqián!', en:'Time is money!'} },
  { type:'vocab', zh:'火锅', pinyin:'huǒguō', en:'Hot pot 🍲', tags:['Food','Culture'],
    example:{zh:'我最喜欢吃火锅！', pinyin:'Wǒ zuì xǐhuān chī huǒguō!', en:'I love eating hot pot the most!'} },
  { type:'vocab', zh:'茶', pinyin:'chá', en:'Tea 🍵', tags:['HSK1','Food','Culture'],
    example:{zh:'中国的茶很有名。', pinyin:'Zhōngguó de chá hěn yǒumíng.', en:'Chinese tea is very famous.'} },
  { type:'vocab', zh:'音乐', pinyin:'yīnyuè', en:'Music 🎵', tags:['HSK2','Art'],
    example:{zh:'你喜欢什么音乐？', pinyin:'Nǐ xǐhuān shénme yīnyuè?', en:'What music do you like?'} },
  { type:'vocab', zh:'梦想', pinyin:'mèngxiǎng', en:'Dream / Ambition', tags:['HSK3','Motivation'],
    example:{zh:'你的梦想是什么？', pinyin:'Nǐ de mèngxiǎng shì shénme?', en:'What is your dream?'} },
  { type:'vocab', zh:'努力', pinyin:'nǔlì', en:'Work hard', tags:['HSK2','Motivation'],
    example:{zh:'努力就会成功！', pinyin:'Nǔlì jiù huì chénggōng!', en:'Work hard and you will succeed!'} },
  { type:'vocab', zh:'世界', pinyin:'shìjiè', en:'World 🌍', tags:['HSK3','Global'],
    example:{zh:'你好，世界！', pinyin:'Nǐ hǎo, shìjiè!', en:'Hello, World!'} },

  // CULTURE
  { type:'culture', emoji:'🥢', title:'Chopstick Etiquette',
    body:'Never stick chopsticks upright in rice — it resembles funeral incense. Always lay them flat on the table.',
    tip:'筷子 (kuàizi) = Chopsticks' },
  { type:'culture', emoji:'🧧', title:'Red Envelopes (红包 hóngbāo)',
    body:'During Chinese New Year, red envelopes filled with money are given for good luck. WeChat digital red envelopes are now hugely popular!',
    tip:'恭喜发财！(Gōngxǐ fācái!) = Wishing you wealth!' },
  { type:'culture', emoji:'🐉', title:'The Chinese Dragon',
    body:'Unlike Western dragons, Chinese dragons (龙 lóng) symbolize GOOD luck, power and prosperity. They are celebrated, not feared!',
    tip:'龙 (lóng) = Dragon — a symbol of good fortune' },
  { type:'culture', emoji:'🏮', title:'Mid-Autumn Festival',
    body:'The Moon Festival celebrates family reunion under the full moon. Mooncakes (月饼 yuèbǐng) are shared with loved ones.',
    tip:'月饼 (yuèbǐng) = Mooncake 🥮' },
  { type:'culture', emoji:'🎋', title:'Face (面子 Miànzi)',
    body:'"Face" means dignity and social reputation. Actions that cause public embarrassment are "losing face" (丢脸 diū liǎn) — a key social concept.',
    tip:'给面子 (gěi miànzi) = Give someone face / respect' },

  // GRAMMAR
  { type:'grammar', emoji:'💡', title:'The 了 (le) Particle',
    body:'了 marks a completed action:\n• 我吃了。(Wǒ chī le) — I ate.\n• 天黑了。(Tiān hēi le) — It got dark.\nThink of 了 as saying "done!"',
    tip:'了 = action completed or state changed' },
  { type:'grammar', emoji:'❓', title:'Making Questions with 吗',
    body:'Add 吗 to ANY statement to make a yes/no question!\n• 你好。→ 你好吗？(nǐ hǎo ma?)\n• 你是学生。→ 你是学生吗？\nSuper simple!',
    tip:'吗 = question tag — works like "right?" or "isn\'t it?"' },
  { type:'grammar', emoji:'🔄', title:'Verb + 一下 = Softener',
    body:'一下 (yīxià) makes requests much politer and means "just a moment" or "briefly":\n• 等一下！— Wait a sec!\n• 看一下。— Take a look.',
    tip:'请等一下！(Qǐng děng yīxià!) = Please wait!' },
  { type:'grammar', emoji:'🏗️', title:'Word Order: SVO',
    body:'Chinese is Subject → Verb → Object — just like English!\n• 我(I) 爱(love) 你(you) = 我爱你\n• 他(he) 吃(eat) 苹果(apple) = 他吃苹果',
    tip:'时间 + 地点 + 动词 = Time, Place, Verb order!' },
  { type:'grammar', emoji:'🎯', title:'比 (bǐ) Comparison',
    body:'A 比 B + adjective = A is [more] than B:\n• 我比你高。— I\'m taller than you.\n• 北京比上海冷。— Beijing is colder than Shanghai.',
    tip:'今天比昨天好！= Today is better than yesterday!' },

  // TRAVEL
  { type:'travel', emoji:'✈️', title:'Survival Airport Phrases',
    body:'• 去哪里坐飞机？— Where to board?\n• 登机口在哪儿？— Where is the gate?\n• 我的行李在哪里？— Where is my luggage?',
    tip:'登机口 (dēngjī kǒu) = Gate' },
  { type:'travel', emoji:'🍜', title:'Ordering Food Like a Local',
    body:'• 我要这个！(Wǒ yào zhège) — I want this!\n• 不辣！(Bù là) — Not spicy!\n• 好吃！(Hǎochī) — Delicious!\n• 买单！(Mǎidān) — Check please!',
    tip:'有英文菜单吗？= Is there an English menu?' },
  { type:'travel', emoji:'🛍️', title:'Bargaining at Markets',
    body:'• 太贵了！(Tài guì le) — Too expensive!\n• 便宜一点！(Piányí yīdiǎn) — A bit cheaper!\n• 最低多少钱？— What\'s your lowest price?',
    tip:'Tip: Start at 40-50% of the asking price!' },
  { type:'travel', emoji:'🚇', title:'Chinese Metro Tips',
    body:'China\'s subways are world-class! Key phrase:\n• 一张票去___。— One ticket to ___.\nMost metro stations have English signage.',
    tip:'地铁 (dìtiě) = Subway / Metro' },
  { type:'travel', emoji:'🏯', title:'Must-Visit Destinations',
    body:'🏯 Great Wall (长城) – Beijing\n🐼 Giant Panda Base – Chengdu\n🌊 West Lake (西湖) – Hangzhou\n🌇 The Bund – Shanghai\n🗻 Zhangjiajie – Avatar Mts.',
    tip:'长城 (Chángchéng) = The Great Wall' },

  // PHRASES
  { type:'phrase', zh:'没问题', pinyin:'méi wèntí', en:'No problem!', tags:['Daily','HSK2'],
    example:{zh:'A: 可以帮我吗？B: 没问题！', pinyin:'Kěyǐ bāng wǒ ma? — Méi wèntí!', en:'Can you help me? — No problem!'} },
  { type:'phrase', zh:'随便', pinyin:'suíbiàn', en:'Whatever / Up to you', tags:['Daily','Casual'],
    example:{zh:'A: 吃什么？B: 随便！', pinyin:'Chī shénme? — Suíbiàn!', en:'What to eat? — Anything!'} },
  { type:'phrase', zh:'慢慢来', pinyin:'màn màn lái', en:'Take it slow / No rush', tags:['Mindset','Motivation'],
    example:{zh:'学中文慢慢来，不要着急。', pinyin:'Xué Zhōngwén màn màn lái.', en:'Learn Chinese slowly, don\'t rush.'} },
  { type:'phrase', zh:'一起加油', pinyin:'yīqǐ jiā yóu', en:'Let\'s all keep going!', tags:['Motivation'],
    example:{zh:'一起学习，一起加油！', pinyin:'Yīqǐ xuéxí, yīqǐ jiāyóu!', en:'Study together, cheer each other on!'} },
  { type:'phrase', zh:'哪里哪里', pinyin:'nǎlǐ nǎlǐ', en:'You\'re too kind! (humble reply)', tags:['Polite','Social'],
    example:{zh:'A: 你中文很好！B: 哪里哪里。', pinyin:'Nǐ Zhōngwén hěn hǎo! — Nǎlǐ nǎlǐ.', en:'Your Chinese is great! — Oh, not really...'} },

  // More vocab
  { type:'vocab', zh:'文化', pinyin:'wénhuà', en:'Culture', tags:['HSK3'],
    example:{zh:'中国文化非常丰富。', pinyin:'Zhōngguó wénhuà fēicháng fēngfù.', en:'Chinese culture is very rich.'} },
  { type:'vocab', zh:'语言', pinyin:'yǔyán', en:'Language', tags:['HSK3'],
    example:{zh:'学语言需要耐心。', pinyin:'Xué yǔyán xūyào nàixīn.', en:'Learning a language requires patience.'} },
  { type:'vocab', zh:'健康', pinyin:'jiànkāng', en:'Health / Healthy', tags:['HSK2'],
    example:{zh:'身体健康最重要！', pinyin:'Shēntǐ jiànkāng zuì zhòngyào!', en:'Good health is most important!'} },
  { type:'vocab', zh:'成功', pinyin:'chénggōng', en:'Success / Succeed', tags:['HSK3','Motivation'],
    example:{zh:'坚持就是成功！', pinyin:'Jiānchí jiù shì chénggōng!', en:'Persistence is success!'} },
  { type:'vocab', zh:'幸福', pinyin:'xìngfú', en:'Happiness / Bliss', tags:['HSK3','Emotion'],
    example:{zh:'愿你幸福！', pinyin:'Yuàn nǐ xìngfú!', en:'Wishing you happiness!'} },
  { type:'vocab', zh:'中国', pinyin:'Zhōngguó', en:'China', tags:['HSK1','Geography'],
    example:{zh:'我想去中国旅行。', pinyin:'Wǒ xiǎng qù Zhōngguó lǚxíng.', en:'I want to travel to China.'} },
  { type:'vocab', zh:'北京', pinyin:'Běijīng', en:'Beijing 🏙️', tags:['HSK1','City'],
    example:{zh:'北京是中国的首都。', pinyin:'Běijīng shì Zhōngguó de shǒudū.', en:'Beijing is the capital of China.'} },
  { type:'vocab', zh:'武术', pinyin:'wǔshù', en:'Martial arts 🥋', tags:['Culture','Sport'],
    example:{zh:'中国武术非常厉害！', pinyin:'Zhōngguó wǔshù fēicháng lìhai!', en:'Chinese martial arts are incredible!'} },
  { type:'culture', emoji:'🍵', title:'Tea Culture (茶文化)',
    body:'China is the birthplace of tea! Major types:\n• 绿茶 (lǜchá) — Green tea\n• 红茶 (hóngchá) — Black tea\n• 铁观音 (Tiě Guānyīn) — Oolong\nTea ceremonies are an ancient art!',
    tip:'请喝茶！(Qǐng hē chá!) = Please have some tea!' },
];

const QUIZ_POOL = CARDS.filter(c => c.type === 'vocab' || c.type === 'phrase');

// ============================================
// INIT
// ============================================
function init() {
  loadFromStorage();
  spawnParticles();
  renderCurrentCard();
  initPointerSwipe();
  initScrollWheel();
  initKeyboard();
  initQuiz();
  updateProgress();
}

// ============================================
// PARTICLES
// ============================================
function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = ['#a78bfa','#38bdf8','#fb7185','#34d399','#fbbf24'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 2 + Math.random() * 4;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      bottom:-10px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${6 + Math.random()*10}s;
      animation-delay:${Math.random()*10}s;
      opacity:0;
    `;
    container.appendChild(p);
  }
}

// ============================================
// CARD RENDERING
// ============================================
function renderCurrentCard() {
  const stack = document.getElementById('card-stack');
  if (!stack) return;
  stack.innerHTML = '';
  const el = document.createElement('div');
  el.className = 'lcard current';
  el.innerHTML = buildCardHTML(CARDS[currentIndex]);
  stack.appendChild(el);
  updateProgress();
  updateSideButtons();
}

function buildCardHTML(d) {
  if (!d) return '';
  if (d.type === 'vocab' || d.type === 'phrase') {
    const isMulti = d.zh.length > 2;
    return `
      <div class="card-inner"><div class="card-face">
        <span class="card-type-badge badge-${d.type === 'phrase' ? 'phrase' : 'vocab'}">
          ${d.type === 'phrase' ? '💬 Phrase' : '📝 Vocab'}
        </span>
        <span class="flip-hint">🔄</span>
        <div class="card-char ${isMulti ? 'multi' : ''}">${d.zh}</div>
        <div class="card-pinyin">${d.pinyin}</div>
        <div class="card-english">${d.en}</div>
        ${d.example ? `<div class="card-example">
          <div class="ex-zh">${d.example.zh}</div>
          <div class="ex-pinyin">${d.example.pinyin}</div>
          <div class="ex-en">${d.example.en}</div>
        </div>` : ''}
        <div class="card-tags">${(d.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      </div></div>`;
  }
  if (d.type === 'culture' || d.type === 'grammar' || d.type === 'travel') {
    return `
      <div class="card-inner"><div class="card-face">
        <span class="card-type-badge badge-${d.type}">${
          d.type==='culture'?'🌏 Culture':d.type==='grammar'?'📐 Grammar':'✈️ Travel'
        }</span>
        <div class="card-emoji">${d.emoji}</div>
        <div class="card-title">${d.title}</div>
        <div class="card-body" style="white-space:pre-line">${d.body}</div>
        ${d.tip?`<div class="card-tip">💡 ${d.tip}</div>`:''}
      </div></div>`;
  }
  return '';
}

// ============================================
// NAVIGATION
// ============================================
function goNext() {
  if (isAnimating) return;
  if (currentIndex >= CARDS.length - 1) {
    showToast('🎉 All cards done! Starting over...');
    launchConfetti();
    currentIndex = 0;
    renderCurrentCard();
    return;
  }
  animateCard('up');
}

function goPrev() {
  if (isAnimating || currentIndex <= 0) return;
  animateCard('down');
}

function animateCard(direction) {
  isAnimating = true;
  const stack = document.getElementById('card-stack');
  const current = stack?.querySelector('.lcard.current');
  if (!current) { isAnimating = false; return; }

  current.classList.remove('current');
  current.style.transition = 'transform .42s cubic-bezier(.25,.46,.45,.94), opacity .32s ease';
  current.style.transform = direction === 'up' ? 'translateY(-115%)' : 'translateY(115%)';
  current.style.opacity = '0';

  if (direction === 'up') currentIndex++;
  else currentIndex--;

  // Award XP on every swipe
  showXPBurst('+10 XP ⭐');
  addXP(10);

  const next = document.createElement('div');
  next.className = 'lcard';
  next.innerHTML = buildCardHTML(CARDS[currentIndex]);
  next.style.transform = direction === 'up' ? 'translateY(115%)' : 'translateY(-115%)';
  next.style.opacity = '0';
  stack.appendChild(next);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      next.style.transition = 'transform .42s cubic-bezier(.25,.46,.45,.94), opacity .32s ease';
      next.style.transform = 'translateY(0)';
      next.style.opacity = '1';
    });
  });

  setTimeout(() => {
    current.remove();
    next.classList.add('current');
    updateProgress();
    updateSideButtons();
    isAnimating = false;
  }, 440);
}

function updateProgress() {
  const fill = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  const pct = ((currentIndex + 1) / CARDS.length) * 100;
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = `${currentIndex + 1} / ${CARDS.length}`;
}

function updateSideButtons() {
  const likeIcon = document.getElementById('like-icon');
  const likeCount = document.getElementById('like-count');
  const saveIcon = document.getElementById('save-icon');
  if (likeIcon) likeIcon.textContent = liked.has(currentIndex) ? '❤️' : '🤍';
  if (likeCount) likeCount.textContent = liked.size;
  if (saveIcon) saveIcon.textContent = saved.has(currentIndex) ? '🔖✅' : '🔖';
}

// ============================================
// POINTER EVENTS (Mouse + Touch, works on Edge)
// ============================================
function initPointerSwipe() {
  const stack = document.getElementById('card-stack');
  if (!stack) return;

  let startY = 0, startX = 0, moved = false;

  stack.addEventListener('pointerdown', e => {
    startY = e.clientY;
    startX = e.clientX;
    moved = false;
    stack.setPointerCapture(e.pointerId);
  });

  stack.addEventListener('pointermove', e => {
    if (Math.abs(e.clientY - startY) > 8) moved = true;
  });

  stack.addEventListener('pointerup', e => {
    if (!moved) return;
    const dy = startY - e.clientY;
    const dx = Math.abs(startX - e.clientX);
    if (Math.abs(dy) > 40 && Math.abs(dy) > dx) {
      dy > 0 ? goNext() : goPrev();
    }
    moved = false;
  });
}

// ============================================
// SCROLL WHEEL (Edge / Desktop scroll)
// ============================================
function initScrollWheel() {
  let lastWheel = 0;
  document.addEventListener('wheel', e => {
    if (currentView !== 'feed') return;
    const now = Date.now();
    if (now - lastWheel < 600) return; // debounce
    lastWheel = now;
    e.preventDefault();
    if (e.deltaY > 0) goNext();
    else if (e.deltaY < 0) goPrev();
  }, { passive: false });
}

// ============================================
// KEYBOARD
// ============================================
function initKeyboard() {
  document.addEventListener('keydown', e => {
    if (currentView !== 'feed') return;
    if (e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); goNext(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); goPrev(); }
    if (e.key === 'l' || e.key === 'L') toggleLike();
    if (e.key === 's' || e.key === 'S') toggleSave();
    if (e.key === 'p' || e.key === 'P') speakCurrent();
  });
}

// ============================================
// ACTIONS
// ============================================
function toggleLike() {
  const icon = document.getElementById('like-icon');
  const count = document.getElementById('like-count');
  if (liked.has(currentIndex)) {
    liked.delete(currentIndex);
    if (icon) icon.textContent = '🤍';
  } else {
    liked.add(currentIndex);
    if (icon) { icon.textContent = '❤️'; icon.classList.add('like-pop'); }
    addXP(5);
    showXPBurst('+5 XP ❤️');
    floatEmoji('❤️');
    setTimeout(() => icon && icon.classList.remove('like-pop'), 400);
  }
  if (count) count.textContent = liked.size;
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
    addXP(5);
    showXPBurst('+5 XP 🔖');
    floatEmoji('🔖');
    showToast('✅ Saved!');
  }
  renderSaved();
}

function speakCurrent() {
  const card = CARDS[currentIndex];
  if (!card?.zh) { showToast('No audio for this card'); return; }
  const utter = new SpeechSynthesisUtterance(card.zh);
  utter.lang = 'zh-CN'; utter.rate = 0.8;
  window.speechSynthesis.speak(utter);
  floatEmoji('🔊');
}

function shareCard() {
  const card = CARDS[currentIndex];
  const text = card.zh
    ? `🀄 Word of the day: ${card.zh} (${card.pinyin||''}) = "${card.en}"\n\nLearn Chinese for free → https://manhcuongk55.github.io/Chinese-level-up-tips/app/`
    : `🀄 ${card.title||'Chinese culture tip'}\n\nExplore → https://manhcuongk55.github.io/Chinese-level-up-tips/app/`;
  if (navigator.share) navigator.share({ text });
  else if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => showToast('📋 Copied!'));
  else showToast('↗️ Share: ' + (card.zh || card.title || ''));
}

// ============================================
// QUIZ
// ============================================
function initQuiz() {
  quizCards = [...QUIZ_POOL].sort(() => Math.random() - 0.5).slice(0, 10);
  quizIndex = 0; quizScore = 0; quizStreak = 0; quizXP = 0;
  document.getElementById('q-total').textContent = quizCards.length;
  renderQuizCard();
}

function renderQuizCard() {
  if (quizIndex >= quizCards.length) { showQuizResults(); return; }
  const card = quizCards[quizIndex];
  document.getElementById('quiz-question').textContent = card.zh;
  document.getElementById('quiz-pinyin').textContent = card.pinyin || '';
  document.getElementById('q-num').textContent = quizIndex + 1;

  const wrongPool = QUIZ_POOL.filter(c => c.en !== card.en).sort(() => Math.random() - 0.5).slice(0, 3).map(c => c.en);
  const options = [...wrongPool, card.en].sort(() => Math.random() - 0.5);

  document.getElementById('quiz-options').innerHTML = options.map(opt =>
    `<button class="quiz-opt" onclick="answerQuiz('${opt.replace(/'/g,"\\'")}','${card.en.replace(/'/g,"\\'")}',this)">${opt}</button>`
  ).join('');
}

function answerQuiz(chosen, correct, btn) {
  document.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);
  if (chosen === correct) {
    btn.classList.add('correct');
    quizScore += 10; quizStreak++; quizXP += 15;
    addXP(15);
    showXPBurst('+15 XP ✅');
    launchConfetti();
  } else {
    btn.classList.add('wrong'); quizStreak = 0;
    document.querySelectorAll('.quiz-opt').forEach(b => {
      if (b.textContent.trim() === correct) b.classList.add('correct');
    });
    showToast('❌ Answer: ' + correct);
  }
  document.getElementById('quiz-score').textContent = quizScore;
  document.getElementById('quiz-streak').textContent = quizStreak + '🔥';
  document.getElementById('quiz-xp').textContent = quizXP + '⭐';
  setTimeout(() => { quizIndex++; renderQuizCard(); }, 1200);
}

function showQuizResults() {
  const pct = Math.round((quizScore / (quizCards.length * 10)) * 100);
  const medal = pct >= 90 ? '🏆' : pct >= 70 ? '🥇' : pct >= 50 ? '🥈' : '💪';
  launchConfetti();
  document.getElementById('quiz-card').innerHTML = `
    <div style="text-align:center;padding:20px 10px;">
      <div style="font-size:72px;margin-bottom:12px;">${medal}</div>
      <div style="font-size:36px;font-weight:900;color:#a78bfa;margin-bottom:4px;">${quizScore} pts</div>
      <div style="font-size:16px;color:rgba(241,245,249,.5);margin-bottom:6px;">${pct}% accuracy</div>
      <div style="font-size:14px;color:#fbbf24;font-weight:800;margin-bottom:24px;">+${quizXP} XP earned this round!</div>
      <button onclick="initQuiz()" style="background:rgba(167,139,250,.2);border:1.5px solid rgba(167,139,250,.5);color:#a78bfa;padding:14px 36px;border-radius:20px;font-size:16px;font-weight:800;cursor:pointer;font-family:Inter,sans-serif;">
        🔄 Play Again
      </button>
    </div>`;
}

// ============================================
// SAVED
// ============================================
function renderSaved() {
  const list = document.getElementById('saved-list');
  if (!list) return;
  if (!saved.size) {
    list.innerHTML = '<div class="empty-state"><div class="empty-icon">🔖</div><p>No saved cards yet.<br/>Tap 🔖 on any card to save it!</p></div>';
    return;
  }
  list.innerHTML = [...saved].map(idx => {
    const c = CARDS[idx];
    if (!c) return '';
    const char = c.zh || c.emoji || '📚';
    const lbl = c.en || c.title || '';
    const pin = c.pinyin || '';
    return `<div class="saved-item">
      <div class="saved-char">${char}</div>
      <div class="saved-info">
        ${pin ? `<div class="saved-pinyin">${pin}</div>` : ''}
        <div class="saved-en">${lbl}</div>
      </div>
      <button class="saved-btn" onclick="jumpToCard(${idx})">View</button>
    </div>`;
  }).join('');
}

function jumpToCard(idx) {
  currentIndex = idx;
  switchTab('feed');
  renderCurrentCard();
}

// ============================================
// TABS
// ============================================
function switchTab(tab) {
  currentView = tab;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const view = document.getElementById('view-' + tab);
  if (view) view.classList.add('active');
  // top tabs
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  const topTab = document.getElementById('tab-' + tab);
  if (topTab) topTab.classList.add('active');
  // bottom nav
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const navBtn = document.getElementById('nav-' + tab);
  if (navBtn) navBtn.classList.add('active');

  if (tab === 'saved') renderSaved();
  if (tab === 'quiz') initQuiz();
}

// ============================================
// XP & STREAK
// ============================================
function loadFromStorage() {
  const data = JSON.parse(localStorage.getItem('hanlearn_v2') || '{}');
  const today = new Date().toDateString();
  let streak = data.streak || 1;
  if (data.lastDate && data.lastDate !== today) {
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    streak = (data.lastDate === yesterday.toDateString()) ? streak + 1 : 1;
  }
  totalXP = data.xp || 0;
  saveStorage({ streak, xp: totalXP, lastDate: today });
  const el = document.getElementById('streak-count'); if (el) el.textContent = streak;
  const xpEl = document.getElementById('xp-count'); if (xpEl) xpEl.textContent = totalXP;
}

function addXP(amount) {
  totalXP += amount;
  const data = JSON.parse(localStorage.getItem('hanlearn_v2') || '{}');
  data.xp = totalXP;
  saveStorage(data);
  const el = document.getElementById('xp-count');
  if (el) {
    el.textContent = totalXP;
    const badge = document.getElementById('xp-badge');
    if (badge) { badge.classList.remove('pop'); void badge.offsetWidth; badge.classList.add('pop'); }
  }
  // Milestone celebrations
  if (totalXP % 100 === 0) {
    showToast(`🎉 ${totalXP} XP Milestone! Amazing!`);
    launchConfetti();
  }
}

function saveStorage(data) {
  const existing = JSON.parse(localStorage.getItem('hanlearn_v2') || '{}');
  localStorage.setItem('hanlearn_v2', JSON.stringify({ ...existing, ...data }));
}

// ============================================
// VISUAL EFFECTS
// ============================================
function showXPBurst(msg) {
  const popup = document.getElementById('xp-popup');
  if (!popup) return;
  popup.textContent = msg;
  popup.classList.remove('burst');
  void popup.offsetWidth; // reflow
  popup.classList.add('burst');
}

function launchConfetti() {
  const container = document.getElementById('confetti-container');
  if (!container) return;
  const colors = ['#a78bfa','#38bdf8','#fb7185','#34d399','#fbbf24','#fff'];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      top: -10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${6 + Math.random() * 10}px;
      height: ${6 + Math.random() * 10}px;
      border-radius: ${Math.random() > .5 ? '50%' : '2px'};
      animation-duration: ${1.5 + Math.random() * 2}s;
      animation-delay: ${Math.random() * .5}s;
      transform: translateX(${(Math.random() - .5) * 200}px);
    `;
    container.appendChild(piece);
    setTimeout(() => piece.remove(), 3500);
  }
}

function floatEmoji(emoji) {
  const el = document.createElement('div');
  el.className = 'float-emoji';
  el.textContent = emoji;
  el.style.left = (30 + Math.random() * 40) + '%';
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

// ============================================
// START
// ============================================
document.addEventListener('DOMContentLoaded', init);
