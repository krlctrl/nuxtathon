// Archive the current final (if any) and clear the live event, ready for a new
// Nuxtathon. The archive is preserved.
export default defineEventHandler(async () => {
  const state = await readRuntimeState();

  let archive = state.archive;
  if (state.final) {
    const f = state.final;
    archive = archive.filter((a) => !(a.title === f.title && a.startsAt === f.startsAt));
    archive.push(f);
  }

  await writeRuntimeState({ prizesReleased: false, credits: [], final: null, archive });
  await clearSnapshots();
  await invalidateLeaderboardCache();
  return { ok: true };
});
