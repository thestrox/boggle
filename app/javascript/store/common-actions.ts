export const RESET_ACTION = "RESET_ACTION";

interface ResetAction {
  type: typeof RESET_ACTION;
}

export function reset() {
  return {
    type: RESET_ACTION
  };
}

export type ResetActionType = ResetAction;
