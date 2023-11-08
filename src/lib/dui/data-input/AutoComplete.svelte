<script lang="ts">
  import TextInput from "$lib/dui/data-input/TextInput.svelte";
  import {createEventDispatcher} from "svelte";

  export let searchValue: string = "";
  export let selectedValue: string = "";
  export let options: any[] = [];

  const dispatch = createEventDispatcher();
  function f(value: any) {
    dispatch('valuechanged', {value});
  }
</script>

<TextInput bind:value={searchValue} list="list" />
<datalist id="list">
  {#each options as option}
    <option value={option.id} on:click={() => f(option.id)}>
      <slot name="option" {option} />
    </option>
  {:else}
    <slot />
  {/each}
</datalist>
