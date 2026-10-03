# Architecture Review Checklist

Apply by changed surface. A healthy model clarification checks the affected observation/edge against implementation and preserves unrelated valid evidence; it does not replay the whole inventory. Keep mandatory responsibility/boundary/dependency/data/integration clarity. Record reused, invalidated and fresh proof separately from assumptions. Actual structural/contract/data/topology/security changes require the deep path and relevant validation; an ADR is required only when its durable-decision trigger applies.

## Phase 1 — Discover

- [ ] Read relevant README/docs/ADRs/ownership material.
- [ ] Identify task scope and affected system area.
- [ ] Inventory relevant modules/packages/services/deployable units.
- [ ] Map dependency direction and material shared dependencies.
- [ ] Identify public contracts, schemas, events, and external integrations.
- [ ] Map relevant data/persistence flow.
- [ ] Compare deployment/runtime evidence with logical structure.
- [ ] Record documented constraints and known exceptions.
- [ ] Separate observed facts from assumptions/open questions.

## Phase 2 — Model and evaluate

- [ ] Build the smallest useful current-state architecture model.
- [ ] Confirm boundaries using evidence beyond directory names.
- [ ] Identify contradictions between intent and implementation.
- [ ] Evaluate cycles/coupling/cohesion in context rather than by rule of thumb.
- [ ] Identify material drift and its actual impact.
- [ ] Trace requested change through dependencies, contracts, data, and deployment.
- [ ] Identify migration/compatibility constraints.

## Phase 3 — Decide

- [ ] Preserve healthy existing architecture where possible.
- [ ] State the requirement/constraint that justifies each architecture change.
- [ ] Compare realistic alternatives and tradeoffs.
- [ ] Prefer the smallest architecture-safe change.
- [ ] Avoid style-driven microservices/DDD/hexagonal/event/CQRS migrations.
- [ ] Decide whether an ADR is warranted.
- [ ] Define rollback/containment for non-trivial migration.

## Phase 4 — Implement

- [ ] Change only authorized architecture-related scope.
- [ ] Preserve relevant public contracts or provide a migration path.
- [ ] Keep dependency direction consistent with the decision.
- [ ] Avoid abstractions with no architectural consumer/constraint.
- [ ] Update ADR/docs when durable intent changes.
- [ ] Keep environment/testing/security/CI-CD policy changes out unless explicitly in scope.

## Phase 5 — Validate

- [ ] Run repository-appropriate build/test/type/contract checks for the affected area.
- [ ] Verify changed dependency constraints.
- [ ] Verify changed API/schema/event compatibility.
- [ ] Validate data/runtime/deployment behavior when affected.
- [ ] Validate staged migration and rollback assumptions when applicable.
- [ ] Inspect final diff and repository status.
- [ ] Mark unavailable checks blocked/skipped, not passed.

## Phase 6 — Report

- [ ] Observed architecture and evidence.
- [ ] Intent vs implementation contradictions.
- [ ] Affected boundaries/contracts/dependencies/data flows.
- [ ] Material risks/drift and impact.
- [ ] Decision and tradeoffs.
- [ ] Files/changes made or proposed.
- [ ] Validation actually executed.
- [ ] Blocked/skipped checks.
- [ ] Migration/rollback notes.
- [ ] Open questions and remaining risks.
