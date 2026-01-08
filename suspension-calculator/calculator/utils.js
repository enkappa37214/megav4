// Utility Functions
// Helper functions for unit conversion, validation, and common operations

/**
 * Convert pounds to kilograms
 * @param {number} lbs - Weight in pounds
 * @returns {number} Weight in kilograms
 */
function lbsToKg(lbs) {
    return lbs / 2.20462;
}

/**
 * Convert kilograms to pounds
 * @param {number} kg - Weight in kilograms
 * @returns {number} Weight in pounds
 */
function kgToLbs(kg) {
    return kg * 2.20462;
}

/**
 * Convert millimeters to inches
 * @param {number} mm - Distance in millimeters
 * @returns {number} Distance in inches
 */
function mmToInches(mm) {
    return mm / 25.4;
}

/**
 * Convert inches to millimeters
 * @param {number} inches - Distance in inches
 * @returns {number} Distance in millimeters
 */
function inchesToMm(inches) {
    return inches * 25.4;
}

/**
 * Validate numeric input
 * @param {any} value - Value to validate
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {boolean} True if valid
 */
function isValidNumber(value, min = 0, max = Infinity) {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
}

/**
 * Clamp a number between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

/**
 * Round to specified decimal places
 * @param {number} value - Value to round
 * @param {number} decimals - Number of decimal places
 * @returns {number} Rounded value
 */
function roundTo(value, decimals = 2) {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}

/**
 * Calculate percentage of a number
 * @param {number} percent - Percentage value (0-100)
 * @param {number} total - Total value
 * @returns {number} Calculated percentage
 */
function calculatePercentage(percent, total) {
    return (percent / 100) * total;
}

/**
 * Calculate what percentage a value is of a total
 * @param {number} value - Value
 * @param {number} total - Total
 * @returns {number} Percentage (0-100)
 */
function getPercentage(value, total) {
    return (value / total) * 100;
}

/**
 * Format a number as currency
 * @param {number} value - Value to format
 * @param {string} currency - Currency symbol (default: $)
 * @returns {string} Formatted string
 */
function formatCurrency(value, currency = '$') {
    return `${currency}${value.toFixed(2)}`;
}

/**
 * Format a number with commas
 * @param {number} value - Value to format
 * @returns {string} Formatted string
 */
function formatNumber(value) {
    return value.toLocaleString('en-US');
}

/**
 * Debounce a function
 * @param {function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle a function
 * @param {function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Get current timestamp
 * @returns {number} Timestamp in milliseconds
 */
function getTimestamp() {
    return Date.now();
}

/**
 * Format date as string
 * @param {Date} date - Date object
 * @param {string} format - Format string (YYYY-MM-DD HH:mm:ss)
 * @returns {string} Formatted date
 */
function formatDate(date = new Date(), format = 'YYYY-MM-DD') {
    const pad = (num) => String(num).padStart(2, '0');
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    const h = date.getHours();
    const min = date.getMinutes();
    const s = date.getSeconds();
    
    return format
        .replace('YYYY', y)
        .replace('MM', pad(m))
        .replace('DD', pad(d))
        .replace('HH', pad(h))
        .replace('mm', pad(min))
        .replace('ss', pad(s));
}

/**
 * Deep clone an object
 * @param {object} obj - Object to clone
 * @returns {object} Cloned object
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if object is empty
 * @param {object} obj - Object to check
 * @returns {boolean} True if empty
 */
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

/**
 * Merge multiple objects
 * @param {...object} objects - Objects to merge
 * @returns {object} Merged object
 */
function mergeObjects(...objects) {
    return objects.reduce((acc, obj) => ({ ...acc, ...obj }), {});
}
