let gameState = {
    balance: 90,
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
    { name: "Street Courier", pay: 45, req1: { stat: 'speed', value: 8 }, req2: { stat: 'endurance', value: 7 } },
    { name: "Data Heist", pay: 65, req1: { stat: 'focus', value: 9 }, req2: { stat: 'speed', value: 8 } },
    { name: "Bouncer Shift", pay: 50, req1: { stat: 'strength', value: 10 }, req2: { stat: 'endurance', value: 8 } },
    { name: "Netrunner Job", pay: 70, req1: { stat: 'focus', value: 11 }, req2: { stat: 'endurance', value: 6 } },
    { name: "Package Smuggle", pay: 55, req1: { stat: 'speed', value: 9 }, req2: { stat: 'focus', value: 7 } },
    { name: "Body Guard", pay: 60, req1: { stat: 'strength', value: 9 }, req2: { stat: 'focus', value: 8 } },
    { name: "Repo Work", pay: 75, req1: { stat: 'strength', value: 11 }, req2: { stat: 'speed', value: 9 } },
    { name: "Corp Infiltration", pay: 80, req1: { stat: 'focus', value: 10 }, req2: { stat: 'speed', value: 10 } }
];

document.addEventListener('DOMContentLoaded', function() {
    loadGame();
    showIntroSplash();
});

const introLines = [
    "The year is 2099.",
    "Location: New Naarm.",
    "",
    "LifeWork owns everything.",
    "The jobs. Your house. The platform.",
    "",
    "Every day, LifeWork posts gigs.",
    "You take what you can get.",
    "",
    "Your meat body can barely keep up.",
    "",
    "Luckily, LifeWork sells the solution:",
    "Cybernetic upgrades. Synthetic limbs. Bio-enhancements.",
    "",
    "Upgrade your body.",
    "Take the jobs you can handle.",
    "Pay your rent.",
    "",
    "Rent is $85 per day.",
    "You have $90.",
    "",
    "If your balance hits zero,",
    "you're sent to a LifeWork labor camp.",
    "",
    "Survive the grind."
];

let typewriterActive = false;

function showIntroSplash() {
    const modal = document.getElementById('splashModal');
    modal.style.display = 'flex';
    typewriterActive = true;
    typeIntroText();
}

function typeIntroText() {
    const textEl = document.getElementById('introText');
    const startButton = document.getElementById('startButton');
    let currentLine = 0;
    let currentChar = 0;
    let currentText = '';
    
    function typeNextChar() {
        if (!typewriterActive) return;
        
        if (currentLine >= introLines.length) {
            startButton.style.display = 'block';
            return;
        }
        
        const line = introLines[currentLine];
        
        if (currentChar < line.length) {
            currentText += line[currentChar];
            textEl.innerHTML = currentText.split('\n').map(l => `<p>${l}</p>`).join('');
            currentChar++;
            setTimeout(typeNextChar, 30);
        } else {
            currentText += '\n';
            currentLine++;
            currentChar = 0;
            setTimeout(typeNextChar, line === '' ? 100 : 400);
        }
    }
    
    typeNextChar();
}

function skipIntro() {
    typewriterActive = false;
    const textEl = document.getElementById('introText');
    const startButton = document.getElementById('startButton');
    textEl.innerHTML = introLines.map(line => `<p>${line}</p>`).join('');
    startButton.style.display = 'block';
}

function startGame() {
    document.getElementById('splashModal').style.display = 'none';
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
                this.classList.add('glitch');
                setTimeout(() => this.classList.remove('glitch'), 300);
                return;
            }
            
            if (gameState.upgrades[upgrade]) {
                this.classList.add('glitch');
                setTimeout(() => this.classList.remove('glitch'), 300);
                return;
            }
            
            showUpgradeModal(upgrade);
        });
    });
    
    updateDisplay();
    
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
        
        closeModal('upgrade');
        updateDisplay(previousState);
        saveGame();
    }
}

function startDay() {
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
    
    let jobCardsHTML = jobs.map((job, index) => {
        const meetsReq1 = gameState.stats[job.req1.stat] >= job.req1.value;
        const meetsReq2 = gameState.stats[job.req2.stat] >= job.req2.value;
        const requirementsMet = (meetsReq1 ? 1 : 0) + (meetsReq2 ? 1 : 0);
        const rollTarget = calculateRollTarget(job);
        
        let riskLevel = 'High Risk';
        if (requirementsMet === 1) riskLevel = 'Medium Risk';
        if (requirementsMet === 2) riskLevel = 'Low Risk';
        
        return `
            <div class="job-card" onclick="selectJob(${index})">
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
                <div class="job-card-pay">Pay: $${job.pay}</div>
            </div>
        `;
    }).join('');
    
    content.innerHTML = `
        <div class="job-selection-header">
            <div class="job-day">DAY ${String(gameState.day).padStart(2, '0')} - CHOOSE YOUR GIG</div>
        </div>
        <div class="job-cards-container">
            ${jobCardsHTML}
        </div>
    `;
    
    modal.style.display = 'flex';
    modal.dataset.jobs = JSON.stringify(jobs);
}

