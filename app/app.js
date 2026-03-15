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
  {type:'vocab',zh:'你好',pinyin:'nǐ hǎo',en:'Hello',vn:'Xin chào',tags:['HSK1','Greeting'],
   emoji:'👋😊',mnemonic:'Nỉ hảo — nghe như "Nì hả?" khi gặp bạn lâu không gặp!',
   example:{zh:'你好！我叫小明。',pinyin:'Nǐ hǎo!',en:'Hello! My name is Xiaoming.'}},
  {type:'vocab',zh:'谢谢',pinyin:'xiè xiè',en:'Thank you',vn:'Cảm ơn',tags:['HSK1'],
   emoji:'🙏💖',mnemonic:'"Shiê shiê" — tưởng tượng bạn cúi đầu 2 lần cảm ơn xia xia!',
   example:{zh:'谢谢你！',pinyin:'Xiè xiè nǐ!',en:'Thank you!'}},
  {type:'vocab',zh:'爱',pinyin:'ài',en:'Love',vn:'Yêu',tags:['HSK2'],
   emoji:'❤️🥰',mnemonic:'"Ài" — nghe như "ái" tiếng Việt khi bị bắn trúng tim bởi Cupid!',
   example:{zh:'我爱学中文！',pinyin:'Wǒ ài xué Zhōngwén!',en:'I love learning Chinese!'}},
  {type:'vocab',zh:'朋友',pinyin:'péngyou',en:'Friend',vn:'Bạn bè',tags:['HSK1'],
   emoji:'🤝😄',mnemonic:'"Pứng yêu" — bạn bè là người mình... "pứng" nhau mọi lúc!',
   example:{zh:'他是我的好朋友。',pinyin:'Tā shì wǒ de hǎo péngyou.',en:'He is my good friend.'}},
  {type:'vocab',zh:'旅行',pinyin:'lǚxíng',en:'Travel',vn:'Du lịch',tags:['HSK3'],
   emoji:'✈️🌏',mnemonic:'"Lữ hành" — nghe y như "lữ hành" tiếng Việt! Cùng gốc Hán luôn!',
   example:{zh:'我喜欢旅行！',pinyin:'Wǒ xǐhuān lǚxíng!',en:'I love to travel!'}},
  {type:'vocab',zh:'学习',pinyin:'xuéxí',en:'Study / Learn',vn:'Học tập',tags:['HSK1'],
   emoji:'📚🧠',mnemonic:'"Xuê sí" — học nhiều quá "sí" (sặc) mà vẫn phải học tiếp!',
   example:{zh:'每天学习很重要。',pinyin:'Měitiān xuéxí hěn zhòngyào.',en:'Studying every day is important.'}},
  {type:'vocab',zh:'快乐',pinyin:'kuàilè',en:'Happy',vn:'Hạnh phúc',tags:['HSK2'],
   emoji:'🎉😁',mnemonic:'"Khoái lạc" — nghe như "khoái lắc" đầu vì quá vui!',
   example:{zh:'祝你天天快乐！',pinyin:'Zhù nǐ tiāntiān kuàilè!',en:'Wishing you happiness every day!'}},
  {type:'vocab',zh:'加油',pinyin:'jiā yóu',en:'Keep going!',vn:'Cố lên!',tags:['Motivation'],
   emoji:'⛽💪',mnemonic:'"Gia dầu" = đổ dầu (xăng) vào — thêm năng lượng để chiến tiếp!',
   example:{zh:'加油！你可以的！',pinyin:'Jiāyóu! Nǐ kěyǐ de!',en:'You can do it!'}},
  {type:'vocab',zh:'梦想',pinyin:'mèngxiǎng',en:'Dream',vn:'Ước mơ',tags:['HSK3'],
   emoji:'🌙✨',mnemonic:'"Mừng tưởng" — khi mơ thấy điều mình mong, ta mừng vì tưởng thật!',
   example:{zh:'你的梦想是什么？',pinyin:'Nǐ de mèngxiǎng shì shénme?',en:'What is your dream?'}},
  {type:'vocab',zh:'努力',pinyin:'nǔlì',en:'Work hard',vn:'Cố gắng',tags:['HSK2'],
   emoji:'💪🔥',mnemonic:'"Nỗ lực" — Hán Việt là NỖ LỰC! Cùng ý nghĩa luôn! Siêu dễ!',
   example:{zh:'努力就会成功！',pinyin:'Nǔlì jiù huì chénggōng!',en:'Work hard and you will succeed!'}},
  {type:'vocab',zh:'成功',pinyin:'chénggōng',en:'Success',vn:'Thành công',tags:['HSK3'],
   emoji:'🏆🎯',mnemonic:'"Thành công" — Hán Việt hoàn toàn! Nghe là nhớ ngay!',
   example:{zh:'坚持就是成功！',pinyin:'Jiānchí jiù shì chénggōng!',en:'Persistence is success!'}},
  {type:'vocab',zh:'世界',pinyin:'shìjiè',en:'World 🌍',vn:'Thế giới',tags:['HSK3'],
   emoji:'🌍🌐',mnemonic:'"Thế giới" — Hán Việt! Đọc "shi-jiê" nghe như "xì-giới" — thế giới!',
   example:{zh:'你好，世界！',pinyin:'Nǐ hǎo shìjiè!',en:'Hello, World!'}},
  {type:'vocab',zh:'语言',pinyin:'yǔyán',en:'Language',vn:'Ngôn ngữ',tags:['HSK3'],
   emoji:'💬🗣️',mnemonic:'"Dũ ngôn" — như "dư ngôn" — nói nhiều đến dư lời luôn!',
   example:{zh:'学语言很有趣！',pinyin:'Xué yǔyán hěn yǒuqù!',en:'Learning languages is fun!'}},
  {type:'vocab',zh:'文化',pinyin:'wénhuà',en:'Culture',vn:'Văn hóa',tags:['HSK3'],
   emoji:'🎨🏛️',mnemonic:'"Văn hóa" — Hán Việt chuẩn! Văn = văn chương, Hóa = biến đổi!',
   example:{zh:'中国文化很丰富。',pinyin:'Zhōngguó wénhuà hěn fēngfù.',en:'Chinese culture is very rich.'}},
  {type:'vocab',zh:'时间',pinyin:'shíjiān',en:'Time',vn:'Thời gian',tags:['HSK2'],
   emoji:'⏰⌛',mnemonic:'"Thời gian" — Hán Việt! Đọc "shi-jiên" — nghe như "xì giẻn" (xé giẻ thời gian)!',
   example:{zh:'时间就是金钱！',pinyin:'Shíjiān jiù shì jīnqián!',en:'Time is money!'}},
  {type:'vocab',zh:'漂亮',pinyin:'piàoliang',en:'Beautiful',vn:'Đẹp',tags:['HSK2'],
   emoji:'😍✨',mnemonic:'"Phiếu lương" — đẹp đến mức xem phiếu lương cũng thấy đẹp!',
   example:{zh:'这里很漂亮！',pinyin:'Zhèlǐ hěn piàoliang!',en:'This place is beautiful!'}},
  {type:'vocab',zh:'幸福',pinyin:'xìngfú',en:'Happiness',vn:'Hạnh phúc',tags:['HSK3'],
   emoji:'🌸💛',mnemonic:'"Hạnh phúc" — Hán Việt! Xìng = hạnh, Fú = phúc. Quá quen!',
   example:{zh:'愿你幸福！',pinyin:'Yuàn nǐ xìngfú!',en:'Wishing you happiness!'}},
  {type:'vocab',zh:'火锅',pinyin:'huǒguō',en:'Hot pot 🍲',vn:'Lẩu',tags:['Food'],
   emoji:'🍲🔥',mnemonic:'"Hỏa quốc" = nồi lửa! Huǒ=lửa, Guō=nồi — nồi lửa chính là LẨU!',
   example:{zh:'我最喜欢吃火锅！',pinyin:'Wǒ zuì xǐhuān chī huǒguō!',en:'I love hot pot the most!'}},
  {type:'vocab',zh:'茶',pinyin:'chá',en:'Tea 🍵',vn:'Trà',tags:['HSK1'],
   emoji:'🍵🌿',mnemonic:'"Chá" — nghe như "chà" tiếng Việt! Chà, uống trà đi!',
   example:{zh:'请喝茶！',pinyin:'Qǐng hē chá!',en:'Please have some tea!'}},
  {type:'vocab',zh:'北京',pinyin:'Běijīng',en:'Beijing 🏙️',vn:'Bắc Kinh',tags:['HSK1'],
   emoji:'🏙️🏯',mnemonic:'"Bắc Kinh" — Hán Việt! Bắc = phương bắc, Kinh = kinh đô. Kinh đô phía Bắc!',
   example:{zh:'北京是中国的首都。',pinyin:'Běijīng shì shǒudū.',en:'Beijing is the capital.'}},
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
  {type:'phrase',zh:'没问题',pinyin:'méi wèntí',en:'No problem!',vn:'Không sao!',tags:['Daily'],
   emoji:'✌️😎',mnemonic:'"Mấy vấn đề" — không có vấn đề gì cả! Méi = không, Wèntí = vấn đề!',
   example:{zh:'没问题！我来帮你！',pinyin:'Méi wèntí!',en:'No problem! I\'ll help!'}},
  {type:'phrase',zh:'随便',pinyin:'suíbiàn',en:'Whatever / Up to you',vn:'Tùy bạn',tags:['Daily'],
   emoji:'🤷😌',mnemonic:'"Suỳ biến" — tùy bạn biến tấu sao cũng được, mình không ý kiến!',
   example:{zh:'吃什么？随便！',pinyin:'Chī shénme? Suíbiàn!',en:'What to eat? Anything!'}},
  {type:'phrase',zh:'慢慢来',pinyin:'màn màn lái',en:'Take it slow',vn:'Từ từ thôi',tags:['Mindset'],
   emoji:'🐢💆',mnemonic:'"Mãn mãn lai" — từ từ đến, như rùa mà vẫn thắng đích!',
   example:{zh:'学语言慢慢来！',pinyin:'Xué yǔyán màn màn lái!',en:'Learn languages slowly!'}},
  {type:'phrase',zh:'一起加油',pinyin:'yīqǐ jiā yóu',en:"Let's keep going!",vn:'Cùng nhau cố lên!',tags:['Motivation'],
   emoji:'🤜🤛⚡',mnemonic:'"Nhất khởi gia dầu" — cùng nhau đổ xăng cùng tiến!',
   example:{zh:'一起学习，一起加油！',pinyin:'Yīqǐ xuéxí, yīqǐ jiāyóu!',en:'Study together!'}},

  // ===== STORY CARDS — Learn like watching a movie 🎬 =====
  {type:'story',scene:'☕ At the Café',vn:'Tại quán cà phê',setting:'You\'re ordering at a Chinese café for the first time!',
    lines:[
      {speaker:'Waiter 服务员',zh:'您好！请问您要什么？',pinyin:'Nín hǎo! Qǐngwèn nín yào shénme?',en:'Hello! What would you like?'},
      {speaker:'You 你',zh:'我要一杯咖啡，谢谢！',pinyin:'Wǒ yào yī bēi kāfēi, xiè xiè!',en:'I\'d like a coffee, thank you!'},
      {speaker:'Waiter 服务员',zh:'大杯还是小杯？',pinyin:'Dà bēi hái shì xiǎo bēi?',en:'Large or small?'},
      {speaker:'You 你',zh:'大杯！多少钱？',pinyin:'Dà bēi! Duōshǎo qián?',en:'Large! How much?'},
    ],
    vocab:['您好 (nín hǎo) = polite hello','要 (yào) = want/would like','多少钱 = how much?'],
    tags:['Daily','Food','Beginner']},
  {type:'story',scene:'✈️ At the Airport',vn:'Tại sân bay',setting:'Arriving in China — you need to find your hotel!',
    lines:[
      {speaker:'You 你',zh:'请问，去市中心怎么走？',pinyin:'Qǐngwèn, qù shìzhōngxīn zěnme zǒu?',en:'Excuse me, how do I get to downtown?'},
      {speaker:'Local 当地人',zh:'坐地铁，十分钟就到。',pinyin:'Zuò dìtiě, shí fēnzhōng jiù dào.',en:'Take the subway, just 10 minutes.'},
      {speaker:'You 你',zh:'地铁站在哪里？',pinyin:'Dìtiě zhàn zài nǎlǐ?',en:'Where is the subway station?'},
      {speaker:'Local 当地人',zh:'在那里！往右走。',pinyin:'Zài nàlǐ! Wǎng yòu zǒu.',en:'Over there! Turn right.'},
    ],
    vocab:['请问 = Excuse me / May I ask','怎么走 = how to get to','地铁 (dìtiě) = subway'],
    tags:['Travel','Getting Around']},
  {type:'story',scene:'🛒 At the Market',vn:'Tại chợ',setting:'Bargaining at a local Chinese market — like a pro!',
    lines:[
      {speaker:'Seller 商家',zh:'你好！买什么？',pinyin:'Nǐ hǎo! Mǎi shénme?',en:'Hello! What are you buying?'},
      {speaker:'You 你',zh:'这个多少钱？',pinyin:'Zhège duōshǎo qián?',en:'How much is this?'},
      {speaker:'Seller 商家',zh:'五十块。',pinyin:'Wǔshí kuài.',en:'Fifty yuan.'},
      {speaker:'You 你',zh:'太贵了！三十块可以吗？',pinyin:'Tài guì le! Sānshí kuài kěyǐ ma?',en:'Too expensive! Can you do 30 yuan?'},
    ],
    vocab:['太贵了 (tài guì le) = too expensive!','可以吗 = is it okay? / can we?','块 (kuài) = yuan (informal)'],
    tags:['Travel','Shopping','Bargaining']},
  {type:'story',scene:'👋 Making a New Friend',vn:'Kết bạn mới',setting:'You meet someone at a language exchange event!',
    lines:[
      {speaker:'New friend',zh:'你好！你是哪里人？',pinyin:'Nǐ hǎo! Nǐ shì nǎlǐ rén?',en:'Hi! Where are you from?'},
      {speaker:'You 你',zh:'我是越南人，你呢？',pinyin:'Wǒ shì Yuènán rén, nǐ ne?',en:'I\'m Vietnamese, and you?'},
      {speaker:'New friend',zh:'我是中国人。你的中文很好！',pinyin:'Wǒ shì Zhōngguó rén. Nǐ de Zhōngwén hěn hǎo!',en:'I\'m Chinese. Your Chinese is great!'},
      {speaker:'You 你',zh:'谢谢！我还在学习。一起加油！',pinyin:'Xiè xiè! Wǒ hái zài xuéxí.',en:'Thanks! I\'m still learning. Let\'s cheer each other on!'},
    ],
    vocab:['哪里人 = where are you from','还在学习 = still learning','一起加油 = let\'s cheer each other on'],
    tags:['Social','Friendship','HSK2']},
  {type:'story',scene:'🏥 At the Doctor',vn:'Đến gặp bác sĩ',setting:'You\'re not feeling well in China — stay calm!',
    lines:[
      {speaker:'Doctor 医生',zh:'你哪里不舒服？',pinyin:'Nǐ nǎlǐ bù shūfu?',en:'Where do you feel unwell?'},
      {speaker:'You 你',zh:'我头疼，有点发烧。',pinyin:'Wǒ tóuténg, yǒudiǎn fāshāo.',en:'I have a headache and a slight fever.'},
      {speaker:'Doctor 医生',zh:'没关系，吃这个药，多喝水。',pinyin:'Méi guānxi, chī zhège yào, duō hē shuǐ.',en:'No worries, take this medicine, drink more water.'},
      {speaker:'You 你',zh:'好的，谢谢医生！',pinyin:'Hǎo de, xiè xiè yīshēng!',en:'Okay, thank you, doctor!'},
    ],
    vocab:['头疼 (tóuténg) = headache','发烧 (fāshāo) = fever','没关系 = no worries / it\'s okay'],
    tags:['Health','Emergency','HSK3']},
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
  checkReferral();
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
  // Show/Hide Quick Try Dual Mode CTA
  const qd=document.getElementById('quick-dual-cta');
  if(qd)qd.style.display=targetLangs.length<2?'block':'none';
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
    return `<div class="card-inner"><div class="card-face">
      <span class="card-type-badge badge-${d.type==='phrase'?'phrase':'vocab'}">${d.type==='phrase'?'💬 Phrase':'📝 Vocab'}</span>
      ${dirTag}
      ${d.emoji?`<div class="card-emoji-scene">${d.emoji}</div>`:''}
      <div class="card-char ${disp.cls}">${disp.main}</div>
      ${disp.pinyin?`<div class="card-pinyin">${disp.pinyin}</div>`:''}
      ${hint?`<div class="card-native-hint">${hint}</div>`:''}
      <div class="card-english">${d.en}</div>
      ${d.mnemonic?`<div class="card-mnemonic">💡 ${d.mnemonic}</div>`:''}
      ${d.example?`<div class="card-example"><div class="ex-zh">${d.example.zh}</div><div class="ex-pinyin">${d.example.pinyin}</div><div class="ex-en">${d.example.en}</div></div>`:''}
      <div class="card-tags">${(d.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
    </div></div>`;
  }

  if(d.type==='story'){
    const nativeSubtitle=nativeLang==='vn'&&d.vn?`🇻🇳 ${d.vn}`:d.setting;
    const lines=d.lines.map((l,i)=>{
      const isYou=l.speaker.includes('You') || l.speaker.includes('你');
      const side=isYou?'bubble-right':'bubble-left';
      return `<div class="story-bubble ${side}" onclick="speakLine('${l.zh.replace(/'/g,"\\'")}')">
        <div class="bubble-speaker">${l.speaker}</div>
        <div class="bubble-zh">${l.zh}</div>
        <div class="bubble-pinyin">${l.pinyin}</div>
        <div class="bubble-en">${l.en}</div>
      </div>`;
    }).join('');
    const vocabLine=(d.vocab||[]).map(v=>`<span class="story-vocab-chip">${v}</span>`).join('');
    return `<div class="card-inner"><div class="card-face story-face">
      <span class="card-type-badge badge-story">🎬 Story</span>
      ${dirTag}
      <div class="story-scene-title">${d.scene}</div>
      <div class="story-setting">${nativeSubtitle}</div>
      <div class="story-lines">${lines}</div>
      ${vocabLine?`<div class="story-vocab-row">${vocabLine}</div>`:''}
      <div class="story-tap-hint">👆 Tap any line to hear it</div>
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
function speakLine(text){if(!text)return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='zh-CN';u.rate=0.75;window.speechSynthesis.speak(u);floatEmoji('🔊');}
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
function afterCommunityRender(){checkSquadState();}

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
  if(tab==='quiz')initQuiz();if(tab==='community'){renderCommunity();checkSquadState();}
}

// ===== STUDY SQUAD =====
let squad = JSON.parse(localStorage.getItem('levelai_squad') || 'null');

const MOCK_SQUAD_MEMBERS = [
  {name:'Linh',avatar:'👩',xp:340,streak:12,lastStudied:0},   // 0 = today
  {name:'Minh',avatar:'👨',xp:780,streak:25,lastStudied:0},
  {name:'Thùy',avatar:'🧑',xp:190,streak:7, lastStudied:3},   // 3 = missed 3 days
  {name:'An',  avatar:'👩',xp:85, streak:0, lastStudied:5},   // missed 5 days
];

function genCode(){return Math.random().toString(36).slice(2,8).toUpperCase();}

function createSquad(){
  const code=genCode();
  const myName=userGoal.name||'You';
  squad={code,name:myName+"'s Squad",created:Date.now(),code};
  localStorage.setItem('levelai_squad',JSON.stringify(squad));
  showSquadActive();
  launchConfetti();showToast('✨ Squad created! Share the code!');addXP(30);showXPBurst('+30 XP 🏆');
}

function joinSquad(){
  const input=document.getElementById('join-code-input');
  const code=(input?.value||'').trim().toUpperCase();
  if(code.length<4){showToast('Enter a valid code!');return;}
  squad={code,name:'Learners Squad',created:Date.now()-86400000*3}; // pretend joined 3 days ago
  localStorage.setItem('levelai_squad',JSON.stringify(squad));
  showSquadActive();
  showToast('🎉 Joined squad '+code+'!');addXP(15);showXPBurst('+15 XP 🏆');floatEmoji('🏆');
}

function showSquadActive(){
  const empty=document.getElementById('squad-empty'),active=document.getElementById('squad-active');
  if(empty)empty.style.display='none';if(active)active.style.display='block';
  renderSquad();
}

function renderSquad(){
  if(!squad)return;
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  set('squad-name-display',squad.name);
  set('squad-code-display',squad.code||'——');

  // Days together
  const daysTogether=Math.floor((Date.now()-(squad.created||Date.now()))/86400000)+1;
  set('squad-days-together',daysTogether);
  set('squad-meta',`Together for ${daysTogether} day${daysTogether!==1?'s':''} · ${squad.code}`);

  // Build full member list (mock others + you)
  const you={name:userGoal.name||'You',avatar:'🧑',xp:totalXP,streak:currentStreak,lastStudied:0,isYou:true};
  const members=[you,...MOCK_SQUAD_MEMBERS];

  // Group streak = minimum active streak in squad (encourages everyone to study)
  const minStreak=Math.min(...members.map(m=>m.lastStudied<=1?m.streak:0));
  set('squad-group-streak',minStreak+'🔥');

  // Squad total XP
  const squadXP=members.reduce((s,m)=>s+m.xp,0);
  set('squad-total-xp',squadXP+'⭐');

  // Leaderboard — sort by XP
  const ranked=[...members].sort((a,b)=>b.xp-a.xp);
  const medals=['🥇','🥈','🥉','4️⃣','5️⃣'];
  const lb=document.getElementById('squad-leaderboard');
  if(lb){
    lb.innerHTML=ranked.map((m,i)=>{
      const missed=m.lastStudied>=2;
      const missedBadge=missed?`<span class="squad-missed">😴 ${m.lastStudied}d away</span>`:'';
      return `<div class="squad-lb-row${m.isYou?' you':''}">
        <div class="squad-lb-rank">${medals[i]||'·'}</div>
        <div class="squad-lb-avatar">${m.avatar}</div>
        <div class="squad-lb-info">
          <div class="squad-lb-name">${m.name}${m.isYou?' (you)':''}</div>
          <div class="squad-lb-stats">🔥${m.lastStudied===0?m.streak:'0 (missed)'} streak · 📅${m.lastStudied===0?'Active today':'Inactive '+m.lastStudied+'d'}</div>
        </div>
        <div class="squad-lb-xp">⭐${m.xp}</div>
        ${missedBadge}
      </div>`;
    }).join('');
  }

  // "Missed you" nudge if any member has been away 2+ days
  const missed=members.filter(m=>!m.isYou&&m.lastStudied>=2);
  if(missed.length){
    const names=missed.map(m=>m.name).join(' & ');
    showToast(`😴 ${names} hasn't studied in ${missed[0].lastStudied} days!`);
  }

  // Render sub-sections
  renderMilestones(daysTogether);
  renderDailyChallenge();
  renderCheckinFeed();
}

