// 游戏状态管理
class SpellingGame {
    constructor() {
        this.currentWord = null;
        this.currentWords = [];
        this.currentIndex = 0;
        this.score = 0;
        this.level = 1;
        this.streak = 0;
        this.difficulty = 'easy';
        this.wordsPerRound = 10;
        this.autoPlayAudio = true;
        this.wrongWords = [];
        
        // 检查浏览器支持
        this.browserSupport = checkBrowserSupport();
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadSettings();
        this.showScreen('start-screen');
    }
    
    bindEvents() {
        // 开始按钮
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startNewRound();
        });
        
        // 设置按钮
        document.getElementById('settings-btn').addEventListener('click', () => {
            this.showScreen('settings-screen');
        });
        
        // 返回按钮
        document.getElementById('back-to-start').addEventListener('click', () => {
            this.showScreen('start-screen');
        });
        
        // 音频播放按钮
        document.getElementById('play-audio').addEventListener('click', () => {
            this.playCurrentWordAudio();
        });
        
        document.getElementById('result-audio').addEventListener('click', () => {
            this.playCurrentWordAudio();
        });
        
        // 提交按钮
        document.getElementById('submit-btn').addEventListener('click', () => {
            this.submitAnswer();
        });
        
        // 提示按钮
        document.getElementById('hint-btn').addEventListener('click', () => {
            this.showHint();
        });
        
        // 跳过按钮
        document.getElementById('skip-btn').addEventListener('click', () => {
            this.skipWord();
        });
        
        // 下一题按钮
        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextWord();
        });
        
        // 复习错词按钮
        document.getElementById('review-btn').addEventListener('click', () => {
            this.reviewWrongWords();
        });
        
        // 输入框事件
        const wordInput = document.getElementById('word-input');
        wordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitAnswer();
            }
        });
        
        wordInput.addEventListener('input', () => {
            this.clearFeedback();
        });
        
        // 设置变更事件
        document.getElementById('difficulty').addEventListener('change', (e) => {
            this.difficulty = e.target.value;
            this.saveSettings();
        });
        
        document.getElementById('words-per-round').addEventListener('change', (e) => {
            this.wordsPerRound = parseInt(e.target.value);
            this.saveSettings();
        });
        
        document.getElementById('auto-play-audio').addEventListener('change', (e) => {
            this.autoPlayAudio = e.target.checked;
            this.saveSettings();
        });
    }
    
    showScreen(screenId) {
        // 隐藏所有屏幕
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // 显示指定屏幕
        document.getElementById(screenId).classList.add('active');
    }
    
    startNewRound() {
        this.currentWords = getRandomWords(this.difficulty, this.wordsPerRound);
        this.currentIndex = 0;
        this.wrongWords = [];
        this.showScreen('game-screen');
        this.loadNextWord();
    }
    
    loadNextWord() {
        if (this.currentIndex >= this.currentWords.length) {
            this.endRound();
            return;
        }
        
        this.currentWord = this.currentWords[this.currentIndex];
        this.updateGameUI();
        
        // 自动播放音频
        if (this.autoPlayAudio) {
            setTimeout(() => this.playCurrentWordAudio(), 500);
        }
    }
    
    updateGameUI() {
        const word = this.currentWord;
        
        // 更新单词信息
        document.getElementById('word-meaning').textContent = word.meaning;
        
        // 清空输入框
        document.getElementById('word-input').value = '';
        document.getElementById('word-input').focus();
        
        // 清除反馈
        this.clearFeedback();
        
        // 更新进度
        this.updateProgress();
        
        // 更新统计数据
        this.updateStats();
    }
    
    updateProgress() {
        const progress = ((this.currentIndex + 1) / this.currentWords.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = `${this.currentIndex + 1} / ${this.currentWords.length}`;
    }
    
    updateStats() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('streak').textContent = this.streak;
    }
    
    submitAnswer() {
        const userInput = document.getElementById('word-input').value.trim().toLowerCase();
        const correctAnswer = this.currentWord.word.toLowerCase();
        
        if (!userInput) {
            this.showFeedback('请输入单词!', 'incorrect');
            return;
        }
        
        if (userInput === correctAnswer) {
            this.handleCorrectAnswer();
        } else {
            this.handleIncorrectAnswer(userInput);
        }
    }
    
    handleCorrectAnswer() {
        this.score += 10 + this.streak * 2;
        this.streak++;
        
        // 显示正确反馈
        this.showFeedback('正确! 🎉', 'correct');
        
        // 添加动画效果
        document.getElementById('word-input').classList.add('bounce');
        setTimeout(() => {
            document.getElementById('word-input').classList.remove('bounce');
        }, 500);
        
        this.showResultScreen(true);
    }
    
    handleIncorrectAnswer(userInput) {
        this.streak = 0;
        
        // 记录错误单词
        this.wrongWords.push({
            ...this.currentWord,
            userAnswer: userInput
        });
        
        // 显示错误反馈
        this.showFeedback(`错误! 正确答案是: ${this.currentWord.word}`, 'incorrect');
        
        // 添加震动效果
        document.getElementById('word-input').classList.add('shake');
        setTimeout(() => {
            document.getElementById('word-input').classList.remove('shake');
        }, 500);
        
        this.showResultScreen(false);
    }
    
    showFeedback(message, type) {
        const feedback = document.getElementById('input-feedback');
        feedback.textContent = message;
        feedback.className = `input-feedback ${type}`;
    }
    
    clearFeedback() {
        const feedback = document.getElementById('input-feedback');
        feedback.textContent = '';
        feedback.className = 'input-feedback';
    }
    
    showResultScreen(isCorrect) {
        const resultTitle = document.getElementById('result-title');
        const correctSpelling = document.getElementById('correct-spelling');
        const resultMeaning = document.getElementById('result-meaning');
        
        if (isCorrect) {
            resultTitle.textContent = '答案正确! 🎉';
            resultTitle.style.color = '#38a169';
        } else {
            resultTitle.textContent = '答案错误 😔';
            resultTitle.style.color = '#e53e3e';
        }
        
        correctSpelling.textContent = this.currentWord.word;
        resultMeaning.textContent = `${this.currentWord.meaning} ${this.currentWord.phonetic}`;
        
        this.showScreen('result-screen');
    }
    
    nextWord() {
        this.currentIndex++;
        this.showScreen('game-screen');
        this.loadNextWord();
    }
    
    skipWord() {
        this.wrongWords.push({
            ...this.currentWord,
            userAnswer: '(跳过)'
        });
        this.streak = 0;
        this.nextWord();
    }
    
    showHint() {
        const word = this.currentWord.word;
        const hint = word.charAt(0) + word.slice(1).replace(/./g, '_');
        this.showFeedback(`提示: ${hint}`, 'hint');
    }
    
    playCurrentWordAudio() {
        if (this.currentWord && this.browserSupport.speechSynthesis) {
            speakWord(this.currentWord.word);
        }
    }
    
    endRound() {
        const accuracy = Math.round(((this.currentWords.length - this.wrongWords.length) / this.currentWords.length) * 100);
        
        // 检查是否升级
        if (accuracy >= 80 && this.wrongWords.length <= 2) {
            this.level++;
        }
        
        // 显示结果摘要
        alert(`本轮结束!\n正确率: ${accuracy}%\n得分: ${this.score}\n错误单词: ${this.wrongWords.length}个`);
        
        // 保存进度
        this.saveProgress();
        
        this.showScreen('start-screen');
    }
    
    reviewWrongWords() {
        if (this.wrongWords.length === 0) {
            alert('太棒了! 这轮没有错误单词 🎉');
            return;
        }
        
        // 用错误单词开始新一轮
        this.currentWords = [...this.wrongWords];
        this.currentIndex = 0;
        this.wrongWords = [];
        this.showScreen('game-screen');
        this.loadNextWord();
    }
    
    saveSettings() {
        if (!this.browserSupport.localStorage) return;
        
        const settings = {
            difficulty: this.difficulty,
            wordsPerRound: this.wordsPerRound,
            autoPlayAudio: this.autoPlayAudio
        };
        
        localStorage.setItem('spellingGameSettings', JSON.stringify(settings));
    }
    
    loadSettings() {
        if (!this.browserSupport.localStorage) return;
        
        const saved = localStorage.getItem('spellingGameSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            this.difficulty = settings.difficulty || 'easy';
            this.wordsPerRound = settings.wordsPerRound || 10;
            this.autoPlayAudio = settings.autoPlayAudio !== undefined ? settings.autoPlayAudio : true;
            
            // 更新UI
            document.getElementById('difficulty').value = this.difficulty;
            document.getElementById('words-per-round').value = this.wordsPerRound;
            document.getElementById('auto-play-audio').checked = this.autoPlayAudio;
        }
    }
    
    saveProgress() {
        if (!this.browserSupport.localStorage) return;
        
        const progress = {
            score: this.score,
            level: this.level,
            lastPlayed: new Date().toISOString()
        };
        
        localStorage.setItem('spellingGameProgress', JSON.stringify(progress));
    }
    
    loadProgress() {
        if (!this.browserSupport.localStorage) return;
        
        const saved = localStorage.getItem('spellingGameProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            this.score = progress.score || 0;
            this.level = progress.level || 1;
            this.updateStats();
        }
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    const game = new SpellingGame();
    game.loadProgress();
    
    // 让游戏实例全局可访问，方便调试
    window.spellingGame = game;
});

// 添加一些实用功能
document.addEventListener('keydown', (e) => {
    // ESC键返回开始界面
    if (e.key === 'Escape') {
        if (window.spellingGame) {
            window.spellingGame.showScreen('start-screen');
        }
    }
});