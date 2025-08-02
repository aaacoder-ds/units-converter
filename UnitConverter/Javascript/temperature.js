// Modern Temperature Converter JavaScript

// Temperature conversion functions
const temperatureConversions = {
  // Celsius to other units
  celsiusToFahrenheit: (celsius) => (celsius * 9/5) + 32,
  celsiusToKelvin: (celsius) => celsius + 273.15,
  
  // Fahrenheit to other units
  fahrenheitToCelsius: (fahrenheit) => (fahrenheit - 32) * 5/9,
  fahrenheitToKelvin: (fahrenheit) => (fahrenheit - 32) * 5/9 + 273.15,
  
  // Kelvin to other units
  kelvinToCelsius: (kelvin) => kelvin - 273.15,
  kelvinToFahrenheit: (kelvin) => (kelvin - 273.15) * 9/5 + 32
};

// Temperature unit information
const temperatureUnits = {
  1: { name: 'Celsius', symbol: '°C' },
  2: { name: 'Fahrenheit', symbol: '°F' },
  3: { name: 'Kelvin', symbol: 'K' }
};

// DOM Elements
const fromSelect = document.getElementById('selectfr');
const toSelect = document.getElementById('selectto');
const fromInput = document.getElementById('select1fr');
const toInput = document.getElementById('select1to');

// Initialize the converter
function initTemperatureConverter() {
  // Set default selections
  fromSelect.value = '1'; // Celsius
  toSelect.value = '2';   // Fahrenheit
  
  // Add event listeners
  fromSelect.addEventListener('change', convertTemperature);
  toSelect.addEventListener('change', convertTemperature);
  fromInput.addEventListener('input', convertTemperature);
  
  // Add real-time conversion
  fromInput.addEventListener('input', debounce(convertTemperature, 300));
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
  
  // Add form validation
  addFormValidation();
  
  // Show initial conversion
  convertTemperature();
}

// Main conversion function
function convertTemperature() {
  const fromValue = parseFloat(fromInput.value);
  const fromUnit = parseInt(fromSelect.value);
  const toUnit = parseInt(toSelect.value);
  
  // Validate inputs
  if (isNaN(fromValue) || fromUnit === 0 || toUnit === 0) {
    toInput.value = '';
    return;
  }
  
  // Convert temperature
  let result;
  
  if (fromUnit === toUnit) {
    result = fromValue;
  } else if (fromUnit === 1) { // Celsius
    if (toUnit === 2) { // Fahrenheit
      result = temperatureConversions.celsiusToFahrenheit(fromValue);
    } else if (toUnit === 3) { // Kelvin
      result = temperatureConversions.celsiusToKelvin(fromValue);
    }
  } else if (fromUnit === 2) { // Fahrenheit
    if (toUnit === 1) { // Celsius
      result = temperatureConversions.fahrenheitToCelsius(fromValue);
    } else if (toUnit === 3) { // Kelvin
      result = temperatureConversions.fahrenheitToKelvin(fromValue);
    }
  } else if (fromUnit === 3) { // Kelvin
    if (toUnit === 1) { // Celsius
      result = temperatureConversions.kelvinToCelsius(fromValue);
    } else if (toUnit === 2) { // Fahrenheit
      result = temperatureConversions.kelvinToFahrenheit(fromValue);
    }
  }
  
  // Format result
  toInput.value = formatNumber(result);
  
  // Add visual feedback
  addConversionFeedback(fromValue, fromUnit, toUnit, result);
}

// Format number with appropriate precision
function formatNumber(num) {
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
  const fromUnitName = temperatureUnits[fromUnit].name;
  const toUnitName = temperatureUnits[toUnit].name;
  
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
    convertTemperature();
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
    { from: 0, fromUnit: 1, toUnit: 2, result: 32 },
    { from: 100, fromUnit: 1, toUnit: 2, result: 212 },
    { from: 0, fromUnit: 1, toUnit: 3, result: 273.15 },
    { from: -40, fromUnit: 1, toUnit: 2, result: -40 }
  ];
  
  // Update example items with real calculations
  const exampleItems = document.querySelectorAll('.example-item');
  exampleItems.forEach((item, index) => {
    if (examples[index]) {
      const example = examples[index];
      const fromSpan = item.querySelector('.example-from');
      const toSpan = item.querySelector('.example-to');
      
      if (fromSpan && toSpan) {
        fromSpan.textContent = `${example.from}${temperatureUnits[example.fromUnit].symbol}`;
        toSpan.textContent = `${example.result}${temperatureUnits[example.toUnit].symbol}`;
      }
    }
  });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initTemperatureConverter();
    addCopyToClipboard();
    addConversionExamples();
  });
} else {
  initTemperatureConverter();
  addCopyToClipboard();
  addConversionExamples();
}

// Export functions for global access
window.convertTemperature = convertTemperature;
window.clearForm = clearForm;