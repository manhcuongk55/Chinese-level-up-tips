// ============================================
// HanLearn — TikTok-Style Learning App
// Core Logic: Cards, Swipe, Quiz, Streak, Save
// ============================================

// ---- STATE ----
let currentIndex = 0;
let liked = new Set();
let saved = new Set();
let currentView = 'feed';
let isAnimating = false;

// Touch tracking
let touchStartY = 0;
let touchStartX = 0;
let isDragging = false;

// Quiz state
let quizIndex = 0;
let quizScore = 0;
let quizStreak = 0;
let quizCards = [];

// ---- CARD DATA ---- (50 cards: vocab, culture, grammar, travel, phrase)
const CARDS = [

  // ===== VOCABULARY =====
  { type: 'vocab', zh: '你好', pinyin: 'nǐ hǎo', en: 'Hello', tags: ['HSK1', 'Greeting'],
    example: { zh: '你好！我叫小明。', pinyin: 'Nǐ hǎo! Wǒ jiào Xiǎomíng.', en: 'Hello! My name is Xiaoming.' }},

  { type: 'vocab', zh: '谢谢', pinyin: 'xiè xiè', en: 'Thank you', tags: ['HSK1', 'Polite'],
    example: { zh: '谢谢你的帮助！', pinyin: 'Xièxiè nǐ de bāngzhù!', en: 'Thank you for your help!' }},

  { type: 'vocab', zh: '爱', pinyin: 'ài', en: 'Love', tags: ['HSK2', 'Emotion'],
    example: { zh: '我爱学中文。', pinyin: 'Wǒ ài xué Zhōngwén.', en: 'I love learning Chinese.' }},

  { type: 'vocab', zh: '朋友', pinyin: 'péngyou', en: 'Friend', tags: ['HSK1', 'People'],
    example: { zh: '他是我的好朋友。', pinyin: 'Tā shì wǒ de hǎo péngyou.', en: 'He is my good friend.' }},

  { type: 'vocab', zh: '美食', pinyin: 'měishí', en: 'Delicious food', tags: ['Food', 'Culture'],
    example: { zh: '中国美食太好吃了！', pinyin: 'Zhōngguó měishí tài hǎochī le!', en: 'Chinese food is so delicious!' }},

  { type: 'vocab', zh: '旅行', pinyin: 'lǚxíng', en: 'Travel', tags: ['HSK3', 'Travel'],
    example: { zh: '我喜欢旅行。', pinyin: 'Wǒ xǐhuān lǚxíng.', en: 'I love to travel.' }},

  { type: 'vocab', zh: '学习', pinyin: 'xuéxí', en: 'Study / Learn', tags: ['HSK1', 'Education'],
    example: { zh: '每天学习中文很重要。', pinyin: 'Měitiān xuéxí Zhōngwén hěn zhòngyào.', en: 'Studying Chinese every day is important.' }},

  { type: 'vocab', zh: '快乐', pinyin: 'kuàilè', en: 'Happy / Joyful', tags: ['HSK2', 'Emotion'],
    example: { zh: '祝你天天快乐！', pinyin: 'Zhù nǐ tiāntiān kuàilè!', en: 'Wishing you happiness every day!' }},

  { type: 'vocab', zh: '加油', pinyin: 'jiā yóu', en: 'Keep going! / Go!', tags: ['HSK2', 'Motivation'],
    example: { zh: '考试加油！', pinyin: 'Kǎoshì jiāyóu!', en: 'Good luck on your exam!' }},

  { type: 'vocab', zh: '家', pinyin: 'jiā', en: 'Home / Family', tags: ['HSK1', 'Family'],
    example: { zh: '我想回家。', pinyin: 'Wǒ xiǎng huí jiā.', en: 'I want to go home.' }},

  { type: 'vocab', zh: '星期', pinyin: 'xīngqī', en: 'Week / Weekday', tags: ['HSK1', 'Time'],
    example: { zh: '这个星期很忙。', pinyin: 'Zhège xīngqī hěn máng.', en: 'This week is very busy.' }},

  { type: 'vocab', zh: '好吃', pinyin: 'hǎo chī', en: 'Delicious', tags: ['HSK1', 'Food'],
    example: { zh: '这个饺子真好吃！', pinyin: 'Zhège jiǎozi zhēn hǎochī!', en: 'These dumplings are really delicious!' }},

  { type: 'vocab', zh: '漂亮', pinyin: 'piàoliang', en: 'Beautiful / Pretty', tags: ['HSK2', 'Description'],
    example: { zh: '这个地方很漂亮。', pinyin: 'Zhège dìfāng hěn piàoliang.', en: 'This place is very beautiful.' }},

  { type: 'vocab', zh: '钱', pinyin: 'qián', en: 'Money', tags: ['HSK1', 'Shopping'],
    example: { zh: '多少钱？', pinyin: 'Duōshao qián?', en: 'How much is it?' }},

  { type: 'vocab', zh: '时间', pinyin: 'shíjiān', en: 'Time', tags: ['HSK2', 'Time'],
    example: { zh: '没有时间了！', pinyin: 'Méiyǒu shíjiān le!', en: 'No more time!' }},

  { type: 'vocab', zh: '工作', pinyin: 'gōngzuò', en: 'Work / Job', tags: ['HSK2', 'Career'],
    example: { zh: '你的工作怎么样？', pinyin: 'Nǐ de gōngzuò zěnmeyàng?', en: 'How is your work going?' }},

  { type: 'vocab', zh: '火锅', pinyin: 'huǒguō', en: 'Hot pot', tags: ['Food', 'Culture'],
    example: { zh: '我最喜欢吃火锅！', pinyin: 'Wǒ zuì xǐhuān chī huǒguō!', en: 'I love eating hot pot the most!' }},

  { type: 'vocab', zh: '茶', pinyin: 'chá', en: 'Tea', tags: ['HSK1', 'Food', 'Culture'],
    example: { zh: '中国的茶很有名。', pinyin: 'Zhōngguó de chá hěn yǒumíng.', en: 'Chinese tea is very famous.' }},

  { type: 'vocab', zh: '武术', pinyin: 'wǔshù', en: 'Martial arts', tags: ['Culture', 'Sport'],
    example: { zh: '中国武术很厉害！', pinyin: 'Zhōngguó wǔshù hěn lìhai!', en: 'Chinese martial arts are amazing!' }},

  { type: 'vocab', zh: '音乐', pinyin: 'yīnyuè', en: 'Music', tags: ['HSK2', 'Art'],
    example: { zh: '你喜欢什么音乐？', pinyin: 'Nǐ xǐhuān shénme yīnyuè?', en: 'What music do you like?' }},

  // ===== CULTURE CARDS =====
  { type: 'culture', emoji: '🥢', title: 'Chopstick Etiquette',
    body: 'Never stick chopsticks upright in rice 🍚 — it resembles incense at funerals. Always lay them flat on the table or use a chopstick rest.',
    tip: '筷子 (kuàizi) = Chopsticks' },

  { type: 'culture', emoji: '🧧', title: 'Red Envelopes (红包)',
    body: 'During Chinese New Year, red envelopes "hóngbāo" filled with money are given for luck. Today, WeChat digital red envelopes are everywhere!',
    tip: '恭喜发财！(Gōngxǐ fācái!) = Wishing you wealth!' },

  { type: 'culture', emoji: '🏮', title: 'Mid-Autumn Festival',
    body: 'The Moon Festival (中秋节) is celebrated with mooncakes 🥮 and family reunions under the full moon. It falls on the 15th day of the 8th lunar month.',
    tip: '月饼 (yuèbǐng) = Mooncake' },

  { type: 'culture', emoji: '🐉', title: 'The Dragon Symbol',
    body: 'Unlike Western dragons, Chinese dragons (龙 lóng) are symbols of good luck, power, and the emperor. They control rain and are honored, not feared.',
    tip: '龙 (lóng) = Dragon — a symbol of prosperity!' },

  { type: 'culture', emoji: '🎋', title: 'Face (面子 Miànzi)',
    body: '"Face" is a key social concept in China. It means dignity, reputation, and prestige. Actions that cause embarrassment in public are seen as "losing face."',
    tip: '丢脸 (diū liǎn) = To lose face' },

  // ===== GRAMMAR CARDS =====
  { type: 'grammar', emoji: '💡', title: 'The "了 (le)" Particle',
    body: '了 marks completed actions or a change of state:\n• 我吃了。(Wǒ chī le) — I ate / have eaten.\n• 天黑了。(Tiān hēi le) — It has gotten dark.',
    tip: 'Think of 了 like "done!" or "now!"' },

  { type: 'grammar', emoji: '🔄', title: 'Verb + 一下 Pattern',
    body: '一下 (yīxià) softens requests and means "a little":\n• 等一下！— Wait a moment!\n• 看一下。— Take a look.\nMakes requests much more polite!',
    tip: '等一下 (děng yīxià) = Just a moment!' },

  { type: 'grammar', emoji: '❓', title: 'Question Particle 吗',
    body: 'Add 吗 to any statement to make a yes/no question:\n• 你好。(nǐ hǎo) → 你好吗？(nǐ hǎo ma?)\n• Statement → Question = Just add 吗!',
    tip: '你是学生吗？= Are you a student?' },

  { type: 'grammar', emoji: '🏗️', title: 'Sentences Are SVO',
    body: 'Chinese sentence order: Subject → Verb → Object\n• 我 (I) 爱 (love) 你 (you) = 我爱你\n• 他 (he) 吃 (eat) 苹果 (apple) = 他吃苹果\nJust like English!',
    tip: '我爱中文！(Wǒ ài Zhōngwén!) = I love Chinese!' },

  { type: 'grammar', emoji: '⏰', title: 'Time Comes Before Verb',
    body: 'Unlike English, time expressions come BEFORE the verb:\n• ✅ 我明天去。(I tomorrow go.)\n• ❌ 我去明天。\nTime → Place → Verb is the Chinese order.',
    tip: '明天我去北京。(Tomorrow I go to Beijing.)' },

  // ===== TRAVEL CARDS =====
  { type: 'travel', emoji: '✈️', title: 'Surviving Chinese Airports',
    body: 'Essential airport phrases:\n• 去哪里坐飞机？— Where do I board?\n• 我的行李在哪里？— Where is my luggage?\n• 登机口在哪儿？— Where is the gate?',
    tip: '登机口 (dēngjī kǒu) = Boarding gate' },

  { type: 'travel', emoji: '🍜', title: 'Ordering Food Like a Local',
    body: 'Point to the menu and say:\n• 我要这个！(Wǒ yào zhège) — I want this!\n• 不辣的！(Bù là de) — Not spicy!\n• 好吃！(Hǎochī) — Delicious!',
    tip: '有英文菜单吗？= Do you have an English menu?' },

  { type: 'travel', emoji: '🚇', title: 'Using the Subway in China',
    body: 'China has some of the best subways in the world! Buy a ticket with:\n• 一张票去＿。(Yī zhāng piào qù ___) — One ticket to ___.\nMost stations have English signs too.',
    tip: '地铁 (dìtiě) = Subway / Metro' },

  { type: 'travel', emoji: '🛍️', title: 'Bargaining at Markets',
    body: 'In local markets, bargaining is expected!\n• 太贵了！(Tài guì le) — Too expensive!\n• 便宜一点！(Piányí yīdiǎn) — A bit cheaper!\n• 最低多少钱？— What\'s the lowest price?',
    tip: 'Start at 50% of the asking price!' },

  { type: 'travel', emoji: '🏯', title: 'Must-visit in China',
    body: '🏯 Great Wall (长城) — Beijing\n🐼 Panda Base — Chengdu\n🌊 West Lake (西湖) — Hangzhou\n🌇 The Bund — Shanghai\n🎋 Zhangjiajie — Avatar mountains',
    tip: '长城 (Chángchéng) = Great Wall' },

  // ===== PHRASES =====
  { type: 'phrase', zh: '没问题', pinyin: 'méi wèntí', en: 'No problem!', tags: ['Phrase', 'Daily'],
    example: { zh: 'A: 可以帮我吗？B: 没问题！', pinyin: 'A: Kěyǐ bāng wǒ ma? B: Méi wèntí!', en: 'A: Can you help me? B: No problem!' }},

  { type: 'phrase', zh: '入乡随俗', pinyin: 'rù xiāng suí sú', en: 'When in Rome, do as Romans do', tags: ['Idiom', 'Culture'],
    example: { zh: '在中国，要入乡随俗。', pinyin: 'Zài Zhōngguó, yào rù xiāng suí sú.', en: 'In China, you should follow local customs.' }},

  { type: 'phrase', zh: '随便', pinyin: 'suíbiàn', en: 'Whatever / As you like', tags: ['Phrase', 'Daily'],
    example: { zh: 'A: 吃什么？B: 随便！', pinyin: 'A: Chī shénme? B: Suíbiàn!', en: 'A: What do you want to eat? B: Anything!' }},

  { type: 'phrase', zh: '慢慢来', pinyin: 'màn màn lái', en: 'Take it slow / No rush', tags: ['Phrase', 'Motivation'],
    example: { zh: '学中文慢慢来，不要着急。', pinyin: 'Xué Zhōngwén màn màn lái, bùyào zháojí.', en: 'Learn Chinese slowly, don\'t rush.' }},

  { type: 'phrase', zh: '一起加油', pinyin: 'yīqǐ jiā yóu', en: 'Let\'s all keep going!', tags: ['Phrase', 'Motivation'],
    example: { zh: '学习虽然难，一起加油！', pinyin: 'Xuéxí suīrán nán, yīqǐ jiāyóu!', en: 'Studying is hard, but let\'s keep going together!' }},

  // More vocab
  { type: 'vocab', zh: '梦想', pinyin: 'mèngxiǎng', en: 'Dream / Ambition', tags: ['HSK3', 'Motivation'],
    example: { zh: '你的梦想是什么？', pinyin: 'Nǐ de mèngxiǎng shì shénme?', en: 'What is your dream?' }},

  { type: 'vocab', zh: '努力', pinyin: 'nǔlì', en: 'Work hard / Diligent', tags: ['HSK2', 'Motivation'],
    example: { zh: '你很努力，一定会成功！', pinyin: 'Nǐ hěn nǔlì, yīdìng huì chénggōng!', en: 'You\'re so hardworking, you will definitely succeed!' }},

  { type: 'vocab', zh: '文化', pinyin: 'wénhuà', en: 'Culture', tags: ['HSK3', 'Culture'],
    example: { zh: '中国文化非常丰富。', pinyin: 'Zhōngguó wénhuà fēicháng fēngfù.', en: 'Chinese culture is very rich.' }},

  { type: 'vocab', zh: '语言', pinyin: 'yǔyán', en: 'Language', tags: ['HSK3', 'Education'],
    example: { zh: '学语言需要时间和耐心。', pinyin: 'Xué yǔyán xūyào shíjiān hé nàixīn.', en: 'Learning a language requires time and patience.' }},

  { type: 'vocab', zh: '世界', pinyin: 'shìjiè', en: 'World', tags: ['HSK3', 'Global'],
    example: { zh: '中文是世界上最多人说的语言。', pinyin: 'Zhōngwén shì shìjiè shàng zuì duō rén shuō de yǔyán.', en: 'Chinese is the most spoken language in the world.' }},

  { type: 'vocab', zh: '朋友圈', pinyin: 'péngyou quān', en: 'Friend circle / WeChat feed', tags: ['Modern', 'Social'],
    example: { zh: '发朋友圈！', pinyin: 'Fā péngyou quān!', en: 'Post to your WeChat moments!' }},

  { type: 'phrase', zh: '哪里哪里', pinyin: 'nǎlǐ nǎlǐ', en: 'You\'re too kind! (humble)', tags: ['Phrase', 'Polite'],
    example: { zh: 'A: 你中文说得很好！B: 哪里哪里。', pinyin: 'A: Nǐ Zhōngwén shuō de hěn hǎo! B: Nǎlǐ nǎlǐ.', en: 'A: Your Chinese is great! B: Oh, not really.' }},

  { type: 'grammar', emoji: '🎯', title: '比 (bǐ) — Comparison',
    body: 'Use 比 to compare:\n• A 比 B + adjective\n• 我比你高。(Wǒ bǐ nǐ gāo) — I\'m taller than you.\n• 北京比上海冷。— Beijing is colder than Shanghai.',
    tip: '今天比昨天好！= Today is better than yesterday!' },

  { type: 'travel', emoji: '🍵', title: 'Tea Culture in China',
    body: 'China is the birthplace of tea 🍵. Major types:\n• 绿茶 (lǜchá) — Green tea\n• 红茶 (hóngchá) — Black tea\n• 铁观音 — Oolong tea\nTea ceremonies are an art form!',
    tip: '请喝茶！(Qǐng hē chá!) = Please have some tea!' },
];

