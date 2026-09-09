/* ============================================================
   MYSTIC REALM — ELEMENTAL SYSTEM CONTROLLER
   ============================================================
   Main UI logic and interaction handler for the Elements page.
============================================================ */

(function () {
  'use strict';

  let currentSection = 'explore';

  // Initialize the page
  function init() {
    setupEventListeners();
    showSection('explore');
  }

  // Setup all event listeners
  function setupEventListeners() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const section = btn.dataset.section;
        showSection(section);
      });
    });

    const revealBtn = document.getElementById('revealBtn');
    if (revealBtn) {
      revealBtn.addEventListener('click', generateReading);
    }

    const askBtn = document.getElementById('askBtn');
    if (askBtn) {
      askBtn.addEventListener('click', generateOracle);
    }

    const compatibilityBtn = document.getElementById('compatibilityBtn');
    if (compatibilityBtn) {
      compatibilityBtn.addEventListener('click', generateCompatibility);
    }

    const backBtn = document.querySelector('.back-button');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.history.back();
      });
    }
  }

  // Show/hide sections
  function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section) => {
      section.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(`${sectionName}-section`);
    if (selectedSection) {
      selectedSection.classList.add('active');
    }

    // Update nav buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach((btn) => {
      btn.classList.remove('active');
      if (btn.dataset.section === sectionName) {
        btn.classList.add('active');
      }
    });

    currentSection = sectionName;

    // Initialize section-specific content
    if (sectionName === 'explore') {
      renderElementCards();
    } else if (sectionName === 'reading') {
      // Clear previous reading
      const resultDiv = document.getElementById('readingResult');
      if (resultDiv) {
        resultDiv.innerHTML = '';
      }
    }
  }

  // Render element exploration cards
  function renderElementCards() {
    const container = document.getElementById('elementCardsContainer');
    if (!container || !ELEMENTAL_CORE || !ELEMENTAL_DATA) return;

    const elements = ELEMENTAL_CORE.getAllElements();
    container.innerHTML = '';

    elements.forEach((element) => {
      const card = document.createElement('div');
      card.className = `element-card ${element.id}`;
      card.innerHTML = `
        <span class="element-icon">${element.emoji}</span>
        <h3 class="element-name">${element.name}</h3>
        <p class="element-description">${element.description}</p>
        <div class="element-details">
          <div class="element-detail-row">
            <span class="element-detail-label">Direction:</span>
            <span class="element-detail-value">${element.direction}</span>
          </div>
          <div class="element-detail-row">
            <span class="element-detail-label">Season:</span>
            <span class="element-detail-value">${element.season}</span>
          </div>
          <div class="element-detail-row">
            <span class="element-detail-label">Time:</span>
            <span class="element-detail-value">${element.timeOfDay}</span>
          </div>
          <div class="element-detail-row">
            <span class="element-detail-label">Tarot Suit:</span>
            <span class="element-detail-value">${element.tarotSuitEmoji} ${element.tarotSuit}</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        showElementDetail(element);
      });

      container.appendChild(card);
    });
  }

  // Show detailed element information in a modal/expanded view
  function showElementDetail(element) {
    const modal = document.getElementById('elementDetailModal');
    if (!modal) return;

    const detailContent = document.getElementById('elementDetailContent');
    if (detailContent) {
      detailContent.innerHTML = `
        <button class="back-button" onclick="document.getElementById('elementDetailModal').style.display='none'">← Back</button>
        <div style="margin-top: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 4em; margin-bottom: 15px;">${element.emoji}</div>
            <h2 style="font-family: 'Creepster', cursive; font-size: 2.5em; margin: 0; color: ${element.color};">${element.name}</h2>
          </div>

          <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: var(--air-color); margin-top: 0;">Description</h3>
            <p style="color: #c9b9d2; line-height: 1.7;">${element.description}</p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
            <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 15px;">
              <h4 style="color: ${element.color}; margin-top: 0;">Strengths</h4>
              <ul style="margin: 10px 0; padding-left: 20px; color: #c9b9d2;">
                ${element.strengths.map((s) => `<li>${s}</li>`).join('')}
              </ul>
            </div>

            <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 15px;">
              <h4 style="color: ${element.color}; margin-top: 0;">Weaknesses</h4>
              <ul style="margin: 10px 0; padding-left: 20px; color: #c9b9d2;">
                ${element.weaknesses.map((w) => `<li>${w}</li>`).join('')}
              </ul>
            </div>
          </div>

          <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: var(--air-color); margin-top: 0;">Themes & Emotions</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
              <div>
                <h4 style="color: #b0a0cc; margin: 0 0 10px 0;">Themes</h4>
                <p style="color: #c9b9d2; margin: 0;">${element.themes.join(', ')}</p>
              </div>
              <div>
                <h4 style="color: #b0a0cc; margin: 0 0 10px 0;">Emotions</h4>
                <p style="color: #c9b9d2; margin: 0;">${element.emotions.join(', ')}</p>
              </div>
            </div>
          </div>

          <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 20px; margin-bottom: 20px;">
            <h3 style="color: var(--air-color); margin-top: 0;">Mystical & Spiritual</h3>
            <div style="margin-top: 15px;">
              <h4 style="color: #b0a0cc; margin: 0 0 10px 0;">Mystical Meaning</h4>
              <p style="color: #c9b9d2; margin: 0 0 15px 0;">${element.mysticalMeaning}</p>
              
              <h4 style="color: #b0a0cc; margin: 0 0 10px 0;">Spiritual Meaning</h4>
              <p style="color: #c9b9d2; margin: 0;">${element.spiritualMeaning}</p>
            </div>
          </div>

          <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 20px;">
            <h3 style="color: var(--air-color); margin-top: 0;">Affirmation</h3>
            <p style="font-style: italic; color: #c9b9d2; line-height: 1.7; margin: 15px 0 0 0;">"${element.affirmation}"</p>
          </div>
        </div>
      `;
    }

    modal.style.display = 'flex';
  }

  // Generate elemental reading
  function generateReading() {
    if (!ELEMENTAL_CORE) return;

    const reading = ELEMENTAL_CORE.getElementalReading();
    const resultDiv = document.getElementById('readingResult');
    if (!resultDiv) return;

    const primaryEl = ELEMENTAL_CORE.getElement(reading.primary);
    const secondaryEl = ELEMENTAL_CORE.getElement(reading.secondary);

    let html = `
      <div class="reading-result">
        <h2 class="reading-title">✨ Your Elemental Reading</h2>
        
        <div class="element-display">
          <div class="element-icon">${primaryEl.emoji}</div>
          <div class="element-display-info">
            <h3>${primaryEl.name}</h3>
            <p>Your Primary Element</p>
          </div>
        </div>

        <p style="color: #c9b9d2; line-height: 1.8; font-size: 1.05em; margin-bottom: 30px;">
          You carry the nature of ${primaryEl.name}: ${primaryEl.themes.slice(0, 3).join(', ').toLowerCase()}. 
          ${primaryEl.description}
        </p>

        <h3 style="color: var(--air-color); margin-bottom: 15px;">Your Elemental Balance</h3>
        <div class="balance-container">
    `;

    reading.sorted.forEach((item) => {
      const el = ELEMENTAL_CORE.getElement(item.element);
      html += `
        <div class="balance-bar ${item.element}">
          <span class="balance-label">${el.emoji} ${el.name}</span>
          <div class="balance-track">
            <div class="balance-fill" style="width: ${item.percentage}%;">${item.percentage}%</div>
          </div>
        </div>
      `;
    });

    html += `
        </div>

        <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 20px; margin-top: 30px;">
          <h3 style="color: var(--air-color); margin-top: 0;">Your Secondary Element</h3>
          <p style="color: #c9b9d2; margin-bottom: 15px;">
            <span style="font-size: 1.5em;">${secondaryEl.emoji}</span>
            <strong>${secondaryEl.name}</strong> complements your primary element, adding:
          </p>
          <p style="color: #c9b9d2; line-height: 1.7;">
            ${secondaryEl.description}
          </p>
        </div>
      </div>
    `;

    resultDiv.innerHTML = html;

    // Save to history
    ELEMENTAL_CORE.saveElementalReading(reading);
  }

  // Generate elemental oracle message
  function generateOracle() {
    if (!ELEMENTAL_CORE) return;

    const questionInput = document.getElementById('oracleQuestion');
    const question = questionInput ? questionInput.value : null;

    const oracle = ELEMENTAL_CORE.generateElementalOracle(question);
    if (!oracle) return;

    const resultDiv = document.getElementById('oracleResult');
    if (!resultDiv) return;

    const html = `
      <div class="oracle-response ${oracle.element}">
        <div class="oracle-title">
          <span class="element-icon">${oracle.elementData.emoji}</span>
          <span>${oracle.title}</span>
        </div>

        <p class="oracle-message">
          "${oracle.message}"
        </p>

        <div class="oracle-action">
          <strong>Suggested Action:</strong> ${oracle.action}
        </div>

        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255, 215, 0, 0.2);">
          <p style="color: #b0a0cc; font-size: 0.9em; margin: 0;">
            <strong>Affirmation:</strong> "${oracle.elementData.affirmation}"
          </p>
        </div>
      </div>
    `;

    resultDiv.innerHTML = html;
  }

  // Generate compatibility reading
  function generateCompatibility() {
    if (!ELEMENTAL_CORE) return;

    const el1Select = document.getElementById('element1Select');
    const el2Select = document.getElementById('element2Select');

    if (!el1Select || !el2Select) return;

    const el1 = el1Select.value;
    const el2 = el2Select.value;

    if (!el1 || !el2) {
      alert('Please select two elements');
      return;
    }

    const compatibility = ELEMENTAL_CORE.getElementCompatibility(el1, el2);
    if (!compatibility) return;

    const resultDiv = document.getElementById('compatibilityResult');
    if (!resultDiv) return;

    let levelColor = '#ffd700';
    let levelText = 'Neutral';

    if (compatibility.level === 'harmonious') {
      levelColor = '#52a552';
      levelText = '🌱 Harmonious';
    } else if (compatibility.level === 'challenging') {
      levelColor = '#ff6b35';
      levelText = '⚡ Challenging (Growth)';
    } else if (compatibility.level === 'amplified') {
      levelColor = '#c77dff';
      levelText = '✨ Amplified';
    }

    const html = `
      <div class="reading-result">
        <h2 class="reading-title">Element Compatibility</h2>

        <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 20px; align-items: center; margin-bottom: 30px;">
          <div style="text-align: center;">
            <div style="font-size: 3.5em; margin-bottom: 10px;">${compatibility.el1.emoji}</div>
            <h3 style="color: ${compatibility.el1.color}; margin: 0;">${compatibility.el1.name}</h3>
          </div>

          <div style="text-align: center;">
            <div style="font-size: 2em; color: var(--air-color);">+</div>
          </div>

          <div style="text-align: center;">
            <div style="font-size: 3.5em; margin-bottom: 10px;">${compatibility.el2.emoji}</div>
            <h3 style="color: ${compatibility.el2.color}; margin: 0;">${compatibility.el2.name}</h3>
          </div>
        </div>

        <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 20px; margin-bottom: 30px; border-left: 4px solid ${levelColor};">
          <h3 style="color: ${levelColor}; margin-top: 0; margin-bottom: 15px;">Compatibility Level: ${levelText}</h3>
          <p style="color: #c9b9d2; line-height: 1.8; margin: 0; font-size: 1.05em;">
            ${compatibility.description}
          </p>
        </div>

        <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 20px;">
          <h3 style="color: var(--air-color); margin-top: 0;">Understanding This Pairing</h3>
          <p style="color: #c9b9d2; line-height: 1.7; margin: 0;">
            The combination of ${compatibility.el1.name} and ${compatibility.el2.name} creates a unique dynamic. 
            ${compatibility.el1.name}'s ${compatibility.el1.themes.slice(0, 2).join(' and ')} meet 
            ${compatibility.el2.name}'s ${compatibility.el2.themes.slice(0, 2).join(' and ')}, resulting in 
            ${compatibility.description.toLowerCase().replace(/^the /, '')}.
          </p>
        </div>
      </div>
    `;

    resultDiv.innerHTML = html;
  }

  // Close detail modal on outside click
  function setupModalClose() {
    const modal = document.getElementById('elementDetailModal');
    if (modal) {
      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    }
  }

  // Public API for closing modal
  window.closeElementModal = function () {
    const modal = document.getElementById('elementDetailModal');
    if (modal) {
      modal.style.display = 'none';
    }
  };

  // Public API for showing sections
  window.showElementsSection = function (sectionName) {
    showSection(sectionName);
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  setupModalClose();
})();
