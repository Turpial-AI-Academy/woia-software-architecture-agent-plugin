import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const ROOT = path.resolve(import.meta.dirname, "..");

const skillRoot = path.join(ROOT, "skills", "architecture");

function allowsLocalAmendmentWithoutAdr(value) {
  const clauses = value.split(/[.!?\n]+/).filter((clause) =>
    (/\b(?:local|bounded|healthy)\b/i.test(clause) && /\b(?:clarification|amendment)\b/i.test(clause)) ||
    /\b(?:every|each|all)\s+(?:edit|change|amendment)\b/i.test(clause));
  const optional = (clause) =>
    /(?:\b(?:do|does|must|should)\s+not\b[^;\n]*\b(?:require|need|create|write)\b|\b(?:needs?|requires?)\s+no\b)[^;\n]*\bADRs?\b/i.test(clause) ||
    /\bADRs?\b[^;\n]*\b(?:optional|unnecessary|not\s+(?:required|mandatory))\b/i.test(clause);
  const mandatory = (clause) =>
    /\b(?:must|shall|required|mandatory|compulsory)\b[^;\n]*\bADRs?\b/i.test(clause) ||
    /\b(?:needs?|requires?|mandates?)\b[^;\n]*\bADRs?\b/i.test(clause);
  if (clauses.some((clause) => mandatory(clause) && !optional(clause))) return false;
  return clauses.some(optional);
}

test("skill requires discovery before architecture changes", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const discover = skill.indexOf("## Discover");
  const decide = skill.indexOf("## Decide");
  const implement = skill.indexOf("## Implement");
  const validate = skill.indexOf("## Validate");
  const report = skill.indexOf("## Report");
  assert.ok(discover >= 0 && decide > discover && implement > decide && validate > implement && report > validate);
  assert.match(skill, /Discover before changing architecture/i);
});

test("architecture policy is evidence-first and style-neutral", async () => {
  const standard = await readFile(path.join(skillRoot, "references", "ARCHITECTURE_STANDARD.md"), "utf8");
  assert.match(standard, /EVIDENCE > FASHION/);
  assert.match(standard, /does not rank these styles in the abstract/i);
  assert.match(standard, /Do not assume directory boundaries are architecture boundaries/i);
  assert.match(standard, /Preserve healthy existing architecture/i);
});

test("cycles and coupling are treated as evidence, not automatic rewrite orders", async () => {
  const standard = await readFile(path.join(skillRoot, "references", "ARCHITECTURE_STANDARD.md"), "utf8");
  assert.match(standard, /A cycle is evidence of mutual dependency\. It is not automatically a defect requiring a rewrite/i);
  assert.match(standard, /High coupling matters when it creates material change propagation/i);
});

test("discovery crosses intent, dependencies, contracts, runtime and data evidence", async () => {
  const discovery = await readFile(path.join(skillRoot, "references", "DISCOVERY_MODEL.md"), "utf8");
  assert.match(discovery, /Intent \| README, docs, ADRs/);
  assert.match(discovery, /Dependencies \| imports, package graph/);
  assert.match(discovery, /Contracts \| APIs, schemas, events/);
  assert.match(discovery, /Runtime\/deployment \| processes, containers/);
  assert.match(discovery, /Data \| stores, migrations/);
});

test("decision matrix preserves healthy architectures and rejects fashion-driven migration", async () => {
  const matrix = await readFile(path.join(skillRoot, "references", "DECISION_MATRIX.md"), "utf8");
  assert.match(matrix, /Existing architecture is coherent.*Preserve it/s);
  assert.match(matrix, /Do not split merely because services are fashionable/);
  assert.match(matrix, /Do not add it merely for style/);
  assert.match(matrix, /Do not introduce events merely because they appear more decoupled/);
});

test("ADR guide captures durable decision context and follow-up", async () => {
  const guide = await readFile(path.join(skillRoot, "references", "ADR_GUIDE.md"), "utf8");
  for (const phrase of ["Context", "Decision", "Alternatives considered", "Consequences", "Validation / follow-up"]) {
    assert.match(guide, new RegExp(phrase.replace("/", "\\/"), "i"));
  }
  assert.match(guide, /Do not rewrite history: supersede an accepted ADR/i);
});

