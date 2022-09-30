<script lang="ts">
  import store from '../store';
  let {counter1, counter2} = store;
  console.log(counter1.state.count);
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

<button on:click={increment1}>
  count: {$counter1.state.count}
</button>

<button on:click={increment2}>
  async count: {$counter2.state.count}
</button>

<button on:click={increment3}>
  multi count increment
</button>