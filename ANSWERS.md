# ANSWERS.md

**Author:** Atta ur Rehman

---

## 1. How to Run

Clone the repo and open `index.html` in a browser:

```
git clone https://github.com/Dev-Atta/tip-calculator.git
cd tip-calculator
```

Open `index.html` directly — no server, no install, no build step needed.

---

## 2. Stack & Design Choices

I went with vanilla HTML, CSS, and JavaScript. No framework felt right for something this small — React would have been overkill and would have added a whole build setup for no real benefit. Keeping it plain also meant the code is easy to read and understand without knowing any framework.

Two specific decisions I made:

**Two-column layout for inputs and results.** I put the inputs on the left and the results panel on the right so both are visible at the same time while you type. If I had stacked them vertically, you'd have to scroll down to see the numbers update, which kills the "live" feel. On mobile it collapses to a single column since there isn't enough width.

**Preset buttons instead of just a number input for tip.** Most people pick 10, 15, or 20 percent — making those one click saves time and feels more natural. The custom input is still there but hidden until you need it. The active preset is highlighted in teal so you always know which one is selected without having to look at a number field.

---

## 3. Responsive & Accessibility

On a 360px phone the layout stacks into a single column — inputs on top, results below. The font sizes scale down slightly and the preset buttons go from 3 columns to 2 so they don't get too cramped. On a 1440px laptop it's a side-by-side two-column layout with more breathing room.

One accessibility thing I handled: every input has a proper `<label>` with a matching `for` and `id` so screen readers announce what field you're on. Tab order follows the natural top-to-bottom flow of the form.

One thing I knowingly skipped: I didn't add ARIA live regions on the results panel, so screen readers won't announce the updated totals automatically as you type. Adding `aria-live="polite"` on the results section would fix that, but I ran out of time to test it properly and didn't want to add it without knowing it worked correctly.

---

## 4. AI Usage

I used Claude (claude.ai) during this project.

**What I asked:** I used it to help me write the initial structure of the three files — the HTML layout, the CSS styling, and the JavaScript logic.

**What I changed:** The JS it gave me used modern arrow functions everywhere (`const calculate = () => {}`). I rewrote most of the functions to use regular `function` declarations and `var` instead of `const`/`let` because that's how I actually write JavaScript and I wanted to understand every line. I also went through the validation logic manually and adjusted the error conditions — the original checked for empty strings in a way that was a bit too clever and hard to follow, so I simplified it.

---

## 5. Honest Gap

The currency is hardcoded to Rs. It works fine for this assessment but it's not a finished product — if someone in the US or UK opened it, they'd see Rs everywhere with no way to change it. To fix it I'd add a small dropdown next to the bill input with a few common currencies (Rs, $, £, €) and store the selected symbol in a variable that gets used when displaying the results. Probably an hour of work but I didn't get to it.
