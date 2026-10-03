# Architecture Standard

## 1. Purpose

Architecture work must explain and evolve the structure of the real system without replacing evidence with architectural fashion.

~~~text
EVIDENCE > FASHION
~~~

A repository may legitimately use a monolith, modular monolith, services, functions, packages, layered design, ports/adapters, events, RPC, HTTP, shared databases, isolated databases, or combinations of these. The capability does not rank these styles in the abstract.

## 2. Scope

Architecture includes system/subsystem structure; modules, packages, services, applications, libraries, and deployment units; logical and ownership boundaries; dependency direction; public APIs, schemas, events/messages, extension points, and other externally significant contracts; data flow and persistence boundaries; coupling/cohesion and dependency cycles; architecture constraints and documented decisions; architecture drift; change impact; migration sequencing; compatibility; and rollback.

Architecture does not own runtime/package-manager reproducibility, test-strategy policy, security/threat controls, or CI/CD policy. Those concerns may constrain architecture and must be recorded as evidence, but remain separate capability domains unless the task explicitly combines scopes.

## 3. Evidence model

Use multiple evidence classes before drawing conclusions:

1. documented intent — README, architecture docs, ADRs, design notes, ownership documentation;
2. static implementation — source boundaries, imports, manifests, package graph, schemas, generated clients, dependency rules;
3. runtime/deployment — deployable units, processes, containers/functions, communication paths, queues, stores, external systems;
4. contract evidence — APIs, schemas, events, data ownership, extension interfaces, compatibility commitments;
5. change evidence — tests, migrations, deployment sequencing, compatibility layers, operational constraints.

No single evidence class is automatically authoritative. A diagram may be stale; folder structure may be cosmetic; an import graph may omit runtime calls; deployment topology may hide logical coupling.

Separate observed fact, interpretation, documented intent, recommendation, and open question.

For a bounded clarification of a healthy existing model/edge record, reuse its inspectable implementation evidence while the source identity, scope, consumers and validation conditions remain covered. Confirm only the affected relationship against actual source/contracts; documentation alone remains intent. Preserve unrelated model areas, ADRs and valid proof. Record reusable evidence, invalidated observations/dependent claims, fresh observations/checks, and assumptions separately. A changed source or failed invariant invalidates affected claims; a new session alone does not.

Use the deep path for new/uncertain/unhealthy models or real changes to boundaries, ownership, dependency direction, public contracts, data/persistence, runtime/deployment topology, migrations, security isolation or rollback risk. Conditional reference loading does not remove any required architecture invariant or contract validation.

## 4. Discover the current architecture

Build the current-state model before proposing a target state.

Identify system context; deployable/runtime units; logical domains/responsibilities; modules/packages/services and ownership; dependency direction; synchronous/asynchronous communication; public contracts; persistence ownership and cross-boundary data access; cross-cutting infrastructure; documented constraints/ADRs; and implementation that bypasses intended boundaries.

Do not assume directory boundaries are architecture boundaries. Confirm them through dependencies, contracts, runtime behavior, ownership, or explicit policy.

## 5. Boundaries

A useful boundary normally has at least one meaningful reason to exist: responsibility, ownership, contract, change cadence, deployment, scaling, isolation, compliance, data ownership, or dependency control.

Before creating, removing, splitting, or merging a boundary, identify what responsibility it owns, who consumes it, what contract crosses it, which dependencies point in/out, what data it owns/accesses, what operational or organizational constraint justifies it, and what changes if the boundary moves.

Do not create boundaries only to mirror folders, frameworks, or fashionable terminology.

## 6. Dependency direction, coupling, cohesion, and cycles

A cycle is evidence of mutual dependency. It is not automatically a defect requiring a rewrite.

Determine whether a cycle crosses an intended boundary, materially blocks independent change/test/deploy, causes runtime problems, hides shared ownership, or is local and harmless in context.

High coupling matters when it creates material change propagation, prevents ownership/deployment goals, destabilizes contracts, or contradicts an explicit constraint. Cohesion is evaluated by responsibility and change reasons, not file size alone.

## 7. Contracts and data flow

Treat externally significant behavior as architecture: APIs; event/message schemas; shared extension surfaces; file/data formats; database ownership and cross-boundary access when they create compatibility obligations; generated clients/schemas; plugin/extension interfaces.

For each important contract identify producer/owner, consumers, compatibility/versioning assumptions, failure behavior when relevant, and validation mechanism.

Map important data flows end-to-end when architecture decisions depend on them. Do not infer data flow solely from static imports.

## 8. Architecture drift

Architecture drift is a material divergence between intended constraints and implementation reality, or accumulated relationships that undermine a required quality or ownership goal.

Examples include forbidden cross-boundary dependencies, bypassed public contracts, shared data ownership that contradicts declared ownership, runtime topology that no longer matches assumptions, duplicated responsibilities with ambiguous ownership, temporary compatibility paths that became permanent, or stale ADRs/diagrams that materially mislead maintainers.

Not every difference from documentation is harmful drift. Documentation may be wrong or design may have evolved deliberately. Establish impact before recommending change.

## 9. Decide whether to change

Preserve healthy existing architecture.

Change architecture when evidence connects the current structure to a real requirement, constraint violation, material risk, or repeated change cost. Do not justify work merely because microservices, clean/hexagonal architecture, interfaces everywhere, events, or DDD are considered preferable in the abstract.

Evaluate tradeoffs in this repository: complexity, operability, latency, consistency, ownership, deployment, testing, migration cost, compatibility, and team constraints.

## 10. Implement the smallest architecture-safe change

Prefer local, reversible evolution over broad cosmetic rewrites.

Examples include enforcing an existing dependency boundary; relocating responsibility to its owner; extracting a contract already used by multiple consumers; adding an adapter around a real external boundary; eliminating an accidental bypass; staging a compatibility migration; or merging unnecessary layers/boundaries whose separation has no remaining reason.

Do not add abstractions without a consumer, extension point, replaceable dependency, test seam, or architectural constraint that needs them.

## 11. ADR policy

Use an ADR for durable decisions that materially affect boundaries, contracts, deployment/data ownership, dependency rules, migration strategy, or significant architecture constraints. Do not require ADRs for trivial refactors or local implementation details.

See [ADR_GUIDE.md](ADR_GUIDE.md).

## 12. Migration strategy

For non-trivial migrations define current and target states; compatibility requirements; sequencing; transitional states/adapters; data migration strategy when applicable; validation at each stage; rollback/containment points; and criteria for removing temporary paths.

A target architecture is not enough; the migration path is part of the architecture decision.

## 13. Validate architecture changes

Use repository-appropriate evidence such as dependency-rule/static architecture checks, compile/type/build checks, unit/integration/contract tests, schema compatibility checks, runtime smoke tests, migration validation, consumer compatibility tests, and documentation/ADR consistency review.

If validation cannot be executed, report it as blocked or skipped and explain the remaining risk.

## 14. Reporting

An architecture report clearly separates observed architecture, evidence, documented intent/constraints, contradictions/drift, impact/tradeoffs, decisions/recommendations, implementation scope, validation evidence, and open questions/remaining risks.
