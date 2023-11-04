<script lang="ts">
  import { statusList } from "$lib/core/consts";
  import { createEventDispatcher } from "svelte";

  export let selectedValue: string;
  export let searchValue: string = "";
  export let placeholderText: string = "Status";
  export let styleClass: string = "";
  $: styleClassReactive = styleClass;

  $: filteredOptions = statusList.filter(function (option) {
    return option.toLowerCase().includes(searchValue.toLowerCase());
  });

  const dispatch = createEventDispatcher();

  const selectStatus = (status: string) => {
    switch (status) {
      case "ORDERED":
        selectedValue = "1";
        break;
      case "PROCESSING":
        selectedValue = "2";
        break;
      case "COMPLETED":
        selectedValue = "3";
        break;
      case "CANCELED":
        selectedValue = "4";
        break;
      case "RETURNED":
        selectedValue = "5";
        break;
    }
    searchValue = status;
    dispatch("selectionchange");
  };
</script>

<div class="dropdown {styleClassReactive}">
  <input
    bind:value={searchValue}
    class="input input-bordered {styleClassReactive}"
    placeholder={placeholderText}
  />
  <ul
    class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
  >
    {#each filteredOptions as option}
      <li>
        <button
          class="btn btn-sm btn-ghost justify-start align-middle capitalize"
          class:btn-active={selectedValue === option.toUpperCase()}
          on:click={() => {
            selectStatus(option);
          }}
        >
          {option}
        </button>
      </li>
    {:else}
      <li>
        <button
          class="btn btn-sm btn-ghost justify-start align-middle capitalize"
        >
          Status doesn't exists
        </button>
      </li>
    {/each}
  </ul>
</div>
