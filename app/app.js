// levAIup v5 — Dual-Language Learning (Native → Target)

// ===== LANGUAGE REGISTRY =====
const ALL_LANGS = {
  vn: {flag:'🇻🇳', name:'Tiếng Việt', short:'VN'},
  en: {flag:'🇬🇧', name:'English',    short:'EN'},
  zh: {flag:'🇨🇳', name:'中文',        short:'ZH'},
  ja: {flag:'🇯🇵', name:'日本語',      short:'JA'},
  ko: {flag:'🇰🇷', name:'한국어',      short:'KO'},
  es: {flag:'🇪🇸', name:'Español',    short:'ES'},
  fr: {flag:'🇫🇷', name:'Français',  short:'FR'},
  de: {flag:'🇩🇪', name:'Deutsch',    short:'DE'},
};

// ===== RPG LEVELS =====
const LEVELS=[
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

const GOAL_META={
  travel:{icon:'🌏',label:'Travel Abroad'},hsk:{icon:'📝',label:'HSK/Exam'},
  work:{icon:'💼',label:'Work/Career'},culture:{icon:'🎋',label:'Culture'},
  friends:{icon:'👥',label:'Make Friends'},fun:{icon:'🎉',label:'Just for Fun'},
};

const DAILY_QUOTES=[
  "千里之行，始于足下 — A journey begins with one step.",
  "学而时习之，不亦说乎 — Learning + practice = joy.",
  "坚持就是胜利 — Persistence is victory.",
  "每天进步一点点 — Small daily progress, big results.",
  "不积跬步，无以至千里 — Without small steps, no great journey.",
  "失败是成功之母 — Failure is the mother of success.",
  "学无止境 — Learning has no end.",
  "知识就是力量 — Knowledge is power.",
  "加油！每天学习，每天进步！— Keep going!",
  "语言是文化的钥匙 — Language is the key to culture.",
];

const MISSIONS_DEF=[
  {id:'cards10',icon:'📱',title:'Study 10 cards today',target:10,color:'accent',xp:50},
  {id:'quiz5',  icon:'🎯',title:'Answer 5 quiz questions',target:5,color:'green', xp:75},
  {id:'streak', icon:'🔥',title:'Maintain your streak',  target:1,color:'yellow',xp:30},
  {id:'save3',  icon:'🔖',title:'Save 3 cards',          target:3,color:'accent',xp:40},
];

// CARDS: zh=Chinese, en=English, vn=Vietnamese hint
const CARDS=[
  {type:'vocab',zh:'你好',pinyin:'nǐ hǎo',en:'Hello',vn:'Xin chào',tags:['HSK1','Greeting'],example:{zh:'你好！我叫小明。',pinyin:'Nǐ hǎo!',en:'Hello! My name is Xiaoming.'}},
  {type:'vocab',zh:'谢谢',pinyin:'xiè xiè',en:'Thank you',vn:'Cảm ơn',tags:['HSK1'],example:{zh:'谢谢你！',pinyin:'Xiè xiè nǐ!',en:'Thank you!'}},
  {type:'vocab',zh:'爱',pinyin:'ài',en:'Love',vn:'Yêu',tags:['HSK2'],example:{zh:'我爱学中文！',pinyin:'Wǒ ài xué Zhōngwén!',en:'I love learning Chinese!'}},
  {type:'vocab',zh:'朋友',pinyin:'péngyou',en:'Friend',vn:'Bạn bè',tags:['HSK1'],example:{zh:'他是我的好朋友。',pinyin:'Tā shì wǒ de hǎo péngyou.',en:'He is my good friend.'}},
  {type:'vocab',zh:'旅行',pinyin:'lǚxíng',en:'Travel',vn:'Du lịch',tags:['HSK3'],example:{zh:'我喜欢旅行！',pinyin:'Wǒ xǐhuān lǚxíng!',en:'I love to travel!'}},
  {type:'vocab',zh:'学习',pinyin:'xuéxí',en:'Study / Learn',vn:'Học tập',tags:['HSK1'],example:{zh:'每天学习很重要。',pinyin:'Měitiān xuéxí hěn zhòngyào.',en:'Studying every day is important.'}},
  {type:'vocab',zh:'快乐',pinyin:'kuàilè',en:'Happy',vn:'Hạnh phúc',tags:['HSK2'],example:{zh:'祝你天天快乐！',pinyin:'Zhù nǐ tiāntiān kuàilè!',en:'Wishing you happiness every day!'}},
  {type:'vocab',zh:'加油',pinyin:'jiā yóu',en:'Keep going!',vn:'Cố lên!',tags:['Motivation'],example:{zh:'加油！你可以的！',pinyin:'Jiāyóu! Nǐ kěyǐ de!',en:'You can do it!'}},
  {type:'vocab',zh:'梦想',pinyin:'mèngxiǎng',en:'Dream',vn:'Ước mơ',tags:['HSK3'],example:{zh:'你的梦想是什么？',pinyin:'Nǐ de mèngxiǎng shì shénme?',en:'What is your dream?'}},
  {type:'vocab',zh:'努力',pinyin:'nǔlì',en:'Work hard',vn:'Cố gắng',tags:['HSK2'],example:{zh:'努力就会成功！',pinyin:'Nǔlì jiù huì chénggōng!',en:'Work hard and you will succeed!'}},
  {type:'vocab',zh:'成功',pinyin:'chénggōng',en:'Success',vn:'Thành công',tags:['HSK3'],example:{zh:'坚持就是成功！',pinyin:'Jiānchí jiù shì chénggōng!',en:'Persistence is success!'}},
  {type:'vocab',zh:'世界',pinyin:'shìjiè',en:'World 🌍',vn:'Thế giới',tags:['HSK3'],example:{zh:'你好，世界！',pinyin:'Nǐ hǎo shìjiè!',en:'Hello, World!'}},
  {type:'vocab',zh:'语言',pinyin:'yǔyán',en:'Language',vn:'Ngôn ngữ',tags:['HSK3'],example:{zh:'学语言很有趣！',pinyin:'Xué yǔyán hěn yǒuqù!',en:'Learning languages is fun!'}},
  {type:'vocab',zh:'文化',pinyin:'wénhuà',en:'Culture',vn:'Văn hóa',tags:['HSK3'],example:{zh:'中国文化很丰富。',pinyin:'Zhōngguó wénhuà hěn fēngfù.',en:'Chinese culture is very rich.'}},
  {type:'vocab',zh:'时间',pinyin:'shíjiān',en:'Time',vn:'Thời gian',tags:['HSK2'],example:{zh:'时间就是金钱！',pinyin:'Shíjiān jiù shì jīnqián!',en:'Time is money!'}},
  {type:'vocab',zh:'漂亮',pinyin:'piàoliang',en:'Beautiful',vn:'Đẹp',tags:['HSK2'],example:{zh:'这里很漂亮！',pinyin:'Zhèlǐ hěn piàoliang!',en:'This place is beautiful!'}},
  {type:'vocab',zh:'幸福',pinyin:'xìngfú',en:'Happiness',vn:'Hạnh phúc',tags:['HSK3'],example:{zh:'愿你幸福！',pinyin:'Yuàn nǐ xìngfú!',en:'Wishing you happiness!'}},
  {type:'vocab',zh:'火锅',pinyin:'huǒguō',en:'Hot pot 🍲',vn:'Lẩu',tags:['Food'],example:{zh:'我最喜欢吃火锅！',pinyin:'Wǒ zuì xǐhuān chī huǒguō!',en:'I love hot pot the most!'}},
  {type:'vocab',zh:'茶',pinyin:'chá',en:'Tea 🍵',vn:'Trà',tags:['HSK1'],example:{zh:'请喝茶！',pinyin:'Qǐng hē chá!',en:'Please have some tea!'}},
  {type:'vocab',zh:'北京',pinyin:'Běijīng',en:'Beijing 🏙️',vn:'Bắc Kinh',tags:['HSK1'],example:{zh:'北京是中国的首都。',pinyin:'Běijīng shì shǒudū.',en:'Beijing is the capital.'}},
  {type:'culture',emoji:'🥢',title:'Chopstick Etiquette',body:'Never stick chopsticks upright in rice — it resembles funeral incense. Always lay them flat.',tip:'筷子 (kuàizi) = Chopsticks'},
  {type:'culture',emoji:'🧧',title:'Red Envelopes (红包)',body:'Digital red envelopes on WeChat are hugely popular. Billions are sent on Chinese New Year!',tip:'恭喜发财！= Wishing you wealth!'},
  {type:'culture',emoji:'🐉',title:'Dragon = Good Luck',body:'Chinese dragons symbolize GOOD luck and prosperity. They control rain and are celebrated!',tip:'龙 (lóng) = Dragon — fortune symbol!'},
  {type:'culture',emoji:'🍵',title:'Tea Culture (茶文化)',body:'China is the birthplace of tea! 绿茶 green, 红茶 black, 乌龙 oolong. Tea ceremonies are an art.',tip:'请喝茶！(Qǐng hē chá!) = Have some tea!'},
  {type:'grammar',emoji:'💡',title:'了 (le) = Done!',body:'了 marks a completed action:\n• 我吃了。— I ate.\n• 天黑了。— It got dark.\nThink of 了 as "finished!"',tip:'了 signals completion or state change'},
  {type:'grammar',emoji:'❓',title:'Questions with 吗',body:'Add 吗 to any statement for yes/no question:\n• 你好。→ 你好吗？(Are you well?)\n• 你学中文。→ 你学中文吗？',tip:'吗 = turns statement into question!'},
  {type:'grammar',emoji:'🎯',title:'比 (bǐ) = Comparison',body:'A 比 B + adjective = A is more than B:\n• 我比你高。— I\'m taller than you.\n• 今天比昨天好。— Today is better.',tip:'今天比昨天好！= Today > Yesterday'},
  {type:'travel',emoji:'✈️',title:'Airport Survival',body:'• 登机口在哪儿？— Where is the gate?\n• 我的行李在哪里？— Where is my luggage?\n• 不好意思！— Excuse me!',tip:'登机口 = Boarding gate'},
  {type:'travel',emoji:'🍜',title:'Order Food Like a Local',body:'• 我要这个！— I want this!\n• 不辣！— Not spicy!\n• 好吃！— Delicious!\n• 买单！— Check please!',tip:'有英文菜单吗？= English menu?'},
  {type:'travel',emoji:'🏯',title:'Must-Visit in China',body:'🏯 Great Wall — Beijing\n🐼 Panda Base — Chengdu\n🌊 West Lake — Hangzhou\n🌇 The Bund — Shanghai',tip:'长城 (Chángchéng) = The Great Wall'},
  {type:'phrase',zh:'没问题',pinyin:'méi wèntí',en:'No problem!',vn:'Không sao!',tags:['Daily'],example:{zh:'没问题！我来帮你！',pinyin:'Méi wèntí!',en:'No problem! I\'ll help!'}},
  {type:'phrase',zh:'随便',pinyin:'suíbiàn',en:'Whatever / Up to you',vn:'Tùy bạn',tags:['Daily'],example:{zh:'吃什么？随便！',pinyin:'Chī shénme? Suíbiàn!',en:'What to eat? Anything!'}},
  {type:'phrase',zh:'慢慢来',pinyin:'màn màn lái',en:'Take it slow',vn:'Từ từ thôi',tags:['Mindset'],example:{zh:'学语言慢慢来！',pinyin:'Xué yǔyán màn màn lái!',en:'Learn languages slowly!'}},
  {type:'phrase',zh:'一起加油',pinyin:'yīqǐ jiā yóu',en:"Let's keep going!",vn:'Cùng nhau cố lên!',tags:['Motivation'],example:{zh:'一起学习，一起加油！',pinyin:'Yīqǐ xuéxí, yīqǐ jiāyóu!',en:'Study together!'}},
];

const QUIZ_POOL=CARDS.filter(c=>c.type==='vocab'||c.type==='phrase');

// Mock buddies
const MOCK_BUDDIES=[
  {id:1,avatar:'👩',name:'Linh Nguyễn',city:'Ho Chi Minh City',district:'Quận 7',streak:12,xp:340,langs:['🇨🇳 ZH','🇯🇵 JA'],level:'Apprentice'},
  {id:2,avatar:'👨',name:'Minh Trần',city:'Ho Chi Minh City',district:'Bình Chánh',streak:25,xp:780,langs:['🇨🇳 ZH'],level:'Warrior'},
  {id:3,avatar:'🧑',name:'Thu Hà',city:'Hà Nội',district:'Cầu Giấy',streak:7,xp:190,langs:['🇨🇳 ZH','🇰🇷 KO'],level:'Explorer'},
  {id:4,avatar:'👩',name:'An Phạm',city:'Đà Nẵng',district:'',streak:3,xp:85,langs:['🇨🇳 ZH'],level:'Beginner'},
  {id:5,avatar:'👦',name:'Khoa Lê',city:'Ho Chi Minh City',district:'Quận 3',streak:18,xp:520,langs:['🇨🇳 ZH','🇬🇧 EN'],level:'Scholar'},
];
const STUDY_ROOMS=[
  {icon:'📖',name:'Morning Vocab Club',meta:'6:00–7:00 AM daily',online:14,live:true},
  {icon:'🎯',name:'HSK Challenge Room',meta:'Practice together',online:8,live:true},
  {icon:'✈️',name:'Travel Phrase Hub',meta:'Real-life conversations',online:5,live:false},
  {icon:'🎋',name:'Culture Corner',meta:'History & culture dives',online:3,live:false},
];

// ===== STATE =====
let totalXP=0,currentStreak=1,isAnimating=false,currentView='feed';
let cardsStudiedToday=0,quizAnsweredToday=0;
let liked=new Set(),saved=new Set(),connected=new Set();
let currentIndex=0,quizCards=[],quizIndex=0,quizScore=0,quizStreakQ=0,quizXPEarned=0,quizLangMode='zh';
// Language state
let nativeLang='vn',targetLangs=['zh'],activeTargetIdx=0;
// Modal state
let modalStep=1,selectedNative='',selectedTargets=[],selectedGoal='',selectedDays=0;
// User profile
let userGoal={type:'',days:0,pledge:'',city:'',district:'',name:'',nativeLang:'vn',targetLangs:['zh'],startDate:''};

// ===== INIT =====
function init(){
  loadStorage();spawnParticles();renderCurrentCard();
  initPointer();initWheel();initKeys();initQuiz();
  renderGoalBanner();updateDualModeBar();updateTopBarLang();
  if(!userGoal.type){setTimeout(()=>document.getElementById('goal-modal').classList.remove('hidden'),600);}
  else document.getElementById('goal-modal').classList.add('hidden');
}

// ===== PARTICLES =====
function spawnParticles(){
  const c=document.getElementById('particles');if(!c)return;
  ['#a78bfa','#38bdf8','#fb7185','#34d399','#fbbf24'].forEach(col=>{
    for(let j=0;j<3;j++){
      const p=document.createElement('div'),sz=2+Math.random()*4;p.className='particle';
      p.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;bottom:-10px;background:${col};animation-duration:${7+Math.random()*10}s;animation-delay:${Math.random()*12}s`;
      c.appendChild(p);}});
}

// ===== GOAL MODAL =====
function openGoalModal(){
  selectedNative=userGoal.nativeLang||'';
  selectedTargets=[...(userGoal.targetLangs||['zh'])];
  selectedGoal=userGoal.type||'';selectedDays=userGoal.days||0;
  modalStep=1;renderModalStep();
  document.getElementById('goal-modal').classList.remove('hidden');
  document.getElementById('buddy-name').value=userGoal.name||'';
  document.getElementById('buddy-city').value=userGoal.city||'';
  document.getElementById('buddy-district').value=userGoal.district||'';
  document.getElementById('pledge-text').value=userGoal.pledge||'';
  // Re-apply selections visually
  refreshNativeGrid();refreshTargetGrid();
  if(selectedGoal) document.querySelectorAll('.goal-btn').forEach(b=>b.classList.toggle('selected',b.dataset.goal===selectedGoal));
  if(selectedDays) document.querySelectorAll('.days-btn').forEach(b=>b.classList.toggle('selected',parseInt(b.dataset.days)===selectedDays));
}

function renderModalStep(){
  for(let i=1;i<=6;i++){const el=document.getElementById('mstep-'+i);if(el)el.classList.toggle('hidden',i!==modalStep);}
  document.querySelectorAll('.mdot').forEach((d,i)=>d.classList.toggle('active',i===modalStep-1));
  const back=document.getElementById('modal-back'),next=document.getElementById('modal-next');
  if(back)back.style.display=modalStep>1?'block':'none';
  if(next)next.textContent=modalStep===6?'🚀 Start Learning!':'Next →';
  if(modalStep===2)refreshTargetGrid();
}

function refreshNativeGrid(){
  document.querySelectorAll('.lang-pick-btn[data-code]').forEach(b=>{
    if(!b.closest('#mstep-1')) return;
    b.classList.toggle('selected',b.dataset.code===selectedNative);
  });
}

function refreshTargetGrid(){
  const grid=document.getElementById('target-lang-grid');if(!grid)return;
  grid.innerHTML=Object.entries(ALL_LANGS).filter(([code])=>code!==selectedNative).map(([code,l])=>{
    const selIdx=selectedTargets.indexOf(code);const isSel=selIdx>=0;const is2=selIdx===1;
    return `<button class="lang-pick-btn ${isSel?(is2?'selected-2':'selected'):''}" data-code="${code}" onclick="pickTarget(this)">
      ${l.flag}<span>${l.name}</span></button>`;
  }).join('');
  const tip=document.getElementById('dual-tip');
  if(tip)tip.style.display=selectedTargets.length===2?'block':'none';
}

function pickNative(btn){
  selectedNative=btn.dataset.code;selectedTargets=[];
  document.querySelectorAll('#mstep-1 .lang-pick-btn').forEach(b=>b.classList.toggle('selected',b.dataset.code===selectedNative));
}

function pickTarget(btn){
  const code=btn.dataset.code;
  const idx=selectedTargets.indexOf(code);
  if(idx>=0){selectedTargets.splice(idx,1);}
  else if(selectedTargets.length<2){selectedTargets.push(code);}
  else{showToast('Max 2 languages!');return;}
  refreshTargetGrid();
}

function pickGoal(btn){
  document.querySelectorAll('.goal-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');selectedGoal=btn.dataset.goal;
}

function pickDays(btn){
  document.querySelectorAll('.days-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');selectedDays=parseInt(btn.dataset.days);
}

function modalNext(){
  if(modalStep===1&&!selectedNative){showToast('Pick your strongest language!');return;}
  if(modalStep===2&&!selectedTargets.length){showToast('Pick at least 1 language to learn!');return;}
  if(modalStep===3&&!selectedGoal){showToast('Pick a goal!');return;}
  if(modalStep===4&&!selectedDays){showToast('Pick a deadline!');return;}
  if(modalStep===6){
    // Save all
    userGoal={type:selectedGoal,days:selectedDays,nativeLang:selectedNative,targetLangs:selectedTargets,
      name:document.getElementById('buddy-name').value.trim()||'Learner',
      city:document.getElementById('buddy-city').value.trim()||'',
      district:document.getElementById('buddy-district').value.trim()||'',
      pledge:document.getElementById('pledge-text').value.trim(),
      startDate:userGoal.startDate||new Date().toISOString()};
    nativeLang=selectedNative;targetLangs=selectedTargets;activeTargetIdx=0;
    saveStorage();
    document.getElementById('goal-modal').classList.add('hidden');
    renderGoalBanner();updateDualModeBar();updateTopBarLang();
    renderCurrentCard();showToast('🎯 Goal set! Let\'s go! 加油！');
    launchConfetti();addXP(25);return;
  }
  modalStep++;renderModalStep();
}

function modalBack(){if(modalStep<=1)return;modalStep--;renderModalStep();}

// ===== LANGUAGE HELPERS =====
function getNativeLang(){return ALL_LANGS[nativeLang]||ALL_LANGS.en;}
function getActiveLang(){return ALL_LANGS[targetLangs[activeTargetIdx]]||ALL_LANGS.zh;}

function updateTopBarLang(){
  const nl=getNativeLang(),al=getActiveLang();
  const ff=document.getElementById('lang-from-flag'),tf=document.getElementById('lang-to-flag');
  if(ff)ff.textContent=nl.flag;if(tf)tf.textContent=al.flag;
  const fd=document.getElementById('flip-dir'),ln=document.getElementById('lang-name');
  if(fd)fd.textContent=nl.short+' → '+al.short;
  if(ln)ln.textContent=al.name;
  // lang2 badge
  const b2=document.getElementById('lang2-badge'),f2=document.getElementById('lang2-flag');
  if(targetLangs.length===2){
    const other=ALL_LANGS[targetLangs[activeTargetIdx===0?1:0]];
    if(b2){b2.style.display='flex';}
    if(f2&&other)f2.textContent=other.flag;
  } else {if(b2)b2.style.display='none';}
}

function updateDualModeBar(){
  const bar=document.getElementById('dual-mode-bar');if(!bar)return;
  if(targetLangs.length<2){bar.style.display='none';return;}
  bar.style.display='flex';
  const nl=getNativeLang();
  const la=ALL_LANGS[targetLangs[0]],lb=ALL_LANGS[targetLangs[1]];
  const da=document.getElementById('dual-lang-a'),db=document.getElementById('dual-lang-b');
  if(da){da.textContent=nl.flag+'→'+la.flag+' '+la.short;da.classList.toggle('active',activeTargetIdx===0);}
  if(db){db.textContent=nl.flag+'→'+lb.flag+' '+lb.short;db.classList.toggle('active',activeTargetIdx===1);}
}

function cycleLang(){
  // If dual: switch between target lang A and B
  if(targetLangs.length===2){
    activeTargetIdx=activeTargetIdx===0?1:0;
  } else {
    // single target: flip direction (show target → native)
    const tmp=nativeLang; nativeLang=targetLangs[0]; targetLangs=[tmp];
  }
  updateTopBarLang();updateDualModeBar();renderCurrentCard();
  showToast('🔄 '+getNativeLang().flag+'→'+getActiveLang().flag);
}

function switchSecondLang(){
  if(targetLangs.length<2)return;
  activeTargetIdx=activeTargetIdx===0?1:0;
  updateTopBarLang();updateDualModeBar();renderCurrentCard();
}

// ===== CARD RENDERING =====
function renderCurrentCard(){
  const stack=document.getElementById('card-stack');if(!stack)return;
  stack.innerHTML='';const el=document.createElement('div');el.className='lcard current';
  el.innerHTML=buildCard(CARDS[currentIndex]);stack.appendChild(el);
  updateProgressLabel();updateSideButtons();
  // adjust lang-label-bar top based on goal-banner and dual-mode visibility
  const gb=document.getElementById('goal-banner'),dm=document.getElementById('dual-mode-bar');
  const lb=document.getElementById('lang-label-bar');
  let top=0;
  if(gb&&gb.style.display!=='none')top+=30;
  if(dm&&dm.style.display!=='none')top+=28;
  if(lb)lb.style.top=top+'px';
  if(stack)stack.style.top=(top+28)+'px';
}

function buildCard(d){
  if(!d)return '';
  const nl=getNativeLang(),tl=getActiveLang();
  const dirTag=`<div class="dir-tag">${nl.flag}→${tl.flag}</div>`;

  // Get native-lang hint for vocab/phrase cards
  function getNativeHint(card){
    if(nativeLang==='vn'&&card.vn)return `🇻🇳 ${card.vn}`;
    if(nativeLang==='zh'&&card.zh)return `🇨🇳 ${card.zh}`;
    if(nativeLang==='en'&&card.en)return `🇬🇧 ${card.en}`;
    return null;
  }

  // What to show as front (the target language)
  function getTargetDisplay(card){
    const tc=targetLangs[activeTargetIdx];
    if(tc==='zh')return{main:card.zh,cls:(card.zh&&card.zh.length>2)?'multi':'',pinyin:card.pinyin};
    if(tc==='en')return{main:card.en,cls:'roman',pinyin:''};
    return{main:card.zh,cls:'',pinyin:card.pinyin};
  }

  if(d.type==='vocab'||d.type==='phrase'){
    const hint=getNativeHint(d);
    const disp=getTargetDisplay(d);
    const meaning=nativeLang==='vn'&&d.vn?d.vn : nativeLang==='zh'&&d.zh?d.zh : d.en;
    return `<div class="card-inner"><div class="card-face">
      <span class="card-type-badge badge-${d.type==='phrase'?'phrase':'vocab'}">${d.type==='phrase'?'💬 Phrase':'📝 Vocab'}</span>
      ${dirTag}
      <div class="card-char ${disp.cls}">${disp.main}</div>
      ${disp.pinyin?`<div class="card-pinyin">${disp.pinyin}</div>`:''}
      ${hint?`<div class="card-native-hint">${hint}</div>`:''}
      <div class="card-english">${d.en}</div>
      ${d.example?`<div class="card-example"><div class="ex-zh">${d.example.zh}</div><div class="ex-pinyin">${d.example.pinyin}</div><div class="ex-en">${d.example.en}</div></div>`:''}
      <div class="card-tags">${(d.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
    </div></div>`;
  }
  return `<div class="card-inner"><div class="card-face">
    <span class="card-type-badge badge-${d.type}">${d.type==='culture'?'🌏 Culture':d.type==='grammar'?'📐 Grammar':'✈️ Travel'}</span>
    ${dirTag}
    <div class="card-emoji">${d.emoji}</div>
    <div class="card-title">${d.title}</div>
    <div class="card-body" style="white-space:pre-line">${d.body}</div>
    ${d.tip?`<div class="card-tip">💡 ${d.tip}</div>`:''}
  </div></div>`;
}

function updateProgressLabel(){const cp=document.getElementById('card-progress');if(cp)cp.textContent=`${currentIndex+1} / ${CARDS.length}`;}
function updateSideButtons(){
  const li=document.getElementById('like-icon'),lc=document.getElementById('like-count'),si=document.getElementById('save-icon');
  if(li)li.textContent=liked.has(currentIndex)?'❤️':'🤍';if(lc)lc.textContent=liked.size;
  if(si)si.textContent=saved.has(currentIndex)?'🔖✅':'🔖';
}

// ===== NAVIGATION =====
function goNext(){
  if(isAnimating)return;
  // In dual mode, alternate target lang automatically every 5 cards
  if(targetLangs.length===2&&currentIndex>0&&(currentIndex+1)%5===0){
    activeTargetIdx=activeTargetIdx===0?1:0;updateTopBarLang();updateDualModeBar();
  }
  if(currentIndex>=CARDS.length-1){showToast('🎉 All done!');launchConfetti();currentIndex=0;renderCurrentCard();return;}
  animateCard('up');
}
function goPrev(){if(isAnimating||currentIndex<=0)return;animateCard('down');}

function animateCard(dir){
  isAnimating=true;const stack=document.getElementById('card-stack'),cur=stack?.querySelector('.lcard.current');
  if(!cur){isAnimating=false;return;}
  cur.style.transition='transform .42s cubic-bezier(.25,.46,.45,.94),opacity .32s ease';
  cur.style.transform=dir==='up'?'translateY(-115%)':'translateY(115%)';cur.style.opacity='0';
  dir==='up'?currentIndex++:currentIndex--;
  addXP(10);showXPBurst('+10 XP ⭐');cardsStudiedToday++;markTodayStudied();updateMissions();saveStorage();
  const nxt=document.createElement('div');nxt.className='lcard';nxt.innerHTML=buildCard(CARDS[currentIndex]);
  nxt.style.transform=dir==='up'?'translateY(115%)':'translateY(-115%)';nxt.style.opacity='0';
  stack.appendChild(nxt);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    nxt.style.transition='transform .42s cubic-bezier(.25,.46,.45,.94),opacity .32s ease';
    nxt.style.transform='translateY(0)';nxt.style.opacity='1';
  }));
  setTimeout(()=>{cur.remove();nxt.classList.add('current');updateProgressLabel();updateSideButtons();isAnimating=false;},440);
}

// Pointer/wheel/keys
function initPointer(){
  const s=document.getElementById('card-stack');if(!s)return;
  let sy=0,sx=0,mv=false;
  s.addEventListener('pointerdown',e=>{sy=e.clientY;sx=e.clientX;mv=false;s.setPointerCapture(e.pointerId);});
  s.addEventListener('pointermove',e=>{if(Math.abs(e.clientY-sy)>8)mv=true;});
  s.addEventListener('pointerup',e=>{if(!mv)return;const dy=sy-e.clientY,dx=Math.abs(sx-e.clientX);if(Math.abs(dy)>40&&Math.abs(dy)>dx)dy>0?goNext():goPrev();mv=false;});
}
function initWheel(){let last=0;document.addEventListener('wheel',e=>{if(currentView!=='feed')return;const n=Date.now();if(n-last<650)return;last=n;e.preventDefault();e.deltaY>0?goNext():goPrev();},{passive:false});}
function initKeys(){document.addEventListener('keydown',e=>{if(currentView!=='feed')return;if(e.key==='ArrowDown'||e.key===' '){e.preventDefault();goNext();}if(e.key==='ArrowUp'){e.preventDefault();goPrev();}if(e.key==='l')toggleLike();if(e.key==='s')toggleSave();if(e.key==='p')speakCurrent();});}

// ===== ACTIONS =====
function toggleLike(){
  const icon=document.getElementById('like-icon'),ct=document.getElementById('like-count');
  if(liked.has(currentIndex)){liked.delete(currentIndex);if(icon)icon.textContent='🤍';}
  else{liked.add(currentIndex);if(icon){icon.textContent='❤️';icon.classList.add('like-pop');setTimeout(()=>icon.classList.remove('like-pop'),400);}addXP(5);showXPBurst('+5 XP ❤️');floatEmoji('❤️');}
  if(ct)ct.textContent=liked.size;
}
function toggleSave(){
  const icon=document.getElementById('save-icon');
  if(saved.has(currentIndex)){saved.delete(currentIndex);if(icon)icon.textContent='🔖';showToast('Removed');}
  else{saved.add(currentIndex);if(icon)icon.textContent='🔖✅';addXP(5);showXPBurst('+5 XP 🔖');floatEmoji('🔖');showToast('✅ Saved!');}
  updateMissions();saveStorage();
}
function speakCurrent(){const c=CARDS[currentIndex];if(!c?.zh)return;const u=new SpeechSynthesisUtterance(c.zh);u.lang='zh-CN';u.rate=0.8;window.speechSynthesis.speak(u);floatEmoji('🔊');}
function shareCard(){const c=CARDS[currentIndex];const t=c.zh?`🀄 levAIup: ${c.zh} (${c.pinyin||''}) = "${c.en}"\n→ https://manhcuongk55.github.io/Chinese-level-up-tips/app/`:`🀄 levAIup: ${c.title||'Learn Languages!'}\n→ https://manhcuongk55.github.io/Chinese-level-up-tips/app/`;if(navigator.share)navigator.share({text:t});else if(navigator.clipboard)navigator.clipboard.writeText(t).then(()=>showToast('📋 Copied!'));}

// ===== QUIZ =====
function setQuizLang(m){quizLangMode=m;document.querySelectorAll('.lang-pill').forEach(b=>b.classList.remove('active'));const el=document.getElementById('qlang-'+m);if(el)el.classList.add('active');initQuiz();}
function initQuiz(){quizCards=[...QUIZ_POOL].sort(()=>Math.random()-.5).slice(0,10);quizIndex=0;quizScore=0;quizStreakQ=0;quizXPEarned=0;document.getElementById('qtotal').textContent=quizCards.length;renderQuizCard();}
function renderQuizCard(){
  if(quizIndex>=quizCards.length){showQuizResults();return;}
  const card=quizCards[quizIndex],qEl=document.getElementById('quiz-q'),hEl=document.getElementById('quiz-hint');
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
function answerQ(chosen,correct,btn){
  document.querySelectorAll('.quiz-opt').forEach(b=>b.disabled=true);
  if(chosen===correct){btn.classList.add('correct');quizScore+=10;quizStreakQ++;quizXPEarned+=15;addXP(15);showXPBurst('+15 XP ✅');launchConfetti();quizAnsweredToday++;}
  else{btn.classList.add('wrong');quizStreakQ=0;document.querySelectorAll('.quiz-opt').forEach(b=>{if(b.textContent.trim()===correct)b.classList.add('correct');});}
  document.getElementById('qs-score').textContent=quizScore;document.getElementById('qs-streak').textContent=quizStreakQ+'🔥';document.getElementById('qs-xp').textContent=quizXPEarned+'⭐';
  updateMissions();setTimeout(()=>{quizIndex++;renderQuizCard();},1100);
}
function showQuizResults(){
  const pct=Math.round((quizScore/(quizCards.length*10))*100);
  const medal=pct>=90?'🏆':pct>=70?'🥇':pct>=50?'🥈':'💪';launchConfetti();
  document.getElementById('quiz-card').innerHTML=`<div style="text-align:center;padding:14px 8px"><div style="font-size:58px;margin-bottom:10px">${medal}</div><div style="font-size:30px;font-weight:900;color:#a78bfa;margin-bottom:4px">${quizScore} pts</div><div style="font-size:12px;color:rgba(241,245,249,.5);margin-bottom:6px">${pct}% accuracy</div><div style="font-size:12px;color:#fbbf24;font-weight:800;margin-bottom:18px">+${quizXPEarned} XP earned!</div><button onclick="initQuiz()" style="background:rgba(167,139,250,.2);border:1.5px solid rgba(167,139,250,.5);color:#a78bfa;padding:11px 28px;border-radius:16px;font-size:13px;font-weight:800;cursor:pointer;font-family:Inter,sans-serif">🔄 Play Again</button></div>`;
}

// ===== GOAL BANNER (in Feed) =====
function renderGoalBanner(){
  const banner=document.getElementById('goal-banner');if(!banner||!userGoal.type)return;
  banner.style.display='flex';
  const meta=GOAL_META[userGoal.type]||{};
  const elapsed=Math.floor((Date.now()-new Date(userGoal.startDate))/86400000);
  const remaining=Math.max(0,userGoal.days-elapsed);
  const pct=Math.min(100,Math.round((elapsed/userGoal.days)*100));
  document.getElementById('goal-banner-text').textContent=`${meta.icon} ${remaining}d left · ${pct}%`;
  document.getElementById('goal-banner-quote').textContent=DAILY_QUOTES[new Date().getDate()%DAILY_QUOTES.length];
}

// ===== PROFILE =====
function renderProfileGoalCard(){
  if(!userGoal.type)return;
  const meta=GOAL_META[userGoal.type]||{};
  const elapsed=Math.floor((Date.now()-new Date(userGoal.startDate||Date.now()))/86400000);
  const remaining=Math.max(0,userGoal.days-elapsed);
  const pct=Math.min(100,Math.round((elapsed/userGoal.days)*100));
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  const setW=(id,w)=>{const el=document.getElementById(id);if(el)el.style.width=w+'%';};
  set('gc-icon',meta.icon||'🎯');set('gc-title',meta.label||'My Goal');
  set('gc-days',`${remaining} days remaining · ${userGoal.days}d goal`);setW('gc-fill',pct);
  const pledge=document.getElementById('gc-pledge');if(pledge)pledge.textContent=userGoal.pledge?`"${userGoal.pledge}"` :'';
  // Language path
  const lp=document.getElementById('lang-path');
  if(lp&&userGoal.nativeLang&&userGoal.targetLangs?.length){
    const nl=ALL_LANGS[userGoal.nativeLang]||{flag:'?',name:'?',short:'?'};
    const items=userGoal.targetLangs.map(code=>{const tl=ALL_LANGS[code]||{flag:'?',short:'?'};return `<span class="lp-item">${nl.flag}${nl.short}<span class="lp-arrow">→</span>${tl.flag}${tl.short}</span>`;}).join('');
    const dual=userGoal.targetLangs.length===2?'<span class="lp-dual">✨ Dual Mode</span>':'';
    lp.innerHTML=items+dual;
  }
}

// ===== COMMUNITY =====
function renderCommunity(){
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  set('your-name-display',userGoal.name||'Anonymous');
  const nl=ALL_LANGS[userGoal.nativeLang]||{flag:'',short:''};
  const tls=(userGoal.targetLangs||[]).map(c=>ALL_LANGS[c]?.flag||c).join('+');
  const goalDisplay=userGoal.type?`${GOAL_META[userGoal.type]?.icon} ${nl.flag}→${tls}`:'Set a goal to connect';
  set('your-goal-display',goalDisplay);set('comm-streak',currentStreak);set('comm-xp',totalXP);
  const myCity=(userGoal.city||'').toLowerCase();
  const lbl=document.getElementById('comm-location-label');if(lbl)lbl.textContent=`📍 ${userGoal.city||'Set location'} ${userGoal.district?'· '+userGoal.district:''}`;
  const list=document.getElementById('buddy-list');if(!list)return;
  list.innerHTML=[...MOCK_BUDDIES].sort((a,b)=>{const am=myCity&&a.city.toLowerCase().includes(myCity.split(' ')[0]||'')?1:0;const bm=myCity&&b.city.toLowerCase().includes(myCity.split(' ')[0]||'')?1:0;return bm-am||b.streak-a.streak;}).map(b=>{
    const isConn=connected.has(b.id);const prox=myCity&&b.city.toLowerCase().includes(myCity.split(' ')[0]||'')?'📍 Same city · ':'';
    return `<div class="buddy-card"><div class="buddy-avatar">${b.avatar}</div><div class="buddy-info"><div class="buddy-name">${b.name}</div><div class="buddy-meta">${prox}${b.city}${b.district?' · '+b.district:''} · 🔥${b.streak} · ⭐${b.xp}</div><div class="buddy-tags">${b.langs.map(l=>`<span class="buddy-tag">${l}</span>`).join('')}<span class="buddy-tag">${b.level}</span></div></div><button class="buddy-connect ${isConn?'connected':''}" onclick="connectBuddy(${b.id},this)">${isConn?'✓ Connected':'Connect'}</button></div>`;
  }).join('');
  const rooms=document.getElementById('rooms-list');
  if(rooms)rooms.innerHTML=STUDY_ROOMS.map(r=>`<div class="room-card"><div class="room-icon">${r.icon}</div><div class="room-info"><div class="room-name">${r.name}</div><div class="room-meta">${r.meta}</div></div><div class="room-live">${r.live?`<div class="live-dot"></div><span style="color:var(--green)">${r.online}</span>`:`<span style="color:var(--muted)">${r.online}</span>`}</div><button class="room-join" onclick="joinRoom('${r.name}')">Join</button></div>`).join('');
}
function connectBuddy(id,btn){if(connected.has(id)){connected.delete(id);btn.className='buddy-connect';btn.textContent='Connect';showToast('Disconnected');}else{connected.add(id);btn.className='buddy-connect connected';btn.textContent='✓ Connected';addXP(10);showXPBurst('+10 XP 🤝');floatEmoji('🤝');showToast('🤝 Connected!');}}
function joinRoom(name){showToast('🏠 Joining "'+name+'"...');addXP(5);showXPBurst('+5 XP 🏠');floatEmoji('🏠');}

// ===== STUDY CALENDAR =====
function renderStudyCalendar(){
  const wrap=document.getElementById('study-calendar');if(!wrap)return;
  const days=JSON.parse(localStorage.getItem('levelai_studydays')||'[]');
  const today=new Date();wrap.innerHTML='';
  for(let i=27;i>=0;i--){const d=new Date(today);d.setDate(today.getDate()-i);const key=d.toDateString();
    const div=document.createElement('div');div.className=`cal-day${days.includes(key)?' studied':''}${i===0?' today':''}`;div.textContent=d.getDate();wrap.appendChild(div);}
}
function markTodayStudied(){const k=new Date().toDateString();const d=JSON.parse(localStorage.getItem('levelai_studydays')||'[]');if(!d.includes(k)){d.push(k);localStorage.setItem('levelai_studydays',JSON.stringify(d));}}

// ===== MISSIONS =====
function updateMissions(){
  const list=document.getElementById('missions-list');if(!list)return;
  list.innerHTML=MISSIONS_DEF.map(m=>{
    let prog=0;if(m.id==='cards10')prog=Math.min(m.target,cardsStudiedToday);if(m.id==='quiz5')prog=Math.min(m.target,quizAnsweredToday);if(m.id==='streak')prog=Math.min(m.target,currentStreak>0?1:0);if(m.id==='save3')prog=Math.min(m.target,saved.size);
    const done=prog>=m.target,pct=Math.round((prog/m.target)*100);
    return `<div class="mission-item ${done?'done':''}"><div class="mission-icon">${done?'✅':m.icon}</div><div class="mission-info"><div class="mission-title">${m.title}</div><div class="mission-bar-wrap"><div class="mission-bar"><div class="mission-fill ${m.color}" style="width:${pct}%"></div></div><div class="mission-txt">${prog}/${m.target}</div></div></div><div class="mission-xp">+${m.xp}</div></div>`;
  }).join('');
}

// ===== XP & LEVELS =====
function getLvl(){return LEVELS.slice().reverse().find(l=>totalXP>=l.min)||LEVELS[0];}
function updateXPBar(){
  const lvl=getLvl(),next=LEVELS[lvl.lvl]||LEVELS[LEVELS.length-1];
  const inLvl=totalXP-lvl.min,needed=next.min-lvl.min,pct=Math.min(100,Math.round((inLvl/needed)*100));
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  const setW=(id,w)=>{const el=document.getElementById(id);if(el)el.style.width=w+'%';};
  set('xp-level-label',`Lv.${lvl.lvl}·${lvl.name}`);setW('xp-fill',pct);set('xp-val',`${totalXP}/${next.min}XP`);
  set('level-badge',lvl.badge);set('level-name',lvl.name);set('level-num',`Level ${lvl.lvl}`);setW('level-fill',pct);set('level-xp-txt',`${inLvl}/${needed} XP → Lv.${lvl.lvl+1}`);set('st-xp',totalXP);
}
function addXP(amt){
  const prev=getLvl().lvl;totalXP+=amt;const newLvl=getLvl();updateXPBar();
  if(newLvl.lvl>prev){launchConfetti();showToast(`🎉 LEVEL UP! ${newLvl.badge} ${newLvl.name}!`);showXPBurst(`🎉 Lv.${newLvl.lvl}!`);}
  if(totalXP%100===0&&totalXP>0)showToast(`⭐ ${totalXP} XP milestone!`);
}

// ===== STORAGE =====
function loadStorage(){
  const d=JSON.parse(localStorage.getItem('levelai_v5')||'{}');
  const today=new Date().toDateString();
  totalXP=d.xp||0;
  const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);
  if(d.lastDate===today){currentStreak=d.streak||1;cardsStudiedToday=d.cardsToday||0;quizAnsweredToday=d.quizToday||0;}
  else if(d.lastDate===yesterday.toDateString()){currentStreak=(d.streak||0)+1;}
  else{currentStreak=1;}
  if(d.goal){userGoal=d.goal;nativeLang=d.goal.nativeLang||'vn';targetLangs=d.goal.targetLangs||['zh'];}
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  set('streak-count',currentStreak);set('st-streak',currentStreak);set('st-cards',cardsStudiedToday);set('st-saved',saved.size);
  updateXPBar();renderProfileGoalCard();saveStorage();
}
function saveStorage(){localStorage.setItem('levelai_v5',JSON.stringify({xp:totalXP,streak:currentStreak,lastDate:new Date().toDateString(),cardsToday:cardsStudiedToday,quizToday:quizAnsweredToday,goal:userGoal}));}

// ===== TABS =====
function switchTab(tab){
  currentView=tab;document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  const v=document.getElementById('view-'+tab);if(v)v.classList.add('active');
  ['feed','quiz','community','profile'].forEach(t=>{const tb=document.getElementById('tab-'+t),nb=document.getElementById('nav-'+t);if(tb)tb.classList.toggle('active',t===tab);if(nb)nb.classList.toggle('active',t===tab);});
  if(tab==='profile'){updateMissions();renderStudyCalendar();renderProfileGoalCard();updateXPBar();const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};set('st-streak',currentStreak);set('st-cards',cardsStudiedToday);set('st-saved',saved.size);}
  if(tab==='quiz')initQuiz();if(tab==='community')renderCommunity();
}

// ===== EFFECTS =====
function showXPBurst(msg){const p=document.getElementById('xp-popup');if(!p)return;p.textContent=msg;p.classList.remove('burst');void p.offsetWidth;p.classList.add('burst');}
function launchConfetti(){const c=document.getElementById('confetti-container');if(!c)return;const cols=['#a78bfa','#38bdf8','#fb7185','#34d399','#fbbf24','#fff'];for(let i=0;i<35;i++){const p=document.createElement('div');p.className='confetti-piece';p.style.cssText=`left:${Math.random()*100}%;top:-10px;background:${cols[Math.floor(Math.random()*cols.length)]};width:${6+Math.random()*10}px;height:${6+Math.random()*10}px;border-radius:${Math.random()>.5?'50%':'2px'};animation-duration:${1.5+Math.random()*2}s;animation-delay:${Math.random()*.5}s;transform:translateX(${(Math.random()-.5)*200}px)`;c.appendChild(p);setTimeout(()=>p.remove(),3500);}}
function floatEmoji(e){const el=document.createElement('div');el.className='float-emoji';el.textContent=e;el.style.left=(30+Math.random()*40)+'%';el.style.bottom='120px';document.body.appendChild(el);setTimeout(()=>el.remove(),900);}
function showToast(msg){const t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200);}

document.addEventListener('DOMContentLoaded',init);