// ---- QUIZ-SPECIFIC CARDS (vocabulary only) ----
const QUIZ_POOL = CARDS.filter(c => c.type === 'vocab' || c.type === 'phrase');

// ============================================
// INITIALIZATION
// ============================================
function init() {
  loadStreakFromStorage();
  renderCurrentCard();
  initSwipe();
  initKeyboard();
  initQuiz();
  updateProgress();
  hideSwiHintAfterDelay();
}

function hideSwiHintAfterDelay() {
  setTimeout(() => {
    const hint = document.getElementById('swipe-hint');
    if (hint) hint.style.opacity = '0';
  }, 3000);
}

// ============================================
// CARD RENDERING
// ============================================
function renderCurrentCard() {
  const stack = document.getElementById('card-stack');
  stack.innerHTML = '';
  const card = makeCardEl(CARDS[currentIndex], 'current');
  stack.appendChild(card);
  updateProgress();
}

function makeCardEl(data, state) {
  const el = document.createElement('div');
  el.className = `lcard ${state}`;
  el.innerHTML = buildCardHTML(data);

  // Set liked/saved states
  const likeIcon = document.getElementById('like-icon');
  const likeCount = document.getElementById('like-count');
  if (likeIcon) likeIcon.textContent = liked.has(currentIndex) ? '❤️' : '🤍';
  if (likeCount) likeCount.textContent = liked.size;

  return el;
}

