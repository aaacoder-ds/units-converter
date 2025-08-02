# 📐 Modern Unit Converter

A beautiful, responsive, and modern unit converter web application with support for length, weight, volume, currency, and temperature conversions.

## ✨ Features

### 🎨 Modern Design
- **Clean & Modern UI**: Beautiful gradient backgrounds with modern card-based layout
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatic dark mode detection and support
- **Smooth Animations**: Elegant hover effects and page transitions
- **Accessibility**: Full keyboard navigation and screen reader support

### 🔧 Enhanced Functionality
- **Real-time Conversion**: Instant results as you type
- **Smart Number Formatting**: Automatic precision based on value size
- **Form Validation**: Input validation with helpful error messages
- **Keyboard Shortcuts**: 
  - `Ctrl/Cmd + Enter`: Convert
  - `Escape`: Clear form
  - `Tab`: Navigate between fields
- **Copy to Clipboard**: Click result to copy to clipboard
- **PWA Support**: Installable as a web app with offline functionality

### 📱 Progressive Web App (PWA)
- **Offline Support**: Works without internet connection
- **Installable**: Can be installed on mobile and desktop
- **Fast Loading**: Optimized performance with service worker caching
- **App-like Experience**: Full-screen mode and native app feel

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and modern HTML features
- **CSS3**: 
  - CSS Grid and Flexbox for responsive layouts
  - CSS Custom Properties (variables) for theming
  - Modern animations and transitions
  - Mobile-first responsive design
- **JavaScript (ES6+)**: 
  - Modern JavaScript features
  - Service Worker for offline functionality
  - Intersection Observer for animations
  - Debounced input handling

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd units-converter
   ```

2. **Open in browser**:
   - Simply open `index.html` in your web browser
   - Or serve with a local server for PWA features:
     ```bash
     python -m http.server 8000
     # or
     npx serve .
     ```

3. **Start converting**:
   - Choose your conversion type (Length, Weight, Volume, etc.)
   - Select units and enter values
   - Get instant results!

## 📁 Project Structure

```
UnitConverter/
├── index.html              # Main landing page
├── styles.css              # Main stylesheet
├── script.js               # Main JavaScript
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── HTML/                   # Individual converter pages
│   ├── length.html
│   ├── weight.html
│   ├── volume.html
│   ├── currency.html
│   └── temperature.html
├── CSS/                    # Page-specific styles
│   ├── length.css
│   ├── weight.css
│   ├── volume.css
│   ├── currency.css
│   └── temperature.css
├── Javascript/             # Page-specific scripts
│   ├── length.js
│   ├── weight.js
│   ├── volume.js
│   ├── currency.js
│   └── temperature.js
└── images/                 # Images and icons
```

## 🎯 Supported Conversions

### 📏 Length
- Kilometers, Meters, Centimeters, Millimeters
- Miles, Yards, Feet, Inches
- Real-time conversion with smart formatting

### ⚖️ Weight
- Kilograms, Grams, Pounds, Ounces
- Metric and Imperial units
- Precise calculations

### 🧪 Volume
- Liters, Milliliters, Cubic Meters
- Gallons, Quarts, Pints
- Fluid measurements

### 💰 Currency
- Major world currencies
- Real-time exchange rates
- Historical data support

### 🌡️ Temperature
- Celsius, Fahrenheit, Kelvin
- Scientific and everyday use
- Precise temperature conversions

## 🔧 Customization

### Colors and Theming
The app uses CSS custom properties for easy theming. Main variables in `styles.css`:

```css
:root {
  --primary-color: #6366f1;
  --primary-dark: #4f46e5;
  --accent-color: #06b6d4;
  --text-primary: #1e293b;
  --background: #ffffff;
  /* ... more variables */
}
```

### Adding New Units
To add new units to a converter:

1. Update the conversion factors in the respective JavaScript file
2. Add options to the HTML select elements
3. Update the conversion logic if needed

## 📱 Browser Support

- **Chrome**: 60+ (Full support)
- **Firefox**: 55+ (Full support)
- **Safari**: 12+ (Full support)
- **Edge**: 79+ (Full support)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet

## 🚀 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Icons from various sources
- Fonts from Google Fonts (Inter)
- Modern web standards and best practices

---

**Made with ❤️ for the web community** 