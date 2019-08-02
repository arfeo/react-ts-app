/**
 * Apply default redux state
 *
 * @param type
 * @param state
 */
export const applyDefaultState = <TState>(type: never, state: TState): TState => {
  return state;
};