function buildCardHTML(d) {
  if (!d) return '';

  if (d.type === 'vocab' || d.type === 'phrase') {
    const isMulti = d.zh.length > 2;
    return `
      <div class="card-inner">
        <div class="card-face">
          <span class="card-type-badge badge-${d.type === 'phrase' ? 'phrase' : 'vocab'}">
            ${d.type === 'phrase' ? '💬 Phrase' : '📝 Vocab'}
          </span>
          <span class="flip-hint">🔄</span>

          <div class="card-char ${isMulti ? 'multi' : ''}">${d.zh}</div>
          <div class="card-pinyin">${d.pinyin}</div>
          <div class="card-english">${d.en}</div>

          ${d.example ? `
          <div class="card-example">
            <div class="ex-zh">${d.example.zh}</div>
            <div class="ex-pinyin">${d.example.pinyin}</div>
            <div class="ex-en">${d.example.en}</div>
          </div>` : ''}

          <div class="card-tags">
            ${(d.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>`;
  }

  if (d.type === 'culture') {
    return `
      <div class="card-inner">
        <div class="card-face">
          <span class="card-type-badge badge-culture">🌏 Culture</span>
          <div class="card-emoji">${d.emoji}</div>
          <div class="card-title">${d.title}</div>
          <div class="card-body">${d.body}</div>
          ${d.tip ? `<div class="card-tip">💡 ${d.tip}</div>` : ''}
        </div>
      </div>`;
  }

  if (d.type === 'grammar') {
    return `
      <div class="card-inner">
        <div class="card-face">
          <span class="card-type-badge badge-grammar">📐 Grammar</span>
          <div class="card-emoji">${d.emoji}</div>
          <div class="card-title">${d.title}</div>
          <div class="card-body" style="white-space:pre-line">${d.body}</div>
          ${d.tip ? `<div class="card-tip">💡 ${d.tip}</div>` : ''}
        </div>
      </div>`;
  }

  if (d.type === 'travel') {
    return `
      <div class="card-inner">
        <div class="card-face">
          <span class="card-type-badge badge-travel">✈️ Travel</span>
          <div class="card-emoji">${d.emoji}</div>
          <div class="card-title">${d.title}</div>
          <div class="card-body" style="white-space:pre-line">${d.body}</div>
          ${d.tip ? `<div class="card-tip">💡 ${d.tip}</div>` : ''}
        </div>
      </div>`;
  }

  return '';
}

