let gameState = {
    balance: 75,
    day: 1,
    stats: {
        strength: 12,
        speed: 8,
        focus: 15,
        endurance: 10
    },
    upgrades: {
        neural: false,
        arm: false,
        legs: false,
        torso: false,
        eyes: false,
        spine: false
    }
};

let selectedUpgrade = null;

// Upgrade data
const upgradeData = {
    neural: {
        title: "Neural Interface v2.1",
        subtitle: "Cognitive Enhancement System",
        description: "Advanced neural interface that directly connects to your brain stem, providing enhanced cognitive processing and reaction times. May cause mild headaches during initial integration period.",
        icon: "🧠",
        cost: 120,
        stats: { focus: 5, speed: 2 }
    },
    arm: {
        title: "Hydraulic Arm Enhancement",
        subtitle: "Mechanical Strength Augmentation",
        description: "Military-grade hydraulic actuators replace organic muscle tissue, providing superhuman strength capabilities. Requires regular maintenance and hydraulic fluid replacement.",
        icon: "🦾",
        cost: 85,
        stats: { strength: 8, speed: -1 }
    },
    legs: {
        title: "Sprint Boost Leg System",
        subtitle: "High-Performance Locomotion",
        description: "Carbon fiber reinforced leg replacements with integrated shock absorption and speed boosters. Allows for enhanced running speed and jumping capabilities.",
        icon: "🦿",
        cost: 150,
        stats: { speed: 6, endurance: 3 }
    },
    torso: {
        title: "Reinforced Core Module",
        subtitle: "Structural Enhancement Package",
        description: "Titanium-alloy ribcage replacement with integrated armor plating and organ protection systems. Significantly improves durability and core strength.",
        icon: "⚙️",
        cost: 95,
        stats: { endurance: 4, strength: 3 }
    },
    eyes: {
        title: "Optic Enhancement Suite",
        subtitle: "Visual Processing Upgrade",
        description: "Cybernetic eye replacements with zoom, night vision, and data overlay capabilities. Includes built-in targeting systems and threat assessment algorithms.",
        icon: "👁️",
        cost: 110,
        stats: { focus: 7, speed: 1 }
    },
    spine: {
        title: "Neural Spine Interface",
        subtitle: "Central Processing Enhancement",
        description: "Complete spinal cord replacement with fiber optic neural pathways. Dramatically improves reaction times and allows for direct machine interface capabilities.",
        icon: "🔗",
        cost: 200,
        stats: { focus: 8, speed: 5, strength: 2 }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
});

function initializeGame() {
    // Body part click handlers
    document.querySelectorAll('.body-part').forEach(part => {
        part.addEventListener('click', function() {
            const partName = this.dataset.part;
            showPartUpgrade(partName);
            this.classList.add('glitch');
            setTimeout(() => this.classList.remove('glitch'), 300);
        });
    });
    
    // Upgrade card click handlers
    document.querySelectorAll('.upgrade-card').forEach(card => {
        card.addEventListener('click', function() {
            const upgrade = this.dataset.upgrade;
            
            if (gameState.upgrades[upgrade]) {
                // Already purchased, just show glitch effect
                this.classList.add('glitch');
                setTimeout(() => this.classList.remove('glitch'), 300);
                return;
            }
            
            showUpgradeModal(upgrade);
        });
    });
    
    // Initialize display
    updateDisplay();
    
    // Add ambient animations
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
    
    // Update modal content
    document.getElementById('upgradeModalIcon').textContent = upgrade.icon;
    document.getElementById('upgradeModalTitle').textContent = upgrade.title;
    document.getElementById('upgradeModalSubtitle').textContent = upgrade.subtitle;
    document.getElementById('upgradeModalDescription').textContent = upgrade.description;
    document.getElementById('upgradeModalCost').textContent = `${upgrade.cost}`;
    
    // Clear and populate stats
    const statsGrid = document.querySelector('.upgrade-stats-grid');
    statsGrid.innerHTML = '';
    
    Object.entries(upgrade.stats).forEach(([stat, value]) => {
        const statDiv = document.createElement('div');
        statDiv.className = `upgrade-stat-item ${value > 0 ? 'positive' : 'negative'}`;
        statDiv.innerHTML = `
            <div class="stat-change">${value > 0 ? '+' : ''}${value}</div>
            <div class="stat-name">${stat.charAt(0).toUpperCase() + stat.slice(1)}</div>
        `;
        statsGrid.appendChild(statDiv);
    });
    
    // Update purchase button state
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
    
    // Show modal
    document.getElementById('upgradeModal').style.display = 'flex';
}

