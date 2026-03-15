// levAIup v4 — Goals + Study Buddy + Persistence

// ===== CONSTANTS =====
const LEVELS = [
  {lvl:1,name:'Beginner',badge:'🌱',min:0,max:100},
  {lvl:2,name:'Explorer',badge:'🗺️',min:100,max:250},
  {lvl:3,name:'Apprentice',badge:'📚',min:250,max:500},
  {lvl:4,name:'Warrior',badge:'⚔️',min:500,max:900},
  {lvl:5,name:'Scholar',badge:'🎓',min:900,max:1500},
  {lvl:6,name:'Sage',badge:'🔮',min:1500,max:2500},
  {lvl:7,name:'Champion',badge:'🏆',min:2500,max:4000},
  {lvl:8,name:'Grand Master',badge:'👑',min:4000,max:6000},
  {lvl:9,name:'Legend',badge:'⭐',min:6000,max:10000},
];

const GOAL_META = {
  travel:  {icon:'🌏', label:'Travel Abroad',  desc:'Explore the world in Chinese'},
  hsk:     {icon:'📝', label:'HSK Exam',        desc:'Pass my target HSK level'},
  work:    {icon:'💼', label:'Career Goals',    desc:'Use Chinese at work'},
  culture: {icon:'🎋', label:'Culture & Art',   desc:'Appreciate Chinese culture deeply'},
  friends: {icon:'👥', label:'Make Friends',    desc:'Connect with native speakers'},
  fun:     {icon:'🎉', label:'Just for Fun',    desc:'Enjoy the journey'},
};

const DAILY_QUOTES = [
  "千里之行，始于足下 — A journey of 1000 miles begins with one step.",
  "学而时习之，不亦说乎 — Is it not a joy to learn and practice?",
  "坚持就是胜利 — Persistence is victory.",
  "每天进步一点点，成功就在前方 — Small daily progress leads to big success.",
  "不积跬步，无以至千里 — Without small steps, you cannot travel far.",
  "失败是成功之母 — Failure is the mother of success.",
  "学无止境 — Learning has no limits.",
  "知识就是力量 — Knowledge is power.",
  "加油！每天学习，每天进步！ — Keep going! Learn every day!",
  "语言是文化的钥匙 — Language is the key to culture.",
];

const LANG_PAIRS = [
  {from:'🇨🇳',to:'🇬🇧',fromName:'Chinese (中文)',code:'zh',locked:false},
  {from:'🇬🇧',to:'🇨🇳',fromName:'English → ZH',code:'en',locked:false},
  {from:'🇯🇵',to:'🇬🇧',fromName:'Japanese',code:'ja',locked:true},
  {from:'🇰🇷',to:'🇬🇧',fromName:'Korean',code:'ko',locked:true},
  {from:'🇪🇸',to:'🇬🇧',fromName:'Spanish',code:'es',locked:true},
];

const MISSIONS_DEF = [
  {id:'cards10',icon:'📱',title:'Study 10 cards today',target:10,color:'accent',xp:50},
  {id:'quiz5',  icon:'🎯',title:'Answer 5 quiz questions',target:5,color:'green', xp:75},
  {id:'streak', icon:'🔥',title:'Maintain your streak',  target:1,color:'yellow',xp:30},
  {id:'save3',  icon:'🔖',title:'Save 3 cards',          target:3,color:'accent',xp:40},
];

// Mock study buddy profiles
const MOCK_BUDDIES = [
  {id:1,avatar:'👩',name:'Linh Nguyễn',city:'Ho Chi Minh City',district:'Quận 7',goal:'travel',streak:12,xp:340,langs:['🇨🇳 Chinese','🇯🇵 Japanese'],level:'Apprentice'},
  {id:2,avatar:'👨',name:'Minh Trần',city:'Ho Chi Minh City',district:'Bình Chánh',goal:'hsk',streak:25,xp:780,langs:['🇨🇳 Chinese'],level:'Warrior'},
  {id:3,avatar:'🧑',name:'Thu Hà',city:'Hà Nội',district:'Cầu Giấy',goal:'culture',streak:7,xp:190,langs:['🇨🇳 Chinese','🇰🇷 Korean'],level:'Explorer'},
  {id:4,avatar:'👩',name:'An Phạm',city:'Đà Nẵng',district:'Hải Châu',goal:'friends',streak:3,xp:85,langs:['🇨🇳 Chinese'],level:'Beginner'},
  {id:5,avatar:'👦',name:'Khoa Lê',city:'Ho Chi Minh City',district:'Quận 3',goal:'work',streak:18,xp:520,langs:['🇨🇳 Chinese','🇬🇧 English'],level:'Scholar'},
  {id:6,avatar:'👩',name:'Mai Đỗ',city:'Cần Thơ',district:'Ninh Kiều',goal:'fun',streak:5,xp:130,langs:['🇨🇳 Chinese'],level:'Explorer'},
];

const STUDY_ROOMS = [
  {icon:'📖',name:'Morning Vocab Club',meta:'6:00 - 7:00 AM daily',online:14,isLive:true},
  {icon:'🎯',name:'HSK Challenge Room',meta:'Practice together',online:8,isLive:true},
  {icon:'✈️',name:'Travel Phrase Hub',meta:'Real-life conversations',online:5,isLive:false},
  {icon:'🎋',name:'Culture Corner',meta:'History & culture deep dives',online:3,isLive:false},
];

