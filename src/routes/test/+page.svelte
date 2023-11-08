<script lang="ts">
  import AutoComplete from "$lib/dui/data-input/AutoComplete.svelte";
  import FormControl from "$lib/dui/data-input/FormControl.svelte";

  export let data;

  function f(event: CustomEvent) {
    console.log('value changed => ',event.detail);
  }

  $: console.log(data.currentPage.content);
</script>

<div class="px-4">
  <FormControl>
    <span slot="top-label-text">Auto Complete</span>
    <AutoComplete options={data.currentPage.content} on:valuechanged={f}>
      <svelte:fragment let:option slot="option">
        {option.name}
      </svelte:fragment>
    </AutoComplete>
  </FormControl>
</div>
