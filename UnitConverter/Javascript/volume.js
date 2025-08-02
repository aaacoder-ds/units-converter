// Modern Volume Converter JavaScript

// Volume conversion factors (to milliliters)
const volumeFactors = {
  1: { name: 'Liter', factor: 1000, symbol: 'L' },
  2: { name: 'Milliliter', factor: 1, symbol: 'mL' },
  3: { name: 'Cubic Meter', factor: 1000000, symbol: 'm³' },
  4: { name: 'Cubic Centimeter', factor: 1, symbol: 'cm³' },
  5: { name: 'Gallon', factor: 3785.411784, symbol: 'gal' },
  6: { name: 'Quart', factor: 946.352946, symbol: 'qt' },
  7: { name: 'Pint', factor: 473.176473, symbol: 'pt' },
  8: { name: 'Cup', factor: 236.588236, symbol: 'cup' }
};

// DOM Elements
const fromSelect = document.getElementById('selectfr');
const toSelect = document.getElementById('selectto');
const fromInput = document.getElementById('select1fr');
const toInput = document.getElementById('select1to');

// Initialize the converter
function initVolumeConverter() {
  // Set default selections
  fromSelect.value = '1'; // Liter
  toSelect.value = '2';   // Milliliter
  
  // Add event listeners
  fromSelect.addEventListener('change', convertVolume);
  toSelect.addEventListener('change', convertVolume);
  fromInput.addEventListener('input', convertVolume);
  
  // Add real-time conversion
  fromInput.addEventListener('input', debounce(convertVolume, 300));
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
  
  // Add form validation
  addFormValidation();
  
  // Show initial conversion
  convertVolume();
}

// Main conversion function
function convertVolume() {
  const fromValue = parseFloat(fromInput.value);
  const fromUnit = parseInt(fromSelect.value);
  const toUnit = parseInt(toSelect.value);
  
  // Validate inputs
  if (isNaN(fromValue) || fromUnit === 0 || toUnit === 0) {
    toInput.value = '';
    return;
  }
  
  // Convert to milliliters first, then to target unit
  const milliliters = fromValue * volumeFactors[fromUnit].factor;
  const result = milliliters / volumeFactors[toUnit].factor;
  
  // Format result
  toInput.value = formatNumber(result);
  
  // Add visual feedback
  addConversionFeedback(fromValue, fromUnit, toUnit, result);
}

// Format number with appropriate precision
function formatNumber(num) {
  if (num === 0) return '0';
  
  // Determine appropriate decimal places
  let precision = 6;
  if (Math.abs(num) >= 1000) precision = 2;
  else if (Math.abs(num) >= 100) precision = 3;
  else if (Math.abs(num) >= 10) precision = 4;
  else if (Math.abs(num) >= 1) precision = 5;
  else precision = 6;
  
  return Number(num.toFixed(precision)).toString();
}

// Add visual feedback for conversion
function addConversionFeedback(fromValue, fromUnit, toUnit, result) {
  const fromUnitName = volumeFactors[fromUnit].name;
  const toUnitName = volumeFactors[toUnit].name;
  
  // Update input styling
  fromInput.style.borderColor = '#10b981';
  toInput.style.borderColor = '#10b981';
  
  // Reset styling after animation
  setTimeout(() => {
    fromInput.style.borderColor = '';
    toInput.style.borderColor = '';
  }, 500);
  
  // Show conversion in console for debugging
  console.log(`${fromValue} ${fromUnitName} = ${result} ${toUnitName}`);
}

// Clear form function
function clearForm() {
  fromInput.value = '';
  toInput.value = '';
  fromSelect.value = '1';
  toSelect.value = '2';
  
  // Reset styling
  fromInput.style.borderColor = '';
  toInput.style.borderColor = '';
  
  // Focus on input
  fromInput.focus();
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
  // Ctrl/Cmd + Enter to convert
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    convertVolume();
  }
  
  // Escape to clear
  if (e.key === 'Escape') {
    e.preventDefault();
    clearForm();
  }
  
  // Tab to switch between inputs
  if (e.key === 'Tab') {
    if (document.activeElement === fromInput) {
      e.preventDefault();
      toInput.focus();
    } else if (document.activeElement === toInput) {
      e.preventDefault();
      fromInput.focus();
    }
  }
}

// Add form validation
function addFormValidation() {
  fromInput.addEventListener('input', (e) => {
    const value = e.target.value;
    
    // Allow empty value
    if (value === '') {
      e.target.style.borderColor = '';
      return;
    }
    
    // Check if it's a valid number
    const num = parseFloat(value);
    if (isNaN(num)) {
      e.target.style.borderColor = '#ef4444';
      showError('Please enter a valid number');
    } else if (num < 0) {
      e.target.style.borderColor = '#f59e0b';
      showError('Negative values are not supported');
    } else {
      e.target.style.borderColor = '';
      hideError();
    }
  });
}

// Show error message
function showError(message) {
  let errorDiv = document.getElementById('error-message');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.id = 'error-message';
    errorDiv.style.cssText = `
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.5rem;
      text-align: center;
      font-weight: 500;
    `;
    fromInput.parentNode.appendChild(errorDiv);
  }
  errorDiv.textContent = message;
}

// Hide error message
function hideError() {
  const errorDiv = document.getElementById('error-message');
  if (errorDiv) {
    errorDiv.remove();
  }
}

// Debounce function for performance
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

// Add copy to clipboard functionality
function addCopyToClipboard() {
  toInput.addEventListener('click', () => {
    if (toInput.value && !toInput.readOnly) {
      toInput.select();
      document.execCommand('copy');
      
      // Show feedback
      const originalValue = toInput.value;
      toInput.value = 'Copied!';
      toInput.style.color = '#10b981';
      
      setTimeout(() => {
        toInput.value = originalValue;
        toInput.style.color = '';
      }, 1000);
    }
  });
}

// Add unit conversion examples
function addConversionExamples() {
  const examples = [
    { from: 1, fromUnit: 1, toUnit: 2, result: 1000 },
    { from: 1, fromUnit: 5, toUnit: 6, result: 4 },
    { from: 1, fromUnit: 1, toUnit: 5, result: 0.264 },
    { from: 1, fromUnit: 3, toUnit: 1, result: 1000 }
  ];
  
  // Update example items with real calculations
  const exampleItems = document.querySelectorAll('.example-item');
  exampleItems.forEach((item, index) => {
    if (examples[index]) {
      const example = examples[index];
      const fromSpan = item.querySelector('.example-from');
      const toSpan = item.querySelector('.example-to');
      
      if (fromSpan && toSpan) {
        fromSpan.textContent = `${example.from} ${volumeFactors[example.fromUnit].symbol}`;
        toSpan.textContent = `${example.result} ${volumeFactors[example.toUnit].symbol}`;
      }
    }
  });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initVolumeConverter();
    addCopyToClipboard();
    addConversionExamples();
  });
} else {
  initVolumeConverter();
  addCopyToClipboard();
  addConversionExamples();
}

// Export functions for global access
window.convertVolume = convertVolume;
window.clearForm = clearForm;