// ============================================
// NAVIGATION
// ============================================
function goNext() {
  if (isAnimating) return;
  if (currentIndex >= CARDS.length - 1) {
    showToast('🎉 You\'ve seen all cards! Starting over...');
    currentIndex = 0;
    renderCurrentCard();
    return;
  }
  animateSwipe('up');
}

function goPrev() {
  if (isAnimating) return;
  if (currentIndex <= 0) return;
  animateSwipe('down');
}

function animateSwipe(direction) {
  isAnimating = true;
  const stack = document.getElementById('card-stack');
  const currentEl = stack.querySelector('.lcard.current');
  if (!currentEl) { isAnimating = false; return; }

  // Slide out current
  currentEl.classList.remove('current');
  currentEl.classList.add(direction === 'up' ? 'exiting' : 'entering');

  // Update index
  direction === 'up' ? currentIndex++ : currentIndex--;

  // Add XP
  addXP(10);

  // Create next card
  const nextEl = makeCardEl(CARDS[currentIndex], 'entering');
  stack.appendChild(nextEl);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      nextEl.classList.remove('entering');
      nextEl.classList.add('current');
    });
  });

  // Update UI after transition
  setTimeout(() => {
    currentEl.remove();
    updateProgress();
    updateSideButtons();
    isAnimating = false;
  }, 450);
}

