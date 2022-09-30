import { createModel } from "svelte-domain";
import type {Context} from './index';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const counter1 = createModel<Context>()({
    state: {
        count: 0
    },
    reducers: {
        inc1: (state) => {
            return {count: state.count + 1};
        },
        inc2: (state, payload?: number) => {
            return payload?{count: state.count + payload} : {count: state.count};
        },
        inc3: (state, payload: number) => {
            return {count: state.count};
        }
    },
    effects: {
        asyncInc1: async (context, payload?: number) => {
            await sleep(1000);
            context.counter1.inc1();
        },
        asyncMultiInc: async (context) => {
            context.counter1.inc2(1);
            await sleep(1000);
            context.counter2.inc2(2);
        }
    }
})
  


