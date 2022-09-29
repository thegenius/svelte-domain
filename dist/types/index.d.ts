import type { FlatModels, Models, ModelCreator } from './domain';
export type { ReducerAction, Reducer, EffectAction, Effect, ModelReducers, ModelEffects, Models, Model, FlatModels, FlatModel, FlatEffect, FlatReducer, FlatFunction, ModelCreator } from './domain';
export declare function createStore<TModels extends Models<TContext>, TContext>(models: TModels): FlatModels<TModels>;
export declare const createModel: ModelCreator;