function updateProgress() {
  const fill = document.getElementById('progress-fill');
  const pct = ((currentIndex + 1) / CARDS.length) * 100;
  if (fill) fill.style.width = pct + '%';
}

function updateSideButtons() {
  const likeIcon = document.getElementById('like-icon');
  const likeCount = document.getElementById('like-count');
  if (likeIcon) likeIcon.textContent = liked.has(currentIndex) ? '❤️' : '🤍';
  if (likeCount) likeCount.textContent = liked.size;
  const saveIcon = document.getElementById('save-icon');
  if (saveIcon) saveIcon.textContent = saved.has(currentIndex) ? '🔖✅' : '🔖';
}

// ============================================
// TOUCH / SWIPE
// ============================================
function initSwipe() {
  const stack = document.getElementById('card-stack');
  if (!stack) return;

  stack.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  stack.addEventListener('touchend', e => {
    if (!isDragging) return;
    isDragging = false;
    const dy = touchStartY - e.changedTouches[0].clientY;
    const dx = Math.abs(touchStartX - e.changedTouches[0].clientX);
    if (Math.abs(dy) > 50 && Math.abs(dy) > dx) {
      dy > 0 ? goNext() : goPrev();
    }
  }, { passive: true });

  // Mouse support
  let mouseStart = 0;
  stack.addEventListener('mousedown', e => { mouseStart = e.clientY; });
  stack.addEventListener('mouseup', e => {
    const dy = mouseStart - e.clientY;
    if (Math.abs(dy) > 50) dy > 0 ? goNext() : goPrev();
  });
}

