const { canAccess } = require("../lib/rbac");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(canAccess("ADMIN", "ADMIN") === true, "Admin should access admin");
assert(canAccess("MANAGER", "ADMIN") === true, "Admin should access manager");
assert(canAccess("OPS", "HR") === true, "HR should access ops-level modules");
assert(canAccess("ADMIN", "READONLY") === false, "Readonly should not access admin");
assert(canAccess("READONLY", "CLIENT") === false, "Client should not access readonly");

console.log("RBAC tests passed");
