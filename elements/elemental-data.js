/* ============================================================
   MYSTIC REALMS — ELEMENTAL SYSTEM DATA
   ============================================================
   Core elemental profiles, associations, and metadata.
   Self-contained data layer for the Elemental module.
============================================================ */

(function () {
  'use strict';

  const ELEMENTS = {
    fire: {
      id: 'fire',
      name: 'Fire',
      emoji: '🔥',
      symbol: '🜂',
      color: '#ff6b35',
      colorLight: '#ff9d5c',
      colorDark: '#cc3300',
      glowColor: 'rgba(255, 107, 53, 0.4)',
      description:
        'The element of passion, transformation, and creative will. Fire consumes, illuminates, and renews.',
      themes: ['Passion', 'Action', 'Transformation', 'Courage', 'Will', 'Creativity'],
      strengths: [
        'Bold action',
        'Creative power',
        'Infectious enthusiasm',
        'Rapid transformation',
        'Leadership',
        'Courage'
      ],
      weaknesses: [
        'Impulsiveness',
        'Impatience',
        'Destructive tendencies',
        'Arrogance',
        'Burnout',
        'Hasty decisions'
      ],
      emotions: ['Passion', 'Enthusiasm', 'Anger', 'Courage', 'Ambition', 'Excitement'],
      direction: 'South',
      season: 'Summer',
      timeOfDay: 'Noon',
      tarotSuit: 'Wands',
      tarotSuitEmoji: '🪵',
      astroSigns: ['Aries', 'Leo', 'Sagittarius'],
      mysticalMeaning:
        'Fire represents the spark of consciousness, the will to exist, and the power to transform matter into energy.',
      spiritualMeaning:
        'Fire is the flame of divinity within all things. It is the heat of passion that drives transformation and rebirth.',
      compatible: ['air', 'wood'],
      challenging: ['water', 'earth'],
      affirmation: "I am the spark of creation. I act with courage and passion.",
      element_compatibility: {
        fire: 'Amplified power, but risk of burnout',
        water: 'Steam and transformation; tension and growth',
        air: 'Blazing brilliance; ideas ignited into action',
        earth: 'Stability through discipline; slow, steady power',
        spirit: 'Divine spark; consciousness awakening'
      }
    },

    water: {
      id: 'water',
      name: 'Water',
      emoji: '💧',
      symbol: '🜄',
      color: '#00a8e8',
      colorLight: '#33c3ff',
      colorDark: '#0066b3',
      glowColor: 'rgba(0, 168, 232, 0.4)',
      description:
        'The element of emotion, intuition, and the subconscious. Water flows, nurtures, and reveals hidden depths.',
      themes: [
        'Emotion',
        'Intuition',
        'Dreams',
        'Healing',
        'Adaptability',
        'Mystery'
      ],
      strengths: [
        'Deep intuition',
        'Emotional intelligence',
        'Adaptability',
        'Healing power',
        'Nurturing nature',
        'Psychic sensitivity'
      ],
      weaknesses: [
        'Emotional overwhelm',
        'Passivity',
        'Escapism',
        'Difficulty setting boundaries',
        'Hypersensitivity',
        'Stagnation'
      ],
      emotions: [
        'Compassion',
        'Sadness',
        'Joy',
        'Fear',
        'Love',
        'Melancholy'
      ],
      direction: 'West',
      season: 'Autumn',
      timeOfDay: 'Dusk',
      tarotSuit: 'Cups',
      tarotSuitEmoji: '🥤',
      astroSigns: ['Cancer', 'Scorpio', 'Pisces'],
      mysticalMeaning:
        'Water is the mirror of the soul, reflecting the subconscious mind and the emotional realms beyond the material world.',
      spiritualMeaning:
        'Water is the vessel of the Divine. It cleanses, heals, and contains all possibilities within its depths.',
      compatible: ['earth', 'wood'],
      challenging: ['fire', 'air'],
      affirmation: "I trust my intuition. I flow with grace and healing.",
      element_compatibility: {
        fire: 'Steam and transformation; tension and growth',
        water: 'Emotional depths; intuitive resonance',
        air: 'Emotional clarity; intuition meeting intellect',
        earth: 'Deep stability; nourishment and growth',
        spirit: 'Cosmic ocean; unity consciousness'
      }
    },

    air: {
      id: 'air',
      name: 'Air',
      emoji: '🌬️',
      symbol: '🜁',
      color: '#ffd700',
      colorLight: '#ffea99',
      colorDark: '#ccaa00',
      glowColor: 'rgba(255, 215, 0, 0.4)',
      description:
        'The element of thought, communication, and perception. Air moves swiftly, connects all things, and carries the power of the word.',
      themes: ['Thought', 'Communication', 'Knowledge', 'Freedom', 'Ideas', 'Perception'],
      strengths: [
        'Intellectual power',
        'Clear communication',
        'Curiosity',
        'Adaptability',
        'Freedom-loving',
        'Quick thinking'
      ],
      weaknesses: [
        'Mental overthinking',
        'Restlessness',
        'Detachment',
        'Indecision',
        'Gossip',
        'Lack of grounding'
      ],
      emotions: ['Joy', 'Clarity', 'Anxiety', 'Curiosity', 'Skepticism', 'Playfulness'],
      direction: 'East',
      season: 'Spring',
      timeOfDay: 'Dawn',
      tarotSuit: 'Swords',
      tarotSuitEmoji: '⚔️',
      astroSigns: ['Gemini', 'Libra', 'Aquarius'],
      mysticalMeaning:
        'Air is the carrier of thought and spirit. It connects the material and immaterial worlds, and carries messages between realms.',
      spiritualMeaning:
        'Air is the breath of life, the Holy Spirit moving through all existence. It is truth, clarity, and divine communication.',
      compatible: ['fire', 'water'],
      challenging: ['earth', 'water'],
      affirmation: "My thoughts are clear and powerful. I speak my truth.",
      element_compatibility: {
        fire: 'Blazing brilliance; ideas ignited into action',
        water: 'Emotional clarity; intuition meeting intellect',
        air: 'Mental vortex; ideas upon ideas',
        earth: 'Ideas becoming reality; imagination grounded',
        spirit: 'Higher thought; cosmic intelligence'
      }
    },

    earth: {
      id: 'earth',
      name: 'Earth',
      emoji: '🌍',
      symbol: '🜃',
      color: '#228b22',
      colorLight: '#52a552',
      colorDark: '#0d5f0d',
      glowColor: 'rgba(34, 139, 34, 0.4)',
      description:
        'The element of stability, grounding, and material reality. Earth supports all life and manifests the invisible into form.',
      themes: ['Stability', 'Grounding', 'Material Reality', 'Patience', 'Growth', 'Endurance'],
      strengths: [
        'Stability',
        'Practicality',
        'Patience',
        'Reliability',
        'Material mastery',
        'Grounding energy'
      ],
      weaknesses: [
        'Rigidity',
        'Stubbornness',
        'Excessive materialism',
        'Lack of imagination',
        'Inertia',
        'Resistance to change'
      ],
      emotions: [
        'Contentment',
        'Frustration',
        'Security',
        'Heaviness',
        'Peace',
        'Stubbornness'
      ],
      direction: 'North',
      season: 'Winter',
      timeOfDay: 'Midnight',
      tarotSuit: 'Pentacles',
      tarotSuitEmoji: '💰',
      astroSigns: ['Taurus', 'Virgo', 'Capricorn'],
      mysticalMeaning:
        'Earth is the final form of manifestation, where all potential becomes real. It is the body, the home, the sanctuary.',
      spiritualMeaning:
        'Earth is the Divine made manifest. It is the sacred ground upon which all spiritual practice must be rooted.',
      compatible: ['water', 'fire'],
      challenging: ['air', 'fire'],
      affirmation: "I am grounded, stable, and whole. I manifest my dreams into reality.",
      element_compatibility: {
        fire: 'Stability through discipline; slow, steady power',
        water: 'Deep stability; nourishment and growth',
        air: 'Ideas becoming reality; imagination grounded',
        earth: 'Solid foundation; deep manifestation',
        spirit: 'Sacred ground; divine embodiment'
      }
    },

    spirit: {
      id: 'spirit',
      name: 'Spirit',
      emoji: '✨',
      symbol: '✦',
      color: '#9d4edd',
      colorLight: '#c77dff',
      colorDark: '#5a189a',
      glowColor: 'rgba(157, 78, 221, 0.4)',
      description:
        'The fifth element, the unifying force. Spirit connects all elements and transcends the material plane.',
      themes: [
        'Consciousness',
        'Connection',
        'Mystery',
        'Higher Awareness',
        'Balance',
        'The Unknown'
      ],
      strengths: [
        'Spiritual awareness',
        'Unity consciousness',
        'Transcendence',
        'Balance',
        'Divine connection',
        'Inner peace'
      ],
      weaknesses: [
        'Disconnection from reality',
        'Spiritual bypassing',
        'Loss of individuality',
        'Confusion',
        'Dissociation',
        'Overwhelm'
      ],
      emotions: [
        'Awe',
        'Connection',
        'Transcendence',
        'Peace',
        'Wonder',
        'Dissolution'
      ],
      direction: 'Center',
      season: 'All Seasons',
      timeOfDay: 'Eternal Now',
      tarotSuit: 'Major Arcana',
      tarotSuitEmoji: '🃏',
      astroSigns: ['All Signs'],
      mysticalMeaning:
        'Spirit is the hidden thread connecting all existence. It is the source from which all elements emerge and to which they return.',
      spiritualMeaning:
        'Spirit is God, Allah, Brahman, the Tao—the ultimate reality beyond form. It is both the journey and the destination.',
      compatible: ['all'],
      challenging: ['none'],
      affirmation: "I am one with all existence. I am Spirit experiencing itself.",
      element_compatibility: {
        fire: 'Divine spark; consciousness awakening',
        water: 'Cosmic ocean; unity consciousness',
        air: 'Higher thought; cosmic intelligence',
        earth: 'Sacred ground; divine embodiment',
        spirit: 'Pure consciousness; infinite potential'
      }
    }
  };

  const ZODIAC_TO_ELEMENT = {
    Aries: 'fire',
    Taurus: 'earth',
    Gemini: 'air',
    Cancer: 'water',
    Leo: 'fire',
    Virgo: 'earth',
    Libra: 'air',
    Scorpio: 'water',
    Sagittarius: 'fire',
    Capricorn: 'earth',
    Aquarius: 'air',
    Pisces: 'water'
  };

  const TAROT_SUIT_TO_ELEMENT = {
    Wands: 'fire',
    Cups: 'water',
    Swords: 'air',
    Pentacles: 'earth'
  };

  const ELEMENTAL_ORACLE_MESSAGES = {
    fire: [
      {
        title: 'FIRE SPEAKS',
        messages: [
          'Move. Not every door requires certainty before it is opened. Fire reminds you that some paths reveal themselves only after you begin walking.',
          'The spark within you is hungry. It wants to create, to transform, to burn away what no longer serves. Listen to that hunger.',
          'Do not wait for permission. Fire does not ask before it illuminates the darkness.',
          'Your moment is now. The coals are hot. Strike while the iron glows.',
          'Passion is your compass. Let it guide you toward what truly matters to you.'
        ],
        action: 'Take bold action. Do not overthink.'
      }
    ],
    water: [
      {
        title: 'WATER SPEAKS',
        messages: [
          'Feel what you cannot see. Your intuition knows the answer before your mind can comprehend it.',
          'Flow around the obstacle. You do not need to break through—you need to go deeper, find another way.',
          'Healing comes through release. Let go of what you are holding too tightly.',
          'The depths hold wisdom. Dive beneath the surface. The answers are not on top.',
          'Surrender is not weakness. Sometimes the strongest thing you can do is to yield.'
        ],
        action: 'Trust your intuition. Listen to your heart.'
      }
    ],
    air: [
      {
        title: 'AIR SPEAKS',
        messages: [
          'Speak your truth. The words you hold in silence have power only in your throat. Release them.',
          'See from a higher perspective. Step back. What looks insurmountable from below is merely a stepping stone from above.',
          'Connect. Reach out. The answer you seek is already known by someone nearby.',
          'Your mind is your greatest tool. Use it not to worry, but to plan and perceive.',
          'Freedom lies in clarity. Know what you want, and the path forward will illuminate itself.'
        ],
        action: 'Communicate clearly. Seek new perspectives.'
      }
    ],
    earth: [
      {
        title: 'EARTH SPEAKS',
        messages: [
          'Plant your roots. Before you can reach the sky, you must know where you stand.',
          'The work is real. Nothing manifests without effort, without patience, without one foot in front of the other.',
          'You are stronger than you know. The earth beneath your feet has sustained countless generations.',
          'Slow progress is still progress. The mightiest trees grow slowly. Be patient with your becoming.',
          'This is your home. You belong here. Stand firm in that truth.'
        ],
        action: 'Take practical steps. Ground yourself in reality.'
      }
    ],
    spirit: [
      {
        title: 'SPIRIT SPEAKS',
        messages: [
          'You are not separate. Everything you see is yourself, looking back. Act from unity, not from isolation.',
          'Let go of who you thought you should be. Become who you truly are.',
          'The mystery is not meant to be solved. It is meant to be lived. Surrender to the unknown with wonder.',
          'All paths lead home. Trust that you are exactly where you need to be, learning what you need to learn.',
          'Your purpose is to love, to grow, and to awaken. Everything else is noise.'
        ],
        action: 'Meditate. Connect with something greater than yourself.'
      }
    ]
  };

  // Export for use in other modules
  window.ELEMENTAL_DATA = {
    ELEMENTS,
    ZODIAC_TO_ELEMENT,
    TAROT_SUIT_TO_ELEMENT,
    ELEMENTAL_ORACLE_MESSAGES,
    getElement: function (id) {
      return ELEMENTS[id.toLowerCase()] || null;
    },
    getAllElements: function () {
      return Object.values(ELEMENTS);
    },
    getElementByZodiac: function (zodiacSign) {
      const elementId = ZODIAC_TO_ELEMENT[zodiacSign];
      return this.getElement(elementId);
    },
    getElementByTarotSuit: function (tarotSuit) {
      const elementId = TAROT_SUIT_TO_ELEMENT[tarotSuit];
      return this.getElement(elementId);
    }
  };
})();
