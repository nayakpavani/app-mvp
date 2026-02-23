import { createSlice } from '@reduxjs/toolkit';
import { ContainerRegistry } from '../constants/manifest';

const initialState = {
  currentContainer: 'portal',
  currentState: 'portal',
  currentManifest: ContainerRegistry.portal.states.portal,
  history: [],
  data: {
    day_number: 1,
    focus_name: "Structure",
    mantra_text: "OM SHANTI",
    sankalp_text: "I am present and focused.",
    reps_total: 27,
    anchor_duration: 7,
  }
};

const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    navigate: (state, action) => {
      const { container_id, state_id } = action.payload;

      if (ContainerRegistry[container_id] && ContainerRegistry[container_id].states[state_id]) {
        // Save to history before navigating
        state.history.push({
          container: state.currentContainer,
          state: state.currentState,
        });

        // Update state
        state.currentContainer = container_id;
        state.currentState = state_id;
        state.currentManifest = ContainerRegistry[container_id].states[state_id];
      } else {
        console.warn(`Navigation Error: Target ${container_id}.${state_id} not found.`);
      }
    },
    goBack: (state) => {
      const previous = state.history.pop();
      if (previous) {
        state.currentContainer = previous.container;
        state.currentState = previous.state;
        state.currentManifest = ContainerRegistry[previous.container].states[previous.state];
      }
    },
    resetToPortal: (state) => {
      state.currentContainer = 'portal';
      state.currentState = 'portal';
      state.currentManifest = ContainerRegistry.portal.states.portal;
      state.history = [];
    }
  },
});

export const { navigate, goBack, resetToPortal } = screenSlice.actions;
export default screenSlice.reducer;