function selectJob(index) {
    const jobs = JSON.parse(document.getElementById('jobModal').dataset.jobs);
    selectedJob = jobs[index];
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
                processJobResult(total, target);
            }, 2000);
        }, 1000);
    }, 500);
}

function processJobResult(diceTotal, target) {
    const success = diceTotal >= target;
    const earnings = success ? selectedJob.pay : Math.floor(selectedJob.pay * 0.4);
    const bills = Math.floor(80 + (gameState.day * 5));
    
    let eventHTML = '';
    let eventCost = 0;
    
    if (gameState.day >= 5 && Math.random() < 0.4) {
        const events = [
            { title: "Maintenance Required", cost: 60 },
            { title: "Rent Increase", cost: 0, billIncrease: 15 },
            { title: "Emergency Medical", cost: 80 }
        ];
        const event = events[Math.floor(Math.random() * events.length)];
        eventCost = event.cost;
        
        eventHTML = `
            <div class="event-alert">
                <div class="event-title">⚠️ ${event.title}</div>
                <div class="event-cost">Cost: $${event.cost}</div>
            </div>
        `;
    }
    
    const previousState = JSON.parse(JSON.stringify(gameState));
    
    const leftover = earnings - bills - eventCost;
    gameState.balance += leftover;
    gameState.day++;
    
    const content = document.getElementById('jobModalContent');
    content.innerHTML = `
        <div class="job-result ${success ? 'success' : 'failure'}">
            <div class="result-title">${success ? 'SUCCESS' : 'FAILED'}</div>
            <div class="result-detail">Needed ${target}+, Rolled ${diceTotal}</div>
        </div>
        ${eventHTML}
        <div class="daily-tally">
            <div class="tally-title">DAILY TALLY</div>
            <div class="tally-line">
                <span>Earnings:</span>
                <span class="tally-positive">$${earnings}</span>
            </div>
            <div class="tally-line">
                <span>Bills:</span>
                <span class="tally-negative">-$${bills}</span>
            </div>
            ${eventCost > 0 ? `
            <div class="tally-line">
                <span>Event:</span>
                <span class="tally-negative">-$${eventCost}</span>
            </div>
            ` : ''}
            <div class="tally-separator"></div>
            <div class="tally-line tally-total">
                <span>Net:</span>
                <span class="${leftover >= 0 ? 'tally-positive' : 'tally-negative'}">${leftover >= 0 ? '+' : ''}$${leftover}</span>
            </div>
            <div class="tally-line tally-balance">
                <span>New Balance:</span>
                <span>$${gameState.balance}</span>
            </div>
        </div>
        <button class="action-button" onclick="closeJobModal()">CONTINUE</button>
    `;
    
    updateDisplay(previousState);
    saveGame();
    
    if (gameState.balance < -50) {
        setTimeout(() => {
            showGameOver();
        }, 1000);
    }
}

function showGameOver() {
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
    document.getElementById('gameOverModal').style.display = 'none';
    resetGame();
    showIntroSplash();
}

function closeJobModal() {
    document.getElementById('jobModal').style.display = 'none';
    selectedJob = null;
}

function quit() {
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
    document.getElementById('quitModal').style.display = 'none';
}

function confirmQuit() {
    document.getElementById('quitModal').style.display = 'none';
    resetGame();
    showIntroSplash();
}

function resetGame() {
    gameState = {
        balance: 90,
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
    if (modalType === 'upgrade') {
        document.getElementById('upgradeModal').style.display = 'none';
        selectedUpgrade = null;
    }
}

function updateDisplay(previousState = null) {
    const balanceEl = document.getElementById('balance');
    const newBalance = gameState.balance;
    
    if (previousState && previousState.balance !== newBalance) {
        if (newBalance > previousState.balance) {
            balanceEl.classList.add('flash-gain');
        } else {
            balanceEl.classList.add('flash-loss');
        }
        setTimeout(() => {
            balanceEl.classList.remove('flash-gain', 'flash-loss');
        }, 600);
    }
    
    balanceEl.textContent = `$${newBalance}`;
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