# Home — Modern Analytics

User-approved direction C, 4 November 2026. Scope remains a standalone Home
prototype for a trader using one Android phone. All data is synthetic.

## Design plan

| Role | Token |
| --- | --- |
| Midnight background | `#080f1c` |
| Navy surface | `#101c2e` |
| Divider | `#25354c` |
| Primary text | `#edf4ff` |
| Secondary text | `#9cacc4` |
| Signal blue | `#6bafff` |

Mint marks wins, coral marks losses, and slate marks breakeven. Use system
sans-serif for the interface and Bahnschrift/DIN Alternate fallbacks for numeric
displays. Use tabular numerals and download no fonts or assets.

## Layout

Desktop: 224px navigation rail, compact toolbar, period control, four KPI
summaries, then a wide balance chart beside a narrower outcome donut. A quiet
strip holds monthly target and today's discipline. A table spans the width below.

Phone: bottom navigation, two-column metrics, stacked charts, horizontal donut
legend, stacked target/discipline summaries, and table rows rendered as compact
records. Search spans the toolbar width; outcome and sort controls share a row.

## Review before implementation

Keep the navy/blue preference. Reserve visual emphasis for the actual balance
signal; avoid decorative gradients and miniature charts without data meaning.
Use varied hierarchy: compact KPI summaries, one main chart, a smaller outcome
visual, a flat goal/discipline strip, and an aligned table. Do not invent growth
comparisons or readiness claims.

## Interaction and motion

- Balance supports pointer/touch inspection, exact tooltips, crosshair, focus,
  arrow keys, Home/End, and Escape. Native vertical page scrolling is preserved.
- Donut legend and arcs filter only the trade table. Clicking the selected
  outcome again restores all outcomes. Native filter controls stay synchronized.
- Search and date/P&L sorting operate within the selected period. Mobile has an
  explicit sorting selector; desktop has sortable column headers.
- Export CSV uses exactly the currently filtered/sorted table and marks rows DEMO.
- One entry animation, a chart line reveal, donut reveal, and progress transitions
  are used. Reduced-motion users get static changes.

## Data definitions

Account balance: initial balance plus all closed idea net P/L. Selected-period
metrics, chart, donut, and table use the same ideas. Partial-period chart starts
with the balance carried from earlier trades. Points are equally spaced by trade
sequence, not elapsed time; the interface states this. This is closed balance,
not floating equity.

Win rate includes BE in the denominator. Profit factor is the sum of positive
idea net P/L divided by the absolute sum of negative idea net P/L. No loss with
positive profit displays infinity; empty data displays a dash. A zero-count
outcome has no colored donut arc.

Target always uses this calendar month; discipline always uses today in Jakarta.
The seven-idea synthetic dataset has three ideas today. No input/persistence,
real-account connection, OCR, or execution is added. Daily quota is an indicator,
not a trade-blocking system.

## Source and verification

Read `.agents/skills/frontend-design/SKILL.md` before frontend work, as required
by AGENTS.md. Its unmodified upstream blobs remain:
SKILL.md `a5333457c414d20d625f307df945842c0952ecc3`;
LICENSE.txt `f433b1a53f5b830a205fd2df78e2b34974656c7b`.

See VERIFICATION.md for exact tested behavior and limits. Do not equate simulated
DOM tests with browser or device QA.