function copyInviteLink(){
  if(!squad)return;
  const link=`https://manhcuongk55.github.io/Chinese-level-up-tips/app/?squad=${squad.code}`;
  if(navigator.clipboard)navigator.clipboard.writeText(link).then(()=>showToast('🔗 Link copied! Share with friends!'));
  floatEmoji('🔗');
}
function copyCode(){
  if(!squad)return;
  if(navigator.clipboard)navigator.clipboard.writeText(squad.code).then(()=>showToast('📋 Code '+squad.code+' copied!'));
}
function leaveSquad(){
  if(!confirm('Leave your squad?'))return;
  squad=null;localStorage.removeItem('levelai_squad');
  const empty=document.getElementById('squad-empty'),active=document.getElementById('squad-active');
  if(empty)empty.style.display='';if(active)active.style.display='none';
  showToast('Left squad. You can create or join a new one!');
}

// Check squad on community load
function checkSquadState(){
  const saved=localStorage.getItem('levelai_squad');
  if(saved){squad=JSON.parse(saved);showSquadActive();}
}

// ===== TOGETHER MILESTONES =====
const MILESTONES=[
  {days:3,  icon:'🌱', label:'3 Days'},
  {days:7,  icon:'🔥', label:'1 Week'},
  {days:30, icon:'🎯', label:'1 Month'},
  {days:100,icon:'⚔️', label:'100 Days'},
  {days:365,icon:'👑', label:'1 Year'},
];
function renderMilestones(daysTogether){
  const wrap=document.getElementById('squad-milestones');if(!wrap)return;
  wrap.innerHTML=MILESTONES.map(m=>{
    const unlocked=daysTogether>=m.days;
    const justUnlocked=daysTogether===m.days;
    return `<div class="milestone-chip ${unlocked?'unlocked':'locked'}${justUnlocked?' just-unlocked':''}" title="${m.label}">
      ${m.icon} ${m.label}${unlocked?' ✓':''}
    </div>`;
  }).join('');
  // Celebrate newly unlocked
  const newUnlock=MILESTONES.find(m=>daysTogether===m.days);
  if(newUnlock){setTimeout(()=>{launchConfetti();showToast(`🏅 Milestone unlocked: ${newUnlock.icon} ${newUnlock.label} Together!`);addXP(50);showXPBurst('+50 XP 🏅');},300);}
}

