import type { FlatModels, Models } from './domain';
export default function createStore<TModels extends Models<TContext>, TContext>(models: TModels): FlatModels<TModels>;
