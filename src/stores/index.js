import { createStore } from "vuex";
import pokemon from './modules/pokemon';

export const store = createStore({
  modules: {
    pokemon
  }
})