# Bike Suspension Setup Calculator

A comprehensive calculator tool for setting up and tuning bike suspension systems.

## Features

- **Spring Rate Calculator**: Calculate optimal spring rates based on rider weight and preferences
- **Compression Damping**: Help determine appropriate compression damping settings
- **Rebound Damping**: Optimize rebound damping for your riding style
- **Sag Calculator**: Calculate proper suspension sag percentages
- **Preset Configurations**: Pre-configured setups for popular bike models
- **Unit Conversion**: Support for metric and imperial units

## Project Structure

```
suspension-calculator/
├── index.html              # Main application file
├── style.css              # Application styling
├── script.js              # Main application logic
├── calculator/            # Calculator modules
│   ├── suspension-math.js # Mathematical calculations
│   ├── presets.js         # Pre-configured setups
│   └── utils.js           # Utility functions
├── assets/                # Static assets (images, icons)
└── README.md              # This file
```

## Getting Started

1. Open `index.html` in your web browser
2. Select your bike model or enter custom specifications
3. Input your rider weight and preferences
4. Review recommended suspension settings
5. Save or export your configuration

## Usage

### Basic Setup

1. **Select Bike Model**: Choose from preset configurations or enter custom values
2. **Enter Rider Weight**: Input your weight in lbs or kg
3. **Choose Riding Style**: Select from XC, Trail, Enduro, or DH profiles
4. **Calculate Settings**: The app will recommend damping and spring rate values

### Advanced Features

- Adjust individual parameters for fine-tuning
- Compare multiple setup configurations
- Export settings as JSON or PDF

## Technical Details

The calculator uses industry-standard formulas for suspension tuning based on:
- Rider weight and motorcycle dynamics
- Suspension travel and geometry
- Riding conditions and terrain

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## License

MIT License - Feel free to modify and distribute
