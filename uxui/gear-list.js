// Gear List JavaScript

// State
let gearListData = {
  id: null,
  tripContext: null,
  groupMembers: [],
  items: [],
  createdAt: null,
  lastModified: null
};

// Gear templates based on difficulty
const GEAR_TEMPLATES = {
  easy: {
    'Navigation': [
      { item: 'Map & compass', weight: 0.2 },
      { item: 'GPS device or phone', weight: 0.2 },
      { item: 'Trail guide', weight: 0.1 }
    ],
    'Safety': [
      { item: 'First aid kit', weight: 0.5 },
      { item: 'Emergency whistle', weight: 0.05 },
      { item: 'Headlamp with spare batteries', weight: 0.3 }
    ],
    'Shelter': [
      { item: 'Tent', weight: 2.0, quantity: 1 },
      { item: 'Sleeping bag', weight: 1.0 },
      { item: 'Sleeping mat', weight: 0.5 }
    ],
    'Clothing': [
      { item: 'Hiking boots', weight: 1.2 },
      { item: 'Rain jacket', weight: 0.4 },
      { item: 'Warm layers', weight: 0.5 },
      { item: 'Sun hat', weight: 0.1 },
      { item: 'Sunglasses', weight: 0.05 }
    ],
    'Food & Water': [
      { item: 'Water bottles (2L+)', weight: 0.3, quantity: 2 },
      { item: 'Water filter/purifier', weight: 0.3, quantity: 1 },
      { item: 'Stove & fuel', weight: 0.5, quantity: 1 },
      { item: 'Cooking pot', weight: 0.4, quantity: 1 }
    ],
    'Personal': [
      { item: 'Sunscreen', weight: 0.1 },
      { item: 'Insect repellent', weight: 0.1 },
      { item: 'Toilet paper & trowel', weight: 0.1 },
      { item: 'Personal medications', weight: 0.1 }
    ]
  },
  moderate: {
    'Navigation': [
      { item: 'Topographic map', weight: 0.2 },
      { item: 'Compass', weight: 0.1 },
      { item: 'GPS device', weight: 0.3 },
      { item: 'PLB or satellite messenger', weight: 0.3, quantity: 1 }
    ],
    'Safety': [
      { item: 'Comprehensive first aid kit', weight: 0.8 },
      { item: 'Emergency whistle', weight: 0.05 },
      { item: 'Fire starter', weight: 0.1, quantity: 1 },
      { item: 'Emergency blanket', weight: 0.2 },
      { item: 'Headlamp with spare batteries', weight: 0.3 }
    ],
    'Shelter': [
      { item: 'Tent with guy lines', weight: 2.5, quantity: 1 },
      { item: 'Sleeping bag (appropriate rating)', weight: 1.2 },
      { item: 'Sleeping mat', weight: 0.6 },
      { item: 'Tent repair kit', weight: 0.2, quantity: 1 }
    ],
    'Clothing': [
      { item: 'Hiking boots (broken in)', weight: 1.2 },
      { item: 'Rain jacket & pants', weight: 0.7 },
      { item: 'Insulating layers', weight: 0.6 },
      { item: 'Base layers', weight: 0.4 },
      { item: 'Gaiters', weight: 0.2 },
      { item: 'Sun hat', weight: 0.1 },
      { item: 'Warm hat', weight: 0.1 },
      { item: 'Gloves', weight: 0.1 }
    ],
    'Food & Water': [
      { item: 'Water bottles/bladder (3L+)', weight: 0.4, quantity: 2 },
      { item: 'Water filter/purifier', weight: 0.3, quantity: 1 },
      { item: 'Stove & fuel', weight: 0.6, quantity: 1 },
      { item: 'Cooking pot', weight: 0.5, quantity: 1 },
      { item: 'Utensils', weight: 0.1, quantity: 1 }
    ],
    'Personal': [
      { item: 'Sunscreen (SPF 50+)', weight: 0.15 },
      { item: 'Insect repellent', weight: 0.1 },
      { item: 'Toilet paper & trowel', weight: 0.15 },
      { item: 'Personal hygiene items', weight: 0.2 },
      { item: 'Personal medications', weight: 0.1 },
      { item: 'Blister treatment', weight: 0.1 }
    ]
  },
  hard: {
    'Navigation': [
      { item: 'Topographic maps (waterproof)', weight: 0.3 },
      { item: 'Compass', weight: 0.1 },
      { item: 'GPS device with extra batteries', weight: 0.5 },
      { item: 'PLB or satellite messenger', weight: 0.3, quantity: 1 },
      { item: 'Altimeter', weight: 0.1 }
    ],
    'Safety': [
      { item: 'Advanced first aid kit', weight: 1.2 },
      { item: 'Emergency whistle', weight: 0.05 },
      { item: 'Fire starter (multiple methods)', weight: 0.2, quantity: 1 },
      { item: 'Emergency blanket', weight: 0.2 },
      { item: 'Headlamp + backup light', weight: 0.4 },
      { item: 'Knife/multi-tool', weight: 0.2 },
      { item: 'Repair kit (tent, stove, etc.)', weight: 0.3, quantity: 1 }
    ],
    'Shelter': [
      { item: '4-season tent', weight: 3.0, quantity: 1 },
      { item: 'Sleeping bag (temp rated)', weight: 1.5 },
      { item: 'Insulated sleeping mat', weight: 0.8 },
      { item: 'Tent stakes for all conditions', weight: 0.3, quantity: 1 },
      { item: 'Extra cord', weight: 0.2, quantity: 1 }
    ],
    'Clothing': [
      { item: 'Mountaineering boots', weight: 1.5 },
      { item: 'Waterproof jacket & pants (quality)', weight: 1.0 },
      { item: 'Insulating layers (multiple)', weight: 0.8 },
      { item: 'Base layers (merino/synthetic)', weight: 0.5 },
      { item: 'Gaiters', weight: 0.3 },
      { item: 'Sun protection', weight: 0.15 },
      { item: 'Warm hat & gloves', weight: 0.2 },
      { item: 'Extra socks', weight: 0.3 }
    ],
    'Food & Water': [
      { item: 'Water capacity 4L+', weight: 0.5, quantity: 2 },
      { item: 'Water filter & purification tablets', weight: 0.4, quantity: 1 },
      { item: 'Reliable stove system', weight: 0.7, quantity: 1 },
      { item: 'Fuel (extra)', weight: 0.5, quantity: 1 },
      { item: 'Cooking pot & utensils', weight: 0.6, quantity: 1 }
    ],
    'Personal': [
      { item: 'Sunscreen & lip balm (high SPF)', weight: 0.2 },
      { item: 'Insect repellent', weight: 0.1 },
      { item: 'Sanitation supplies', weight: 0.2 },
      { item: 'Personal medications', weight: 0.15 },
      { item: 'Blister kit', weight: 0.15 },
      { item: 'Moleskin', weight: 0.1 }
    ]
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initGearList();
});

