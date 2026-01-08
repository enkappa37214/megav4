/**
 * Suspension Calculator - Bike Presets and Riding Style Profiles
 * Defines common bike suspension configurations and rider preference profiles
 */

// ============================================================================
// BIKE PRESETS
// ============================================================================

const BIKE_PRESETS = {
  // Mountain Bikes
  hardtail: {
    name: 'Hardtail Mountain Bike',
    type: 'hardtail',
    category: 'mtb',
    suspension: {
      front: {
        travel: 100, // mm
        type: 'air',
        minTravel: 80,
        maxTravel: 150,
      },
      rear: null,
    },
    weight: 12.5, // kg (bike only)
    purpose: 'Cross-country and trail riding',
    description: 'Lightweight bike optimized for efficiency and climbing',
  },

  trailMTB: {
    name: 'Trail Mountain Bike',
    type: 'full-suspension',
    category: 'mtb',
    suspension: {
      front: {
        travel: 140, // mm
        type: 'air',
        minTravel: 120,
        maxTravel: 160,
      },
      rear: {
        travel: 130, // mm
        type: 'air',
        minTravel: 110,
        maxTravel: 150,
      },
    },
    weight: 13.5, // kg
    purpose: 'All-mountain trail riding',
    description: 'Balanced suspension for technical descents and climbing',
  },

  enduroMTB: {
    name: 'Enduro Mountain Bike',
    type: 'full-suspension',
    category: 'mtb',
    suspension: {
      front: {
        travel: 160, // mm
        type: 'air',
        minTravel: 150,
        maxTravel: 180,
      },
      rear: {
        travel: 150, // mm
        type: 'air',
        minTravel: 140,
        maxTravel: 170,
      },
    },
    weight: 14.0, // kg
    purpose: 'Aggressive downhill riding with climbing capability',
    description: 'Long travel suspension optimized for descents',
  },

  downhillMTB: {
    name: 'Downhill Mountain Bike',
    type: 'full-suspension',
    category: 'mtb',
    suspension: {
      front: {
        travel: 200, // mm
        type: 'coil',
        minTravel: 180,
        maxTravel: 220,
      },
      rear: {
        travel: 200, // mm
        type: 'coil',
        minTravel: 180,
        maxTravel: 220,
      },
    },
    weight: 15.5, // kg
    purpose: 'Downhill racing and aggressive terrain',
    description: 'Maximum suspension travel for extreme conditions',
  },

  // Gravel/Adventure Bikes
  gravelBike: {
    name: 'Gravel Bike',
    type: 'rigid-or-flex',
    category: 'gravel',
    suspension: {
      front: {
        travel: 40, // mm (if suspended)
        type: 'elastomer',
        minTravel: 20,
        maxTravel: 60,
      },
      rear: null,
    },
    weight: 11.0, // kg
    purpose: 'Off-road and adventure riding',
    description: 'Lightweight bike for mixed terrain',
  },

  // Downhill/Park Bikes
  parkBike: {
    name: 'Park/Slopestyle Bike',
    type: 'full-suspension',
    category: 'mtb',
    suspension: {
      front: {
        travel: 180, // mm
        type: 'air',
        minTravel: 160,
        maxTravel: 200,
      },
      rear: {
        travel: 170, // mm
        type: 'air',
        minTravel: 150,
        maxTravel: 190,
      },
    },
    weight: 14.5, // kg
    purpose: 'Park riding and slopestyle courses',
    description: 'Optimized for jumps and technical features',
  },

  // E-Bikes
  eMTB: {
    name: 'E-Mountain Bike',
    type: 'full-suspension',
    category: 'emtb',
    suspension: {
      front: {
        travel: 150, // mm
        type: 'air',
        minTravel: 130,
        maxTravel: 170,
      },
      rear: {
        travel: 140, // mm
        type: 'air',
        minTravel: 120,
        maxTravel: 160,
      },
    },
    weight: 23.0, // kg (heavier due to motor and battery)
    purpose: 'Trail riding with motor assistance',
    description: 'Suspension tuned for heavier overall weight',
  },
};

// ============================================================================
// RIDING STYLE PROFILES
// ============================================================================

