/* =============================
   AUDIO SYSTEM
   ============================= */
/* =============================
   AUDIO SYSTEM (simple: music mute only)
   ============================= */
  const AudioSystem = {
  sounds: {},
  bgMusic: null,
  isMuted: false, // controls music only

  init() {
    const savedMute = localStorage.getItem('audioMuted') === 'true';

    // ---- Volumes (tune here) ----
    const MUSIC_VOL = 0.03; // very quiet music
    const SFX_VOL   = 0.08; // quiet sfx
    // ------------------------------

    // Background music
    this.bgMusic = new Audio('https://pub-761726dded894be79bd817c097520beb.r2.dev/background-music.mp3');
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0.015;

    // SFX (independent of music mute)
    this.sounds = {
      click:       new Audio('https://pub-761726dded894be79bd817c097520beb.r2.dev/click.mp3'),
      purchase:    new Audio('https://pub-761726dded894be79bd817c097520beb.r2.dev/purchase.mp3'),
      diceRoll:    new Audio('https://pub-761726dded894be79bd817c097520beb.r2.dev/dice-roll.mp3'),
      win:         new Audio('https://pub-761726dded894be79bd817c097520beb.r2.dev/win.mp3'),
      fail:        new Audio('https://pub-761726dded894be79bd817c097520beb.r2.dev/fail.mp3'),
      gameOver:    new Audio('https://pub-761726dded894be79bd817c097520beb.r2.dev/game-over.mp3'),
      jobSelect:   new Audio('https://pub-761726dded894be79bd817c097520beb.r2.dev/job-select.mp3'),
      unavailable: new Audio('https://pub-761726dded894be79bd817c097520beb.r2.dev/unavailable.mp3')
    };

    Object.values(this.sounds).forEach(s => {
      s.volume = SFX_VOL;
      s.load();
    });
    this.bgMusic.load();

    this.createMuteButton();

    // Apply saved music mute state
    if (savedMute) this.toggleMute();

    // Pause/resume politely on tab switch
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.bgMusic?.pause();
      else if (!this.isMuted) this.bgMusic?.play().catch(()=>{});
    });
    
    if (!this.isMuted) {
  this.bgMusic.play().catch(() => {});
}
  },

  createMuteButton() {
    if (document.getElementById('muteButton')) return;
    const muteBtn = document.createElement('button');
    muteBtn.id = 'muteButton';
    muteBtn.className = 'mute-button';
    muteBtn.innerHTML = '🔊';
    muteBtn.setAttribute('aria-pressed','false');
    muteBtn.setAttribute('aria-label','Mute music');
    muteBtn.onclick = () => this.toggleMute();
    document.body.appendChild(muteBtn);
  },

  toggleMute() {
    this.isMuted = !this.isMuted;
    const muteBtn = document.getElementById('muteButton');
    if (this.isMuted) {
      this.bgMusic.pause();
      muteBtn.innerHTML = '🔇';
      muteBtn.setAttribute('aria-pressed','true');
      muteBtn.setAttribute('aria-label','Unmute music');
    } else {
      this.bgMusic.play().catch(e => console.log('Audio play prevented:', e));
      muteBtn.innerHTML = '🔊';
      muteBtn.setAttribute('aria-pressed','false');
      muteBtn.setAttribute('aria-label','Mute music');
    }
    localStorage.setItem('audioMuted', this.isMuted);
  },

  // SFX always allowed (independent of music mute)
  play(soundName) {
    const s = this.sounds[soundName];
    if (s) {
      s.currentTime = 0;
      s.play().catch(e => console.log('Sound play failed:', e));
    }
  },

  // Music respects music mute
  playMusic() {
    if (!this.isMuted) {
      this.bgMusic.play().catch(e => console.log('Music play prevented:', e));
    }
  }
};


/* =============================
   GAME STATE & DATA
   ============================= */
let gameState = {
    balance: 130,
    day: 1,
    stats: {
        strength: 5,
        speed: 5,
        focus: 5,
        endurance: 5
    },
    upgrades: {
        eyes: false,
        arm: false,
        legs: false,
        neural: false,
        torso: false,
        spine: false
    }
};

let selectedUpgrade = null;
let selectedJob = null;
let currentJobResult = null;

