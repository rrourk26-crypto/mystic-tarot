/* ============================================================
   MYSTIC REALM — ELEMENTAL SYSTEM CORE
   ============================================================
   Reusable utilities for elemental calculations, readings,
   and integrations. No UI dependencies.
============================================================ */

(function () {
  'use strict';

  // Deterministic random based on seed (for reproducible results)
  function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  // Generate a reading based on time/date for consistency
  function getReadingSeed() {
    const now = new Date();
    return now.getFullYear() * 10000 + now.getMonth() * 100 + now.getDate();
  }

  // Calculate elemental balance (5 elements, distributed percentages)
  function calculateElementalBalance() {
    const seed = getReadingSeed();
    const elements = ['fire', 'water', 'air', 'earth', 'spirit'];
    const balance = {};

    // Generate weighted random distribution
    const raw = elements.map((el, idx) => seededRandom(seed + idx * 17));
    const total = raw.reduce((a, b) => a + b, 0);
    
    elements.forEach((el, idx) => {
      balance[el] = Math.round((raw[idx] / total) * 100);
    });

    // Adjust for rounding errors
    const sum = Object.values(balance).reduce((a, b) => a + b, 0);
    if (sum !== 100) {
      const diff = 100 - sum;
      balance[elements[0]] += diff;
    }

    return balance;
  }

  // Get primary and secondary elements
  function getElementalReading() {
    const balance = calculateElementalBalance();
    const sorted = Object.entries(balance)
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => ({ element: key, percentage: value }));

    return {
      primary: sorted[0].element,
      primaryPercentage: sorted[0].percentage,
      secondary: sorted[1].element,
      secondaryPercentage: sorted[1].percentage,
      balance: balance,
      sorted: sorted
    };
  }

  // Get compatibility between two elements
  function getElementCompatibility(element1, element2) {
    if (!ELEMENTAL_DATA) return null;

    const el1 = ELEMENTAL_DATA.getElement(element1);
    const el2 = ELEMENTAL_DATA.getElement(element2);

    if (!el1 || !el2) return null;

    // Use built-in compatibility descriptions
    const description = el1.element_compatibility[element2];
    
    // Determine compatibility level
    let level = 'neutral';
    if (el1.compatible && el1.compatible.includes(element2)) {
      level = 'harmonious';
    } else if (el1.challenging && el1.challenging.includes(element2)) {
      level = 'challenging';
    } else if (element1 === element2) {
      level = 'amplified';
    }

    return {
      element1: element1,
      element2: element2,
      level: level,
      description: description,
      el1: el1,
      el2: el2
    };
  }

  // Generate elemental oracle message
  function generateElementalOracle(question = null) {
    if (!ELEMENTAL_DATA) return null;

    const seed = getReadingSeed() + (question ? question.length : 0);
    const elements = ['fire', 'water', 'air', 'earth', 'spirit'];
    const selectedIdx = Math.floor(seededRandom(seed) * elements.length);
    const selectedElement = elements[selectedIdx];

    const messages = ELEMENTAL_DATA.ELEMENTAL_ORACLE_MESSAGES[selectedElement];
    if (!messages || messages.length === 0) return null;

    const messageSet = messages[0];
    const msgIdx = Math.floor(seededRandom(seed + 1) * messageSet.messages.length);

    return {
      element: selectedElement,
      elementData: ELEMENTAL_DATA.getElement(selectedElement),
      title: messageSet.title,
      message: messageSet.messages[msgIdx],
      action: messageSet.action,
      timestamp: new Date().toISOString()
    };
  }

  // Get element by zodiac sign
  function getElementalZodiac(zodiacSign) {
    if (!ELEMENTAL_DATA) return null;
    return ELEMENTAL_DATA.getElementByZodiac(zodiacSign);
  }

  // Get element by tarot suit
  function getElementalTarot(tarotSuit) {
    if (!ELEMENTAL_DATA) return null;
    return ELEMENTAL_DATA.getElementByTarotSuit(tarotSuit);
  }

  // Get all elements
  function getAllElements() {
    if (!ELEMENTAL_DATA) return [];
    return ELEMENTAL_DATA.getAllElements();
  }

  // Get single element
  function getElement(id) {
    if (!ELEMENTAL_DATA) return null;
    return ELEMENTAL_DATA.getElement(id);
  }

  // Calculate elemental influence from tarot cards
  function calculateTarotElementalInfluence(cards) {
    if (!ELEMENTAL_DATA || !cards || cards.length === 0) return null;

    const elementCount = {};
    const elementDetails = [];

    cards.forEach((card) => {
      // Try to extract suit from card name or data
      let suit = null;
      
      if (card.suit) {
        suit = card.suit;
      } else if (card.cardName) {
        // Parse suit from card name
        const name = String(card.cardName).toLowerCase();
        if (name.includes('wand')) suit = 'Wands';
        else if (name.includes('cup')) suit = 'Cups';
        else if (name.includes('sword')) suit = 'Swords';
        else if (name.includes('pentacle') || name.includes('coin')) suit = 'Pentacles';
      }

      if (suit) {
        const element = ELEMENTAL_DATA.getElementByTarotSuit(suit);
        if (element) {
          const elId = element.id;
          elementCount[elId] = (elementCount[elId] || 0) + 1;
          elementDetails.push({
            card: card.cardName || card.name || 'Unknown',
            suit: suit,
            element: elId,
            elementData: element
          });
        }
      }
    });

    // Sort by count
    const sorted = Object.entries(elementCount)
      .sort((a, b) => b[1] - a[1])
      .map(([el, count]) => ({
        element: el,
        count: count,
        percentage: Math.round((count / cards.length) * 100),
        elementData: ELEMENTAL_DATA.getElement(el)
      }));

    return {
      elementCount,
      sorted,
      details: elementDetails,
      dominantElement: sorted[0] ? sorted[0].element : null
    };
  }

  // Save elemental reading to history
  function saveElementalReading(readingData) {
    try {
      const history = JSON.parse(localStorage.getItem('mysticTarot_elementalHistory')) || [];
      const entry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        primary: readingData.primary,
        secondary: readingData.secondary,
        balance: readingData.balance,
        app: 'Elemental System'
      };
      history.push(entry);
      localStorage.setItem('mysticTarot_elementalHistory', JSON.stringify(history));
      return entry;
    } catch (e) {
      console.warn('Could not save elemental reading:', e);
      return null;
    }
  }

  // Load elemental readings from history
  function loadElementalReadingHistory() {
    try {
      return JSON.parse(localStorage.getItem('mysticTarot_elementalHistory')) || [];
    } catch (e) {
      console.warn('Could not load elemental reading history:', e);
      return [];
    }
  }

  // Export the API
  window.ELEMENTAL_CORE = {
    calculateElementalBalance,
    getElementalReading,
    getElementCompatibility,
    generateElementalOracle,
    getElementalZodiac,
    getElementalTarot,
    getAllElements,
    getElement,
    calculateTarotElementalInfluence,
    saveElementalReading,
    loadElementalReadingHistory,
    seededRandom,
    getReadingSeed
  };
})();
