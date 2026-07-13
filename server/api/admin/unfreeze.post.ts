// Undo a fire: back to the live leaderboard. The archive entry stays (it is
// re-upserted on the next fire).
export default defineEventHandler(async () => {
  const state = await readRuntimeState();
  await writeRuntimeState({ ...state, final: null, prizesReleased: false });
  await invalidateLeaderboardCache();
  return { ok: true };
});