// ===== DAILY CHALLENGE =====
const DAILY_CHALLENGES=[
  {topic:'Greetings 👋',sub:'Learn these today, use them tomorrow!',words:['你好','谢谢','再见','请']},
  {topic:'Food & Drinks 🍜',sub:'Order like a local!',words:['米饭','茶','好吃','不辣']},
  {topic:'Travel ✈️',sub:'Survive any airport in China!',words:['飞机','酒店','票','地图']},
  {topic:'Feelings 💫',sub:'Express yourself in Chinese!',words:['快乐','累了','很好','没问题']},
  {topic:'Numbers 🔢',sub:'Count, bargain, and win!',words:['一','十','百','多少钱']},
  {topic:'Family 👨‍👩‍👧',sub:'Talk about your loved ones!',words:['妈妈','朋友','老师','我们']},
  {topic:'Nature 🌿',sub:'Describe the world around you!',words:['太阳','水','山','花']},
];
let challengeDoneWords=new Set(JSON.parse(localStorage.getItem('levelai_challenge_done')||'[]'));

function renderDailyChallenge(){
  const today=new Date();const idx=today.getDay()+today.getDate()%DAILY_CHALLENGES.length;
  const ch=DAILY_CHALLENGES[idx%DAILY_CHALLENGES.length];
  const titleEl=document.getElementById('challenge-title'),subEl=document.getElementById('challenge-sub'),wordsEl=document.getElementById('challenge-words');
  if(titleEl)titleEl.textContent="🗓️ Today: "+ch.topic;
  if(subEl)subEl.textContent=ch.sub;
  if(wordsEl)wordsEl.innerHTML=ch.words.map(w=>
    `<button class="challenge-word${challengeDoneWords.has(w)?' done':''}" onclick="markChallengeWord('${w}',this)">${w}</button>`
  ).join('');
}
function markChallengeWord(word,btn){
  if(challengeDoneWords.has(word)){challengeDoneWords.delete(word);btn.classList.remove('done');}
  else{challengeDoneWords.add(word);btn.classList.add('done');addXP(15);showXPBurst('+15 XP ⚡');floatEmoji('⚡');
    if(challengeDoneWords.size>=4&&!localStorage.getItem('levelai_challenge_full_'+new Date().toDateString())){
      localStorage.setItem('levelai_challenge_full_'+new Date().toDateString(),'1');
      addXP(35);launchConfetti();showToast('🎉 Daily Challenge Complete! +50 XP total!');
    }
  }
  localStorage.setItem('levelai_challenge_done',JSON.stringify([...challengeDoneWords]));
}

