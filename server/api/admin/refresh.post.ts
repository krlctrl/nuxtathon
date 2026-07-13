// Drop the cached leaderboard so the next request recomputes from GitHub.
export default defineEventHandler(async () => {
  await invalidateLeaderboardCache();
  return { ok: true };
});
