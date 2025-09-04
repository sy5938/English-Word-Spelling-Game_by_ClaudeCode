// 单词数据库
const WORD_DATABASE = {
    easy: [
        { word: "cat", meaning: "猫", phonetic: "/kæt/" },
        { word: "dog", meaning: "狗", phonetic: "/dɔːɡ/" },
        { word: "book", meaning: "书", phonetic: "/bʊk/" },
        { word: "apple", meaning: "苹果", phonetic: "/ˈæpl/" },
        { word: "water", meaning: "水", phonetic: "/ˈwɔːtər/" },
        { word: "house", meaning: "房子", phonetic: "/haʊs/" },
        { word: "tree", meaning: "树", phonetic: "/triː/" },
        { word: "car", meaning: "汽车", phonetic: "/kɑːr/" },
        { word: "sun", meaning: "太阳", phonetic: "/sʌn/" },
        { word: "moon", meaning: "月亮", phonetic: "/muːn/" },
        { word: "star", meaning: "星星", phonetic: "/stɑːr/" },
        { word: "fish", meaning: "鱼", phonetic: "/fɪʃ/" },
        { word: "bird", meaning: "鸟", phonetic: "/bɜːrd/" },
        { word: "flower", meaning: "花", phonetic: "/ˈflaʊər/" },
        { word: "green", meaning: "绿色", phonetic: "/ɡriːn/" },
        { word: "blue", meaning: "蓝色", phonetic: "/bluː/" },
        { word: "red", meaning: "红色", phonetic: "/red/" },
        { word: "happy", meaning: "快乐的", phonetic: "/ˈhæpi/" },
        { word: "food", meaning: "食物", phonetic: "/fuːd/" },
        { word: "time", meaning: "时间", phonetic: "/taɪm/" }
    ],
    medium: [
        { word: "beautiful", meaning: "美丽的", phonetic: "/ˈbjuːtɪfəl/" },
        { word: "important", meaning: "重要的", phonetic: "/ɪmˈpɔːrtənt/" },
        { word: "computer", meaning: "电脑", phonetic: "/kəmˈpjuːtər/" },
        { word: "education", meaning: "教育", phonetic: "/ˌedʒuˈkeɪʃən/" },
        { word: "government", meaning: "政府", phonetic: "/ˈɡʌvərnmənt/" },
        { word: "language", meaning: "语言", phonetic: "/ˈlæŋɡwɪdʒ/" },
        { word: "business", meaning: "商业", phonetic: "/ˈbɪznəs/" },
        { word: "relationship", meaning: "关系", phonetic: "/rɪˈleɪʃənʃɪp/" },
        { word: "experience", meaning: "经验", phonetic: "/ɪkˈspɪriəns/" },
        { word: "development", meaning: "发展", phonetic: "/dɪˈveləpmənt/" },
        { word: "information", meaning: "信息", phonetic: "/ˌɪnfərˈmeɪʃən/" },
        { word: "opportunity", meaning: "机会", phonetic: "/ˌɑːpərˈtuːnəti/" },
        { word: "environment", meaning: "环境", phonetic: "/ɪnˈvaɪrənmənt/" },
        { word: "technology", meaning: "技术", phonetic: "/tekˈnɑːlədʒi/" },
        { word: "knowledge", meaning: "知识", phonetic: "/ˈnɑːlɪdʒ/" },
        { word: "communication", meaning: "交流", phonetic: "/kəˌmjuːnɪˈkeɪʃən/" },
        { word: "organization", meaning: "组织", phonetic: "/ˌɔːrɡənəˈzeɪʃən/" },
        { word: "management", meaning: "管理", phonetic: "/ˈmænɪdʒmənt/" },
        { word: "achievement", meaning: "成就", phonetic: "/əˈtʃiːvmənt/" },
        { word: "responsibility", meaning: "责任", phonetic: "/rɪˌspɑːnsəˈbɪləti/" }
    ],
    hard: [
        { word: "extraordinary", meaning: "非凡的", phonetic: "/ɪkˈstrɔːrdəneri/" },
        { word: "philosophical", meaning: "哲学的", phonetic: "/ˌfɪləˈsɑːfɪkəl/" },
        { word: "international", meaning: "国际的", phonetic: "/ˌɪntərˈnæʃənəl/" },
        { word: "psychological", meaning: "心理的", phonetic: "/ˌsaɪkəˈlɑːdʒɪkəl/" },
        { word: "characteristic", meaning: "特征", phonetic: "/ˌkærəktəˈrɪstɪk/" },
        { word: "consciousness", meaning: "意识", phonetic: "/ˈkɑːnʃəsnəs/" },
        { word: "approximately", meaning: "大约", phonetic: "/əˈprɑːksɪmətli/" },
        { word: "understanding", meaning: "理解", phonetic: "/ˌʌndərˈstændɪŋ/" },
        { word: "comprehensive", meaning: "全面的", phonetic: "/ˌkɑːmprɪˈhensɪv/" },
        { word: "revolutionary", meaning: "革命性的", phonetic: "/ˌrevəˈluːʃəneri/" },
        { word: "sophisticated", meaning: "复杂的", phonetic: "/səˈfɪstɪkeɪtɪd/" },
        { word: "establishment", meaning: "建立", phonetic: "/ɪˈstæblɪʃmənt/" },
        { word: "concentration", meaning: "专注", phonetic: "/ˌkɑːnsənˈtreɪʃən/" },
        { word: "investigation", meaning: "调查", phonetic: "/ɪnˌvestɪˈɡeɪʃən/" },
        { word: "transformation", meaning: "转变", phonetic: "/ˌtrænsfərˈmeɪʃən/" },
        { word: "recommendation", meaning: "推荐", phonetic: "/ˌrekəmənˈdeɪʃən/" },
        { word: "specialization", meaning: "专业化", phonetic: "/ˌspeʃələˈzeɪʃən/" },
        { word: "administration", meaning: "管理", phonetic: "/ədˌmɪnɪˈstreɪʃən/" },
        { word: "representative", meaning: "代表", phonetic: "/ˌreprɪˈzentətɪv/" },
        { word: "entrepreneurship", meaning: "企业家精神", phonetic: "/ˌɑːntrəprəˈnɜːrʃɪp/" }
    ]
};

// 获取指定难度的单词
function getWordsByDifficulty(difficulty) {
    return WORD_DATABASE[difficulty] || WORD_DATABASE.easy;
}

// 随机获取指定数量的单词
function getRandomWords(difficulty, count) {
    const words = getWordsByDifficulty(difficulty);
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// 语音合成 (Text-to-Speech)
function speakWord(word) {
    if ('speechSynthesis' in window) {
        // 停止当前播放
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;  // 语速稍慢
        utterance.pitch = 1.0; // 音调
        utterance.volume = 1.0; // 音量
        
        speechSynthesis.speak(utterance);
    } else {
        console.log('浏览器不支持语音合成');
    }
}

// 检查浏览器支持
function checkBrowserSupport() {
    const support = {
        localStorage: typeof Storage !== "undefined",
        speechSynthesis: 'speechSynthesis' in window
    };
    
    if (!support.localStorage) {
        console.warn('浏览器不支持 localStorage，无法保存进度');
    }
    
    if (!support.speechSynthesis) {
        console.warn('浏览器不支持语音合成，无法播放发音');
    }
    
    return support;
}