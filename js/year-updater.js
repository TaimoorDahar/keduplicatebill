/**
 * Automatically updates elements with the 'dynamic-year' class to the current year.
 * Also handles title tag updates if they contain previous year hardcodings.
 */
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();

    // 1. Update all elements explicitly marked for dynamic year
    document.querySelectorAll('.dynamic-year').forEach(el => {
        el.textContent = currentYear;
    });

    // 2. Fallback: Search and update text nodes specifically containing the previous year
    // This handles any we might have missed wrapping in spans
    const previousYear = currentYear - 1;
    const yearRegex = new RegExp(previousYear.toString(), 'g');

    // Update Page Title
    if (document.title.includes(previousYear.toString())) {
        document.title = document.title.replace(yearRegex, currentYear);
    }
});