test("architecture report separates observations, evidence, decisions and open questions", async () => {
  const report = await readFile(path.join(skillRoot, "assets", "architecture-report.template.md"), "utf8");
  const observed = report.indexOf("## 2. Observed architecture");
  const evidence = report.indexOf("## 3. Evidence");
  const decisions = report.indexOf("## 7. Decisions");
  const validation = report.indexOf("## 9. Validation");
  const open = report.indexOf("## 10. Open questions");
  assert.ok(observed >= 0 && evidence > observed && decisions > evidence && validation > decisions && open > validation);
});

test("dependency map captures boundaries, edges, contracts and data flow", async () => {
  const map = await readFile(path.join(skillRoot, "assets", "dependency-map.template.md"), "utf8");
  assert.match(map, /## Boundaries \/ units/);
  assert.match(map, /## Dependency edges/);
  assert.match(map, /## Public contracts/);
  assert.match(map, /## Data \/ event flow/);
  assert.match(map, /## Cycles \/ coupling requiring investigation/);
});

test("review checklist keeps implementation minimal and validates changed contracts", async () => {
  const checklist = await readFile(path.join(skillRoot, "references", "REVIEW_CHECKLIST.md"), "utf8");
  assert.match(checklist, /Prefer the smallest architecture-safe change/);
  assert.match(checklist, /Verify changed dependency constraints/);
  assert.match(checklist, /Verify changed API\/schema\/event compatibility/);
  assert.match(checklist, /environment\/testing\/security\/CI-CD policy changes out unless explicitly in scope/);
});

test("a bounded architecture amendment checks the existing model against implementation", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const bounded = skill.split("### Bounded amendment")[1]?.split("### Deep path")[0];
  assert.ok(bounded);
  for (const obligation of [/healthy current-state.*artifact/i, /model\/edge record/i,
    /ownership.*dependency direction.*public contracts.*unchanged/is,
    /authoritative existing model/i, /source\/dependency\/contract evidence/i,
    /documentation alone.*intent.*not.*implementation/is,
    /amend only.*affected record/i, /preserve unrelated.*ADRs.*valid evidence/is,
    /revalidate.*mandatory invariants/is]) assert.match(bounded, obligation);
});

test("real architecture changes and missing evidence retain deep validation", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const deep = skill.split("### Deep path and evidence invalidation")[1]?.split("## Discover")[0];
  assert.ok(deep);
  for (const trigger of [/new model/i, /contradictions.*missing durable evidence/i,
    /boundaries.*ownership.*dependency direction/is, /API\/schema\/event contracts/i,
    /data flow\/persistence/i, /migration/i, /runtime\/deployment topology/i,
    /security isolation/i, /availability\/rollback/i, /affected consumers/i]) assert.match(deep, trigger);
});

test("architecture evidence reuse is scoped and dependent claims are invalidated", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const report = await readFile(path.join(skillRoot, "assets", "architecture-report.template.md"), "utf8");
  for (const obligation of [/provenance\/scope/i, /freshly observed\/executed checks/i,
    /assumptions\/inferences separately/i, /source identity.*consumers.*validation conditions/is,
    /source mutation or failed invariant.*dependent claims/is, /freshly observe.*required contract\/runtime checks/is]) {
    assert.match(skill, obligation);
  }
  for (const category of [/reused evidence/i, /invalidated evidence/i, /fresh evidence/i, /assumptions\/inferences.*not proof/i]) {
    assert.match(report, category);
  }
});

test("architecture references are triggered and local clarification does not require an ADR", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const discovery = await readFile(path.join(skillRoot, "references", "DISCOVERY_MODEL.md"), "utf8");
  assert.match(skill, /references by trigger/i);
  assert.match(skill, /ADR guide only for a durable architectural decision/i);
  assert.equal(allowsLocalAmendmentWithoutAdr(skill), true);
  const paraphrase = "A local clarification needs no new ADR and can reuse its existing template.";
  const mandatoryAdr = "Every local amendment must create an ADR.";
  assert.equal(allowsLocalAmendmentWithoutAdr(paraphrase), true);
  assert.equal(allowsLocalAmendmentWithoutAdr(mandatoryAdr), false);
  assert.equal(allowsLocalAmendmentWithoutAdr(paraphrase + "\n" + mandatoryAdr), false);
  assert.match(discovery, /reuse the unchanged map/i);
  assert.match(discovery, /contract\/data\/topology change.*deeper discovery/is);
});
