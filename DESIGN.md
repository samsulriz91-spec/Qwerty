# Home design direction

Audience: a trader checking a cent account from one Android phone.
Primary job: see closed balance, performance, and today's idea limit at a glance.

## Tokens

| Role | Value |
| --- | --- |
| Background | `#0a1220` |
| Surface | `#111e30` |
| Separator | `#293a50` |
| Text | `#edf4ff` |
| Secondary text | `#9daec5` |
| Accent | `#79b8ff` |

Use Bahnschrift, DIN Alternate, and system sans-serif fallbacks for an instrument
panel character. Numbers use tabular alignment, with no external font downloads.

## Layout and review before implementation

Left-align content. Use a quiet desktop rail and five-item bottom navigation on
phones. Make the balance panel and its integrated chart the main element.
Group supporting metrics in one strip, rather than identical decorated cards.
Put target and discipline alongside on desktop and below on phones.

Retain the user's navy/blue preference. Remove decorative gradients, animated
counting, uppercase eyebrows, and marketing copy from the previous prototype.
Distinguish all-time balance from selected-period statistics in plain copy.

## Data scope

One synthetic cent-account dataset, anchored to the Jakarta calendar.
Seven closed ideas, at most three today. No persistence or live connection.
Profit factor uses positive/negative idea net P/L. Breakeven ideas remain in
the win-rate denominator. The chart shows closed balance, not floating equity.
A partial-period chart begins with the carried balance.

## Skill source

Unmodified frontend-design skill from anthropics/skills:
SKILL.md blob `a5333457c414d20d625f307df945842c0952ecc3`;
LICENSE.txt blob `f433b1a53f5b830a205fd2df78e2b34974656c7b`.
