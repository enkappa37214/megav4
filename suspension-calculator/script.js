// Main Application Logic

const app = {
    data: {
        riderWeight: 0,
        weightUnit: 'lbs',
        suspensionTravel: 0,
        forkTravel: 0,
        ridingStyle: 'trail',
        bikeModel: ''
    },

    init() {
        this.cacheDOM();
        this.bindEvents();
    },

    cacheDOM() {
        this.bikeModelEl = document.getElementById('bikeModel');
        this.riderWeightEl = document.getElementById('riderWeight');
        this.weightUnitEl = document.getElementById('weightUnit');
        this.suspensionTravelEl = document.getElementById('suspensionTravel');
        this.forkTravelEl = document.getElementById('forkTravel');
        this.ridingStyleEl = document.getElementById('ridingStyle');
        this.calculateBtn = document.getElementById('calculateBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.resultsSection = document.getElementById('resultsSection');
    },

    bindEvents() {
        this.calculateBtn.addEventListener('click', () => this.handleCalculate());
        this.resetBtn.addEventListener('click', () => this.handleReset());
        this.exportBtn.addEventListener('click', () => this.handleExport());
        this.bikeModelEl.addEventListener('change', (e) => this.handleBikeModelChange(e));
    },

    handleBikeModelChange(e) {
        const model = e.target.value;
        if (model && bikePresets[model]) {
            const preset = bikePresets[model];
            this.suspensionTravelEl.value = preset.suspensionTravel;
            this.forkTravelEl.value = preset.forkTravel;
        }
    },

    handleCalculate() {
        if (!this.validateInput()) return;

        this.collectFormData();
        const setup = this.calculateSetup();
        this.displayResults(setup);
    },

    validateInput() {
        if (!this.riderWeightEl.value) {
            alert('Please enter your rider weight');
            return false;
        }
        if (!this.suspensionTravelEl.value) {
            alert('Please enter suspension travel');
            return false;
        }
        if (!this.forkTravelEl.value) {
            alert('Please enter fork travel');
            return false;
        }
        return true;
    },

    collectFormData() {
        this.data.riderWeight = parseFloat(this.riderWeightEl.value);
        this.data.weightUnit = this.weightUnitEl.value;
        this.data.suspensionTravel = parseFloat(this.suspensionTravelEl.value);
        this.data.forkTravel = parseFloat(this.forkTravelEl.value);
        this.data.ridingStyle = this.ridingStyleEl.value;
        this.data.bikeModel = this.bikeModelEl.value;
    },

    calculateSetup() {
        const weightInLbs = this.data.weightUnit === 'kg' 
            ? this.data.riderWeight * 2.20462 
            : this.data.riderWeight;

        const styleMultiplier = this.getStyleMultiplier(this.data.ridingStyle);

        return {
            fork: this.calculateForkSetup(weightInLbs, styleMultiplier),
            shock: this.calculateShockSetup(weightInLbs, styleMultiplier)
        };
    },

    getStyleMultiplier(style) {
        const multipliers = {
            'xc': 1.2,
            'trail': 1.0,
            'enduro': 0.9,
            'dh': 0.8
        };
        return multipliers[style] || 1.0;
    },

    calculateForkSetup(weightInLbs, multiplier) {
        const springRate = calculateSpringRate(weightInLbs, this.data.forkTravel, 'fork') * multiplier;
        const compression = Math.round((weightInLbs / 10) * multiplier);
        const rebound = Math.round(compression * 1.2);
        const sag = calculateSag(this.data.forkTravel, 'fork');

        return {
            springRate: `${springRate.toFixed(1)} Nm/mm`,
            compression: `${compression} clicks`,
            rebound: `${rebound} clicks`,
            sag: `${sag}%`
        };
    },

    calculateShockSetup(weightInLbs, multiplier) {
        const springRate = calculateSpringRate(weightInLbs, this.data.suspensionTravel, 'shock') * multiplier;
        const compression = Math.round((weightInLbs / 12) * multiplier);
        const rebound = Math.round(compression * 1.15);
        const sag = calculateSag(this.data.suspensionTravel, 'shock');

        return {
            springRate: `${springRate.toFixed(1)} Nm/mm`,
            compression: `${compression} clicks`,
            rebound: `${rebound} clicks`,
            sag: `${sag}%`
        };
    },

    displayResults(setup) {
        document.getElementById('forkSpringRate').textContent = setup.fork.springRate;
        document.getElementById('forkCompression').textContent = setup.fork.compression;
        document.getElementById('forkRebound').textContent = setup.fork.rebound;
        document.getElementById('forkSag').textContent = setup.fork.sag;

        document.getElementById('shockSpringRate').textContent = setup.shock.springRate;
        document.getElementById('shockCompression').textContent = setup.shock.compression;
        document.getElementById('shockRebound').textContent = setup.shock.rebound;
        document.getElementById('shockSag').textContent = setup.shock.sag;

        const notes = this.generateNotes();
        document.getElementById('setupNotes').textContent = notes;

        this.resultsSection.style.display = 'block';
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    },

    generateNotes() {
        const style = this.data.ridingStyle;
        const notes = {
            'xc': 'XC setup: Stiffer settings for efficiency. Start with recommended values and adjust based on trail feedback.',
            'trail': 'Trail setup: Balanced compression and rebound. Great starting point for general trail riding.',
            'enduro': 'Enduro setup: Slightly softer for comfort on long descents. Consider adding volume spacers for progression.',
            'dh': 'DH setup: Softer damping for small bump compliance. Prepare for adjustments based on terrain.'
        };
        return notes[style] || 'Adjust settings based on personal preference and terrain conditions.';
    },

    handleReset() {
        document.getElementById('bikeModel').value = '';
        this.riderWeightEl.value = '';
        this.suspensionTravelEl.value = '';
        this.forkTravelEl.value = '';
        this.ridingStyleEl.value = 'trail';
        this.resultsSection.style.display = 'none';
    },

    handleExport() {
        const setup = {
            date: new Date().toISOString(),
            riderWeight: `${this.data.riderWeight} ${this.data.weightUnit}`,
            bikeModel: this.data.bikeModel || 'Custom',
            ridingStyle: this.data.ridingStyle,
            suspensionTravel: `${this.data.suspensionTravel}mm`,
            forkTravel: `${this.data.forkTravel}mm`,
            results: {
                fork: {
                    springRate: document.getElementById('forkSpringRate').textContent,
                    compression: document.getElementById('forkCompression').textContent,
                    rebound: document.getElementById('forkRebound').textContent,
                    sag: document.getElementById('forkSag').textContent
                },
                shock: {
                    springRate: document.getElementById('shockSpringRate').textContent,
                    compression: document.getElementById('shockCompression').textContent,
                    rebound: document.getElementById('shockRebound').textContent,
                    sag: document.getElementById('shockSag').textContent
                }
            }
        };

        const jsonString = JSON.stringify(setup, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `suspension-setup-${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
