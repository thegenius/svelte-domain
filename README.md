[![npm version](https://badge.fury.io/js/svelte-domain.svg)](https://badge.fury.io/js/svelte-domain)  
[![package size](https://img.badgesize.io/thegenius/svelte-domain/main/dist/index.umd.js.svg&label=size)](https://www.npmjs.com/package/svelte-domain)


This is a library of svelte state management inspired by redux and rematch.

## Concept
```
domain: An object contains 'state'、'reducer'、'effect'.  

state: date fields for domain  

reducer: function taking state and payload as input, produce state as output.  
         reducer output will be updated into state.  
         reducer is the only way to update state.  

effect: function taking context and payload as input, produce any as output.  
        effect can not update state  
        effect can be async  
        context contains all states cross all domains  
        context contains all reducers cross all domains  
        context contains all effects cross all domains  
```

## 0. Install
```
npm install svelte-domain
```


## 1. Create a simple model
```typescript
import { createModel } from "svelte-domain";
// import type {Context} from './index'; //Context will be produced in 2 step, omit

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
            context.user1.inc1();
        }
    }
})
```

## 2. Create a store
```typescript
import type { Models, FlatModels } from "svelte-domain";
import { createStore } from "svelte-domain";
import {counter1} from './counter1';
import {counter2} from './counter2'

export interface RootModels extends Models<Context> {
	counter1: typeof counter1
    counter2: typeof counter2
}
// here we calculated the Context type, and then you can import into your model file
export type Context = FlatModels<RootModels>;

const store: Context = createStore<RootModels, Context>({counter1, counter2});
export default store;

```

## 3. use store in svelte
``` html
<script lang="ts">
  import store from '../store';
  let {counter1, counter2} = store;

  console.log(counter1.state.count); // you can query the state fields
  const increment1 = () => {
      counter1.inc1();
  }
  const increment2 = async () => {
      await counter2.asyncInc(10);
  }
  const increment3 = async () => {
      await counter1.asyncMultiInc();
  }
</script>

<!--query the svelte reactive version state by prefix $ -->
<button on:click={increment1}>
  count: {$counter1.state.count}
</button>

<button on:click={increment2}>
  async count: {$counter2.state.count}
</button>

<button on:click={increment3}>
  multi count increment
</button>
```

## Typescript Support
### enjoy the typescript support in svelte
![](https://github.com/thegenius/svelte-domain/blob/main/docs/tips_in_svelte.jpg)  

### enjoy the typescript support in domain reducer  
![](https://github.com/thegenius/svelte-domain/blob/main/docs/tips_in_reducer.jpg)

### enjoy the typescript support in domain effect for cross domain
![](https://github.com/thegenius/svelte-domain/blob/main/docs/tips_in_effect_multi_domain.jpg)

### enjoy the typescript support in domain effect for cross domain action
![](https://github.com/thegenius/svelte-domain/blob/main/docs/tips_in_effect_actions.jpg)


## Example
```
git clone https://github.com/thegenius/svelte-domain.git
cd svelte-domain/example
npm install
npm run dev
```

## LICENSE
```
MIT
```