const RIDING_PROFILES = {
  // XC/Cross-Country Profile
  xc: {
    name: 'Cross-Country (XC)',
    riderType: 'efficiency-focused',
    characteristics: {
      weight: 'light',
      speed: 'high',
      technicality: 'low-to-moderate',
      terrain: 'smooth to rolling',
      focus: 'climbing and endurance',
    },
    suspensionSettings: {
      compression: {
        lowSpeed: 30, // % (more sensitive)
        highSpeed: 40, // % (more responsive)
      },
      rebound: {
        front: 35, // % (faster return for efficiency)
        rear: 35,
      },
      sag: {
        front: 20, // % (lighter, more active)
        rear: 22,
      },
      barAdjustment: -10, // mm (lower for aerodynamics)
    },
    recommendations: [
      'Focus on minimizing suspension movement on smooth trails',
      'Use lower compression for better traction while climbing',
      'Keep rebound fast to maintain pedaling efficiency',
      'Monitor sag on technical sections',
    ],
  },

  // Trail Profile
  trail: {
    name: 'Trail Riding',
    riderType: 'balanced',
    characteristics: {
      weight: 'medium',
      speed: 'medium',
      technicality: 'moderate',
      terrain: 'mixed technical terrain',
      focus: 'handling and fun factor',
    },
    suspensionSettings: {
      compression: {
        lowSpeed: 45, // %
        highSpeed: 50, // %
      },
      rebound: {
        front: 50, // %
        rear: 50,
      },
      sag: {
        front: 25, // % (balanced)
        rear: 28,
      },
      barAdjustment: 0, // mm (neutral)
    },
    recommendations: [
      'Balance compression and rebound for varied terrain',
      'Adjust sag based on terrain changes during ride',
      'Use high-speed compression for larger impacts',
      'Fine-tune low-speed compression for trail smoothness',
    ],
  },

  // Enduro Profile
  enduro: {
    name: 'Enduro Racing',
    riderType: 'aggressive',
    characteristics: {
      weight: 'medium',
      speed: 'high',
      technicality: 'high',
      terrain: 'steep and technical',
      focus: 'control and speed',
    },
    suspensionSettings: {
      compression: {
        lowSpeed: 55, // % (support climb too)
        highSpeed: 55, // % (controlled impact)
      },
      rebound: {
        front: 60, // % (support for consecutive hits)
        rear: 60,
      },
      sag: {
        front: 28, // % (more support)
        rear: 30,
      },
      barAdjustment: -5, // mm (slightly lower for aggression)
    },
    recommendations: [
      'Prioritize support and stability over compliance',
      'Use higher compression to prevent bottoming on big hits',
      'Keep rebound fast enough for consecutive impacts',
      'Increase sag slightly for downhill control',
    ],
  },

  // Downhill Profile
  downhill: {
    name: 'Downhill Racing',
    riderType: 'aggressive-technical',
    characteristics: {
      weight: 'heavy',
      speed: 'maximum',
      technicality: 'extreme',
      terrain: 'steep, rocky, technical',
      focus: 'control and speed at limit',
    },
    suspensionSettings: {
      compression: {
        lowSpeed: 65, // % (firm to prevent pedal bob)
        highSpeed: 60, // % (absorb impacts)
      },
      rebound: {
        front: 70, // % (handle consecutive features)
        rear: 70,
      },
      sag: {
        front: 30, // % (maximum support)
        rear: 33,
      },
      barAdjustment: -15, // mm (lower for stability)
    },
    recommendations: [
      'Use firm compression to maintain control at speed',
      'Balance rebound to handle back-to-back impacts',
      'Run higher sag for support through big compressions',
      'Consider coil suspension for consistent feel at speed',
    ],
  },

  // Casual/Recreation Profile
  casual: {
    name: 'Casual Riding',
    riderType: 'comfort-focused',
    characteristics: {
      weight: 'variable',
      speed: 'slow-to-medium',
      technicality: 'low',
      terrain: 'smooth, maintained trails',
      focus: 'comfort and enjoyment',
    },
    suspensionSettings: {
      compression: {
        lowSpeed: 35, // % (compliant)
        highSpeed: 45, // %
      },
      rebound: {
        front: 40, // % (let suspension work)
        rear: 40,
      },
      sag: {
        front: 25, // % (comfortable)
        rear: 27,
      },
      barAdjustment: 5, // mm (slightly higher for comfort)
    },
    recommendations: [
      'Prioritize comfort over performance',
      'Use lower compression for a plush feel',
      'Allow more suspension movement',
      'Focus on smooth, flowing lines',
    ],
  },

  // Park/Jumps Profile
  park: {
    name: 'Park/Jumps',
    riderType: 'tricks-focused',
    characteristics: {
      weight: 'light-to-medium',
      speed: 'medium',
      technicality: 'moderate-to-high',
      terrain: 'built features and jumps',
      focus: 'pop and responsiveness',
    },
    suspensionSettings: {
      compression: {
        lowSpeed: 40, // % (active response)
        highSpeed: 50, // % (absorb landing)
      },
      rebound: {
        front: 55, // % (quick reset for next feature)
        rear: 55,
      },
      sag: {
        front: 23, // % (responsive)
        rear: 25,
      },
      barAdjustment: 0, // mm (neutral)
    },
    recommendations: [
      'Set up for quick rebound to reset between features',
      'Use lower sag for more pop off jumps',
      'Balance compression to absorb landings',
      'Test different settings for tricks you practice',
    ],
  },
};

