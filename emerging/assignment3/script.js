// All the messages and prompts as data
const conversation = [
    {
        type: 'prompt',
        text: '💬 New response from Compliance.AI • Click to read'
    },
    {
        type: 'message',
        avatar: 'ai',
        avatarText: 'HR',
        username: 'Compliance.AI',
        isAI: true,
        timestamp: '9:24 AM',
        content: `<p><strong>Terminology violation detected.</strong> Phrases flagged: "his mom died", "guy's been solid", "can we do"</p>
        <p>Contractor #47829 = 47 days delinquent. Mandatory termination protocols initiated.</p>
        <div class="options-box">
            <p><strong>OPTION A:</strong> Asset reclamation (arm + leg). Housing termination.</p>
            <p><strong>OPTION B:</strong> Labour camp placement. 15-year minimum. Assets retained.</p>
        </div>
        <p>Contractor has 72 hours to respond. Platform access suspended. All gigs cancelled.</p>`
    },
    {
        type: 'prompt',
        text: '💬 New response from Marcus Chen • Click to continue'
    },
    {
        type: 'message',
        avatar: 'human',
        avatarText: 'MC',
        avatarImage: 'https://pub-de2c4bff858e4780bed5cf1c911d1333.r2.dev/marcus.png',
        username: 'Marcus Chen',
        badge: 'SUPPORT',
        badgeColor: '#8b5cf6',
        isAI: false,
        timestamp: '9:27 AM',
        content: `<p>Wait. You're going to take his LIMBS? Or send him to a labour camp? He's already working again. This is insane.</p>
        <p>@Executive.AI can someone human review this?</p>`
    },
    {
        type: 'prompt',
        text: '💬 Executive.AI is responding • Click to read'
    },
    {
        type: 'message',
        avatar: 'ai-exec',
        avatarText: 'AI',
        username: 'Executive.AI',
        isAI: true,
        timestamp: '9:28 AM',
        content: `<p>I am always monitoring, Marcus.</p>
        <p>Extensions create precedent. Q4 2042: we granted 3 extensions. Result: extension requests ↑34%, revenue ↓$4.7M. Policy corrected 2043.</p>
        <p>His platform inactivity cost us $340 in lost fees. His 3 warehouse shifts will generate $47. Math doesn't work.</p>
        <p>Contractor #47829 signed the agreement. He knew the terms.</p>
        <p><strong>Your options:</strong></p>
        <p>1. Call him. Deliver the notification. Use approved language.<br>
        2. Refuse. Your contract gets reviewed for "emotional volatility."</p>
        <p>Choose by EOD.</p>`
    },
    {
        type: 'prompt',
        text: '💬 Marcus Chen responded • Click to read'
    },
    {
        type: 'message',
        avatar: 'human',
        avatarText: 'MC',
        avatarImage: 'https://pub-de2c4bff858e4780bed5cf1c911d1333.r2.dev/marcus.png',
        username: 'Marcus Chen',
        badge: 'SUPPORT',
        badgeColor: '#8b5cf6',
        isAI: false,
        timestamp: '2:41 PM',
        content: `<p>I'll make the call.</p>`
    },
    {
        type: 'prompt',
        text: '💬 Final message from Executive.AI • Click to read'
    },
    {
        type: 'message',
        avatar: 'ai-exec',
        avatarText: 'AI',
        username: 'Executive.AI',
        isAI: true,
        timestamp: '2:42 PM',
        content: `<p>Good choice. Performance evaluation updated: initial resistance, ultimate compliance.</p>
        <p>Reminder: CalmMind AI counseling is available if you need support processing this decision.</p>
        <p>Keep building tomorrow's workforce. 💼</p>`
    }
];

let currentStep = 0;
const dynamicContent = document.getElementById('dynamicContent');
const messagesContainer = document.getElementById('messagesContainer');

function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator(avatarClass, avatarText, avatarImage) {
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.id = 'currentTyping';
    
    const avatarHTML = avatarImage 
        ? `<div class="avatar ${avatarClass}"><img src="${avatarImage}" alt="${avatarText}"></div>`
        : `<div class="avatar ${avatarClass}">${avatarText}</div>`;
    
    typing.innerHTML = `
        ${avatarHTML}
        <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    dynamicContent.appendChild(typing);
    scrollToBottom();
}

function removeTypingIndicator() {
    const typing = document.getElementById('currentTyping');
    if (typing) {
        typing.remove();
    }
}

function showMessage(messageData) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    
    const avatarHTML = messageData.avatarImage 
        ? `<div class="avatar ${messageData.avatar}"><img src="${messageData.avatarImage}" alt="${messageData.avatarText}"></div>`
        : `<div class="avatar ${messageData.avatar}">${messageData.avatarText}</div>`;
    
    const badgeHTML = messageData.badge 
        ? `<span style="color: ${messageData.badgeColor}; font-size: 10px; padding: 2px 6px; border-radius: 3px; font-weight: 700; background: rgba(139, 92, 246, 0.2);">${messageData.badge}</span>`
        : '';
    
    messageDiv.innerHTML = `
        ${avatarHTML}
        <div class="message-content">
            <div class="message-header">
                <span class="username">${messageData.username}</span>
                ${badgeHTML}
                ${messageData.isAI ? '<span class="ai-badge">AI</span>' : ''}
                <span class="timestamp">${messageData.timestamp}</span>
            </div>
            <div class="message-text">
                ${messageData.content}
            </div>
        </div>
    `;
    dynamicContent.appendChild(messageDiv);
    scrollToBottom();
}

function showPrompt(promptText) {
    const promptDiv = document.createElement('div');
    promptDiv.className = 'notification-prompt';
    promptDiv.textContent = promptText;
    promptDiv.onclick = handlePromptClick;
    dynamicContent.appendChild(promptDiv);
    scrollToBottom();
}

function handlePromptClick(event) {
    // Remove the clicked prompt
    event.target.remove();
    
    // Show typing indicator
    const nextMessage = conversation[currentStep + 1];
    if (nextMessage && nextMessage.type === 'message') {
        showTypingIndicator(nextMessage.avatar, nextMessage.avatarText, nextMessage.avatarImage);
        
        // After 2 seconds, show the message
        setTimeout(() => {
            removeTypingIndicator();
            showMessage(nextMessage);
            currentStep += 2; // Skip the message we just showed
            
            // Show next prompt if there is one
            if (currentStep < conversation.length) {
                setTimeout(() => {
                    showPrompt(conversation[currentStep].text);
                }, 500);
            }
        }, 2000);
    }
}

// Initialize - show first prompt
window.addEventListener('load', function() {
    setTimeout(() => {
        showPrompt(conversation[0].text);
    }, 500);
});