const upgradeData = {
    eyes: {
        title: "Bionic Eyes",
        subtitle: "Visual Enhancement",
        description: "Cybernetic eyes with zoom and night vision.",
        icon: "👁️",
        cost: 110,
        stats: { focus: 6, speed: 2 },
        available: true
    },
    arm: {
        title: "Hydraulic Arm",
        subtitle: "Strength Augmentation",
        description: "Military-grade hydraulic arm for superhuman strength.",
        icon: "🦾",
        cost: 85,
        stats: { strength: 8 },
        available: true
    },
    legs: {
        title: "Bionic Legs",
        subtitle: "Speed Enhancement",
        description: "Carbon fiber legs for enhanced speed and stamina.",
        icon: "🦿",
        cost: 150,
        stats: { speed: 6, endurance: 4 },
        available: true
    },
    neural: {
        title: "Neural Interface",
        subtitle: "LOCKED - TIER 2",
        description: "Advanced neural processing. Not yet available.",
        icon: "🧠",
        cost: 120,
        stats: { focus: 5, speed: 2 },
        available: false
    },
    torso: {
        title: "Reinforced Core",
        subtitle: "LOCKED - TIER 2",
        description: "Titanium ribcage. Black market only.",
        icon: "⚙️",
        cost: 95,
        stats: { endurance: 6, strength: 3 },
        available: false
    },
    spine: {
        title: "Neural Spine",
        subtitle: "LOCKED - TIER 2",
        description: "Spinal replacement. Too expensive.",
        icon: "🔗",
        cost: 200,
        stats: { focus: 8, speed: 5 },
        available: false
    }
};

const jobPool = [
    { name: "Delivery Runner", emoji: "📦", pay: 60, req1: { stat: 'speed', value: 5 }, req2: { stat: 'endurance', value: 4 } },
    { name: "Data Entry", emoji: "⌨️", pay: 65, req1: { stat: 'focus', value: 5 }, req2: { stat: 'speed', value: 4 } },
    { name: "Assembly Line", emoji: "⚙️", pay: 70, req1: { stat: 'endurance', value: 6 }, req2: { stat: 'speed', value: 5 } },
    { name: "Warehouse Picking", emoji: "📋", pay: 75, req1: { stat: 'strength', value: 6 }, req2: { stat: 'endurance', value: 5 } },
    { name: "Private Security", emoji: "🛡️", pay: 80, req1: { stat: 'strength', value: 7 }, req2: { stat: 'focus', value: 5 } },
    { name: "Data Mining", emoji: "💾", pay: 85, req1: { stat: 'focus', value: 7 }, req2: { stat: 'endurance', value: 6 } },
    { name: "Asset Recovery", emoji: "🔧", pay: 90, req1: { stat: 'strength', value: 8 }, req2: { stat: 'speed', value: 6 } },
    { name: "Network Maintenance", emoji: "🖥️", pay: 95, req1: { stat: 'focus', value: 8 }, req2: { stat: 'speed', value: 7 } },
    { 
        name: "Unregistered Delivery", 
        emoji: "📦💀",
        pay: 110, 
        req1: { stat: 'speed', value: 4 }, 
        req2: { stat: 'focus', value: 3 }, 
        blackMarket: true, 
        fine: 80,
        detectionThreshold: 7
    },
    { 
        name: "Off-Books Data Work", 
        emoji: "💾💀",
        pay: 130, 
        req1: { stat: 'focus', value: 5 }, 
        req2: { stat: 'speed', value: 4 }, 
        blackMarket: true, 
        fine: 100,
        detectionThreshold: 7
    }
];

/* =============================
   INITIALIZATION
   ============================= */
document.addEventListener('DOMContentLoaded', function() {
    AudioSystem.init();
    loadGame();
    updateDisplay();
    showIntroSplash();
    
    setTimeout(() => {
        if (typeof VideoSystem !== 'undefined') {
            VideoSystem.init();
        }
    }, 100);
});

function showIntroSplash() {
    const lifeworkModal = document.getElementById('lifeworkSplash');
    if (lifeworkModal) {
        lifeworkModal.style.display = 'flex';
        
        setTimeout(() => {
            lifeworkModal.style.display = 'none';
            const userAgreement = document.getElementById('splashModal');
            if (userAgreement) {
                userAgreement.style.display = 'flex';
            }
        }, 3000);
    }
}

function startGame() {
    AudioSystem.play('click');
    const modal = document.getElementById('splashModal');
    if (modal) {
        modal.style.display = 'none';
    }
    AudioSystem.playMusic();
    initializeGame();
}

