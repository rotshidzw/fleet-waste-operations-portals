export type LeadPayload = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  message?: string | null;
};

export function validateLeadPayload(payload: LeadPayload) {
  if (!payload.name || !payload.email || !payload.message) {
    return { valid: false, error: "Missing required fields." };
  }

  if (!String(payload.email).includes("@")) {
    return { valid: false, error: "Invalid email." };
  }

  return { valid: true };
}
