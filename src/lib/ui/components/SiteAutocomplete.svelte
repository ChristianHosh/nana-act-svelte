<script lang="ts">
  import { siteList } from "$lib/core/consts";
  import TextInput from "$lib/dui/data-input/TextInput.svelte";
  import Autocomplete from "$lib/dui/data-input/Autocomplete.svelte";
  import Button from "$lib/dui/action/Button.svelte";
  import { createEventDispatcher } from "svelte";

  export let value: string = "";
  export let name: string = "";
  export let autocompleteSearchValue: string = "";
  export let inputStyleClass: string = "";

  const dispatch = createEventDispatcher();

  $: filteredList = siteList.filter((site) => {
    return site.toLowerCase().includes(autocompleteSearchValue.toLowerCase());
  });

  function selectSite(site: string) {
    console.log('selected -> ', site);
    autocompleteSearchValue = site;
    value = site;
    dispatch("valuechange", { value });
  }

  let _inputStyle = inputStyleClass;
</script>

<input type="hidden" {name} hidden bind:value />
<Autocomplete class={$$props.class}>
  <TextInput
    class={_inputStyle}
    slot="autocomplete-input"
    bind:value={autocompleteSearchValue}
  />
  {#each filteredList as site}
    <Button
      type="button"
      class="justify-start"
      size="sm"
      color="ghost"
      on:click={() => {
        selectSite(site);
      }}
    >
      {site}
    </Button>
  {:else}
    <Button
      type="button"
      class="justify-start"
      color="ghost"
      size="sm"
      disabled
    >
      Your search did not match any cities.
    </Button>
  {/each}
</Autocomplete>
