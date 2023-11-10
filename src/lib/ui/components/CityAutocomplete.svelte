<script lang="ts">
  import Button from "$lib/dui/action/Button.svelte";
  import Autocomplete from "$lib/dui/data-input/Autocomplete.svelte";
  import TextInput from "$lib/dui/data-input/TextInput.svelte";
  import { page } from "$app/stores";
  import {createEventDispatcher, onMount} from "svelte";
  import { HttpClient } from "$lib/core/api/axiosInstance";
  import type { Pageable } from "$lib/core/models/pageable.model";
  import type { City } from "$lib/core/models/city.model";

  export let value: number = 0;
  export let name: string = "";
  export let autocompleteSearchValue: string = "";
  export let inputStyleClass: string = "";

  let loading: boolean = false;
  let pageable: Pageable<City>;
  let cities: City[] = [];
  let searchTimeout: number;

  let dispatch = createEventDispatcher();

  onMount(async () => {
    await getCities();
  });

  async function getCities() {
    loading = true;
    let param = {
      name: autocompleteSearchValue ? autocompleteSearchValue : null,
    };
    let cityResponse = await HttpClient.get<Pageable<City>>(
      "/cities",
      $page.data.user,
      param
    );
    loading = false;
    pageable = cityResponse.data;
    cities = pageable.content;
  }

  async function filter() {
    clearTimeout(searchTimeout);

    if (autocompleteSearchValue.length === 0) {
      await getCities();
      return;
    }
    if (autocompleteSearchValue.length < 3) return;

    searchTimeout = setTimeout(async () => {
      await getCities();
    }, 500);
  }

  async function selectCity(city: City) {
    autocompleteSearchValue = city.name;
    value = city.id;
    dispatch('valuechange', {value})
  }

  let _inputStyle = inputStyleClass;
</script>

<input type="hidden" name={name} hidden bind:value={value}>
<Autocomplete class={$$props.class}>
  <TextInput
    class={_inputStyle}
    slot="autocomplete-input"
    bind:value={autocompleteSearchValue}
    on:keyup={filter}
  />
  {#if loading}
    <Button
      class="justify-start"
      size="sm"
      color="ghost"
      loadingIcon="spinner"
      type="button"
      {loading}
    >
      Loading...
    </Button>
  {:else}
    {#each cities as city}
      <Button
        type="button"
        class="justify-start"
        size="sm"
        color="ghost"
        on:click={() => {
          selectCity(city);
        }}
      >
        {city.name}
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
  {/if}
</Autocomplete>