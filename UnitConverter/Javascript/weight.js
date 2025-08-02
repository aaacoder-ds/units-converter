// Modern Weight Converter JavaScript

// Weight conversion factors (to grams)
const weightFactors = {
  1: { name: 'Kilogram', factor: 1000, symbol: 'kg' },
  2: { name: 'Gram', factor: 1, symbol: 'g' },
  3: { name: 'Milligram', factor: 0.001, symbol: 'mg' },
  4: { name: 'Tonne', factor: 1000000, symbol: 't' },
  5: { name: 'Pound', factor: 453.59237, symbol: 'lb' },
  6: { name: 'Ounce', factor: 28.349523125, symbol: 'oz' },
  7: { name: 'Stone', factor: 6350.29318, symbol: 'st' }
};

// DOM Elements
const fromSelect = document.getElementById('selectfr');
const toSelect = document.getElementById('selectto');
const fromInput = document.getElementById('select1fr');
const toInput = document.getElementById('select1to');

// Initialize the converter
function initWeightConverter() {
  // Set default selections
  fromSelect.value = '1'; // Kilogram
  toSelect.value = '5';   // Pound
  
  // Add event listeners
  fromSelect.addEventListener('change', convertWeight);
  toSelect.addEventListener('change', convertWeight);
  fromInput.addEventListener('input', convertWeight);
  
  // Add real-time conversion
  fromInput.addEventListener('input', debounce(convertWeight, 300));
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
  
  // Add form validation
  addFormValidation();
  
  // Show initial conversion
  convertWeight();
}

// Main conversion function
function convertWeight() {
  const fromValue = parseFloat(fromInput.value);
  const fromUnit = parseInt(fromSelect.value);
  const toUnit = parseInt(toSelect.value);
  
  // Validate inputs
  if (isNaN(fromValue) || fromUnit === 0 || toUnit === 0) {
    toInput.value = '';
    return;
  }
  
  // Convert to grams first, then to target unit
  const grams = fromValue * weightFactors[fromUnit].factor;
  const result = grams / weightFactors[toUnit].factor;
  
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
  const fromUnitName = weightFactors[fromUnit].name;
  const toUnitName = weightFactors[toUnit].name;
  
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
  toSelect.value = '5';
  
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
    convertWeight();
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
    { from: 1, fromUnit: 5, toUnit: 6, result: 16 },
    { from: 1, fromUnit: 1, toUnit: 5, result: 2.2046 },
    { from: 1, fromUnit: 4, toUnit: 1, result: 1000 }
  ];
  
  // Update example items with real calculations
  const exampleItems = document.querySelectorAll('.example-item');
  exampleItems.forEach((item, index) => {
    if (examples[index]) {
      const example = examples[index];
      const fromSpan = item.querySelector('.example-from');
      const toSpan = item.querySelector('.example-to');
      
      if (fromSpan && toSpan) {
        fromSpan.textContent = `${example.from} ${weightFactors[example.fromUnit].symbol}`;
        toSpan.textContent = `${example.result} ${weightFactors[example.toUnit].symbol}`;
      }
    }
  });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initWeightConverter();
    addCopyToClipboard();
    addConversionExamples();
  });
} else {
  initWeightConverter();
  addCopyToClipboard();
  addConversionExamples();
}

// Export functions for global access
window.convertWeight = convertWeight;
window.clearForm = clearForm;