function initializeGame() {
    document.querySelectorAll('.body-part').forEach(part => {
        part.addEventListener('click', function() {
            this.classList.add('glitch');
            setTimeout(() => this.classList.remove('glitch'), 300);
        });
    });
    
    document.querySelectorAll('.upgrade-card').forEach(card => {
        card.addEventListener('click', function() {
            const upgrade = this.dataset.upgrade;
            const upgradeInfo = upgradeData[upgrade];
            
            if (!upgradeInfo.available) {
                AudioSystem.play('unavailable');
                this.classList.add('glitch');
                setTimeout(() => this.classList.remove('glitch'), 300);
                return;
            }
            
            if (gameState.upgrades[upgrade]) {
                this.classList.add('glitch');
                setTimeout(() => this.classList.remove('glitch'), 300);
                return;
            }
            
            AudioSystem.play('click');
            showUpgradeModal(upgrade);
        });
    });
    
    updateDisplay();
    updateStatBars();
    
    setInterval(() => {
        const character = document.getElementById('character');
        if (character) {
            character.style.filter = `hue-rotate(${Math.random() * 60}deg)`;
        }
    }, 2000);
}

function showUpgradeModal(upgradeKey) {
    const upgrade = upgradeData[upgradeKey];
    selectedUpgrade = upgradeKey;
    
    document.getElementById('upgradeModalIcon').textContent = upgrade.icon;
    document.getElementById('upgradeModalTitle').textContent = upgrade.title;
    document.getElementById('upgradeModalSubtitle').textContent = upgrade.subtitle;
    document.getElementById('upgradeModalDescription').textContent = upgrade.description;
    document.getElementById('upgradeModalCost').textContent = `$${upgrade.cost}`;
    
    const statsGrid = document.querySelector('.upgrade-stats-grid');
    statsGrid.innerHTML = '';
    
    Object.entries(upgrade.stats).forEach(([stat, value]) => {
        const statDiv = document.createElement('div');
        statDiv.className = `upgrade-stat-item positive`;
        statDiv.innerHTML = `
            <div class="stat-change">+${value}</div>
            <div class="stat-name">${stat.charAt(0).toUpperCase() + stat.slice(1)}</div>
        `;
        statsGrid.appendChild(statDiv);
    });
    
    const purchaseButton = document.getElementById('purchaseButton');
    if (gameState.balance >= upgrade.cost) {
        purchaseButton.disabled = false;
        purchaseButton.textContent = 'Purchase';
        purchaseButton.style.opacity = '1';
    } else {
        purchaseButton.disabled = true;
        purchaseButton.textContent = 'Insufficient Funds';
        purchaseButton.style.opacity = '0.5';
    }
    
    document.getElementById('upgradeModal').style.display = 'flex';
}

function purchaseUpgradeFromModal() {
    if (!selectedUpgrade) return;
    
    const upgrade = upgradeData[selectedUpgrade];
    
    if (gameState.balance >= upgrade.cost) {
        const previousState = JSON.parse(JSON.stringify(gameState));
        
        gameState.balance -= upgrade.cost;
        gameState.upgrades[selectedUpgrade] = true;
        
        Object.entries(upgrade.stats).forEach(([stat, value]) => {
            gameState.stats[stat] += value;
        });
        
        AudioSystem.play('purchase');
        closeModal('upgrade');
        updateDisplay(previousState);
        saveGame();
        
        if (typeof VideoSystem !== 'undefined') {
            VideoSystem.updateDefaultAfterPurchase(selectedUpgrade);
        }
    }
}

function startDay() {
    AudioSystem.play('click');
    const jobs = getRandomJobs(2);
    showJobSelection(jobs);
}