// ===== DAILY CHECK-IN =====
const DEFAULT_CHECKINS=[
  {name:'Minh',text:'Hôm nay học được 你好 và 谢谢! Dễ nhớ hơn mình tưởng 😄',time:'7:12 AM'},
  {name:'Linh',text:'Xem 1 clip phim Trung, nghe được 3 từ quen rồi!',time:'8:45 AM'},
  {name:'Thùy',text:'Chưa học hôm nay... hẹn tối nha mọi người 🙏',time:'9:00 AM'},
];
let myCheckins=JSON.parse(localStorage.getItem('levelai_checkins')||'[]');

function renderCheckinFeed(){
  const feed=document.getElementById('checkin-feed');if(!feed)return;
  const all=[...DEFAULT_CHECKINS.map(c=>({...c,isYou:false})),...myCheckins.map(c=>({...c,isYou:true}))];
  feed.innerHTML=all.map(c=>
    `<div class="checkin-bubble${c.isYou?' you':''}">
      <div class="checkin-meta">${c.isYou?'⭐ You':c.name} · ${c.time||'just now'}</div>
      <div class="checkin-text">${c.text}</div>
    </div>`
  ).join('');
  feed.scrollTop=feed.scrollHeight;
}
function sendCheckin(){
  const input=document.getElementById('checkin-input');if(!input)return;
  const text=input.value.trim();if(!text){showToast('Type something first!');return;}
  const now=new Date();const time=now.getHours()+':'+(now.getMinutes()+'').padStart(2,'0');
  myCheckins.push({name:userGoal.name||'You',text,time,isYou:true});
  localStorage.setItem('levelai_checkins',JSON.stringify(myCheckins.slice(-5)));
  input.value='';renderCheckinFeed();addXP(10);showXPBurst('+10 XP 💬');floatEmoji('💬');showToast('✅ Checked in!');
}

