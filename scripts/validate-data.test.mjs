import test from "node:test";
import assert from "node:assert/strict";
import { validateData } from "../src/lib/data/validate.ts";

test("archive data has no validation errors", () => {
  const issues = validateData();
  const errors = issues.filter((issue) => issue.severity === "error");
  assert.equal(errors.length, 0, errors.map((issue) => issue.message).join("\n"));
});

test("archive data warnings are within expected bounds", () => {
  const issues = validateData();
  const warnings = issues.filter((issue) => issue.severity === "warning");
  assert.ok(warnings.length < 500, `Unexpected warning volume: ${warnings.length}`);
});
