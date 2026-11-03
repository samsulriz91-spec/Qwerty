# Verification — 4 November 2026

Scope: Home prototype only, not a live trading journal release.

## Passed

Command: `node tests/verify-home.cjs` (Node.js, no added dependencies).
The actual inline application script is executed with a DOM stub, not a browser.

- All-time balance: 2,952.70 USC from 2,474.00 initial and +478.70 net P/L.
- With Jakarta date fixed at 4 November 2026: month +341.70 USC / 4 ideas;
  seven-day period +520.70 USC / 6 ideas; all time +478.70 USC / 7 ideas.
- All-time win rate 71.4% and profit factor 7.53.
- Month chart carries 2,611.00 USC into the selected period.
- Filter changes update the metrics and chart, leaving total balance and monthly
  target on their separately defined scopes.
- Empty data, breakeven, no-loss profit factor, finite chart coordinates for six
  simulated chart widths, placeholder navigation feedback, and valid icon references.
- Jakarta midnight, year boundary, and leap-day date fixtures.
- `git diff --check`.

## Not verified

Actual browser rendering, screenshots, CSS overflow, touch interaction, keyboard
navigation, and device testing. Playwright browser launch was blocked by a missing
browser binary; the attempted browser download failed. Do not treat the DOM-stub
checks as visual QA or a claim that the mobile layout has passed browser tests.

No deployment has been requested or verified. Opening index.html locally is
supported; GitHub repository source is not itself a hosted application.