function initKeyboard() {
  document.addEventListener('keydown', e => {
    if (currentView !== 'feed') return;
    if (e.key === 'ArrowUp' || e.key === ' ') { e.preventDefault(); goNext(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); goPrev(); }
    if (e.key === 'l' || e.key === 'L') toggleLike();
    if (e.key === 's' || e.key === 'S') toggleSave();
  });
}

// ============================================
// ACTIONS
// ============================================
function toggleLike() {
  const likeIcon = document.getElementById('like-icon');
  const likeCount = document.getElementById('like-count');
  const likeBtn = document.getElementById('like-btn');

  if (liked.has(currentIndex)) {
    liked.delete(currentIndex);
    if (likeIcon) likeIcon.textContent = '🤍';
  } else {
    liked.add(currentIndex);
    if (likeIcon) { likeIcon.textContent = '❤️'; likeIcon.classList.add('like-pop'); }
    addXP(5);
    floatEmoji('❤️');
    setTimeout(() => likeIcon && likeIcon.classList.remove('like-pop'), 400);
  }
  if (likeCount) likeCount.textContent = liked.size;
}

function toggleSave() {
  const saveIcon = document.getElementById('save-icon');
  if (saved.has(currentIndex)) {
    saved.delete(currentIndex);
    if (saveIcon) saveIcon.textContent = '🔖';
    showToast('Removed from saved');
  } else {
    saved.add(currentIndex);
    if (saveIcon) saveIcon.textContent = '🔖✅';
    showToast('✅ Saved! View in Saved tab');
    addXP(5);
    floatEmoji('🔖');
  }
  // Update saved view
  renderSaved();
}

