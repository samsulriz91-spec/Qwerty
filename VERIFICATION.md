# Verification — Modern Analytics, 4 November 2026

Scope: standalone Home with synthetic data, not a live-journal release.

## Render regression reproduced and fixed

The previous build 810abdc nested `winCount` inside the `winRate` write target.
Updating `winRate.textContent` removed `winCount`. The next assignment threw
`Cannot set properties of null (setting textContent)`, before chart/donut render.
The previous independent-ID stub missed this DOM lifetime behavior.

The updated regression test models descendant-ID removal. Running it against
`git show 810abdc:index.html` fails at the exact winCount write; the fixed source
passes and fills chart opening/closing balances, donut segments/counts and table.
An independent lxml HTML parse confirms the affected IDs are now siblings.

## Passed

- Top balance 2,952.70 USC, today's P/L +217.70 USC, and 7 all-time closed ideas.
- Period chips and native selector synchronization.
- Account/trade bottom sheet state; reset confirm/cancel preserves ideas.
- Motion toggle and snackbar Undo; three simulated unsupported animation calls
  cannot interrupt static values or table rendering.

`node tests/verify-home.cjs`: actual inline JavaScript executed with a hierarchy-aware DOM stub.

- Account: 2,474.00 initial +478.70 P/L =2,952.70 USC, 7 closed ideas.
- Fixed Jakarta date 4 November: month +341.70 /4 ideas; 7 days +520.70 /6;
  all time +478.70 /7. All-time WR 71.4%, PF 7.53. Month opening 2,611.00.
- Changing period updates chart, metrics, donut, and table consistently.
- Donut selection toggles table outcome filter; headline metrics stay unchanged.
- Search, sorting, mobile sort selection, reset, empty result and disabled export.
- CSV content matches the selected table and includes DEMO labels. Actual download
  and the browser file-save behavior are not tested by the stub.
- Chart point inspection, pointer clamping, crosshair visibility, keyboard events,
  and tooltip text. These are simulated events, not physical input tests.
- Empty data, BE denominator and arc, infinity when there is profit but no loss,
  and finite chart coordinates at six simulated widths.
- Jakarta date boundaries, year change and leap day; unique IDs/icon references.
- `git diff --check`; HTMLParser parse; balanced CSS delimiters.
- Contrast on surface #101c2e: secondary text 7.42:1; mint 10.08:1; coral 7.74:1.
  These selected colors are checked, not a complete accessibility audit.

## Not verified

Actual browser rendering, screenshots, responsive overflow, animation appearance,
real download behavior, touch gestures, physical device and keyboard navigation.
The local browser binary remains unavailable. A cloud-browser check also could not open the local file because its URL security policy disallows file URLs. No visual browser verification is claimed. Do not
present the DOM stub as browser or visual QA. No external deployment is requested
or verified. GitHub contains source, not a hosted application.