function purchaseUpgradeFromModal() {
    if (!selectedUpgrade) return;
    
    const upgrade = upgradeData[selectedUpgrade];
    
    if (gameState.balance >= upgrade.cost) {
        purchaseUpgrade(selectedUpgrade, upgrade.cost);
        closeModal('upgrade');
        
        // Update the card to show it's purchased
        const card = document.querySelector(`[data-upgrade="${selectedUpgrade}"]`);
        card.classList.add('purchased');
    }
}

function purchaseUpgrade(upgrade, cost) {
    gameState.balance -= cost;
    gameState.upgrades[upgrade] = true;
    
    // Apply stat bonuses
    const upgradeStats = upgradeData[upgrade].stats;
    Object.entries(upgradeStats).forEach(([stat, value]) => {
        gameState.stats[stat] += value;
    });
    
    updateDisplay();
}

function showPartUpgrade(part) {
    console.log(`Clicked on ${part} - would show specific upgrades for this body part`);
    // TODO: Filter upgrades by body part
}

function startDay() {
    // Calculate earnings based on stats
    const baseEarning = 100;
    const efficiency = Math.min((gameState.stats.strength + gameState.stats.speed + gameState.stats.focus + gameState.stats.endurance) / 50, 2);
    const earnings = Math.floor(baseEarning * efficiency);
    const bills = Math.floor(80 + (gameState.day * 5)); // Bills increase over time
    const leftover = earnings - bills;
    
    gameState.balance += leftover;
    gameState.day++;
    
    // Show results modal
    document.getElementById('modalEarnings').textContent = `${earnings}`;
    document.getElementById('modalBills').textContent = `${bills}`;
    document.getElementById('modalLeftover').textContent = `${leftover}`;
    document.getElementById('modalBalance').textContent = `${gameState.balance}`;
    
    document.getElementById('resultsModal').style.display = 'flex';
    updateDisplay();
}

function closeModal(modalType) {
    if (modalType === 'results') {
        document.getElementById('resultsModal').style.display = 'none';
    } else if (modalType === 'upgrade') {
        document.getElementById('upgradeModal').style.display = 'none';
        selectedUpgrade = null;
    }
}


// TODO: add quit (game over) functionality

function updateDisplay() {
    document.getElementById('balance').textContent = `${gameState.balance}`;
    document.getElementById('day').textContent = String(gameState.day).padStart(2, '0');
    
    document.getElementById('strength').textContent = gameState.stats.strength;
    document.getElementById('speed').textContent = gameState.stats.speed;
    document.getElementById('focus').textContent = gameState.stats.focus;
    document.getElementById('endurance').textContent = gameState.stats.endurance;
    
    const totalStats = Object.values(gameState.stats).reduce((a, b) => a + b, 0);
    const efficiency = Math.min(Math.floor((totalStats / 50) * 100), 200);
    document.getElementById('efficiency').textContent = `${efficiency}%`;
    
    // Update upgrade cards to show purchased state
    Object.entries(gameState.upgrades).forEach(([upgrade, purchased]) => {
        const card = document.querySelector(`[data-upgrade="${upgrade}"]`);
        if (card) {
            if (purchased) {
                card.classList.add('purchased');
            } else {
                card.classList.remove('purchased');
            }
        }
    });
}

// Game state persistence (optional)
function saveGame() {
    localStorage.setItem('patchworkCyborg', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('patchworkCyborg');
    if (saved) {
        gameState = JSON.parse(saved);
        updateDisplay();
    }
} b, 0);
    const efficiency = Math.min(Math.floor((totalStats / 50) * 100), 200);
    document.getElementById('efficiency').textContent = `${efficiency}%`;
}

// Game state persistence (optional)
function saveGame() {
    localStorage.setItem('patchworkCyborg', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('patchworkCyborg');
    if (saved) {
        gameState = JSON.parse(saved);
        updateDisplay();
    }
}