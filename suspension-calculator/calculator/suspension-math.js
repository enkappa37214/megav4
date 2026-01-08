// Suspension Mathematics Module
// Core calculations for spring rates, damping, and sag

/**
 * Calculate spring rate based on rider weight and suspension travel
 * @param {number} weightInLbs - Rider weight in pounds
 * @param {number} travel - Suspension travel in millimeters
 * @param {string} type - 'fork' or 'shock'
 * @returns {number} Spring rate in Nm/mm
 */
function calculateSpringRate(weightInLbs, travel, type = 'fork') {
    // Convert lbs to Newtons (1 lbs = 4.448 N)
    const weightInNewtons = weightInLbs * 4.448;
    
    // Convert travel from mm to m
    const travelInMeters = travel / 1000;
    
    // Base calculation: Force / Distance
    // Adjusted for typical suspension geometry
    let springRate = (weightInNewtons / travelInMeters) / 1000;
    
    // Type-specific adjustments
    if (type === 'fork') {
        springRate *= 0.45; // Forks typically use softer springs
    } else if (type === 'shock') {
        springRate *= 0.55; // Shocks handle more load
    }
    
    return springRate;
}

/**
 * Calculate recommended sag percentage
 * @param {number} travel - Suspension travel in millimeters
 * @param {string} type - 'fork' or 'shock'
 * @returns {number} Sag percentage (typically 25-30%)
 */
function calculateSag(travel, type = 'fork') {
    // Recommended sag percentages
    const sagPercentages = {
        'fork': 25,
        'shock': 30
    };
    
    return sagPercentages[type] || 25;
}

/**
 * Calculate damping force based on velocity and damping coefficient
 * @param {number} velocity - Suspension velocity in m/s
 * @param {number} dampingCoefficient - Damping coefficient (0-1)
 * @returns {number} Damping force in Newtons
 */
function calculateDampingForce(velocity, dampingCoefficient) {
    // Linear damping model: F = C * v
    // Where C is the damping coefficient
    return velocity * dampingCoefficient * 1000;
}

/**
 * Calculate optimal compression damping clicks
 * @param {number} weightInLbs - Rider weight in pounds
 * @param {number} travel - Suspension travel in mm
 * @returns {number} Recommended compression damping clicks
 */
function calculateCompressionDamping(weightInLbs, travel) {
    // Base formula: weight factor * travel factor
    const weightFactor = weightInLbs / 150; // Normalized to 150 lbs
    const travelFactor = travel / 100; // Normalized to 100mm
    
    // Click formula (typically 0-40 clicks)
    const clicks = Math.round(weightFactor * travelFactor * 15);
    
    return Math.max(0, Math.min(clicks, 40));
}

/**
 * Calculate optimal rebound damping clicks
 * @param {number} compressionClicks - Compression damping clicks
 * @param {number} ridingStyle - Multiplier based on style (0.8-1.2)
 * @returns {number} Recommended rebound damping clicks
 */
function calculateReboundDamping(compressionClicks, ridingStyleMultiplier = 1.0) {
    // Rebound is typically 10-20% higher than compression
    const rebounds = Math.round(compressionClicks * (1.1 + (0.1 * ridingStyleMultiplier)));
    
    return Math.max(0, Math.min(rebounds, 40));
}

/**
 * Convert between spring rate units
 * @param {number} rate - Spring rate value
 * @param {string} fromUnit - Source unit ('nm', 'lbin', 'lbft')
 * @param {string} toUnit - Target unit ('nm', 'lbin', 'lbft')
 * @returns {number} Converted spring rate
 */
function convertSpringRate(rate, fromUnit = 'nm', toUnit = 'lbin') {
    const conversions = {
        'nm_lbin': 0.00886,
        'nm_lbft': 0.0007383,
        'lbin_nm': 112.985,
        'lbin_lbft': 0.0833,
        'lbft_nm': 1355.82,
        'lbft_lbin': 12
    };
    
    const key = `${fromUnit}_${toUnit}`;
    if (conversions[key]) {
        return rate * conversions[key];
    }
    return rate;
}

/**
 * Calculate progressive spring rate effects
 * @param {number} baseRate - Base spring rate
 * @param {number} compressionPercent - Compression percentage (0-100)
 * @returns {number} Effective spring rate at compression point
 */
function calculateProgressiveRate(baseRate, compressionPercent) {
    // Progressive springs increase in rate as they compress
    // Typical progression: ~30% increase at 50% compression
    const progressionFactor = 1 + (0.006 * compressionPercent);
    return baseRate * progressionFactor;
}

/**
 * Estimate rider sag from spring rate and weight
 * @param {number} springRate - Spring rate (Nm/mm)
 * @param {number} weightInLbs - Rider weight in pounds
 * @param {number} travel - Suspension travel in mm
 * @returns {number} Estimated sag in mm
 */
function estimateSagDistance(springRate, weightInLbs, travel) {
    const weightInNewtons = weightInLbs * 4.448;
    const sagDistance = (weightInNewtons / springRate) * 1000;
    
    return Math.min(sagDistance, travel);
}