function speakCurrent() {
  const card = CARDS[currentIndex];
  if (!card || !card.zh) { showToast('No audio for this card type'); return; }
  const utter = new SpeechSynthesisUtterance(card.zh);
  utter.lang = 'zh-CN';
  utter.rate = 0.85;
  window.speechSynthesis.speak(utter);
  showToast('🔊 Playing: ' + card.zh);
  floatEmoji('🔊');
}

function shareCard() {
  const card = CARDS[currentIndex];
  let text = '';
  if (card.zh && card.en) {
    text = `🀄 Learning Chinese today!\n${card.zh} (${card.pinyin || ''})\nMeans: "${card.en}"\n\n加油! Study with me → https://github.com/manhcuongk55/Chinese-level-up-tips`;
  } else {
    text = `🀄 ${card.title || 'Chinese tip'}\n\nLearn Chinese → https://github.com/manhcuongk55/Chinese-level-up-tips`;
  }

  if (navigator.share) {
    navigator.share({ title: 'HanLearn 🀄', text });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast('📋 Copied to clipboard!'));
  } else {
    showToast('↗️ Share: ' + (card.zh || card.title || ''));
  }
}

// ============================================
// QUIZ MODE
// ============================================
function initQuiz() {
  // Shuffle and pick 10
  quizCards = [...QUIZ_POOL].sort(() => Math.random() - 0.5).slice(0, 10);
  quizIndex = 0;
  quizScore = 0;
  quizStreak = 0;
  document.getElementById('q-total').textContent = quizCards.length;
  renderQuizCard();
}

function renderQuizCard() {
  if (quizIndex >= quizCards.length) {
    showQuizResults();
    return;
  }

  const card = quizCards[quizIndex];
  document.getElementById('quiz-question').textContent = card.zh;
  document.getElementById('quiz-pinyin').textContent = card.pinyin || '';
  document.getElementById('q-num').textContent = quizIndex + 1;
  document.getElementById('quiz-score').textContent = quizScore;
  document.getElementById('quiz-streak').textContent = quizStreak;

  // Generate options: 1 correct + 3 random wrong
  const correct = card.en;
  const wrongPool = QUIZ_POOL
    .filter(c => c !== card && c.en !== correct)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(c => c.en);

  const options = [...wrongPool, correct].sort(() => Math.random() - 0.5);

  const optContainer = document.getElementById('quiz-options');
  optContainer.innerHTML = options.map(opt => `
    <button class="quiz-opt" onclick="answerQuiz('${opt.replace(/'/g,"\\'")}', '${correct.replace(/'/g,"\\'")}', this)">
      ${opt}
    </button>`).join('');
}

function answerQuiz(chosen, correct, btn) {
  // Disable all buttons
  document.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);

  if (chosen === correct) {
    btn.classList.add('correct');
    quizScore += 10;
    quizStreak++;
    addXP(10);
    floatEmoji('⭐');
    showToast('✅ Correct! +10 XP');
  } else {
    btn.classList.add('wrong');
    quizStreak = 0;
    // Highlight correct answer
    document.querySelectorAll('.quiz-opt').forEach(b => {
      if (b.textContent.trim() === correct) b.classList.add('correct');
    });
    showToast('❌ The answer was: ' + correct);
  }

  document.getElementById('quiz-score').textContent = quizScore;
  document.getElementById('quiz-streak').textContent = quizStreak;

  setTimeout(() => {
    quizIndex++;
    renderQuizCard();
  }, 1200);
}

