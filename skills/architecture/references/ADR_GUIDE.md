# ADR Guide

## Purpose

An Architecture Decision Record captures a durable architectural decision, its context, alternatives, and consequences so future maintainers can understand why the system is shaped that way.

## Write an ADR when

- a system/module/service boundary is created, removed, merged, or materially redefined;
- dependency direction or an architecture constraint changes;
- a public contract strategy changes;
- data ownership or deployment topology changes materially;
- a migration strategy introduces durable compatibility or transitional constraints;
- a consequential technology/interaction choice affects multiple parts of the system;
- an earlier ADR is being superseded.

## Usually do not write an ADR for

- trivial refactors;
- local naming or formatting;
- ordinary bug fixes that do not change architecture;
- choices already governed by an accepted standard unless that standard is changing.

## Required content

Use [ADR.template.md](../assets/ADR.template.md). Capture at least:

1. Title;
2. Status;
3. Context;
4. Decision;
5. Alternatives considered;
6. Consequences;
7. Validation / follow-up.

## Status

Use repository conventions when they exist. Otherwise a small lifecycle is sufficient:

~~~text
Proposed -> Accepted -> Superseded
                    \-> Deprecated
~~~

Rejected proposals may be retained when the reasoning is useful.

## Quality rules

- State the problem and constraints before the preferred solution.
- Describe realistic alternatives, not strawmen.
- Include meaningful negative consequences and migration cost.
- Link evidence and affected contracts/boundaries when practical.
- Do not rewrite history: supersede an accepted ADR when the decision changes.
- Keep implementation details out unless they are part of the durable decision.

## Follow-up

An ADR is not validation. Record the checks, migration steps, ownership, or future decision points required to prove and maintain the decision.
