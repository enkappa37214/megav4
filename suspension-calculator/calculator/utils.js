/**
 * Utility Functions for Suspension Calculator
 * Includes unit conversions, validation, math, formatting, object utilities, and storage functions
 */

// ============================================================================
// UNIT CONVERSION FUNCTIONS
// ============================================================================

/**
 * Convert pounds to kilograms
 * @param {number} lbs - Weight in pounds
 * @returns {number} Weight in kilograms
 */
const lbsToKg = (lbs) => {
  if (!isValidNumber(lbs)) return null;
  return lbs * 0.453592;
};

/**
 * Convert kilograms to pounds
 * @param {number} kg - Weight in kilograms
 * @returns {number} Weight in pounds
 */
const kgToLbs = (kg) => {
  if (!isValidNumber(kg)) return null;
  return kg / 0.453592;
};

/**
 * Convert millimeters to inches
 * @param {number} mm - Distance in millimeters
 * @returns {number} Distance in inches
 */
const mmToInches = (mm) => {
  if (!isValidNumber(mm)) return null;
  return mm / 25.4;
};

/**
 * Convert inches to millimeters
 * @param {number} inches - Distance in inches
 * @returns {number} Distance in millimeters
 */
const inchesToMm = (inches) => {
  if (!isValidNumber(inches)) return null;
  return inches * 25.4;
};

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Check if a value is a valid number
 * @param {*} value - Value to validate
 * @returns {boolean} True if valid number, false otherwise
 */
const isValidNumber = (value) => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

/**
 * Check if a value is a valid weight
 * @param {*} value - Value to validate
 * @param {number} [min=0] - Minimum allowed weight
 * @param {number} [max=Infinity] - Maximum allowed weight
 * @returns {boolean} True if valid weight, false otherwise
 */
const isValidWeight = (value, min = 0, max = Infinity) => {
  return isValidNumber(value) && value >= min && value <= max;
};

/**
 * Check if a value is a valid travel distance
 * @param {*} value - Value to validate
 * @param {number} [min=0] - Minimum allowed travel
 * @param {number} [max=Infinity] - Maximum allowed travel
 * @returns {boolean} True if valid travel, false otherwise
 */
const isValidTravel = (value, min = 0, max = Infinity) => {
  return isValidNumber(value) && value >= min && value <= max;
};

// ============================================================================
// MATH FUNCTIONS
// ============================================================================

/**
 * Clamp a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
const clamp = (value, min, max) => {
  if (!isValidNumber(value) || !isValidNumber(min) || !isValidNumber(max)) {
    return null;
  }
  return Math.max(min, Math.min(max, value));
};

/**
 * Round a number to a specific number of decimal places
 * @param {number} value - Value to round
 * @param {number} [decimals=2] - Number of decimal places
 * @returns {number} Rounded value
 */
const roundTo = (value, decimals = 2) => {
  if (!isValidNumber(value) || !isValidNumber(decimals)) {
    return null;
  }
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

/**
 * Calculate percentage of a value
 * @param {number} value - The value to calculate percentage from
 * @param {number} percentage - The percentage to calculate
 * @returns {number} The calculated percentage value
 */
const calculatePercentage = (value, percentage) => {
  if (!isValidNumber(value) || !isValidNumber(percentage)) {
    return null;
  }
  return (value * percentage) / 100;
};

// ============================================================================
// FORMATTING FUNCTIONS
// ============================================================================

/**
 * Format a number with specified decimal places
 * @param {number} value - Value to format
 * @param {number} [decimals=2] - Number of decimal places
 * @returns {string} Formatted number string
 */
const formatNumber = (value, decimals = 2) => {
  if (!isValidNumber(value)) {
    return 'N/A';
  }
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Format a number with a unit suffix
 * @param {number} value - Value to format
 * @param {string} unit - Unit suffix (e.g., 'kg', 'lbs', 'mm', 'in')
 * @param {number} [decimals=2] - Number of decimal places
 * @returns {string} Formatted string with unit
 */
const formatWithUnit = (value, unit, decimals = 2) => {
  if (!isValidNumber(value)) {
    return 'N/A';
  }
  const formatted = formatNumber(value, decimals);
  return `${formatted} ${unit}`;
};

/**
 * Format a date object or date string
 * @param {Date|string} date - Date to format
 * @param {string} [locale='en-US'] - Locale for formatting
 * @returns {string} Formatted date string
 */
const formatDate = (date, locale = 'en-US') => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (!(dateObj instanceof Date) || isNaN(dateObj)) {
      return 'Invalid Date';
    }
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    return 'Invalid Date';
  }
};

// ============================================================================
// OBJECT FUNCTIONS
// ============================================================================

/**
 * Create a deep clone of an object
 * @param {*} obj - Object to clone
 * @returns {*} Deep cloned object
 */
const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item));
  }

  if (obj instanceof Object) {
    const cloned = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }

  return obj;
};

/**
 * Merge multiple objects into a single object (shallow merge)
 * @param {...Object} objects - Objects to merge
 * @returns {Object} Merged object
 */
const mergeObjects = (...objects) => {
  const merged = {};
  objects.forEach((obj) => {
    if (obj && typeof obj === 'object') {
      Object.assign(merged, obj);
    }
  });
  return merged;
};

// ============================================================================
// STORAGE FUNCTIONS
// ============================================================================

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store (will be JSON stringified)
 * @returns {boolean} True if successful, false otherwise
 */
const saveToLocalStorage = (key, value) => {
  try {
    if (!key || typeof key !== 'string') {
      console.warn('Invalid storage key provided');
      return false;
    }
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`Failed to save to localStorage: ${error.message}`);
    return false;
  }
};

/**
 * Load data from localStorage
 * @param {string} key - Storage key
 * @param {*} [defaultValue=null] - Default value if key not found
 * @returns {*} Stored value or default value
 */
const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    if (!key || typeof key !== 'string') {
      console.warn('Invalid storage key provided');
      return defaultValue;
    }
    const stored = localStorage.getItem(key);
    if (stored === null) {
      return defaultValue;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error(`Failed to load from localStorage: ${error.message}`);
    return defaultValue;
  }
};

// ============================================================================
// EXPORTS
// ============================================================================

// Unit Conversion Exports
export { lbsToKg, kgToLbs, mmToInches, inchesToMm };

// Validation Exports
export { isValidNumber, isValidWeight, isValidTravel };

// Math Exports
export { clamp, roundTo, calculatePercentage };

// Formatting Exports
export { formatNumber, formatWithUnit, formatDate };

// Object Exports
export { deepClone, mergeObjects };

// Storage Exports
export { saveToLocalStorage, loadFromLocalStorage };

// Export all utilities as default
export default {
  // Unit Conversions
  lbsToKg,
  kgToLbs,
  mmToInches,
  inchesToMm,
  // Validation
  isValidNumber,
  isValidWeight,
  isValidTravel,
  // Math
  clamp,
  roundTo,
  calculatePercentage,
  // Formatting
  formatNumber,
  formatWithUnit,
  formatDate,
  // Object
  deepClone,
  mergeObjects,
  // Storage
  saveToLocalStorage,
  loadFromLocalStorage,
};