function showQuizResults() {
  const qCard = document.getElementById('quiz-card');
  const pct = Math.round((quizScore / (quizCards.length * 10)) * 100);
  let msg = pct >= 80 ? '🏆 Excellent!' : pct >= 60 ? '👍 Good job!' : '💪 Keep practicing!';
  qCard.innerHTML = `
    <div style="text-align:center;padding:20px;">
      <div style="font-size:64px;margin-bottom:16px;">${msg.split(' ')[0]}</div>
      <div style="font-size:32px;font-weight:900;color:#a78bfa;margin-bottom:8px;">${quizScore} / ${quizCards.length * 10}</div>
      <div style="font-size:16px;color:rgba(241,245,249,0.5);margin-bottom:24px;">${pct}% Accuracy</div>
      <button onclick="initQuiz()" style="background:rgba(167,139,250,0.2);border:1.5px solid rgba(167,139,250,0.5);color:#a78bfa;padding:14px 32px;border-radius:20px;font-size:16px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;">
        🔄 Play Again
      </button>
    </div>`;
}

// ============================================
// SAVED VIEW
// ============================================
function renderSaved() {
  const list = document.getElementById('saved-list');
  if (!list) return;

  if (saved.size === 0) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">🔖</div><p>No saved cards yet.<br/>Tap 🔖 on any card to save it!</p></div>`;
    return;
  }

  list.innerHTML = [...saved].map(idx => {
    const card = CARDS[idx];
    if (!card) return '';
    if (card.zh) {
      return `<div class="saved-item">
        <div class="saved-char">${card.zh}</div>
        <div class="saved-info">
          <div class="saved-pinyin">${card.pinyin || ''}</div>
          <div class="saved-en">${card.en || card.title || ''}</div>
        </div>
        <button onclick="jumpToCard(${idx})" style="background:rgba(167,139,250,0.15);border:1px solid rgba(167,139,250,0.3);color:#a78bfa;padding:8px 14px;border-radius:12px;font-size:12px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;">View</button>
      </div>`;
    }
    return `<div class="saved-item">
      <div class="saved-char">${card.emoji || '📚'}</div>
      <div class="saved-info">
        <div class="saved-en">${card.title || ''}</div>
      </div>
      <button onclick="jumpToCard(${idx})" style="background:rgba(167,139,250,0.15);border:1px solid rgba(167,139,250,0.3);color:#a78bfa;padding:8px 14px;border-radius:12px;font-size:12px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;">View</button>
    </div>`;
  }).join('');
}

function jumpToCard(idx) {
  currentIndex = idx;
  switchTab('feed');
  renderCurrentCard();
  updateSideButtons();
}

// ============================================
// VIEW SWITCHING
// ============================================
function switchTab(tab, btnEl) {
  currentView = tab;

  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const view = document.getElementById('view-' + tab);
  if (view) view.classList.add('active');

  // Update top tabs
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  // Update bottom nav
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  if (tab === 'saved') renderSaved();
  if (tab === 'quiz') initQuiz();
}

// ============================================
// STREAK & XP
// ============================================
function loadStreakFromStorage() {
  const data = JSON.parse(localStorage.getItem('hanlearn') || '{}');
  const today = new Date().toDateString();
  let streak = data.streak || 1;
  if (data.lastDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (data.lastDate === yesterday.toDateString()) streak++;
    else streak = 1;
  }
  const xp = data.xp || 0;
  saveStorage({ streak, xp, lastDate: today });
  document.getElementById('streak-count').textContent = streak;
  document.getElementById('xp-count').textContent = xp;
}

function addXP(amount) {
  const data = JSON.parse(localStorage.getItem('hanlearn') || '{}');
  data.xp = (data.xp || 0) + amount;
  saveStorage(data);
  const el = document.getElementById('xp-count');
  if (el) el.textContent = data.xp;
}

function saveStorage(data) {
  const existing = JSON.parse(localStorage.getItem('hanlearn') || '{}');
  localStorage.setItem('hanlearn', JSON.stringify({ ...existing, ...data }));
}

// ============================================
// HELPERS
// ============================================
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

function floatEmoji(emoji) {
  const el = document.createElement('div');
  el.className = 'float-emoji';
  el.textContent = emoji;
  el.style.left = (40 + Math.random() * 30) + '%';
  el.style.bottom = '100px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

function flipCard() {
  showToast('💡 Tap the card to flip!');
}

// ============================================
// START
// ============================================
document.addEventListener('DOMContentLoaded', init);
