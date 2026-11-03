# Verification — Modern Analytics, 4 November 2026

Scope: standalone Home with synthetic data, not a live-journal release.

## Passed

`node tests/verify-home.cjs`: actual inline JavaScript executed with a DOM stub.

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
The browser binary remains unavailable; earlier download attempts failed. Do not
present the DOM stub as browser or visual QA. No external deployment is requested
or verified. GitHub contains source, not a hosted application.
