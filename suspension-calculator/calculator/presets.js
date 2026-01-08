// Bike Suspension Setup Presets
// Pre-configured suspension specifications for popular bike models

const bikePresets = {
    'trek-supercaliber': {
        name: 'Trek Supercaliber',
        forkTravel: 100,
        suspensionTravel: 100,
        wheelSize: 29,
        type: 'hardtail',
        description: 'XC racing hardtail with 100mm travel'
    },
    'specialized-epic': {
        name: 'Specialized Epic',
        forkTravel: 100,
        suspensionTravel: 100,
        wheelSize: 29,
        type: 'hardtail',
        description: 'Cross-country race hardtail'
    },
    'santa-cruz-blur': {
        name: 'Santa Cruz Blur',
        forkTravel: 120,
        suspensionTravel: 120,
        wheelSize: 29,
        type: 'full-suspension',
        description: 'Lightweight XC full-suspension bike'
    },
    'yeti-sb100': {
        name: 'Yeti SB100',
        forkTravel: 100,
        suspensionTravel: 100,
        wheelSize: 29,
        type: 'full-suspension',
        description: 'XC-focused full-suspension bike'
    },
    'ibis-ripmo': {
        name: 'Ibis Ripmo',
        forkTravel: 140,
        suspensionTravel: 140,
        wheelSize: 29,
        type: 'full-suspension',
        description: 'Trail/enduro full-suspension bike'
    }
};

/**
 * Riding style profiles with damping recommendations
 */
const ridingStyleProfiles = {
    'xc': {
        name: 'Cross-Country',
        compression: 1.2,
        rebound: 1.1,
        springRate: 1.15,
        description: 'Efficient, responsive setup for racing',
        sagTarget: 23
    },
    'trail': {
        name: 'Trail',
        compression: 1.0,
        rebound: 1.0,
        springRate: 1.0,
        description: 'Balanced setup for general trail riding',
        sagTarget: 25
    },
    'enduro': {
        name: 'Enduro',
        compression: 0.9,
        rebound: 0.95,
        springRate: 0.95,
        description: 'Slightly softer for extended descents',
        sagTarget: 28
    },
    'dh': {
        name: 'Downhill',
        compression: 0.8,
        rebound: 0.85,
        springRate: 0.85,
        description: 'Soft, compliant setup for maximum grip',
        sagTarget: 32
    }
};

/**
 * Get a preset bike configuration
 * @param {string} modelId - Bike model ID
 * @returns {object} Preset configuration or null
 */
function getPreset(modelId) {
    return bikePresets[modelId] || null;
}

/**
 * Get a riding style profile
 * @param {string} styleId - Style ID (xc, trail, enduro, dh)
 * @returns {object} Style profile or null
 */
function getStyleProfile(styleId) {
    return ridingStyleProfiles[styleId] || null;
}

/**
 * List all available bike presets
 * @returns {array} Array of preset objects
 */
function listBikePresets() {
    return Object.entries(bikePresets).map(([id, data]) => ({
        id,
        ...data
    }));
}

/**
 * List all available riding styles
 * @returns {array} Array of style profile objects
 */
function listRidingStyles() {
    return Object.entries(ridingStyleProfiles).map(([id, data]) => ({
        id,
        ...data
    }));
}

/**
 * Recommend a setup based on bike model and riding style
 * @param {string} bikeModelId - Bike model ID
 * @param {string} ridingStyleId - Riding style ID
 * @param {number} riderWeight - Rider weight in lbs
 * @returns {object} Recommended setup configuration
 */
function recommendSetup(bikeModelId, ridingStyleId, riderWeight) {
    const bike = getPreset(bikeModelId);
    const style = getStyleProfile(ridingStyleId);
    
    if (!bike || !style) {
        return null;
    }
    
    return {
        bike: bike.name,
        style: style.name,
        forkTravel: bike.forkTravel,
        shockTravel: bike.suspensionTravel,
        riderWeight: riderWeight,
        springRateMultiplier: style.springRate,
        compressionMultiplier: style.compression,
        reboundMultiplier: style.rebound,
        targetSag: style.sagTarget,
        notes: `${style.description}. Adjust settings within ±5 clicks based on trail conditions.`
    };
}
