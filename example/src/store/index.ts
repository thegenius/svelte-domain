
import type { Models, FlatModels } from "svelte-domain";
import { createStore } from "svelte-domain";
import {counter1} from './counter1';
import {counter2} from './counter2'

export interface RootModels extends Models<Context> {
	counter1: typeof counter1
    counter2: typeof counter2
}
export type Context = FlatModels<RootModels>;

const store: Context = createStore<RootModels, Context>({counter1, counter2});
export default store;