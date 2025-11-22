// Electricity Bill Calculator - Vanilla JavaScript
// Tariff data for different electricity providers in Pakistan

const tariffData = {
    'ke': {
        name: 'K-Electric (Karachi)',
        slabs: [
            { min: 0, max: 50, rate: 2.00 },
            { min: 51, max: 100, rate: 5.79 },
            { min: 101, max: 200, rate: 8.11 },
            { min: 201, max: 300, rate: 10.20 },
            { min: 301, max: 700, rate: 17.50 },
            { min: 701, max: Infinity, rate: 20.00 }
        ],
        fixedCharges: 75,
        taxRate: 0.17 // 17% GST
    },
    'lesco': {
        name: 'LESCO (Lahore)',
        slabs: [
            { min: 0, max: 50, rate: 2.00 },
            { min: 51, max: 100, rate: 5.95 },
            { min: 101, max: 200, rate: 8.37 },
            { min: 201, max: 300, rate: 10.45 },
            { min: 301, max: 700, rate: 17.90 },
            { min: 701, max: Infinity, rate: 20.50 }
        ],
        fixedCharges: 80,
        taxRate: 0.17
    },
    'iesco': {
        name: 'IESCO (Islamabad)',
        slabs: [
            { min: 0, max: 50, rate: 2.00 },
            { min: 51, max: 100, rate: 6.00 },
            { min: 101, max: 200, rate: 8.50 },
            { min: 201, max: 300, rate: 10.60 },
            { min: 301, max: 700, rate: 18.00 },
            { min: 701, max: Infinity, rate: 21.00 }
        ],
        fixedCharges: 85,
        taxRate: 0.17
    },
    'mepco': {
        name: 'MEPCO (Multan)',
        slabs: [
            { min: 0, max: 50, rate: 2.00 },
            { min: 51, max: 100, rate: 5.90 },
            { min: 101, max: 200, rate: 8.30 },
            { min: 201, max: 300, rate: 10.40 },
            { min: 301, max: 700, rate: 17.80 },
            { min: 701, max: Infinity, rate: 20.30 }
        ],
        fixedCharges: 75,
        taxRate: 0.17
    },
    'fesco': {
        name: 'FESCO (Faisalabad)',
        slabs: [
            { min: 0, max: 50, rate: 2.00 },
            { min: 51, max: 100, rate: 5.95 },
            { min: 101, max: 200, rate: 8.35 },
            { min: 201, max: 300, rate: 10.42 },
            { min: 301, max: 700, rate: 17.85 },
            { min: 701, max: Infinity, rate: 20.40 }
        ],
        fixedCharges: 80,
        taxRate: 0.17
    }
};

// Calculate electricity bill
function calculateBill() {
    const provider = document.getElementById('provider').value;
    const units = parseInt(document.getElementById('units').value);

    // Validation
    if (!provider || !units || units <= 0) {
        showError('Please select a provider and enter valid units');
        return;
    }

    const tariff = tariffData[provider];
    let totalCost = 0;
    let remainingUnits = units;
    let breakdown = [];

    // Calculate cost based on slabs
    for (let slab of tariff.slabs) {
        if (remainingUnits <= 0) break;

        const slabUnits = Math.min(
            remainingUnits,
            slab.max === Infinity ? remainingUnits : (slab.max - slab.min + 1)
        );

        const slabCost = slabUnits * slab.rate;
        totalCost += slabCost;

        breakdown.push({
            range: slab.max === Infinity ? `${slab.min}+` : `${slab.min}-${slab.max}`,
            units: slabUnits,
            rate: slab.rate,
            cost: slabCost
        });

        remainingUnits -= slabUnits;
    }

    // Add fixed charges
    const fixedCharges = tariff.fixedCharges;
    const subtotal = totalCost + fixedCharges;

    // Calculate tax
    const tax = subtotal * tariff.taxRate;
    const grandTotal = subtotal + tax;

    // Display results
    displayResults({
        provider: tariff.name,
        units: units,
        breakdown: breakdown,
        energyCost: totalCost,
        fixedCharges: fixedCharges,
        subtotal: subtotal,
        tax: tax,
        grandTotal: grandTotal
    });
}

// Display calculation results
function displayResults(result) {
    const resultsDiv = document.getElementById('results');

    let breakdownHTML = '';
    result.breakdown.forEach(item => {
        breakdownHTML += `
            <tr>
                <td>${item.range} units</td>
                <td>${item.units}</td>
                <td>Rs. ${item.rate.toFixed(2)}</td>
                <td>Rs. ${item.cost.toFixed(2)}</td>
            </tr>
        `;
    });

    resultsDiv.innerHTML = `
        <div class="card fade-in">
            <h3>📊 Bill Calculation Results</h3>
            <p><strong>Provider:</strong> ${result.provider}</p>
            <p><strong>Total Units Consumed:</strong> ${result.units} kWh</p>
            
            <h4 class="mt-3">Breakdown by Slab:</h4>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
                    <thead>
                        <tr style="background: var(--light-gray);">
                            <th style="padding: 0.75rem; text-align: left; border: 1px solid var(--gray);">Slab Range</th>
                            <th style="padding: 0.75rem; text-align: left; border: 1px solid var(--gray);">Units</th>
                            <th style="padding: 0.75rem; text-align: left; border: 1px solid var(--gray);">Rate/Unit</th>
                            <th style="padding: 0.75rem; text-align: left; border: 1px solid var(--gray);">Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${breakdownHTML}
                    </tbody>
                </table>
            </div>
            
            <div class="mt-3" style="border-top: 2px solid var(--light-gray); padding-top: 1rem;">
                <p><strong>Energy Cost:</strong> Rs. ${result.energyCost.toFixed(2)}</p>
                <p><strong>Fixed Charges:</strong> Rs. ${result.fixedCharges.toFixed(2)}</p>
                <p><strong>Subtotal:</strong> Rs. ${result.subtotal.toFixed(2)}</p>
                <p><strong>Tax (GST 17%):</strong> Rs. ${result.tax.toFixed(2)}</p>
                <h3 style="color: var(--primary); margin-top: 1rem;">Total Bill: Rs. ${result.grandTotal.toFixed(2)}</h3>
            </div>
            
            <div class="mt-3" style="background: var(--light-gray); padding: 1rem; border-radius: var(--radius-md);">
                <p style="margin: 0; font-size: 0.875rem; color: var(--gray);">
                    <strong>Note:</strong> This is an estimated calculation based on standard tariff rates. 
                    Actual bills may vary based on additional charges, fuel adjustments, and other factors.
                </p>
            </div>
        </div>
    `;

    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Show error message
function showError(message) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <div class="card" style="background: #fff3cd; border-left: 4px solid #ffc107;">
            <p style="margin: 0; color: #856404;">⚠️ ${message}</p>
        </div>
    `;
    resultsDiv.style.display = 'block';
}

// Update tariff table when provider changes
function updateTariffTable() {
    const provider = document.getElementById('provider').value;
    if (!provider) return;

    const tariff = tariffData[provider];
    const tableBody = document.getElementById('tariff-table-body');

    let tableHTML = '';
    tariff.slabs.forEach(slab => {
        tableHTML += `
            <tr>
                <td>${slab.max === Infinity ? `${slab.min}+` : `${slab.min}-${slab.max}`}</td>
                <td>Rs. ${slab.rate.toFixed(2)}</td>
            </tr>
        `;
    });

    tableBody.innerHTML = tableHTML;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    // Set default provider to KE
    document.getElementById('provider').value = 'ke';
    updateTariffTable();
});
