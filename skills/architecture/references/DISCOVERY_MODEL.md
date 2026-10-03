# Architecture Discovery Model

Use this model to reconstruct the current architecture before evaluating or changing it.

## 1. Evidence inventory

| Evidence class | Examples | Questions |
|---|---|---|
| Intent | README, docs, ADRs, diagrams, ownership files | What architecture is claimed or required? |
| Structure | workspaces, modules, packages, services, apps, libraries | What responsibilities and boundaries exist in code? |
| Dependencies | imports, package graph, build graph, generated clients | What depends on what, and in which direction? |
| Contracts | APIs, schemas, events, extension interfaces, data formats | What behavior is externally significant? |
| Runtime/deployment | processes, containers, functions, queues, stores | What communicates or deploys independently? |
| Data | stores, migrations, repositories, cross-service queries | Who owns data and how does it move? |
| Change constraints | tests, migrations, CI/deploy docs, compatibility code | What must remain compatible during change? |

Do not read secret values. Architecture discovery needs structure and contract evidence, not credentials.

## 2. Current-state model

Model the system at the smallest useful granularity for the task:

~~~text
System / context
├── deployable/runtime units
├── logical/ownership boundaries
├── modules/packages/services
├── public contracts
├── dependency edges
├── data/event flows
├── persistence/external systems
└── architecture constraints / ADRs
~~~

Avoid exhaustive inventories when the task affects only one bounded area. Expand only as needed to understand impact.

When a healthy current-state model already exists, amend the affected boundary/edge observation in place after confirming its implementation evidence remains valid. Reuse the unchanged map rather than reconstructing every unit. Any real boundary/ownership/contract/data/topology change, contradiction, or missing durable evidence requires deeper discovery of affected relationships and cross-cutting invariants.

## 3. Boundary record

For each material boundary capture name/responsibility; evidence that it is real; owner/change authority if known; inbound consumers; outbound dependencies; public contracts; data ownership/access; runtime/deployment significance; constraints; and known exceptions.

## 4. Dependency record

For each material edge capture source, target, type (compile/import, runtime call, event, data, deployment, generated contract, shared library), direction, public/private status, evidence location, intended-constraint status, and change impact.

## 5. Contract record

For important contracts capture producer/owner, consumers, schema/interface location, compatibility/versioning expectations, failure behavior when relevant, validation mechanism, and migration constraints.

## 6. Drift comparison

Compare documented constraint vs observed implementation vs material impact.

Classify each discrepancy as documentation stale, deliberate evolution not yet documented, tolerated debt/temporary exception, harmful drift requiring action, or unknown pending evidence.

Do not label a discrepancy harmful until its impact is understood.

## 7. Change-impact map

~~~text
requested change
-> affected responsibility
-> affected boundary
-> inbound/outbound dependencies
-> contracts/consumers
-> data/runtime/deployment effects
-> validation surface
-> migration/rollback needs
~~~

The map may be textual. Do not add diagramming dependencies unless the repository already uses them or the task explicitly requires them.