// ===== STATE =====
let currentIndex=0, totalXP=0, currentStreak=1;
let liked=new Set(), saved=new Set();
let currentView='feed', isAnimating=false;
let cardsStudiedToday=0, quizAnsweredToday=0;
let langIndex=0, quizLangMode='zh';
let quizCards=[], quizIndex=0, quizScore=0, quizStreakQ=0, quizXPEarned=0;
let connectedBuddies=new Set();
// Goal state
let userGoal={type:'',days:0,pledge:'',city:'',district:'',name:'',startDate:''};
let modalStep=1, selectedGoalType='', selectedDays=0;

// ===== CARDS =====
const CARDS = [
  {type:'vocab',zh:'你好',pinyin:'nǐ hǎo',en:'Hello',tags:['HSK1','Greeting'],example:{zh:'你好！我叫小明。',pinyin:'Nǐ hǎo! Wǒ jiào Xiǎomíng.',en:'Hello! My name is Xiaoming.'}},
  {type:'vocab',zh:'谢谢',pinyin:'xiè xiè',en:'Thank you',tags:['HSK1'],example:{zh:'谢谢你！',pinyin:'Xiè xiè nǐ!',en:'Thank you!'}},
  {type:'vocab',zh:'爱',pinyin:'ài',en:'Love ❤️',tags:['HSK2','Emotion'],example:{zh:'我爱学中文！',pinyin:'Wǒ ài xué Zhōngwén!',en:'I love learning Chinese!'}},
  {type:'vocab',zh:'朋友',pinyin:'péngyou',en:'Friend',tags:['HSK1'],example:{zh:'他是我的好朋友。',pinyin:'Tā shì wǒ de hǎo péngyou.',en:'He is my good friend.'}},
  {type:'vocab',zh:'旅行',pinyin:'lǚxíng',en:'Travel',tags:['HSK3','Travel'],example:{zh:'我喜欢旅行！',pinyin:'Wǒ xǐhuān lǚxíng!',en:'I love to travel!'}},
  {type:'vocab',zh:'学习',pinyin:'xuéxí',en:'Study / Learn',tags:['HSK1'],example:{zh:'每天学习很重要。',pinyin:'Měitiān xuéxí hěn zhòngyào.',en:'Studying every day is important.'}},
  {type:'vocab',zh:'快乐',pinyin:'kuàilè',en:'Happy',tags:['HSK2','Emotion'],example:{zh:'祝你天天快乐！',pinyin:'Zhù nǐ tiāntiān kuàilè!',en:'Wishing you daily happiness!'}},
  {type:'vocab',zh:'加油',pinyin:'jiā yóu',en:'Keep going!',tags:['Motivation'],example:{zh:'加油！你可以的！',pinyin:'Jiāyóu! Nǐ kěyǐ de!',en:'You can do it!'}},
  {type:'vocab',zh:'梦想',pinyin:'mèngxiǎng',en:'Dream',tags:['HSK3'],example:{zh:'你的梦想是什么？',pinyin:'Nǐ de mèngxiǎng shì shénme?',en:'What is your dream?'}},
  {type:'vocab',zh:'努力',pinyin:'nǔlì',en:'Work hard',tags:['HSK2'],example:{zh:'努力就会成功！',pinyin:'Nǔlì jiù huì chénggōng!',en:'Work hard and succeed!'}},
  {type:'vocab',zh:'成功',pinyin:'chénggōng',en:'Success',tags:['HSK3'],example:{zh:'坚持就是成功！',pinyin:'Jiānchí jiù shì chénggōng!',en:'Persistence is success!'}},
  {type:'vocab',zh:'世界',pinyin:'shìjiè',en:'World 🌍',tags:['HSK3'],example:{zh:'你好，世界！',pinyin:'Nǐ hǎo shìjiè!',en:'Hello, World!'}},
  {type:'vocab',zh:'语言',pinyin:'yǔyán',en:'Language',tags:['HSK3'],example:{zh:'学语言很有趣！',pinyin:'Xué yǔyán hěn yǒuqù!',en:'Learning languages is fun!'}},
  {type:'vocab',zh:'文化',pinyin:'wénhuà',en:'Culture',tags:['HSK3'],example:{zh:'中国文化很丰富。',pinyin:'Zhōngguó wénhuà hěn fēngfù.',en:'Chinese culture is very rich.'}},
  {type:'vocab',zh:'漂亮',pinyin:'piàoliang',en:'Beautiful',tags:['HSK2'],example:{zh:'这里很漂亮！',pinyin:'Zhèlǐ hěn piàoliang!',en:'This place is beautiful!'}},
  {type:'vocab',zh:'时间',pinyin:'shíjiān',en:'Time',tags:['HSK2'],example:{zh:'时间就是金钱！',pinyin:'Shíjiān jiù shì jīnqián!',en:'Time is money!'}},
  {type:'vocab',zh:'幸福',pinyin:'xìngfú',en:'Happiness',tags:['HSK3'],example:{zh:'愿你幸福！',pinyin:'Yuàn nǐ xìngfú!',en:'Wishing you happiness!'}},
  {type:'vocab',zh:'火锅',pinyin:'huǒguō',en:'Hot pot 🍲',tags:['Food','Culture'],example:{zh:'我最喜欢吃火锅！',pinyin:'Wǒ zuì xǐhuān chī huǒguō!',en:'I love hot pot the most!'}},
  {type:'vocab',zh:'茶',pinyin:'chá',en:'Tea 🍵',tags:['HSK1','Culture'],example:{zh:'请喝茶！',pinyin:'Qǐng hē chá!',en:'Please have some tea!'}},
  {type:'vocab',zh:'北京',pinyin:'Běijīng',en:'Beijing 🏙️',tags:['HSK1','City'],example:{zh:'北京是中国的首都。',pinyin:'Běijīng shì shǒudū.',en:'Beijing is the capital.'}},
  {type:'culture',emoji:'🥢',title:'Chopstick Etiquette',body:'Never stick chopsticks upright in rice — it resembles funeral incense. Always lay them flat.',tip:'筷子 (kuàizi) = Chopsticks'},
  {type:'culture',emoji:'🧧',title:'Red Envelopes (红包)',body:'Digital red envelopes on WeChat are a huge part of modern Chinese culture. Billions are sent on Chinese New Year!',tip:'恭喜发财！= Wishing you wealth!'},
  {type:'culture',emoji:'🐉',title:'Dragon = Good Luck',body:'Chinese dragons symbolize GOOD luck and prosperity — the opposite of Western dragons. They control rain and are honored.',tip:'龙 (lóng) = Dragon — fortune symbol!'},
  {type:'culture',emoji:'🍵',title:'Tea Culture (茶文化)',body:'China is the birthplace of tea! Green tea (绿茶), black tea (红茶), oolong (乌龙). Tea ceremonies are an art form.',tip:'请喝茶！(Qǐng hē chá!) = Have some tea!'},
  {type:'grammar',emoji:'💡',title:'了 (le) = Done!',body:'了 marks a completed action:\n• 我吃了。— I ate.\n• 天黑了。— It got dark.\nThink of 了 as "finished!"',tip:'了 signals completion or change of state'},
  {type:'grammar',emoji:'❓',title:'Making Questions with 吗',body:'Add 吗 to ANY statement for a yes/no question:\n• 你好。→ 你好吗？(Are you well?)\n• 你学中文。→ 你学中文吗？',tip:'吗 = turns statement into question'},
  {type:'grammar',emoji:'🎯',title:'比 (bǐ) = Comparison',body:'A 比 B + adjective = A is more [adj] than B:\n• 我比你高。— I\'m taller than you.\n• 今天比昨天好。— Today is better.',tip:'比 = "than" in comparisons'},
  {type:'travel',emoji:'✈️',title:'Airport Survival',body:'• 登机口在哪儿？— Where is the gate?\n• 我的行李在哪里？— Where is my luggage?\n• 不好意思！— Excuse me!',tip:'登机口 (dēngjī kǒu) = Boarding gate'},
  {type:'travel',emoji:'🍜',title:'Order Food Like a Local',body:'• 我要这个！— I want this!\n• 不辣！— Not spicy!\n• 好吃！— Delicious!\n• 买单！— Check please!',tip:'有英文菜单吗？= English menu?'},
  {type:'travel',emoji:'🏯',title:'Must-Visit in China',body:'🏯 Great Wall — Beijing\n🐼 Panda Base — Chengdu\n🌊 West Lake — Hangzhou\n🌇 The Bund — Shanghai',tip:'长城 (Chángchéng) = The Great Wall'},
  {type:'phrase',zh:'没问题',pinyin:'méi wèntí',en:'No problem!',tags:['Daily','HSK2'],example:{zh:'没问题！我来帮你！',pinyin:'Méi wèntí! Wǒ lái bāng nǐ!',en:'No problem! I\'ll help you!'}},
  {type:'phrase',zh:'随便',pinyin:'suíbiàn',en:'Whatever / Up to you',tags:['Daily'],example:{zh:'吃什么？随便！',pinyin:'Chī shénme? Suíbiàn!',en:'What to eat? Anything!'}},
  {type:'phrase',zh:'慢慢来',pinyin:'màn màn lái',en:'Take it slow',tags:['Mindset'],example:{zh:'学语言慢慢来！',pinyin:'Xué yǔyán màn màn lái!',en:'Learn languages slowly!'}},
  {type:'phrase',zh:'一起加油',pinyin:'yīqǐ jiā yóu',en:"Let's keep going together!",tags:['Motivation'],example:{zh:'一起学习，一起加油！',pinyin:'Yīqǐ xuéxí, yīqǐ jiāyóu!',en:'Study together, go together!'}},
  {type:'phrase',zh:'入乡随俗',pinyin:'rù xiāng suí sú',en:'When in Rome…',tags:['Idiom','Culture'],example:{zh:'在中国，要入乡随俗。',pinyin:'Zài Zhōngguó, yào rù xiāng suí sú.',en:'In China, follow local customs.'}},
];

