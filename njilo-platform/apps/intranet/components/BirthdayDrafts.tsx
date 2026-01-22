"use client";

import { useState } from "react";

const people = [
  { name: "Thabo Nkosi", date: "Tomorrow" },
  { name: "Ayesha Patel", date: "Next week" },
  { name: "Sipho Dlamini", date: "23 Sep" }
];

export function BirthdayDrafts() {
  const [draft, setDraft] = useState<string | null>(null);

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {people.map((person) => (
        <div key={person.name} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
          <p className="font-semibold text-slate-900">{person.name}</p>
          <p className="text-slate-500">Birthday · {person.date}</p>
          <button
            className="mt-3 rounded-md border border-slate-200 px-3 py-1 text-xs text-slate-600"
            onClick={() => setDraft(`Hi ${person.name}, wishing you a wonderful birthday from the Njilo team! 🎉`)}
          >
            Draft message
          </button>
          {draft && draft.includes(person.name) && (
            <div className="mt-3 rounded-md border border-slate-200 bg-white p-2 text-xs text-slate-600">
              {draft}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
