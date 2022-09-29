import type {FlatModels, Models, ModelCreator} from './domain';

type Subscriber<T> = (value: T) => void;

/** Unsubscribes from value updates. */
type Unsubscriber = () => void;

/** Cleanup logic callback. */
type Invalidator<T> = (value?: T) => void;

/** Start and stop notification callbacks. */
type StartStopNotifier<T> = (set: Subscriber<T>) => Unsubscriber | void;

type SubscribeInvalidateTuple<T> = [Subscriber<T>, Invalidator<T>];

function noop() {}

function customWritable(model: any, start: StartStopNotifier<any> = noop): any {
	let stop: Unsubscriber | null;
	const subscribers: Set<SubscribeInvalidateTuple<any>> = new Set();

    function safe_not_equal(a: any, b: any) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

	function set(new_state: any): void {
		if (safe_not_equal(model.state, new_state)) {
			model.state = new_state;
			if (stop) { // store is ready
				for (const subscriber of subscribers) {
					subscriber[1]();
				}
                for (const subscriber of subscribers) {
					subscriber[0]({state: new_state});
				}
			}
		}
	}

	function subscribe(run: Subscriber<any>, invalidate: Invalidator<any> = noop): Unsubscriber {
		const subscriber: SubscribeInvalidateTuple<any> = [run, invalidate];
		subscribers.add(subscriber);
		if (subscribers.size === 1) {
			stop = start(set) || noop;
		}
		run({state: model.state});

		return () => {
			subscribers.delete(subscriber);
			if (subscribers.size === 0) {
				stop?.();
				stop = null;
			}
		};
	}

	return Object.assign(model, {set}, {subscribe});
}

export function createStore<TModels extends Models<TContext>, TContext>(models: TModels) : FlatModels<TModels> {
    let flatModels = {} as any;
    Object.keys(models).forEach(key=> {
        flatModels[key] = {
            state: models[key]['state'],
            ... models[key]['reducers'],
            ... models[key]['effects']
        }
    })

    Object.keys(flatModels).forEach(key=> {
        flatModels[key] = customWritable(flatModels[key]);
    })

    Object.keys(models).forEach((key)=> {
        let modelReducers = models[key]['reducers'];
        if ( modelReducers !== undefined) {
            Object.keys(modelReducers).forEach(reducerKey => {
                flatModels[key][reducerKey] = function(payload?: any) {
                    if (modelReducers != undefined) {
                        const newState = modelReducers[reducerKey](flatModels[key]['state'], payload);
                        flatModels[key].set(newState);
                        return newState;
                    }
                    return flatModels[key]['state'];
                }
            })
        }

        let modelEffects = models[key]['effects'];
        if (modelEffects !== undefined) {
            Object.keys(modelEffects).forEach(effectKey => {
                flatModels[key][effectKey] = function(payload?: any) {
                    if (modelEffects != undefined) {
                        return modelEffects[effectKey](flatModels, payload);
                    }
                }
            })
        }
    });

    return flatModels;
}

export const createModel: ModelCreator = () => (mo) => mo as any;