function initGearList() {
  const urlParams = new URLSearchParams(window.location.search);
  const listId = urlParams.get('list');
  
  // Check for trip context from planning page
  const tripDuration = urlParams.get('tripDuration');
  const difficulty = urlParams.get('difficulty');
  const season = urlParams.get('season');
  const parkId = urlParams.get('parkId');
  const groupSize = urlParams.get('groupSize');
  
  if (tripDuration) {
    gearListData.tripContext = {
      tripDuration: parseInt(tripDuration),
      difficulty: difficulty || 'moderate',
      season: season || 'summer',
      parkId: parkId || null,
      groupSize: parseInt(groupSize) || 1
    };
    displayTripContext();
    displaySmartSuggestions();
    displayFoodPlanning();
    displayParkRequirements();
  }
  
  if (listId) {
    loadGearList(listId);
  } else {
    gearListData.id = generateListId();
    initializeDefaultGearList();
  }
  
  renderGearList();
  updateAllSummaries();
}

function generateListId() {
  return 'gear-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

function initializeDefaultGearList() {
  const difficulty = gearListData.tripContext?.difficulty || 'moderate';
  const template = GEAR_TEMPLATES[difficulty];
  
  gearListData.items = [];
  Object.keys(template).forEach(category => {
    template[category].forEach(templateItem => {
      gearListData.items.push({
        category: category,
        item: templateItem.item,
        assignedTo: null,
        weight: templateItem.weight || null,
        quantity: templateItem.quantity || 1,
        checked: false
      });
    });
  });
  
  gearListData.createdAt = new Date().toISOString();
}

// Display trip context
function displayTripContext() {
  const context = gearListData.tripContext;
  if (!context) return;
  
  const container = document.getElementById('tripContext');
  const detailsDiv = document.getElementById('tripContextDetails');
  
  let parkName = 'Unknown Park';
  if (context.parkId && typeof PARKS !== 'undefined') {
    const park = PARKS.find(p => p.id === context.parkId);
    parkName = park ? park.name : context.parkId;
  }
  
  detailsDiv.innerHTML = `
    <div class="context-detail">
      <span class="context-label">Duration:</span>
      <span class="context-value">${context.tripDuration} days</span>
    </div>
    <div class="context-detail">
      <span class="context-label">Difficulty:</span>
      <span class="context-value">${context.difficulty.charAt(0).toUpperCase() + context.difficulty.slice(1)}</span>
    </div>
    <div class="context-detail">
      <span class="context-label">Season:</span>
      <span class="context-value">${context.season.charAt(0).toUpperCase() + context.season.slice(1)}</span>
    </div>
    <div class="context-detail">
      <span class="context-label">Park:</span>
      <span class="context-value">${parkName}</span>
    </div>
    <div class="context-detail">
      <span class="context-label">Group Size:</span>
      <span class="context-value">${context.groupSize} people</span>
    </div>
  `;
  
  container.style.display = 'block';
}

// Display smart suggestions
function displaySmartSuggestions() {
  const context = gearListData.tripContext;
  if (!context) return;
  
  const container = document.getElementById('smartSuggestions');
  const listDiv = document.getElementById('suggestionsList');
  
  const suggestions = [];
  
  // Food calculation
  const personDays = context.tripDuration * context.groupSize;
  const estimatedFoodWeight = personDays * 1; // 1kg per person per day
  suggestions.push({
    icon: '🍽️',
    text: `Estimated food needed: ~${estimatedFoodWeight}kg total (${personDays} person-days × 1kg/day)`
  });
  
  // Water capacity
  const waterPerPerson = context.difficulty === 'hard' ? 4 : context.difficulty === 'moderate' ? 3 : 2;
  const totalWaterCapacity = waterPerPerson * context.groupSize;
  suggestions.push({
    icon: '💧',
    text: `Minimum water capacity: ${totalWaterCapacity}L total (${waterPerPerson}L per person for ${context.difficulty} terrain)`
  });
  
  // Difficulty-specific suggestions
  if (context.difficulty === 'hard') {
    suggestions.push({
      icon: '📡',
      text: 'PLB or satellite messenger highly recommended for remote/alpine terrain'
    });
    suggestions.push({
      icon: '🧭',
      text: 'Advanced navigation skills required - carry backup navigation tools'
    });
  }
  
  // Season-specific
  if (context.season === 'summer') {
    suggestions.push({
      icon: '🦟',
      text: 'Summer season: Pack insect repellent and fly nets - peak fly season'
    });
  } else if (context.season === 'winter') {
    suggestions.push({
      icon: '❄️',
      text: 'Winter conditions: 4-season tent and cold-rated sleeping bag essential'
    });
  }
  
  listDiv.innerHTML = suggestions.map(s => `
    <div class="suggestion-item">
      <span class="suggestion-icon">${s.icon}</span>
      <span>${s.text}</span>
    </div>
  `).join('');
  
  container.style.display = 'block';
}

// Display food planning
function displayFoodPlanning() {
  const context = gearListData.tripContext;
  if (!context) return;
  
  const section = document.getElementById('foodPlanningSection');
  const container = document.getElementById('foodPlanning');
  
  const personDays = context.tripDuration * context.groupSize;
  const mealsPerPerson = context.tripDuration;
  
  container.innerHTML = `
    <div class="food-grid">
      <div class="food-stat">
        <div class="food-stat-label">Breakfasts</div>
        <div class="food-stat-value">${mealsPerPerson}</div>
        <div class="food-stat-label" style="margin-top: 0.25rem;">per person</div>
      </div>
      <div class="food-stat">
        <div class="food-stat-label">Lunches</div>
        <div class="food-stat-value">${mealsPerPerson}</div>
        <div class="food-stat-label" style="margin-top: 0.25rem;">per person</div>
      </div>
      <div class="food-stat">
        <div class="food-stat-label">Dinners</div>
        <div class="food-stat-value">${mealsPerPerson}</div>
        <div class="food-stat-label" style="margin-top: 0.25rem;">per person</div>
      </div>
    </div>
    <div class="food-note">
      💡 <strong>Total person-days: ${personDays}</strong><br>
      Plan for ~1kg of food per person per day = ${personDays}kg total food weight. Don't forget snacks and emergency rations!
    </div>
  `;
  
  section.style.display = 'block';
}

// Display park requirements
function displayParkRequirements() {
  const context = gearListData.tripContext;
  if (!context || !context.parkId || typeof PARKS === 'undefined') return;
  
  const park = PARKS.find(p => p.id === context.parkId);
  if (!park) return;
  
  const container = document.getElementById('parkRequirements');
  const listDiv = document.getElementById('parkRequirementsList');
  
  const requirements = [];
  
  // Park-specific requirements based on your PARKS data
  if (context.parkId === 'alpine-np') {
    requirements.push('PLB or satellite messenger required for remote alpine routes');
    requirements.push('Navigation skills essential - tracks poorly marked in wilderness areas');
    requirements.push('Check weather forecasts - conditions change rapidly at altitude');
  } else if (context.parkId === 'wilsons-prom') {
    requirements.push('Tide tables required for beach crossings (Little Waterloo Bay)');
    requirements.push('Note: Sealers Cove boardwalk currently closed (adds 14km detour)');
    requirements.push('All waste must be carried out - no bins at campsites');
  } else if (context.parkId === 'grampians') {
    requirements.push('Total Fire Ban may be in effect - check current conditions');
    requirements.push('Water can be scarce - carry extra capacity');
    requirements.push('All waste must be packed out');
  }
  
  if (requirements.length > 0) {
    listDiv.innerHTML = requirements.map(req => `
      <div class="requirement-item">
        <strong>⚠️ ${park.name}</strong>
        ${req}
      </div>
    `).join('');
    container.style.display = 'block';
  }
}

// Group members management
function addGroupMember() {
  document.getElementById('addMemberModal').style.display = 'flex';
  document.getElementById('newMemberName').value = '';
  document.getElementById('newMemberName').focus();
}

function confirmAddMember() {
  const name = document.getElementById('newMemberName').value.trim();
  if (!name) return;
  
  if (!gearListData.groupMembers.includes(name)) {
    gearListData.groupMembers.push(name);
    renderGroupMembers();
    saveGearListToStorage();
    updateAllSummaries();
  }
  
  closeAddMemberModal();
}

function closeAddMemberModal() {
  document.getElementById('addMemberModal').style.display = 'none';
}

function removeGroupMember(name) {
  if (!confirm(`Remove ${name} from the group? Their gear assignments will be cleared.`)) return;
  
  gearListData.groupMembers = gearListData.groupMembers.filter(m => m !== name);
  
  // Clear assignments for removed member
  gearListData.items.forEach(item => {
    if (item.assignedTo === name) {
      item.assignedTo = null;
    }
  });
  
  renderGroupMembers();
  renderGearList();
  saveGearListToStorage();
  updateAllSummaries();
}

function renderGroupMembers() {
  const container = document.getElementById('groupMembersList');
  
  if (gearListData.groupMembers.length === 0) {
    container.innerHTML = '<div class="add-member-placeholder" onclick="addGroupMember()">+ Add group members</div>';
    return;
  }
  
  container.innerHTML = gearListData.groupMembers.map(member => `
    <div class="member-tag">
      ${member}
      <button onclick="removeGroupMember('${member}')">
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  `).join('');
}

// Render gear list
function renderGearList() {
  const container = document.getElementById('gearItemsList');
  
  // Group items by category
  const categories = {};
  gearListData.items.forEach(item => {
    if (!categories[item.category]) {
      categories[item.category] = [];
    }
    categories[item.category].push(item);
  });
  
  container.innerHTML = Object.keys(categories).map(category => {
    const items = categories[category];
    return `
      <div class="gear-category">
        <div class="category-header">${category}</div>
        ${items.map((item, idx) => renderGearItem(item, idx)).join('')}
      </div>
    `;
  }).join('');
  
  renderGroupMembers();
}

function renderGearItem(item, idx) {
  const itemIndex = gearListData.items.indexOf(item);
  const membersOptions = gearListData.groupMembers.map(m => 
    `<option value="${m}" ${item.assignedTo === m ? 'selected' : ''}>${m}</option>`
  ).join('');
  
  return `
    <div class="gear-item ${item.checked ? 'checked' : ''}">
      <input type="checkbox" ${item.checked ? 'checked' : ''} 
        onchange="toggleGearItem(${itemIndex})">
      <span class="gear-item-name">${item.item}</span>
      <select class="gear-select" onchange="assignGearItem(${itemIndex}, this.value)">
        <option value="">Unassigned</option>
        <option value="shared">Shared</option>
        ${membersOptions}
      </select>
      <input type="number" class="gear-quantity" value="${item.quantity || 1}" 
        min="1" onchange="updateQuantity(${itemIndex}, this.value)">
      <input type="number" step="0.1" class="gear-weight" value="${item.weight || ''}" 
        placeholder="kg" onchange="updateWeight(${itemIndex}, this.value)">
      <button class="delete-gear-item" onclick="deleteGearItem(${itemIndex})">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
      </button>
    </div>
  `;
}

function toggleGearItem(index) {
  gearListData.items[index].checked = !gearListData.items[index].checked;
  renderGearList();
  saveGearListToStorage();
  updateAllSummaries();
}

function assignGearItem(index, assignee) {
  gearListData.items[index].assignedTo = assignee || null;
  saveGearListToStorage();
  updateAllSummaries();
}

function updateQuantity(index, quantity) {
  gearListData.items[index].quantity = parseInt(quantity) || 1;
  saveGearListToStorage();
}

function updateWeight(index, weight) {
  gearListData.items[index].weight = parseFloat(weight) || null;
  saveGearListToStorage();
  updateAllSummaries();
}

function deleteGearItem(index) {
  if (!confirm('Remove this item from the list?')) return;
  gearListData.items.splice(index, 1);
  renderGearList();
  saveGearListToStorage();
  updateAllSummaries();
}

function addCustomGearItem() {
  const itemName = prompt('Enter gear item name:');
  if (!itemName) return;
  
  const category = prompt('Category (or press OK for "Custom"):') || 'Custom';
  
  gearListData.items.push({
    category: category,
    item: itemName,
    assignedTo: null,
    weight: null,
    quantity: 1,
    checked: false
  });
  
  renderGearList();
  saveGearListToStorage();
}

// Update summaries
function updateAllSummaries() {
  updateWeightSummary();
  updatePackingStatus();
}

function updateWeightSummary() {
  const container = document.getElementById('weightSummary');
  
  // Calculate weight per person
  const weightByPerson = {};
  let totalWeight = 0;
  
  gearListData.groupMembers.forEach(member => {
    weightByPerson[member] = 0;
  });
  
  gearListData.items.forEach(item => {
    if (item.weight && item.assignedTo && item.assignedTo !== 'shared') {
      const itemWeight = item.weight * (item.quantity || 1);
      weightByPerson[item.assignedTo] = (weightByPerson[item.assignedTo] || 0) + itemWeight;
      totalWeight += itemWeight;
    } else if (item.weight && item.assignedTo === 'shared') {
      totalWeight += item.weight * (item.quantity || 1);
    }
  });
  
  if (gearListData.groupMembers.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: #6b7280; font-size: 0.875rem;">Add group members to see weight distribution</p>';
    return;
  }
  
  const maxRecommended = 15; // kg
  
  container.innerHTML = gearListData.groupMembers.map(member => {
    const weight = weightByPerson[member] || 0;
    const percentage = (weight / maxRecommended) * 100;
    const barClass = percentage > 100 ? 'danger' : percentage > 80 ? 'warning' : '';
    
    return `
      <div class="weight-person">
        <div class="weight-person-header">
          <span class="weight-person-name">${member}</span>
          <span class="weight-person-total">${weight.toFixed(1)} kg</span>
        </div>
        <div class="weight-bar">
          <div class="weight-bar-fill ${barClass}" style="width: ${Math.min(percentage, 100)}%"></div>
        </div>
        <div class="weight-note">${percentage > 100 ? '⚠️ Over recommended weight' : percentage > 80 ? '⚠️ Approaching max weight' : 'Good weight distribution'}</div>
      </div>
    `;
  }).join('') + `
    <div class="total-weight">
      <div class="total-weight-label">Total Group Weight</div>
      <div class="total-weight-value">${totalWeight.toFixed(1)} kg</div>
    </div>
  `;
}

function updatePackingStatus() {
  const container = document.getElementById('packingStatus');
  
  const totalItems = gearListData.items.length;
  const packedItems = gearListData.items.filter(i => i.checked).length;
  const assignedItems = gearListData.items.filter(i => i.assignedTo).length;
  
  const packedPercentage = totalItems > 0 ? (packedItems / totalItems) * 100 : 0;
  const assignedPercentage = totalItems > 0 ? (assignedItems / totalItems) * 100 : 0;
  
  const unassignedItems = gearListData.items.filter(i => !i.assignedTo);
  
  container.innerHTML = `
    <div class="status-progress">
      <div class="status-label">
        <span class="status-label-text">Items Packed</span>
        <span class="status-label-value">${packedItems}/${totalItems}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width: ${packedPercentage}%"></div>
      </div>
    </div>
    <div class="status-progress">
      <div class="status-label">
        <span class="status-label-text">Items Assigned</span>
        <span class="status-label-value">${assignedItems}/${totalItems}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width: ${assignedPercentage}%"></div>
      </div>
    </div>
    ${unassignedItems.length > 0 ? `
      <div class="unassigned-items">
        <div class="unassigned-title">⚠️ Unassigned Items (${unassignedItems.length})</div>
        <div class="unassigned-list">
          ${unassignedItems.slice(0, 5).map(i => `• ${i.item}`).join('<br>')}
          ${unassignedItems.length > 5 ? `<br>... and ${unassignedItems.length - 5} more` : ''}
        </div>
      </div>
    ` : ''}
  `;
}

// Storage functions
function saveGearListToStorage() {
  gearListData.lastModified = new Date().toISOString();
  localStorage.setItem(`gearList-${gearListData.id}`, JSON.stringify(gearListData));
}

function loadGearList(listId) {
  const saved = localStorage.getItem(`gearList-${listId}`);
  if (saved) {
    gearListData = JSON.parse(saved);
  }
}

// Save gear list
function saveGearList() {
  saveGearListToStorage();
  alert('Gear list saved successfully!');
}

// Share gear list
function shareGearList() {
  saveGearListToStorage();
  const shareUrl = `${window.location.origin}${window.location.pathname}?list=${gearListData.id}`;
  document.getElementById('shareLink').value = shareUrl;
  document.getElementById('shareModal').style.display = 'flex';
}

function closeShareModal() {
  document.getElementById('shareModal').style.display = 'none';
}

function copyShareLink() {
  const input = document.getElementById('shareLink');
  input.select();
  document.execCommand('copy');
  alert('Link copied! Share this with your hiking partners.');
}

// Export functions
function exportGearList() {
  const exportData = {
    ...gearListData,
    exportedAt: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `gear-list-${gearListData.id}.json`;
  a.click();
  URL.revokeObjectURL(url);
  
  alert('Gear list exported! You can import this file later or share it with your group.');
}

function printGearList() {
  window.print();
}

// Allow Enter key to add member
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const modal = document.getElementById('addMemberModal');
    if (modal.style.display === 'flex') {
      confirmAddMember();
    }
  }
});