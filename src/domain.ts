
export interface ReducerAction<TPayload = any> {
    payload?: TPayload
}

export type Reducer<TState = any> = (
    state: TState,
    payload?: ReducerAction['payload']
) => TState

export interface EffectAction<TPayload = any> {
    payload?: TPayload
}

export type Effect<TContext = any> = (
    context: TContext,
    payload?: EffectAction['payload']
) => any;


export interface Models<TContext> {
	[key: string]: Model<TContext>
}

export interface Model<
    TContext,
	TState = any,
> {
	name?: string
	state: TState
	reducers?: ModelReducers<TState>
	effects?: ModelEffects<TContext>
}

export type ModelReducers<TState = any> = {
	[key: string]: Reducer<TState>
}

export interface ModelEffects<TContext> {
	[key: string]: Effect<TContext>
}


export type FlatModels<TModels extends Models<TContext>, TContext = any> = 
    { [key in keyof TModels]: FlatModel<TModels[key]> };


export type FlatModel<
    TModel extends Model<any>
> = {state: TModel['state']} & 
    {subscribe: (value: any, invalidate?: any) => any } &
    {[effectKey in keyof TModel['effects']] : FlatEffect<any, TModel['effects'][effectKey]>} &
    {[reducerKey in keyof TModel['reducers']] : FlatReducer<TModel['state'], TModel['reducers'][reducerKey]>}
;

export type FlatReducer<
    TState,
    TReducer extends Reducer<TState>
> =
 TReducer extends () => any? 
    // not taking any parameters
    ()=>TState
    : 
        // at least taking state as first parameter
        TReducer extends (state: TState, ...args: infer TRest) => TState ?
            FlatFunction<TRest, TState>
        : never;


export type FlatEffect<
        TContext,
        TEffect extends Effect<TContext>
    > =
    TEffect extends () => infer TReturn? 
        // not taking any parameters
        ()=>TReturn
        : 
            // at least taking state as first parameter
            TEffect extends (state: TContext, ...args: infer TRest) => infer TReturn ?
                FlatFunction<TRest, TReturn>
            : never;

export type FlatFunction<
    TRest extends unknown[],
    TReturn = any
> = TRest extends []?
    ()=>TReturn
    :
    [TRest] extends [never]
            ? (() => TReturn) 
            : CheckIfParameterOptional<TRest> extends true
                ? ((payload?: TRest[0]) => TReturn) 
                : ((payload: TRest[0]) => TReturn);


type CheckIfParameterOptional<P> = P extends [unknown, ...unknown[]]
	? false
	: true

 export interface ModelCreator {
	<RM extends Models<RM>>(): <
		R extends ModelReducers<S> | undefined,
		E extends ModelEffects<RM> | undefined,
		S
	>(mo: {
		name?: string
		state: S
		reducers?: R
		effects?: E
	}) => {
		name?: string
		state: S
	} & (E extends undefined ? {} : { effects: E }) &
		(R extends undefined ? {} : { reducers: R })
}


export const createModel: ModelCreator = () => (mo) => mo as any;