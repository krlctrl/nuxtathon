import type { ManualCredit } from "#shared/types/event";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ credits?: ManualCredit[] }>(event);
  const credits: ManualCredit[] = (body?.credits ?? [])
    .filter((c) => c && typeof c.login === "string" && c.login.trim())
    .map((c) => ({
      login: c.login.trim(),
      amount: Math.trunc(Number(c.amount)) || 0,
      note: String(c.note ?? ""),
    }));

  const state = await readRuntimeState();
  await writeRuntimeState({ ...state, credits });
  await invalidateLeaderboardCache();
  return { credits };
});