// ============================================================================
// PRESET COMBINATIONS (Bike + Riding Style)
// ============================================================================

const PRESET_COMBINATIONS = {
  'hardtail-xc': {
    name: 'Hardtail XC',
    bike: 'hardtail',
    profile: 'xc',
    description: 'Lightweight cross-country hardtail setup',
  },
  'trail-mtb-trail': {
    name: 'Trail MTB - Trail Riding',
    bike: 'trailMTB',
    profile: 'trail',
    description: 'Balanced trail bike for technical riding',
  },
  'trail-mtb-enduro': {
    name: 'Trail MTB - Enduro Racing',
    bike: 'trailMTB',
    profile: 'enduro',
    description: 'Aggressive settings on trail bike',
  },
  'enduro-mtb-enduro': {
    name: 'Enduro MTB - Enduro Racing',
    bike: 'enduroMTB',
    profile: 'enduro',
    description: 'Race-ready enduro configuration',
  },
  'downhill-mtb-downhill': {
    name: 'Downhill MTB - DH Racing',
    bike: 'downhillMTB',
    profile: 'downhill',
    description: 'Full-send downhill race setup',
  },
  'park-bike-park': {
    name: 'Park Bike - Park/Jumps',
    bike: 'parkBike',
    profile: 'park',
    description: 'Park and jump optimized setup',
  },
  'emtb-trail': {
    name: 'E-MTB - Trail Riding',
    bike: 'eMTB',
    profile: 'trail',
    description: 'E-bike tuned for trail use',
  },
};

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  BIKE_PRESETS,
  RIDING_PROFILES,
  PRESET_COMBINATIONS,

  /**
   * Get a bike preset by ID
   * @param {string} bikeId - The bike preset ID
   * @returns {object|null} The bike preset or null if not found
   */
  getBikePreset(bikeId) {
    return BIKE_PRESETS[bikeId] || null;
  },

  /**
   * Get a riding profile by ID
   * @param {string} profileId - The riding profile ID
   * @returns {object|null} The riding profile or null if not found
   */
  getRidingProfile(profileId) {
    return RIDING_PROFILES[profileId] || null;
  },

  /**
   * Get a preset combination by ID
   * @param {string} combinationId - The preset combination ID
   * @returns {object|null} The preset combination or null if not found
   */
  getPresetCombination(combinationId) {
    return PRESET_COMBINATIONS[combinationId] || null;
  },

  /**
   * Get all available bike presets
   * @returns {array} Array of bike preset IDs
   */
  getAvailableBikes() {
    return Object.keys(BIKE_PRESETS);
  },

  /**
   * Get all available riding profiles
   * @returns {array} Array of riding profile IDs
   */
  getAvailableProfiles() {
    return Object.keys(RIDING_PROFILES);
  },

  /**
   * Get all available preset combinations
   * @returns {array} Array of preset combination IDs
   */
  getAvailableCombinations() {
    return Object.keys(PRESET_COMBINATIONS);
  },
};