function getRandomJobs(count) {
    const shuffled = [...jobPool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function calculateRollTarget(job) {
    const meetsReq1 = gameState.stats[job.req1.stat] >= job.req1.value;
    const meetsReq2 = gameState.stats[job.req2.stat] >= job.req2.value;
    const requirementsMet = (meetsReq1 ? 1 : 0) + (meetsReq2 ? 1 : 0);
    
    if (requirementsMet === 0) return 10;
    if (requirementsMet === 1) return 8;
    return 6;
}

function showJobSelection(jobs) {
    const modal = document.getElementById('jobModal');
    const content = document.getElementById('jobModalContent');
    const helpButton = document.getElementById('helpButton');
    
    let jobCardsHTML = jobs.map((job, index) => {
        const meetsReq1 = gameState.stats[job.req1.stat] >= job.req1.value;
        const meetsReq2 = gameState.stats[job.req2.stat] >= job.req2.value;
        const requirementsMet = (meetsReq1 ? 1 : 0) + (meetsReq2 ? 1 : 0);
        const rollTarget = calculateRollTarget(job);
        
        let riskLevel = 'High Risk';
        if (requirementsMet === 1) riskLevel = 'Medium Risk';
        if (requirementsMet === 2) riskLevel = 'Low Risk';
        
        const blackMarketClass = job.blackMarket ? 'black-market' : '';
        const blackMarketRisk = job.blackMarket ? 
            `<div class="job-card-risk">⚠ Detection Risk: Roll ${job.detectionThreshold + 1}+ to avoid $${job.fine} fine</div>` : '';
        
        return `
            <div class="job-card ${blackMarketClass}" onclick="selectJob(${index})">
                <div class="job-card-emoji">${job.emoji}</div>
                <div class="job-card-title">${job.name}</div>
                <div class="job-card-requirements">
                    <div style="margin-bottom: 5px;">
                        ${meetsReq1 ? '✓' : '✗'} ${job.req1.stat.toUpperCase()} ${job.req1.value}+ 
                        <span style="color: #888;">(You: ${gameState.stats[job.req1.stat]})</span>
                    </div>
                    <div>
                        ${meetsReq2 ? '✓' : '✗'} ${job.req2.stat.toUpperCase()} ${job.req2.value}+ 
                        <span style="color: #888;">(You: ${gameState.stats[job.req2.stat]})</span>
                    </div>
                </div>
                <div class="job-card-roll">Need to roll ${rollTarget}+ on 2d6</div>
                <div class="job-card-modifier" style="color: ${requirementsMet === 2 ? '#00ff00' : requirementsMet === 1 ? '#ffa500' : '#ff0040'};">
                    ${riskLevel} - Meet ${requirementsMet}/2 requirements
                </div>
                ${blackMarketRisk}
                <div class="job-card-pay">Pay: $${job.pay}</div>
            </div>
        `;
    }).join('');
    
    content.innerHTML = `
        <div class="job-selection-header">
            <img src="assets/Lifework-Logo.png" class="modal-header-logo" alt="LifeWork Corporation">
            <div class="job-day">AVAILABLE JOBS TODAY</div>
            <div class="job-day">DAY ${String(gameState.day).padStart(2, '0')}</div>
        </div>
        <div class="job-cards-container">
            ${jobCardsHTML}
        </div>
    `;
    
    if (helpButton) {
        helpButton.style.display = 'block';
    }
    
    modal.style.display = 'flex';
    modal.dataset.jobs = JSON.stringify(jobs);
}

function toggleHelpPanel() {
    const panel = document.getElementById('helpPanel');
    if (panel) {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }
}

function selectJob(index) {
    AudioSystem.play('jobSelect');
    const jobs = JSON.parse(document.getElementById('jobModal').dataset.jobs);
    selectedJob = jobs[index];
    
    const helpButton = document.getElementById('helpButton');
    const helpPanel = document.getElementById('helpPanel');
    if (helpButton) helpButton.style.display = 'none';
    if (helpPanel) helpPanel.style.display = 'none';
    
    rollDice();
}

function rollDice() {
    const content = document.getElementById('jobModalContent');
    
    content.innerHTML = `
        <div class="dice-roll-container">
            <div class="dice-title">ROLLING...</div>
            <div class="dice-wrapper">
                <div class="dice" id="dice1">⚅</div>
                <div class="dice" id="dice2">⚅</div>
            </div>
            <div class="dice-total" id="diceTotal"></div>
        </div>
    `;
    
    setTimeout(() => {
        AudioSystem.play('diceRoll');
        const dice1 = document.getElementById('dice1');
        const dice2 = document.getElementById('dice2');
        
        dice1.classList.add('rolling');
        dice2.classList.add('rolling');
        
        setTimeout(() => {
            const roll1 = Math.floor(Math.random() * 6) + 1;
            const roll2 = Math.floor(Math.random() * 6) + 1;
            
            dice1.textContent = roll1;
            dice2.textContent = roll2;
            dice1.classList.remove('rolling');
            dice2.classList.remove('rolling');
            
            const total = roll1 + roll2;
            const target = calculateRollTarget(selectedJob);
            
            document.getElementById('diceTotal').innerHTML = `
                <div>Rolled: ${roll1} + ${roll2} = ${total}</div>
                <div>Target: ${target}+</div>
                <div class="final-roll">${total >= target ? 'SUCCESS!' : 'FAILED'}</div>
            `;
            
            setTimeout(() => {
                showJobResult(total, target);
            }, 2000);
        }, 1000);
    }, 500);
}

function showJobResult(diceTotal, target) {
    const success = diceTotal >= target;
    
    currentJobResult = {
        success: success,
        diceTotal: diceTotal,
        target: target
    };
    
    AudioSystem.play(success ? 'win' : 'fail');
    
    if (success && selectedJob.blackMarket) {
        setTimeout(() => showBlackMarketDetection(), 1000);
    } else {
        const content = document.getElementById('jobModalContent');
        content.innerHTML = `
            <div class="job-result ${success ? 'success' : 'failure'}">
                <div class="result-title">${success ? 'SUCCESS' : 'FAILED'}</div>
                <div class="result-detail">Needed ${target}+, Rolled ${diceTotal}</div>
            </div>
            <button class="action-button" onclick="processDayEnd()">VIEW DAY SUMMARY</button>
        `;
    }
}

function showBlackMarketDetection() {
    const content = document.getElementById('jobModalContent');
    
    content.innerHTML = `
        <div class="detection-roll-container">
            <div class="detection-title">⚠ EVADING DETECTION...</div>
            <div class="dice-wrapper">
                <div class="dice" id="detectionDice1">⚅</div>
                <div class="dice" id="detectionDice2">⚅</div>
            </div>
            <div class="dice-total" id="detectionTotal"></div>
        </div>
    `;
    
    setTimeout(() => {
        AudioSystem.play('diceRoll');
        const dice1 = document.getElementById('detectionDice1');
        const dice2 = document.getElementById('detectionDice2');
        
        dice1.classList.add('rolling');
        dice2.classList.add('rolling');
        
        setTimeout(() => {
            const roll1 = Math.floor(Math.random() * 6) + 1;
            const roll2 = Math.floor(Math.random() * 6) + 1;
            
            dice1.textContent = roll1;
            dice2.textContent = roll2;
            dice1.classList.remove('rolling');
            dice2.classList.remove('rolling');
            
            const total = roll1 + roll2;
            const caught = total <= selectedJob.detectionThreshold;
            
            currentJobResult.detectionRoll = total;
            currentJobResult.caught = caught;
            
            document.getElementById('detectionTotal').innerHTML = `
                <div>Rolled: ${roll1} + ${roll2} = ${total}</div>
                <div>Need: ${selectedJob.detectionThreshold + 1}+ to escape</div>
                <div class="final-roll">${caught ? 'CAUGHT!' : 'ESCAPED!'}</div>
            `;
            
            AudioSystem.play(caught ? 'fail' : 'win');
            
            setTimeout(() => {
                showDetectionResult(total, caught);
            }, 2000);
        }, 1000);
    }, 500);
}

function showDetectionResult(roll, caught) {
    const content = document.getElementById('jobModalContent');
    
    const fineText = caught ? 
        `<div class="fine-amount">Fine Applied: -$${selectedJob.fine}</div>` : 
        `<div style="color: #00ff00; font-size: 18px; margin-top: 10px;">Clean getaway!</div>`;
    
    content.innerHTML = `
        <div class="detection-result ${caught ? 'caught' : 'escaped'}">
            <div class="detection-result-title">${caught ? 'CAUGHT' : 'ESCAPED'}</div>
            <div class="detection-detail">Detection Roll: ${roll} / Need ${selectedJob.detectionThreshold + 1}+</div>
            ${fineText}
        </div>
        <button class="action-button" onclick="processDayEnd()">VIEW DAY SUMMARY</button>
    `;
}

function processDayEnd() {
    AudioSystem.play('click');
    document.getElementById('jobModal').style.display = 'none';
    
    const success = currentJobResult.success;
    let earnings = success ? selectedJob.pay : Math.floor(selectedJob.pay * 0.4);
    const bills = 50;
    
    let blackMarketFine = 0;
    if (selectedJob.blackMarket && success && currentJobResult.caught) {
        blackMarketFine = selectedJob.fine;
    }
    
    let eventCost = 0;
    let eventTitle = '';
    
    if (gameState.day >= 3 && Math.random() < 0.4 && !selectedJob.blackMarket) {
        const events = [
            { title: "Maintenance Required", cost: 60 },
            { title: "Emergency Medical", cost: 80 }
        ];
        const event = events[Math.floor(Math.random() * events.length)];
        eventCost = event.cost;
        eventTitle = event.title;
    }
    
    const previousState = JSON.parse(JSON.stringify(gameState));
    
    const leftover = earnings - bills - eventCost - blackMarketFine;
    gameState.balance += leftover;
    gameState.day++;
    
    const modal = document.getElementById('dayEndModal');
    const summary = document.getElementById('jobResultSummary');
    
    summary.className = 'job-result-summary ' + (success ? 'success' : 'failure');
    document.getElementById('resultStatus').textContent = success ? 'SUCCESS' : 'FAILED';
    document.getElementById('resultJobName').textContent = selectedJob.name;
    
    let rollText = `Rolled ${currentJobResult.diceTotal} / Target ${currentJobResult.target}+`;
    if (selectedJob.blackMarket && success) {
        rollText += ` | Detection: ${currentJobResult.detectionRoll} (${currentJobResult.caught ? 'CAUGHT' : 'ESCAPED'})`;
    }
    document.getElementById('resultRoll').textContent = rollText;
    
    document.getElementById('dayEndDay').textContent = `DAY ${String(gameState.day - 1).padStart(2, '0')}`;
    
    document.getElementById('dayEndEarnings').textContent = '+$' + earnings;
    document.getElementById('dayEndBills').textContent = '-$' + bills;
    
    const eventNotice = document.getElementById('eventNotice');
    const eventLine = document.getElementById('dayEndEventLine');
    
    if (blackMarketFine > 0) {
        eventNotice.style.display = 'block';
        eventLine.style.display = 'flex';
        document.getElementById('eventTitle').textContent = '⚠️ BLACK MARKET FINE';
        document.getElementById('eventCost').textContent = 'Penalty: $' + blackMarketFine;
        document.getElementById('dayEndEventCost').textContent = '-$' + blackMarketFine;
    } else if (eventCost > 0) {
        eventNotice.style.display = 'block';
        eventLine.style.display = 'flex';
        document.getElementById('eventTitle').textContent = '⚠️ ' + eventTitle;
        document.getElementById('eventCost').textContent = 'Deduction: $' + eventCost;
        document.getElementById('dayEndEventCost').textContent = '-$' + eventCost;
    } else {
        eventNotice.style.display = 'none';
        eventLine.style.display = 'none';
    }
    
    const netEl = document.getElementById('dayEndNet');
    netEl.textContent = (leftover >= 0 ? '+' : '') + '$' + leftover;
    netEl.className = 'breakdown-value ' + (leftover >= 0 ? 'positive' : 'negative');
    
    document.getElementById('dayEndBalance').textContent = 'CURRENT BALANCE: $' + gameState.balance;
    
    modal.style.display = 'flex';
    
    updateDisplay(previousState);
    saveGame();
    
    if (gameState.balance < -50) {
        setTimeout(() => {
            document.getElementById('dayEndModal').style.display = 'none';
            showGameOver();
        }, 1000);
    }
}

function closeDayEnd() {
    AudioSystem.play('click');
    document.getElementById('dayEndModal').style.display = 'none';
    selectedJob = null;
    currentJobResult = null;
}

function showGameOver() {
    AudioSystem.play('gameOver');
    const totalStats = Object.values(gameState.stats).reduce((a, b) => a + b, 0);
    const upgradeCount = Object.values(gameState.upgrades).filter(u => u).length;
    
    const modal = document.getElementById('gameOverModal');
    document.getElementById('gameOverDays').textContent = gameState.day;
    document.getElementById('gameOverBalance').textContent = `$${gameState.balance}`;
    document.getElementById('gameOverStats').textContent = totalStats;
    document.getElementById('gameOverUpgrades').textContent = `${upgradeCount}/6`;
    document.getElementById('gameOverStrength').textContent = gameState.stats.strength;
    document.getElementById('gameOverSpeed').textContent = gameState.stats.speed;
    document.getElementById('gameOverFocus').textContent = gameState.stats.focus;
    document.getElementById('gameOverEndurance').textContent = gameState.stats.endurance;
    
    modal.style.display = 'flex';
}

function restartFromGameOver() {
    AudioSystem.play('click');
    document.getElementById('gameOverModal').style.display = 'none';
    resetGame();
    showIntroSplash();
}

function quit() {
    AudioSystem.play('click');
    const totalStats = Object.values(gameState.stats).reduce((a, b) => a + b, 0);
    const upgradeCount = Object.values(gameState.upgrades).filter(u => u).length;
    
    const modal = document.getElementById('quitModal');
    document.getElementById('quitDays').textContent = gameState.day;
    document.getElementById('quitBalance').textContent = `$${gameState.balance}`;
    document.getElementById('quitStats').textContent = totalStats;
    document.getElementById('quitUpgrades').textContent = `${upgradeCount}/6`;
    document.getElementById('quitStrength').textContent = gameState.stats.strength;
    document.getElementById('quitSpeed').textContent = gameState.stats.speed;
    document.getElementById('quitFocus').textContent = gameState.stats.focus;
    document.getElementById('quitEndurance').textContent = gameState.stats.endurance;
    
    modal.style.display = 'flex';
}

function continueGame() {
    AudioSystem.play('click');
    document.getElementById('quitModal').style.display = 'none';
}

function confirmQuit() {
    AudioSystem.play('click');
    document.getElementById('quitModal').style.display = 'none';
    resetGame();
    showIntroSplash();
}

function resetGame() {
    gameState = {
        balance: 130,
        day: 1,
        stats: {
            strength: 5,
            speed: 5,
            focus: 5,
            endurance: 5
        },
        upgrades: {
            eyes: false,
            arm: false,
            legs: false,
            neural: false,
            torso: false,
            spine: false
        }
    };
    
    updateDisplay();
    saveGame();
    
    document.querySelectorAll('.upgrade-card').forEach(card => {
        card.classList.remove('purchased');
    });
}

function closeModal(modalType) {
    AudioSystem.play('click');
    if (modalType === 'upgrade') {
        document.getElementById('upgradeModal').style.display = 'none';
        selectedUpgrade = null;
    }
}

function updateDisplay(previousState = null) {
    const balanceEl = document.getElementById('balance');
    const newBalance = gameState.balance;
    
    if (previousState && previousState.balance !== newBalance) {
        const change = newBalance - previousState.balance;
        showBalanceChange(change);
        animateNumber(balanceEl, previousState.balance, newBalance);
    } else {
        balanceEl.textContent = `$${newBalance}`;
    }
    
    document.getElementById('day').textContent = String(gameState.day).padStart(2, '0');
    
    const stats = ['strength', 'speed', 'focus', 'endurance'];
    stats.forEach(stat => {
        const el = document.getElementById(stat);
        const newValue = gameState.stats[stat];
        
        if (previousState && previousState.stats[stat] !== newValue) {
            el.classList.add('flash-increase');
            setTimeout(() => {
                el.classList.remove('flash-increase');
            }, 600);
        }
        
        el.textContent = newValue;
    });
    
    updateStatBars();
    
    Object.entries(gameState.upgrades).forEach(([upgrade, purchased]) => {
        const card = document.querySelector(`[data-upgrade="${upgrade}"]`);
        if (card) {
            const upgradeInfo = upgradeData[upgrade];
            
            if (!upgradeInfo.available) {
                card.classList.add('locked');
            } else if (purchased) {
                card.classList.add('purchased');
            } else {
                card.classList.remove('purchased', 'locked');
            }
        }
    });
}

function saveGame() {
    try {
        localStorage.setItem('patchworkCyborg', JSON.stringify(gameState));
    } catch (e) {
        console.log('Could not save game');
    }
}

function loadGame() {
    try {
        const saved = localStorage.getItem('patchworkCyborg');
        if (saved) {
            const loaded = JSON.parse(saved);
            gameState = { ...gameState, ...loaded };
        }
    } catch (e) {
        console.log('Could not load game');
    }
}

function updateStatBars() {
    const maxStat = 20;
    ['strength', 'speed', 'focus', 'endurance'].forEach(stat => {
        const value = gameState.stats[stat];
        const percentage = (value / maxStat) * 100;
        const bar = document.getElementById(`${stat}-bar`);
        if (bar) {
            bar.style.width = percentage + '%';
        }
    });
}

function animateNumber(element, from, to, duration = 800) {
    const start = Date.now();
    const range = to - from;
    
    function update() {
        const now = Date.now();
        const progress = Math.min((now - start) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(from + (range * easeProgress));
        
        element.textContent = current >= 0 ? `$${current}` : `-$${Math.abs(current)}`;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function showBalanceChange(amount) {
    const balanceEl = document.getElementById('balance');
    const container = balanceEl.parentElement;
    
    if (getComputedStyle(container).position === 'static') {
        container.style.position = 'relative';
    }
    
    const indicator = document.createElement('div');
    indicator.className = `balance-change-indicator ${amount >= 0 ? 'gain' : 'loss'}`;
    indicator.textContent = amount >= 0 ? `+$${amount}` : `-$${Math.abs(amount)}`;
    
    container.appendChild(indicator);
    
    setTimeout(() => indicator.remove(), 1000);
}

const VideoSystem = {
    videos: {
        default: 'https://pub-761726dded894be79bd817c097520beb.r2.dev/human1.mp4',
        arm: 'https://pub-761726dded894be79bd817c097520beb.r2.dev/human-arm.mp4',
        eyes: 'https://pub-761726dded894be79bd817c097520beb.r2.dev/human-eye.mp4',
        legs: 'https://pub-761726dded894be79bd817c097520beb.r2.dev/human-leg.mp4'
    },
    
    currentDefault: 'default',
    elements: {},
    hoverTimeout: null,
    
    init() {
        console.log('Initializing video system...');
        this.createVideoElements();
        this.setupUpgradeHovers();
    },
    
    createVideoElements() {
        const characterModel = document.getElementById('character');
        if (!characterModel) {
            console.error('Character model not found');
            return;
        }
        
        const videoContainer = document.createElement('div');
        videoContainer.className = 'character-videos';
        
        Object.keys(this.videos).forEach(key => {
            const video = document.createElement('video');
            video.className = 'character-video';
            video.setAttribute('data-video-type', key);
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            
            const source = document.createElement('source');
            source.src = this.videos[key];
            source.type = 'video/mp4';
            
            video.appendChild(source);
            videoContainer.appendChild(video);
            
            this.elements[key] = video;
            
            video.addEventListener('loadeddata', () => {
                console.log(`Video loaded: ${key}`);
                if (key === 'default') {
                    this.showVideo('default');
                    characterModel.classList.add('video-loaded');
                }
            });
        });
        
        characterModel.appendChild(videoContainer);
    },
    
    showVideo(type) {
        console.log(`Showing video: ${type}`);
        Object.keys(this.elements).forEach(key => {
            const video = this.elements[key];
            if (key === type) {
                video.classList.add('active');
                video.classList.remove('preview');
            } else {
                video.classList.remove('active', 'preview');
            }
        });
        this.currentDefault = type;
    },
    
    showPreview(type) {
        if (!this.elements[type]) {
            console.log(`No video for type: ${type}`);
            return;
        }
        
        console.log(`Showing preview: ${type}`);
        
        if (this.elements[this.currentDefault]) {
            this.elements[this.currentDefault].classList.remove('active');
        }
        this.elements[type].classList.add('preview');
    },
    
    hidePreview() {
        console.log(`Hiding preview, returning to: ${this.currentDefault}`);
        
        Object.keys(this.elements).forEach(key => {
            this.elements[key].classList.remove('preview');
        });
        
        if (this.elements[this.currentDefault]) {
            this.elements[this.currentDefault].classList.add('active');
        }
    },
    
    setupUpgradeHovers() {
        const upgradeCards = document.querySelectorAll('.upgrade-card');
        
        upgradeCards.forEach(card => {
            const upgradeType = card.getAttribute('data-upgrade');
            
            if (this.videos[upgradeType]) {
                card.addEventListener('mouseenter', () => {
                    if (this.hoverTimeout) {
                        clearTimeout(this.hoverTimeout);
                    }
                    
                    this.hoverTimeout = setTimeout(() => {
                        this.showPreview(upgradeType);
                    }, 100);
                });
                
                card.addEventListener('mouseleave', () => {
                    if (this.hoverTimeout) {
                        clearTimeout(this.hoverTimeout);
                    }
                    
                    this.hidePreview();
                });
            }
        });
        
        console.log('Hover events set up for upgrade cards');
    },
    
    updateDefaultAfterPurchase(upgradeType) {
        if (this.videos[upgradeType]) {
            console.log(`Purchased ${upgradeType}, updating default video`);
            this.showVideo(upgradeType);
        } else {
            console.log(`No video available for ${upgradeType}, keeping current default`);
        }
    }
};