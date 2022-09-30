import { createModel } from "svelte-domain";
import type {Context} from './index';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const counter2 = createModel<Context>()({
    state: {
        count: 0
    },
    reducers: {
        inc1: (state) => {
            return {count: state.count + 10};
        },
        inc2: (state, payload?: number) => {
            return payload?{count: state.count + payload} : {count: state.count};
        },
        inc3: (state, payload: number) => {
            return {count: state.count};
        }
    },
    effects: {
        asyncInc: async (context, payload?: number) => {
            await sleep(1000);
            context.counter2.inc2(payload);
        }
    }
})