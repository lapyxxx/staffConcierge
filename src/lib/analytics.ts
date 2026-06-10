const METRIKA_ID = 108988775;

export const reachGoal = (goal: string, params?: Record<string, unknown>) => {
  window.ym?.(METRIKA_ID, "reachGoal", goal, params);
};
