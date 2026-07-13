export default defineEventHandler(async () => {
  const state = await readRuntimeState();
  const phase = resolvePhase(eventConfig, state.prizesReleased);

  return {
    phase,
    prizesReleased: state.prizesReleased,
    credits: state.credits,
    finalized: Boolean(state.final),
    finalizedAt: state.final?.finalizedAt ?? null,
    archive: state.archive.map((a) => ({
      title: a.title,
      startsAt: a.startsAt,
      endsAt: a.endsAt,
      finalizedAt: a.finalizedAt,
      winner: a.standings[0]?.login ?? null,
      contributors: a.standings.length,
    })),
  };
});