const QUIZ_POOL = CARDS.filter(c => c.type==='vocab' || c.type==='phrase');

// ===========================================
// INIT
// ===========================================
function init() {
  loadStorage();
  spawnParticles();
  renderCurrentCard();
  initPointer(); initWheel(); initKeys();
  initQuiz();
  renderGoalBanner();
  // Show goal modal if not set
  if (!userGoal.type) {
    setTimeout(() => document.getElementById('goal-modal').classList.remove('hidden'), 800);
  } else {
    document.getElementById('goal-modal').classList.add('hidden');
  }
}

// ===========================================
// PARTICLES
// ===========================================
function spawnParticles() {
  const c = document.getElementById('particles'); if (!c) return;
  ['#a78bfa','#38bdf8','#fb7185','#34d399','#fbbf24'].forEach(col => {
    for (let j=0; j<3; j++) {
      const p = document.createElement('div'), sz = 2+Math.random()*4;
      p.className='particle';
      p.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;bottom:-10px;background:${col};animation-duration:${7+Math.random()*10}s;animation-delay:${Math.random()*12}s`;
      c.appendChild(p);
    }
  });
}

// ===========================================
// GOAL MODAL
// ===========================================
function openGoalModal() {
  selectedGoalType = userGoal.type || '';
  selectedDays = userGoal.days || 0;
  modalStep = 1;
  renderModalStep();
  document.getElementById('goal-modal').classList.remove('hidden');
  // Pre-fill existing values
  document.getElementById('buddy-city').value = userGoal.city || '';
  document.getElementById('buddy-district').value = userGoal.district || '';
  document.getElementById('buddy-name').value = userGoal.name || '';
  document.getElementById('pledge-text').value = userGoal.pledge || '';
  if (selectedGoalType) {
    document.querySelectorAll('.goal-btn').forEach(b => {
      b.classList.toggle('selected', b.dataset.goal === selectedGoalType);
    });
  }
}

function renderModalStep() {
  for (let i=1; i<=4; i++) {
    const el = document.getElementById('mstep-'+i);
    if (el) el.classList.toggle('hidden', i !== modalStep);
  }
  document.querySelectorAll('.mdot').forEach((d,i) => d.classList.toggle('active', i === modalStep-1));
  const back = document.getElementById('modal-back'), next = document.getElementById('modal-next');
  if (back) back.style.display = modalStep > 1 ? 'block' : 'none';
  if (next) next.textContent = modalStep === 4 ? '🚀 Start Learning!' : 'Next →';
}

function pickGoal(btn) {
  document.querySelectorAll('.goal-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedGoalType = btn.dataset.goal;
}

function pickDays(btn) {
  document.querySelectorAll('.days-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedDays = parseInt(btn.dataset.days);
}

function modalNext() {
  if (modalStep === 1 && !selectedGoalType) { showToast('Please pick a goal!'); return; }
  if (modalStep === 2 && !selectedDays) { showToast('Pick a deadline!'); return; }
  if (modalStep === 4) {
    // Save goal
    userGoal = {
      type: selectedGoalType,
      days: selectedDays,
      city: document.getElementById('buddy-city').value.trim() || 'Your City',
      district: document.getElementById('buddy-district').value.trim(),
      name: document.getElementById('buddy-name').value.trim() || 'Language Learner',
      pledge: document.getElementById('pledge-text').value.trim(),
      startDate: userGoal.startDate || new Date().toISOString(),
    };
    saveStorage();
    document.getElementById('goal-modal').classList.add('hidden');
    renderGoalBanner();
    renderProfileGoalCard();
    renderCommunity();
    showToast('🎯 Goal set! Let\'s go! 加油！');
    launchConfetti();
    addXP(20);
    return;
  }
  modalStep++;
  renderModalStep();
}

function modalBack() {
  if (modalStep <= 1) return;
  modalStep--;
  renderModalStep();
}

// ===========================================
// GOAL BANNER (Feed)
// ===========================================
function renderGoalBanner() {
  const banner = document.getElementById('goal-banner');
  if (!banner || !userGoal.type) return;
  banner.style.display = 'flex';
  const meta = GOAL_META[userGoal.type] || {};
  const start = new Date(userGoal.startDate);
  const elapsed = Math.floor((Date.now() - start) / 86400000);
  const remaining = Math.max(0, userGoal.days - elapsed);
  const pct = Math.min(100, Math.round((elapsed / userGoal.days) * 100));
  document.getElementById('goal-banner-text').textContent = `${meta.icon} ${remaining}d left · ${pct}% done`;
  // Daily quote (changes by day)
  const dayIdx = new Date().getDate() % DAILY_QUOTES.length;
  document.getElementById('goal-banner-quote').textContent = DAILY_QUOTES[dayIdx];
}

// ===========================================
// PROFILE GOAL CARD
// ===========================================
function renderProfileGoalCard() {
  if (!userGoal.type) return;
  const meta = GOAL_META[userGoal.type] || {};
  const start = new Date(userGoal.startDate || Date.now());
  const elapsed = Math.floor((Date.now() - start) / 86400000);
  const remaining = Math.max(0, userGoal.days - elapsed);
  const pct = Math.min(100, Math.round((elapsed / userGoal.days) * 100));
  const set = (id, val) => { const el=document.getElementById(id); if(el) el.textContent=val; };
  const setW = (id, w) => { const el=document.getElementById(id); if(el) el.style.width=w+'%'; };
  set('gc-icon', meta.icon || '🎯');
  set('gc-title', meta.label || 'My Goal');
  set('gc-days', `${remaining} days remaining · Goal: ${userGoal.days}d`);
  setW('gc-fill', pct);
  const pledge = document.getElementById('gc-pledge');
  if (pledge) pledge.textContent = userGoal.pledge ? `"${userGoal.pledge}"` : '';
}

// ===========================================
// STUDY CALENDAR (last 28 days)
// ===========================================
function renderStudyCalendar() {
  const wrap = document.getElementById('study-calendar');
  if (!wrap) return;
  const studyDays = JSON.parse(localStorage.getItem('levelai_studydays') || '[]');
  const today = new Date();
  wrap.innerHTML = '';
  for (let i=27; i>=0; i--) {
    const d = new Date(today); d.setDate(today.getDate()-i);
    const key = d.toDateString();
    const isToday = i === 0;
    const isStudied = studyDays.includes(key);
    const day = document.createElement('div');
    day.className = `cal-day${isStudied?' studied':''}${isToday?' today':''}`;
    day.textContent = d.getDate();
    day.title = key + (isStudied?' ✅':'');
    wrap.appendChild(day);
  }
}

function markTodayStudied() {
  const key = new Date().toDateString();
  const days = JSON.parse(localStorage.getItem('levelai_studydays') || '[]');
  if (!days.includes(key)) { days.push(key); localStorage.setItem('levelai_studydays', JSON.stringify(days)); }
}

// ===========================================
// COMMUNITY / BUDDY SYSTEM
// ===========================================
function renderCommunity() {
  // Update your card
  const nameEl = document.getElementById('your-name-display');
  const goalEl = document.getElementById('your-goal-display');
  const commStreak = document.getElementById('comm-streak');
  const commXp = document.getElementById('comm-xp');
  const locLabel = document.getElementById('comm-location-label');
  if (nameEl) nameEl.textContent = userGoal.name || 'Anonymous Learner';
  if (goalEl) goalEl.textContent = userGoal.type ? `Goal: ${GOAL_META[userGoal.type]?.icon} ${GOAL_META[userGoal.type]?.label}` : 'No goal set yet';
  if (commStreak) commStreak.textContent = currentStreak;
  if (commXp) commXp.textContent = totalXP;
  if (locLabel) locLabel.textContent = `📍 ${userGoal.city || 'Set your location'} ${userGoal.district ? '· '+userGoal.district : ''}`;

  // Render buddy list
  const list = document.getElementById('buddy-list');
  if (!list) return;
  const myCity = (userGoal.city || '').toLowerCase();
  const sorted = [...MOCK_BUDDIES].sort((a,b) => {
    // Sort: same city first, then by streak descending
    const aMatch = myCity && a.city.toLowerCase().includes(myCity.split(' ')[0]||'') ? 1 : 0;
    const bMatch = myCity && b.city.toLowerCase().includes(myCity.split(' ')[0]||'') ? 1 : 0;
    return bMatch - aMatch || b.streak - a.streak;
  });
  list.innerHTML = sorted.map(b => {
    const isConn = connectedBuddies.has(b.id);
    const proximity = myCity && b.city.toLowerCase().includes(myCity.split(' ')[0]||'') ? '📍 Same city · ' : '';
    return `<div class="buddy-card">
      <div class="buddy-avatar">${b.avatar}</div>
      <div class="buddy-info">
        <div class="buddy-name">${b.name}</div>
        <div class="buddy-meta">${proximity}${b.city} ${b.district?'· '+b.district:''} · 🔥${b.streak} · ⭐${b.xp}</div>
        <div class="buddy-tags">${b.langs.map(l=>`<span class="buddy-tag">${l}</span>`).join('')}<span class="buddy-tag">${b.level}</span></div>
      </div>
      <button class="buddy-connect ${isConn?'connected':''}" onclick="connectBuddy(${b.id}, this)">
        ${isConn?'✓ Connected':'Connect'}
      </button>
    </div>`;
  }).join('');

  // Render study rooms
  const rooms = document.getElementById('rooms-list');
  if (rooms) {
    rooms.innerHTML = STUDY_ROOMS.map(r => `
      <div class="room-card">
        <div class="room-icon">${r.icon}</div>
        <div class="room-info">
          <div class="room-name">${r.name}</div>
          <div class="room-meta">${r.meta}</div>
        </div>
        <div class="room-live">
          ${r.isLive?`<div class="live-dot"></div><span style="color:var(--green)">${r.online} online</span>`:
          `<span style="color:var(--muted)">${r.online} members</span>`}
        </div>
        <button class="room-join" onclick="joinRoom('${r.name}')">Join</button>
      </div>`).join('');
  }
}

function connectBuddy(id, btn) {
  if (connectedBuddies.has(id)) {
    connectedBuddies.delete(id);
    btn.className = 'buddy-connect';
    btn.textContent = 'Connect';
    showToast('Disconnected');
  } else {
    connectedBuddies.add(id);
    btn.className = 'buddy-connect connected';
    btn.textContent = '✓ Connected';
    addXP(10); showXPBurst('+10 XP 🤝'); floatEmoji('🤝');
    showToast('🤝 Connected! Study together!');
  }
}

function joinRoom(name) {
  showToast(`🏠 Joining "${name}"...`);
  addXP(5);
  showXPBurst('+5 XP 🏠');
  floatEmoji('🏠');
}

// ===========================================
// CARD RENDERING
// ===========================================
function renderCurrentCard() {
  const stack = document.getElementById('card-stack'); if (!stack) return;
  stack.innerHTML = '';
  const el = document.createElement('div');
  el.className = 'lcard current';
  el.innerHTML = buildCard(CARDS[currentIndex]);
  stack.appendChild(el);
  updateProgressLabel(); updateSideButtons();
}

function buildCard(d) {
  if (!d) return '';
  const pair = LANG_PAIRS[langIndex];
  const isEN = pair.code === 'en';
  if (d.type==='vocab'||d.type==='phrase') {
    const front = isEN?d.en:d.zh, back = isEN?`${d.zh} · ${d.pinyin}`:d.en;
    const multi = d.zh.length>2, cls = isEN?'en-mode':multi?'multi':'';
    return `<div class="card-inner"><div class="card-face">
      <span class="card-type-badge badge-${d.type==='phrase'?'phrase':'vocab'}">${d.type==='phrase'?'💬 Phrase':'📝 Vocab'}</span>
      <span class="lang-tag">${pair.from}→${pair.to}</span>
      <div class="card-char ${cls}">${front}</div>
      ${!isEN?`<div class="card-pinyin">${d.pinyin}</div>`:''}
      <div class="card-english">${back}</div>
      ${d.example?`<div class="card-example"><div class="ex-zh">${d.example.zh}</div><div class="ex-pinyin">${d.example.pinyin}</div><div class="ex-en">${d.example.en}</div></div>`:''}
      <div class="card-tags">${(d.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
    </div></div>`;
  }
  return `<div class="card-inner"><div class="card-face">
    <span class="card-type-badge badge-${d.type}">${d.type==='culture'?'🌏 Culture':d.type==='grammar'?'📐 Grammar':'✈️ Travel'}</span>
    <div class="card-emoji">${d.emoji}</div>
    <div class="card-title">${d.title}</div>
    <div class="card-body" style="white-space:pre-line">${d.body}</div>
    ${d.tip?`<div class="card-tip">💡 ${d.tip}</div>`:''}
  </div></div>`;
}

function updateProgressLabel() {
  const cp = document.getElementById('card-progress'); if (cp) cp.textContent=`${currentIndex+1} / ${CARDS.length}`;
}
function updateSideButtons() {
  const li=document.getElementById('like-icon'),lc=document.getElementById('like-count'),si=document.getElementById('save-icon');
  if (li) li.textContent=liked.has(currentIndex)?'❤️':'🤍';
  if (lc) lc.textContent=liked.size;
  if (si) si.textContent=saved.has(currentIndex)?'🔖✅':'🔖';
}

// ===========================================
// NAVIGATION
// ===========================================
function goNext() {
  if (isAnimating) return;
  if (currentIndex>=CARDS.length-1) { showToast('🎉 All done! Starting over...'); launchConfetti(); currentIndex=0; renderCurrentCard(); return; }
  animateCard('up');
}
function goPrev() { if (isAnimating||currentIndex<=0) return; animateCard('down'); }

function animateCard(dir) {
  isAnimating=true;
  const stack=document.getElementById('card-stack'), cur=stack?.querySelector('.lcard.current');
  if (!cur) { isAnimating=false; return; }
  cur.style.transition='transform .42s cubic-bezier(.25,.46,.45,.94),opacity .32s ease';
  cur.style.transform=dir==='up'?'translateY(-115%)':'translateY(115%)'; cur.style.opacity='0';
  dir==='up'?currentIndex++:currentIndex--;
  addXP(10); showXPBurst('+10 XP ⭐');
  cardsStudiedToday++; markTodayStudied(); updateMissions(); saveStorage();
  const nxt=document.createElement('div');
  nxt.className='lcard'; nxt.innerHTML=buildCard(CARDS[currentIndex]);
  nxt.style.transform=dir==='up'?'translateY(115%)':'translateY(-115%)'; nxt.style.opacity='0';
  stack.appendChild(nxt);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    nxt.style.transition='transform .42s cubic-bezier(.25,.46,.45,.94),opacity .32s ease';
    nxt.style.transform='translateY(0)'; nxt.style.opacity='1';
  }));
  setTimeout(()=>{ cur.remove(); nxt.classList.add('current'); updateProgressLabel(); updateSideButtons(); isAnimating=false; }, 440);
}

// ===========================================
// POINTER + WHEEL + KEYS
// ===========================================
function initPointer() {
  const stack=document.getElementById('card-stack'); if (!stack) return;
  let sy=0,sx=0,moved=false;
  stack.addEventListener('pointerdown',e=>{ sy=e.clientY; sx=e.clientX; moved=false; stack.setPointerCapture(e.pointerId); });
  stack.addEventListener('pointermove',e=>{ if(Math.abs(e.clientY-sy)>8) moved=true; });
  stack.addEventListener('pointerup',e=>{
    if (!moved) return;
    const dy=sy-e.clientY,dx=Math.abs(sx-e.clientX);
    if (Math.abs(dy)>40&&Math.abs(dy)>dx) dy>0?goNext():goPrev();
    moved=false;
  });
}
function initWheel() {
  let last=0;
  document.addEventListener('wheel',e=>{ if(currentView!=='feed') return; const now=Date.now(); if(now-last<650) return; last=now; e.preventDefault(); e.deltaY>0?goNext():goPrev(); },{passive:false});
}
function initKeys() {
  document.addEventListener('keydown',e=>{
    if(currentView!=='feed') return;
    if(e.key==='ArrowDown'||e.key===' '){ e.preventDefault(); goNext(); }
    if(e.key==='ArrowUp'){ e.preventDefault(); goPrev(); }
    if(e.key==='l') toggleLike(); if(e.key==='s') toggleSave(); if(e.key==='p') speakCurrent();
  });
}

// ===========================================
// ACTIONS
// ===========================================
function toggleLike() {
  const icon=document.getElementById('like-icon'),ct=document.getElementById('like-count');
  if(liked.has(currentIndex)){ liked.delete(currentIndex); if(icon) icon.textContent='🤍'; }
  else { liked.add(currentIndex); if(icon){ icon.textContent='❤️'; icon.classList.add('like-pop'); setTimeout(()=>icon.classList.remove('like-pop'),400); } addXP(5); showXPBurst('+5 XP ❤️'); floatEmoji('❤️'); }
  if(ct) ct.textContent=liked.size;
}
function toggleSave() {
  const icon=document.getElementById('save-icon');
  if(saved.has(currentIndex)){ saved.delete(currentIndex); if(icon) icon.textContent='🔖'; showToast('Removed'); }
  else { saved.add(currentIndex); if(icon) icon.textContent='🔖✅'; addXP(5); showXPBurst('+5 XP 🔖'); floatEmoji('🔖'); showToast('✅ Saved!'); }
  updateMissions(); saveStorage();
}
function speakCurrent() {
  const c=CARDS[currentIndex]; if(!c?.zh) return;
  const u=new SpeechSynthesisUtterance(c.zh); u.lang='zh-CN'; u.rate=0.8;
  window.speechSynthesis.speak(u); floatEmoji('🔊');
}
function shareCard() {
  const c=CARDS[currentIndex];
  const text=c.zh?`🀄 levAIup: ${c.zh} (${c.pinyin||''}) = "${c.en}"\n加油! → https://manhcuongk55.github.io/Chinese-level-up-tips/app/`:`🀄 levAIup: ${c.title||'Learn Languages!'}\n→ https://manhcuongk55.github.io/Chinese-level-up-tips/app/`;
  if(navigator.share) navigator.share({text});
  else if(navigator.clipboard) navigator.clipboard.writeText(text).then(()=>showToast('📋 Copied!'));
}

// ===========================================
// LANGUAGE CYCLE
// ===========================================
function cycleLang() {
  langIndex=(langIndex+1)%LANG_PAIRS.length;
  const pair=LANG_PAIRS[langIndex];
  if(pair.locked){ showToast('🔒 Unlock at Level 4!'); langIndex=0; return; }
  document.getElementById('lang-from-flag').textContent=pair.from;
  document.getElementById('lang-to-flag').textContent=pair.to;
  document.getElementById('lang-name').textContent=pair.fromName;
  document.getElementById('flip-dir').textContent=pair.code.toUpperCase()+' → EN';
  renderCurrentCard(); showToast('🌍 '+pair.fromName);
}

// ===========================================
// QUIZ
// ===========================================
function setQuizLang(mode) {
  quizLangMode=mode;
  document.querySelectorAll('.lang-pill').forEach(b=>b.classList.remove('active'));
  const el=document.getElementById('qlang-'+mode); if(el) el.classList.add('active');
  initQuiz();
}
function initQuiz() {
  quizCards=[...QUIZ_POOL].sort(()=>Math.random()-.5).slice(0,10);
  quizIndex=0;quizScore=0;quizStreakQ=0;quizXPEarned=0;
  document.getElementById('qtotal').textContent=quizCards.length;
  renderQuizCard();
}
function renderQuizCard() {
  if(quizIndex>=quizCards.length){ showQuizResults(); return; }
  const card=quizCards[quizIndex];
  const qEl=document.getElementById('quiz-q'),hEl=document.getElementById('quiz-hint');
  document.getElementById('qnum').textContent=quizIndex+1;
  let question,hint,makeAnswer;
  if(quizLangMode==='en'){question=card.en;hint='→ Choose the Chinese character';qEl.className='quiz-q en-q';makeAnswer=c=>c.zh;}
  else if(quizLangMode==='mix'){const flip=Math.random()>.5;question=flip?card.en:card.zh;hint=flip?card.pinyin||'':'→ Choose the meaning';qEl.className=flip?'quiz-q en-q':'quiz-q';makeAnswer=flip?c=>c.zh:c=>c.en;}
  else{question=card.zh;hint=card.pinyin||'';qEl.className='quiz-q';makeAnswer=c=>c.en;}
  qEl.textContent=question;hEl.textContent=hint;
  const correct=makeAnswer(card);
  const wrongs=QUIZ_POOL.filter(c=>makeAnswer(c)!==correct).sort(()=>Math.random()-.5).slice(0,3).map(makeAnswer);
  document.getElementById('quiz-opts').innerHTML=[...wrongs,correct].sort(()=>Math.random()-.5).map(opt=>
    `<button class="quiz-opt" onclick="answerQ('${opt.replace(/'/g,"\\'")}','${correct.replace(/'/g,"\\'")}',this)">${opt}</button>`).join('');
}
function answerQ(chosen,correct,btn) {
  document.querySelectorAll('.quiz-opt').forEach(b=>b.disabled=true);
  if(chosen===correct){
    btn.classList.add('correct');quizScore+=10;quizStreakQ++;quizXPEarned+=15;
    addXP(15);showXPBurst('+15 XP ✅');launchConfetti();quizAnsweredToday++;
  } else { btn.classList.add('wrong');quizStreakQ=0; document.querySelectorAll('.quiz-opt').forEach(b=>{if(b.textContent.trim()===correct) b.classList.add('correct');}); }
  document.getElementById('qs-score').textContent=quizScore;
  document.getElementById('qs-streak').textContent=quizStreakQ+'🔥';
  document.getElementById('qs-xp').textContent=quizXPEarned+'⭐';
  updateMissions();
  setTimeout(()=>{quizIndex++;renderQuizCard();},1100);
}
function showQuizResults() {
  const pct=Math.round((quizScore/(quizCards.length*10))*100);
  const medal=pct>=90?'🏆':pct>=70?'🥇':pct>=50?'🥈':'💪';
  launchConfetti();
  document.getElementById('quiz-card').innerHTML=`
    <div style="text-align:center;padding:16px 8px">
      <div style="font-size:60px;margin-bottom:10px">${medal}</div>
      <div style="font-size:32px;font-weight:900;color:#a78bfa;margin-bottom:4px">${quizScore} pts</div>
      <div style="font-size:13px;color:rgba(241,245,249,.5);margin-bottom:6px">${pct}% accuracy</div>
      <div style="font-size:13px;color:#fbbf24;font-weight:800;margin-bottom:20px">+${quizXPEarned} XP earned!</div>
      <button onclick="initQuiz()" style="background:rgba(167,139,250,.2);border:1.5px solid rgba(167,139,250,.5);color:#a78bfa;padding:12px 30px;border-radius:18px;font-size:14px;font-weight:800;cursor:pointer;font-family:Inter,sans-serif">🔄 Play Again</button>
    </div>`;
}

// ===========================================
// MISSIONS
// ===========================================
function updateMissions() {
  const list=document.getElementById('missions-list'); if(!list) return;
  list.innerHTML=MISSIONS_DEF.map(m=>{
    let prog=0;
    if(m.id==='cards10') prog=Math.min(m.target,cardsStudiedToday);
    if(m.id==='quiz5') prog=Math.min(m.target,quizAnsweredToday);
    if(m.id==='streak') prog=Math.min(m.target,currentStreak>0?1:0);
    if(m.id==='save3') prog=Math.min(m.target,saved.size);
    const done=prog>=m.target, pct=Math.round((prog/m.target)*100);
    return `<div class="mission-item ${done?'done':''}">
      <div class="mission-icon">${done?'✅':m.icon}</div>
      <div class="mission-info">
        <div class="mission-title">${m.title}</div>
        <div class="mission-bar-wrap"><div class="mission-bar"><div class="mission-fill ${m.color}" style="width:${pct}%"></div></div><div class="mission-txt">${prog}/${m.target}</div></div>
      </div><div class="mission-xp">+${m.xp}</div>
    </div>`;
  }).join('');
}

// ===========================================
// XP & LEVELS
// ===========================================
function getLvl() { return LEVELS.slice().reverse().find(l=>totalXP>=l.min)||LEVELS[0]; }
function updateXPBar() {
  const lvl=getLvl(), next=LEVELS[lvl.lvl]||LEVELS[LEVELS.length-1];
  const inLvl=totalXP-lvl.min, needed=next.min-lvl.min;
  const pct=Math.min(100,Math.round((inLvl/needed)*100));
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  const setW=(id,w)=>{const el=document.getElementById(id);if(el)el.style.width=w+'%';};
  set('xp-level-label',`Lv.${lvl.lvl}·${lvl.name}`);
  setW('xp-fill',pct); set('xp-val',`${totalXP}/${next.min}XP`);
  set('level-badge',lvl.badge); set('level-name',lvl.name);
  set('level-num',`Level ${lvl.lvl}`); setW('level-fill',pct);
  set('level-xp-txt',`${inLvl} / ${needed} XP → Lv.${lvl.lvl+1}`);
  set('st-xp',totalXP);
}
function addXP(amt) {
  const prevLvl=getLvl().lvl; totalXP+=amt;
  const newLvl=getLvl();
  updateXPBar();
  if(newLvl.lvl>prevLvl){ launchConfetti(); showToast(`🎉 LEVEL UP! You are now ${newLvl.badge} ${newLvl.name}!`); showXPBurst(`🎉 Lv.${newLvl.lvl}!`); }
  if(totalXP%100===0&&totalXP>0) showToast(`⭐ ${totalXP} XP milestone!`);
}

// ===========================================
// STORAGE
// ===========================================
function loadStorage() {
  const d=JSON.parse(localStorage.getItem('levelai_v4')||'{}');
  const today=new Date().toDateString();
  totalXP=d.xp||0;
  const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);
  if(d.lastDate===today){ currentStreak=d.streak||1; cardsStudiedToday=d.cardsToday||0; quizAnsweredToday=d.quizToday||0; }
  else if(d.lastDate===yesterday.toDateString()){ currentStreak=(d.streak||0)+1; }
  else { currentStreak=1; }
  if(d.goal) userGoal=d.goal;
  document.getElementById('streak-count').textContent=currentStreak;
  updateXPBar(); renderProfileGoalCard();
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  set('st-streak',currentStreak); set('st-cards',cardsStudiedToday); set('st-saved',saved.size);
  saveStorage();
}
function saveStorage() {
  localStorage.setItem('levelai_v4',JSON.stringify({
    xp:totalXP,streak:currentStreak,lastDate:new Date().toDateString(),
    cardsToday:cardsStudiedToday,quizToday:quizAnsweredToday,goal:userGoal
  }));
}

// ===========================================
// TABS
// ===========================================
function switchTab(tab) {
  currentView=tab;
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  const v=document.getElementById('view-'+tab); if(v) v.classList.add('active');
  ['feed','quiz','community','profile'].forEach(t=>{
    const tb=document.getElementById('tab-'+t),nb=document.getElementById('nav-'+t);
    if(tb) tb.classList.toggle('active',t===tab);
    if(nb) nb.classList.toggle('active',t===tab);
  });
  if(tab==='profile'){ updateMissions(); renderStudyCalendar(); renderProfileGoalCard(); updateXPBar(); const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};set('st-streak',currentStreak);set('st-cards',cardsStudiedToday);set('st-saved',saved.size); }
  if(tab==='quiz') initQuiz();
  if(tab==='community') renderCommunity();
}

// ===========================================
// EFFECTS
// ===========================================
function showXPBurst(msg) {
  const p=document.getElementById('xp-popup'); if(!p) return;
  p.textContent=msg; p.classList.remove('burst'); void p.offsetWidth; p.classList.add('burst');
}
function launchConfetti() {
  const c=document.getElementById('confetti-container'); if(!c) return;
  const cols=['#a78bfa','#38bdf8','#fb7185','#34d399','#fbbf24','#fff'];
  for(let i=0;i<35;i++){
    const p=document.createElement('div'); p.className='confetti-piece';
    p.style.cssText=`left:${Math.random()*100}%;top:-10px;background:${cols[Math.floor(Math.random()*cols.length)]};width:${6+Math.random()*10}px;height:${6+Math.random()*10}px;border-radius:${Math.random()>.5?'50%':'2px'};animation-duration:${1.5+Math.random()*2}s;animation-delay:${Math.random()*.5}s;transform:translateX(${(Math.random()-.5)*200}px)`;
    c.appendChild(p); setTimeout(()=>p.remove(),3500);
  }
}
function floatEmoji(e) {
  const el=document.createElement('div'); el.className='float-emoji'; el.textContent=e;
  el.style.left=(30+Math.random()*40)+'%'; el.style.bottom='120px';
  document.body.appendChild(el); setTimeout(()=>el.remove(),900);
}
function showToast(msg) {
  const t=document.getElementById('toast'); if(!t) return;
  t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2200);
}

document.addEventListener('DOMContentLoaded',init);
