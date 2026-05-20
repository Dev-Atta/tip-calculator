// grab all the elements we need
const billInput    = document.getElementById('bill');
const tipInput     = document.getElementById('tip');
const peopleInput  = document.getElementById('people');
const presetBtns   = document.querySelectorAll('.preset');
const customWrap   = document.getElementById('custom-wrap');
const resetBtn     = document.getElementById('reset-btn');

const billError    = document.getElementById('bill-error');
const tipError     = document.getElementById('tip-error');
const peopleError  = document.getElementById('people-error');

const tipPerPerson    = document.getElementById('tip-per-person');
const totalPerPerson  = document.getElementById('total-per-person');
const grandTotal      = document.getElementById('grand-total');

// track which tip value is currently selected
// either a number (from preset or custom) or null
let activeTipValue = null;


// ---- PRESET BUTTON LOGIC ----

presetBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {

    // clear active from all
    presetBtns.forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');

    if (btn.dataset.value === 'custom') {
      customWrap.style.display = 'flex';
      tipInput.focus();
      activeTipValue = parseFloat(tipInput.value);
    } else {
      customWrap.style.display = 'none';
      tipInput.value = '';
      activeTipValue = parseFloat(btn.dataset.value);
    }

    clearError(tipError, tipInput);
    calculate();
  });
});


// ---- INPUT EVENT LISTENERS ----

billInput.addEventListener('input', function() {
  clearError(billError, billInput);
  calculate();
});

tipInput.addEventListener('input', function() {
  activeTipValue = parseFloat(tipInput.value);
  clearError(tipError, tipInput);
  calculate();
});

peopleInput.addEventListener('input', function() {
  clearError(peopleError, peopleInput);
  calculate();
});


// ---- MAIN CALCULATE FUNCTION ----

function calculate() {
  var bill   = parseFloat(billInput.value);
  var tip    = activeTipValue;
  var people = parseInt(peopleInput.value, 10);

  var valid = true;

  // validate bill
  if (billInput.value.trim() === '') {
    // empty is fine, just show zeros
  } else if (isNaN(bill) || bill < 0) {
    showError(billError, billInput, "Must be a positive number");
    valid = false;
  } else if (bill === 0) {
    showError(billError, billInput, "Bill can't be zero");
    valid = false;
  }

  // validate tip (only if custom is open or a preset is selected)
  if (tipInput.style.display !== 'none' && customWrap.style.display === 'flex') {
    if (tipInput.value.trim() === '') {
      // blank custom tip, just skip
      activeTipValue = null;
      tip = null;
    } else if (isNaN(tip) || tip < 0) {
      showError(tipError, tipInput, "Must be 0 or more");
      valid = false;
    } else if (tip > 100) {
      showError(tipError, tipInput, "That seems too high (max 100%)");
      valid = false;
    }
  }

  // validate people
  if (peopleInput.value.trim() === '') {
    // empty is fine
  } else if (isNaN(people) || people < 1) {
    showError(peopleError, peopleInput, "At least 1 person required");
    valid = false;
  } else if (!Number.isInteger(parseFloat(peopleInput.value))) {
    showError(peopleError, peopleInput, "Must be a whole number");
    valid = false;
  }

  // if anything is missing or invalid, show zeros and stop
  if (!valid || isNaN(bill) || bill <= 0 || tip === null || tip === undefined || isNaN(tip) || isNaN(people) || people < 1) {
    resetDisplay();
    return;
  }

  // ---- ACTUAL MATH ----

  var totalTip   = bill * (tip / 100);
  var total      = bill + totalTip;

  // rounding policy: round up to nearest paisa (ceil at 2 decimal places)
  // so the group never collectively underpays
  var tipEach    = Math.ceil((totalTip / people) * 100) / 100;
  var totalEach  = Math.ceil((total / people) * 100) / 100;

  tipPerPerson.textContent   = "Rs " + tipEach.toFixed(2);
  totalPerPerson.textContent = "Rs " + totalEach.toFixed(2);
  grandTotal.textContent     = "Rs " + total.toFixed(2);
}


// ---- RESET ----

resetBtn.addEventListener('click', function() {
  billInput.value   = '';
  tipInput.value    = '';
  peopleInput.value = '';
  activeTipValue    = null;
  customWrap.style.display = 'none';

  presetBtns.forEach(function(b) { b.classList.remove('active'); });

  clearError(billError, billInput);
  clearError(tipError, tipInput);
  clearError(peopleError, peopleInput);

  resetDisplay();
  billInput.focus();
});


// ---- HELPERS ----

function showError(errorEl, inputEl, message) {
  errorEl.textContent = message;
  inputEl.classList.add('has-error');
}

function clearError(errorEl, inputEl) {
  errorEl.textContent = '';
  inputEl.classList.remove('has-error');
}

function resetDisplay() {
  tipPerPerson.textContent   = "Rs 0.00";
  totalPerPerson.textContent = "Rs 0.00";
  grandTotal.textContent     = "Rs 0.00";
}
