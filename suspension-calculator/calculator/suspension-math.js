/**
 * Suspension Math Module
 * Calculations for spring rate and damping in suspension systems
 */

/**
 * Calculate spring rate (k) from frequency and mass
 * Formula: k = (2π * f)² * m
 * @param {number} frequency - Natural frequency in Hz
 * @param {number} mass - Suspended mass in kg
 * @returns {number} Spring rate in N/m
 */
function calculateSpringRate(frequency, mass) {
  if (frequency <= 0 || mass <= 0) {
    throw new Error('Frequency and mass must be positive values');
  }
  const omega = 2 * Math.PI * frequency;
  return Math.pow(omega, 2) * mass;
}

/**
 * Calculate natural frequency from spring rate and mass
 * Formula: f = (1/2π) * √(k/m)
 * @param {number} springRate - Spring rate in N/m
 * @param {number} mass - Suspended mass in kg
 * @returns {number} Natural frequency in Hz
 */
function calculateNaturalFrequency(springRate, mass) {
  if (springRate <= 0 || mass <= 0) {
    throw new Error('Spring rate and mass must be positive values');
  }
  const omega = Math.sqrt(springRate / mass);
  return omega / (2 * Math.PI);
}

/**
 * Calculate damping coefficient from damping ratio and mass/spring rate
 * Formula: c = 2 * ζ * √(k * m)
 * @param {number} dampingRatio - Damping ratio (0 to 1 for underdamped)
 * @param {number} springRate - Spring rate in N/m
 * @param {number} mass - Suspended mass in kg
 * @returns {number} Damping coefficient in N·s/m
 */
function calculateDampingCoefficient(dampingRatio, springRate, mass) {
  if (dampingRatio < 0 || springRate <= 0 || mass <= 0) {
    throw new Error('Damping ratio must be non-negative; spring rate and mass must be positive');
  }
  const criticalDamping = 2 * Math.sqrt(springRate * mass);
  return dampingRatio * criticalDamping;
}

/**
 * Calculate damping ratio from damping coefficient and spring rate/mass
 * Formula: ζ = c / (2 * √(k * m))
 * @param {number} dampingCoefficient - Damping coefficient in N·s/m
 * @param {number} springRate - Spring rate in N/m
 * @param {number} mass - Suspended mass in kg
 * @returns {number} Damping ratio (unitless)
 */
function calculateDampingRatio(dampingCoefficient, springRate, mass) {
  if (dampingCoefficient < 0 || springRate <= 0 || mass <= 0) {
    throw new Error('Damping coefficient must be non-negative; spring rate and mass must be positive');
  }
  const criticalDamping = 2 * Math.sqrt(springRate * mass);
  return dampingCoefficient / criticalDamping;
}

/**
 * Calculate critical damping coefficient
 * Formula: c_critical = 2 * √(k * m)
 * @param {number} springRate - Spring rate in N/m
 * @param {number} mass - Suspended mass in kg
 * @returns {number} Critical damping coefficient in N·s/m
 */
function calculateCriticalDamping(springRate, mass) {
  if (springRate <= 0 || mass <= 0) {
    throw new Error('Spring rate and mass must be positive values');
  }
  return 2 * Math.sqrt(springRate * mass);
}

/**
 * Calculate period of oscillation from frequency
 * Formula: T = 1 / f
 * @param {number} frequency - Frequency in Hz
 * @returns {number} Period in seconds
 */
function calculatePeriod(frequency) {
  if (frequency <= 0) {
    throw new Error('Frequency must be a positive value');
  }
  return 1 / frequency;
}

/**
 * Classify damping system based on damping ratio
 * @param {number} dampingRatio - Damping ratio (unitless)
 * @returns {string} Classification: 'underdamped', 'critically damped', or 'overdamped'
 */
function classifyDamping(dampingRatio) {
  if (dampingRatio < 0) {
    throw new Error('Damping ratio cannot be negative');
  }
  if (dampingRatio < 1) {
    return 'underdamped';
  } else if (dampingRatio === 1) {
    return 'critically damped';
  } else {
    return 'overdamped';
  }
}

/**
 * Calculate deflection under static load
 * Formula: x = F / k
 * @param {number} force - Applied force in N
 * @param {number} springRate - Spring rate in N/m
 * @returns {number} Deflection in meters
 */
function calculateDeflection(force, springRate) {
  if (springRate <= 0) {
    throw new Error('Spring rate must be a positive value');
  }
  return force / springRate;
}

/**
 * Calculate stiffness from two spring rates in series
 * Formula: k_total = (k1 * k2) / (k1 + k2)
 * @param {number} springRate1 - First spring rate in N/m
 * @param {number} springRate2 - Second spring rate in N/m
 * @returns {number} Combined spring rate in N/m
 */
function calculateSeriesSpringRate(springRate1, springRate2) {
  if (springRate1 <= 0 || springRate2 <= 0) {
    throw new Error('Spring rates must be positive values');
  }
  return (springRate1 * springRate2) / (springRate1 + springRate2);
}

/**
 * Calculate stiffness from two spring rates in parallel
 * Formula: k_total = k1 + k2
 * @param {number} springRate1 - First spring rate in N/m
 * @param {number} springRate2 - Second spring rate in N/m
 * @returns {number} Combined spring rate in N/m
 */
function calculateParallelSpringRate(springRate1, springRate2) {
  if (springRate1 <= 0 || springRate2 <= 0) {
    throw new Error('Spring rates must be positive values');
  }
  return springRate1 + springRate2;
}

// Export functions for use in Node.js or module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateSpringRate,
    calculateNaturalFrequency,
    calculateDampingCoefficient,
    calculateDampingRatio,
    calculateCriticalDamping,
    calculatePeriod,
    classifyDamping,
    calculateDeflection,
    calculateSeriesSpringRate,
    calculateParallelSpringRate
  };
}
