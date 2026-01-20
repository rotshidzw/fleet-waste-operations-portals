import { validateLeadPayload } from "../lib/leads";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

const valid = validateLeadPayload({ name: "Test", email: "test@example.com", message: "Hello" });
assert(valid.valid, "Valid lead should pass");

const missing = validateLeadPayload({ name: "", email: "test@example.com", message: "" });
assert(!missing.valid, "Missing fields should fail");

const badEmail = validateLeadPayload({ name: "Test", email: "not-email", message: "Hello" });
assert(!badEmail.valid, "Invalid email should fail");

console.log("Lead validation tests passed");
