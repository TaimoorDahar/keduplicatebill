class KECalculators {
    constructor() {
        this.init();
    }

    init() {
        this.bindEstimationCalculator();
        this.bindUnitCalculator();
        this.bindApplianceUsageCalculator();
        this.bindDueDateReminder();
        this.bindFPACalculator();
        this.bindGSTCalculator();
        this.loadDueDate();
    }

    // 1. Bill Estimation Calculator
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
        let energyCharge = 0;
        let isProtected = false;
        let rateSummary = '';

        if (units <= 0) {
            return { energyCharge: 0, fixedCharge: 0, ed: 0, gst: 0, it: 0, fpa: 0, total: 0, rateSummary: 'Rs. 0.00 / unit', isProtected: true };
        }

        // Protected Consumers (units <= 200)
        if (units <= 200) {
            isProtected = true;
            if (units <= 100) {
                energyCharge = units * 13.48;
                rateSummary = 'Rs. 13.48 / unit (Protected 0-100)';
            } else {
                energyCharge = (100 * 13.48) + ((units - 100) * 18.58);
                rateSummary = 'Progressive Protected Slabs (13.48 & 18.58 / unit)';
            }
        } else {
            // Unprotected Consumers (Progressive NEPRA Slabs)
            isProtected = false;
            let remaining = units;
            rateSummary = 'Progressive Unprotected Slabs';

            // Slab 1: 1 - 100 units @ 16.48
            let s1 = Math.min(remaining, 100);
            energyCharge += s1 * 16.48;
            remaining -= s1;

            // Slab 2: 101 - 200 units @ 22.95
            if (remaining > 0) {
                let s2 = Math.min(remaining, 100);
                energyCharge += s2 * 22.95;
                remaining -= s2;
            }

            // Slab 3: 201 - 300 units @ 34.26
            if (remaining > 0) {
                let s3 = Math.min(remaining, 100);
                energyCharge += s3 * 34.26;
                remaining -= s3;
            }

            // Slab 4: 301 - 400 units @ 39.15
            if (remaining > 0) {
                let s4 = Math.min(remaining, 100);
                energyCharge += s4 * 39.15;
                remaining -= s4;
            }

            // Slab 5: 401 - 500 units @ 41.36
            if (remaining > 0) {
                let s5 = Math.min(remaining, 100);
                energyCharge += s5 * 41.36;
                remaining -= s5;
            }

            // Slab 6: 501 - 600 units @ 42.78
            if (remaining > 0) {
                let s6 = Math.min(remaining, 100);
                energyCharge += s6 * 42.78;
                remaining -= s6;
            }

            // Slab 7: 601 - 700 units @ 43.92
            if (remaining > 0) {
                let s7 = Math.min(remaining, 100);
                energyCharge += s7 * 43.92;
                remaining -= s7;
            }

            // Slab 8: Above 700 units @ 48.84
            if (remaining > 0) {
                energyCharge += remaining * 48.84;
            }
        }

        let fixedCharge = phase === '3' ? (units > 0 ? 500 : 0) : 0; 
        let ed = energyCharge * 0.015;
        let fpa = units * 2.50; 
        let gst = (energyCharge + fixedCharge + ed + fpa) * 0.18;
        let it = (energyCharge > 25000 && !isFiler) ? (energyCharge * 0.075) : 0;
        let total = energyCharge + fixedCharge + ed + gst + it + fpa;
        
        return { energyCharge, fixedCharge, ed, gst, it, fpa, total, rateSummary, isProtected };
    }

    displayResult(elementId, result) {
        const el = document.getElementById(elementId);
        if(!el) return;
        const format = (num) => 'Rs. ' + num.toFixed(2);
        el.innerHTML = `
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:1.5rem; margin-top:1.5rem;">
                <h4 style="margin-bottom:1rem; color:#0f172a; border-bottom:1px solid #e2e8f0; padding-bottom:0.5rem;">Estimated Bill Breakdown</h4>
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;"><span>Energy Charges (${result.rateSummary})</span><strong>${format(result.energyCharge)}</strong></div>
                ${result.fixedCharge > 0 ? `<div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;"><span>Fixed Charges (3-Phase)</span><strong>${format(result.fixedCharge)}</strong></div>` : ''}
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; color:#64748b;"><span>Electricity Duty (1.5%)</span><span>${format(result.ed)}</span></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; color:#64748b;"><span>Est. Fuel Price Adjustment</span><span>${format(result.fpa)}</span></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; color:#64748b;"><span>General Sales Tax (18%)</span><span>${format(result.gst)}</span></div>
                ${result.it > 0 ? `<div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; color:#ef4444;"><span>Advance Income Tax (Non-Filer)</span><span>${format(result.it)}</span></div>` : ''}
                <div style="display:flex; justify-content:space-between; margin-top:1rem; padding-top:1rem; border-top:2px dashed #cbd5e1;"><span style="font-weight:700; font-size:1.1rem;">Estimated Total Bill</span><strong style="color:#059669; font-size:1.2rem;">${format(result.total)}</strong></div>
                ${result.isProtected ? '<div style="margin-top:1rem; font-size:0.85rem; color:#059669; background:#dcfce7; padding:0.5rem; border-radius:4px;">✓ You fall under the Protected Consumer category.</div>' : ''}
            </div>`;
    }

    // 2. Electricity Unit Calculator (Watts to Units)
    bindUnitCalculator() {
        const btn = document.getElementById('calc-unit-btn');
        if(!btn) return;
        btn.addEventListener('click', () => {
            const watts = parseFloat(document.getElementById('uc-watts').value) || 0;
            const hours = parseFloat(document.getElementById('uc-hours').value) || 0;
            const days = parseFloat(document.getElementById('uc-days').value) || 30;
            const units = (watts * hours * days) / 1000;
            document.getElementById('unit-result').innerHTML = `<div style="padding:1rem; background:#dcfce7; color:#065f46; border-radius:4px; margin-top:1rem; font-weight:600;">Estimated Consumption: ${units.toFixed(2)} Units (kWh) per month</div>`;
        });
    }

    // 3. Monthly Usage Appliance Calculator
    bindApplianceUsageCalculator() {
        const btn = document.getElementById('calc-app-btn');
        if(!btn) return;
        btn.addEventListener('click', () => {
            const acHours = parseFloat(document.getElementById('app-ac').value) || 0;
            const fridgeHours = parseFloat(document.getElementById('app-fridge').value) || 0;
            const fanHours = parseFloat(document.getElementById('app-fan').value) || 0;
            
            // Estimates: AC=1500W, Fridge=300W, Fan=75W
            const totalDailyWh = (acHours * 1500) + (fridgeHours * 300) + (fanHours * 75 * 3); // Assuming 3 fans
            const monthlyUnits = (totalDailyWh * 30) / 1000;
            document.getElementById('app-result').innerHTML = `<div style="padding:1rem; background:#e0f2fe; color:#0369a1; border-radius:4px; margin-top:1rem; font-weight:600;">Estimated Monthly Base Usage: ${monthlyUnits.toFixed(0)} Units (kWh)</div>`;
        });
    }

    // 4. Due Date Reminder (LocalStorage)
    bindDueDateReminder() {
        const btn = document.getElementById('save-reminder-btn');
        if(!btn) return;
        btn.addEventListener('click', () => {
            const date = document.getElementById('due-date-input').value;
            if(date) {
                localStorage.setItem('ke_due_date', date);
                this.loadDueDate();
                alert("Reminder Saved! The site will remind you of your due date.");
            }
        });
    }

    loadDueDate() {
        const date = localStorage.getItem('ke_due_date');
        const display = document.getElementById('reminder-display');
        if(date && display) {
            const today = new Date();
            const due = new Date(date);
            const diffTime = due - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            let msg = '';
            if(diffDays < 0) msg = `<span style="color:#ef4444;">Overdue by ${Math.abs(diffDays)} days!</span>`;
            else if(diffDays === 0) msg = `<span style="color:#f59e0b;">Due Today!</span>`;
            else msg = `<span style="color:#059669;">Due in ${diffDays} days</span>`;
            display.innerHTML = `<div style="padding:1rem; background:#f8fafc; border:1px solid #cbd5e1; border-radius:4px; margin-top:1rem;"><strong>Saved Due Date:</strong> ${date} <br> ${msg}</div>`;
        }
    }

    // 5. Fuel Price Adjustment Calculator
    bindFPACalculator() {
        const btn = document.getElementById('calc-fpa-btn');
        if(!btn) return;
        btn.addEventListener('click', () => {
            const units = parseFloat(document.getElementById('fpa-units').value) || 0;
            const rate = parseFloat(document.getElementById('fpa-rate').value) || 0;
            const totalFPA = units * rate;
            const totalWithTax = totalFPA * 1.18; // 18% GST on FPA
            document.getElementById('fpa-result').innerHTML = `<div style="padding:1rem; background:#fef3c7; color:#92400e; border-radius:4px; margin-top:1rem; font-weight:600;">FPA Cost: Rs. ${totalFPA.toFixed(2)}<br>With GST (18%): Rs. ${totalWithTax.toFixed(2)}</div>`;
        });
    }

    // 6. GST Calculator
    bindGSTCalculator() {
        const btn = document.getElementById('calc-gst-btn');
        if(!btn) return;
        btn.addEventListener('click', () => {
            const amount = parseFloat(document.getElementById('gst-amount').value) || 0;
            const gst = amount * 0.18;
            document.getElementById('gst-result').innerHTML = `<div style="padding:1rem; background:#f3e8ff; color:#6b21a8; border-radius:4px; margin-top:1rem; font-weight:600;">Standard GST (18%): Rs. ${gst.toFixed(2)}<br>Total Amount: Rs. ${(amount+gst).toFixed(2)}</div>`;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.keCalculators = new KECalculators();
});