// ===== DUAL MODE & INVITE FLOW =====
function checkReferral(){
  const params=new URLSearchParams(window.location.search);
  const ref=params.get('ref')||params.get('squad');
  if(ref){
    const banner=document.getElementById('referral-banner');
    const msg=document.getElementById('ref-msg');
    if(banner){banner.style.display='flex';if(msg)msg.textContent=`Your friend ${ref.length<10?ref:''} invited you!`;}
  }
}

function quickDual(){
  nativeLang='vn'; targetLangs=['zh','en']; activeTargetIdx=0;
  userGoal={...userGoal, nativeLang, targetLangs, type:userGoal.type||'fun', days:userGoal.days||60, startDate:userGoal.startDate||new Date().toISOString()};
  saveStorage();
  updateTopBarLang(); updateDualModeBar(); renderCurrentCard();
  const banner=document.getElementById('referral-banner'); if(banner)banner.style.display='none';
  showToast('✨ Dual Mode ON! Learning ZH + EN! 加油！');
  launchConfetti(); addXP(50); showXPBurst('+50 XP 🚀');
}

function inviteFriends(){
  const myName=userGoal.name||'A Friend';
  const url=`${window.location.origin}${window.location.pathname}?ref=${encodeURIComponent(myName)}`;
  const text=`🚀 Join me on levAIup! I'm learning Chinese and English together. Try the Dual Mode with me: ${url}`;
  
  if(navigator.share){
    navigator.share({title:'levAIup Invitation', text, url});
  } else {
    navigator.clipboard.writeText(text).then(()=>{
      showToast('📋 Invite link copied to clipboard!');
      floatEmoji('🎁');
    });
  }
}


