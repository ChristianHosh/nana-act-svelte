<script lang="ts">
  import type { Pageable } from "$lib/core/models/pageable.model";
  import type { City } from "$lib/core/models/city.model";
  import { createEventDispatcher, onMount } from "svelte";
  import { HttpClient } from "$lib/core/api/axiosInstance";
  import { page } from "$app/stores";

  export let selectedValue: string;
  export let searchValue: string = "";
  export let placeholderText: string = "City";
  export let styleClass: string = "";
  $: styleClassReactive = styleClass;
  let pageable: Pageable<City>;
  let cities: City[] = [];
  let loading: boolean = false;

  let searchTimeout: number;

  onMount(async () => {
    await getCities();
  });

  const getCities = async () => {
    loading = true;
    let response = await HttpClient.get<Pageable<City>>(
      "cities",
      $page.data.user
    );
    loading = false;
    pageable = response.data;
    cities = pageable.content;
  };

  const dispatch = createEventDispatcher();

  const searchAutocomplete = async () => {
    clearTimeout(searchTimeout);

    if (searchValue.length === 0) {
      await getCities();
      return;
    }
    if (searchValue.length < 3) return;

    loading = true;
    searchTimeout = setTimeout(async () => {
      let param = {
        name: searchValue,
      };

      let response = await HttpClient.get<Pageable<City>>(
        "cities",
        $page.data.user,
        param
      );
      loading = false;
      pageable = response.data;
      cities = pageable.content;
    }, 500);
  };

  const selectCity = (city: City) => {
    selectedValue = city.id.toString();
    searchValue = city.name;
    dispatch("selectionchange");
  };
</script>

<div class="dropdown {styleClassReactive}">
  <input
    on:keyup={searchAutocomplete}
    bind:value={searchValue}
    class="input input-bordered {styleClassReactive}"
    placeholder={placeholderText}
  />
  <ul
    class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
  >
    {#if !loading}
      {#each cities as city}
        <li>
          <button
            class="btn btn-ghost justify-start align-middle"
            class:btn-active={selectedValue === city.id.toString()}
            on:click={() => {
              selectCity(city);
            }}
          >
            {city.name}
          </button>
        </li>
      {:else}
        <li>
          <button
            class="btn btn-ghost btn- justify-start align-middle"
            disabled
          >
            City doesn't exist
          </button>
        </li>
      {/each}
    {:else}
      <li>
        <button class="btn btn-ghost btn- justify-start align-middle" disabled>
          <span class="loading loading-spinner" />
          Loading...
        </button>
      </li>
    {/if}
  </ul>
</div>
