// Modern Currency Converter JavaScript

// Currency conversion rates (approximate, would normally come from API)
const currencyRates = {
  1: { name: 'Indian Rupee', symbol: '₹', rate: 1 }, // Base currency
  2: { name: 'US Dollar', symbol: '$', rate: 0.012 },
  3: { name: 'British Pound', symbol: '£', rate: 0.0095 },
  4: { name: 'Euro', symbol: '€', rate: 0.011 },
  5: { name: 'Japanese Yen', symbol: '¥', rate: 1.8 },
  6: { name: 'Canadian Dollar', symbol: 'C$', rate: 0.016 },
  7: { name: 'Australian Dollar', symbol: 'A$', rate: 0.018 }
};

// DOM Elements
const fromSelect = document.getElementById('selectfr');
const toSelect = document.getElementById('selectto');
const fromInput = document.getElementById('select1fr');
const toInput = document.getElementById('select1to');

// Initialize the converter
function initCurrencyConverter() {
  // Set default selections
  fromSelect.value = '2'; // US Dollar
  toSelect.value = '1';   // Indian Rupee
  
  // Add event listeners
  fromSelect.addEventListener('change', convertCurrency);
  toSelect.addEventListener('change', convertCurrency);
  fromInput.addEventListener('input', convertCurrency);
  
  // Add real-time conversion
  fromInput.addEventListener('input', debounce(convertCurrency, 300));
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
  
  // Add form validation
  addFormValidation();
  
  // Show initial conversion
  convertCurrency();
}

// Main conversion function
function convertCurrency() {
  const fromValue = parseFloat(fromInput.value);
  const fromUnit = parseInt(fromSelect.value);
  const toUnit = parseInt(toSelect.value);
  
  // Validate inputs
  if (isNaN(fromValue) || fromUnit === 0 || toUnit === 0) {
    toInput.value = '';
    return;
  }
  
  // Convert currency
  const fromRate = currencyRates[fromUnit].rate;
  const toRate = currencyRates[toUnit].rate;
  const result = (fromValue / fromRate) * toRate;
  
  // Format result
  toInput.value = formatCurrency(result);
  
  // Add visual feedback
  addConversionFeedback(fromValue, fromUnit, toUnit, result);
}

// Format currency with appropriate precision
function formatCurrency(num) {
  if (num === 0) return '0';
  
  // Determine appropriate decimal places
  let precision = 2;
  if (Math.abs(num) >= 1000) precision = 0;
  else if (Math.abs(num) >= 100) precision = 1;
  else precision = 2;
  
  return Number(num.toFixed(precision)).toString();
}

// Add visual feedback for conversion
function addConversionFeedback(fromValue, fromUnit, toUnit, result) {
  const fromUnitName = currencyRates[fromUnit].name;
  const toUnitName = currencyRates[toUnit].name;
  
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
  fromSelect.value = '2';
  toSelect.value = '1';
  
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
    convertCurrency();
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
    { from: 1, fromUnit: 2, toUnit: 1, result: 83 },
    { from: 1, fromUnit: 4, toUnit: 2, result: 1.09 },
    { from: 1, fromUnit: 3, toUnit: 2, result: 1.27 },
    { from: 1, fromUnit: 2, toUnit: 5, result: 150 }
  ];
  
  // Update example items with real calculations
  const exampleItems = document.querySelectorAll('.example-item');
  exampleItems.forEach((item, index) => {
    if (examples[index]) {
      const example = examples[index];
      const fromSpan = item.querySelector('.example-from');
      const toSpan = item.querySelector('.example-to');
      
      if (fromSpan && toSpan) {
        fromSpan.textContent = `${example.from} ${currencyRates[example.fromUnit].symbol}`;
        toSpan.textContent = `~${example.result} ${currencyRates[example.toUnit].symbol}`;
      }
    }
  });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initCurrencyConverter();
    addCopyToClipboard();
    addConversionExamples();
  });
} else {
  initCurrencyConverter();
  addCopyToClipboard();
  addConversionExamples();
}

// Export functions for global access
window.convertCurrency = convertCurrency;
window.clearForm = clearForm;