// ===== EFFECTS =====
function showXPBurst(msg){const p=document.getElementById('xp-popup');if(!p)return;p.textContent=msg;p.classList.remove('burst');void p.offsetWidth;p.classList.add('burst');}
function launchConfetti(){const c=document.getElementById('confetti-container');if(!c)return;const cols=['#a78bfa','#38bdf8','#fb7185','#34d399','#fbbf24','#fff'];for(let i=0;i<35;i++){const p=document.createElement('div');p.className='confetti-piece';p.style.cssText=`left:${Math.random()*100}%;top:-10px;background:${cols[Math.floor(Math.random()*cols.length)]};width:${6+Math.random()*10}px;height:${6+Math.random()*10}px;border-radius:${Math.random()>.5?'50%':'2px'};animation-duration:${1.5+Math.random()*2}s;animation-delay:${Math.random()*.5}s;transform:translateX(${(Math.random()-.5)*200}px)`;c.appendChild(p);setTimeout(()=>p.remove(),3500);}}
function floatEmoji(e){const el=document.createElement('div');el.className='float-emoji';el.textContent=e;el.style.left=(30+Math.random()*40)+'%';el.style.bottom='120px';document.body.appendChild(el);setTimeout(()=>el.remove(),900);}
function showToast(msg){const t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200);}

document.addEventListener('DOMContentLoaded',init);
