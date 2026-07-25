class KECalculators {
    constructor() {
        this.init();
    }

    init() {
        this.bindEstimationCalculator();
        this.bindUnitCalculator();
    }

    bindEstimationCalculator() {
        const btn = document.getElementById('calc-estimate-btn');
        if(!btn) return;
        
        btn.addEventListener('click', () => {
            const units = parseInt(document.getElementById('units-consumed').value) || 0;
            const phase = document.getElementById('meter-phase').value;
            const isFiler = document.getElementById('tax-filer').checked;
            
            let result = this.calculateBill(units, phase, isFiler);
            this.displayResult('estimate-result', result);
        });
    }

    calculateBill(units, phase, isFiler) {
        let rate = 0;
        let isProtected = false;
        
        // 2026 Tariff logic
        if(units <= 100) { rate = 13.48; isProtected = true; }
        else if(units <= 200) { rate = 18.58; isProtected = true; }
        else if(units <= 300) { rate = 34.26; }
        else if(units <= 400) { rate = 39.15; }
        else if(units <= 500) { rate = 41.36; }
        else if(units <= 600) { rate = 42.78; }
        else if(units <= 700) { rate = 43.92; }
        else { rate = 48.84; }

        let energyCharge = units * rate;
        let fixedCharge = phase === '3' ? (units > 0 ? 500 : 0) : 0; 
        
        // Taxes and Duties
        let ed = energyCharge * 0.015; // Electricity Duty 1.5%
        let gst = (energyCharge + ed) * 0.18; // General Sales Tax 18%
        
        // Income Tax
        let it = 0;
        if(energyCharge > 25000) {
            it = isFiler ? 0 : (energyCharge * 0.075);
        }
        
        // FPA (Average historical estimate for simulation)
        let fpa = units * 2.50; 
        
        let total = energyCharge + fixedCharge + ed + gst + it + fpa;
        
        return {
            energyCharge,
            fixedCharge,
            ed,
            gst,
            it,
            fpa,
            total,
            rate,
            isProtected
        };
    }

    displayResult(elementId, result) {
        const el = document.getElementById(elementId);
        if(!el) return;
        
        const format = (num) => 'Rs. ' + num.toFixed(2);
        
        el.innerHTML = `
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:1.5rem; margin-top:1.5rem;">
                <h4 style="margin-bottom:1rem; color:#0f172a; border-bottom:1px solid #e2e8f0; padding-bottom:0.5rem;">Estimated Bill Breakdown</h4>
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                    <span>Energy Charges (${result.rate} / unit)</span>
                    <strong>${format(result.energyCharge)}</strong>
                </div>
                ${result.fixedCharge > 0 ? `
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                    <span>Fixed Charges (3-Phase)</span>
                    <strong>${format(result.fixedCharge)}</strong>
                </div>` : ''}
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; color:#64748b;">
                    <span>Electricity Duty (1.5%)</span>
                    <span>${format(result.ed)}</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; color:#64748b;">
                    <span>General Sales Tax (18%)</span>
                    <span>${format(result.gst)}</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; color:#64748b;">
                    <span>Est. Fuel Price Adjustment</span>
                    <span>${format(result.fpa)}</span>
                </div>
                ${result.it > 0 ? `
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; color:#ef4444;">
                    <span>Advance Income Tax (Non-Filer)</span>
                    <span>${format(result.it)}</span>
                </div>` : ''}
                
                <div style="display:flex; justify-content:space-between; margin-top:1rem; padding-top:1rem; border-top:2px dashed #cbd5e1;">
                    <span style="font-weight:700; font-size:1.1rem;">Estimated Total Bill</span>
                    <strong style="color:#059669; font-size:1.2rem;">${format(result.total)}</strong>
                </div>
                ${result.isProtected ? '<div style="margin-top:1rem; font-size:0.85rem; color:#059669; background:#dcfce7; padding:0.5rem; border-radius:4px;">✓ You fall under the Protected Consumer category.</div>' : ''}
            </div>
        `;
    }

    bindUnitCalculator() {
        // Implementation for simple unit converter/tracker
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.keCalculators = new KECalculators();
});
