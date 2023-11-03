<script lang="ts">
  import Icon from "@iconify/svelte";
  import { createEventDispatcher } from "svelte";

  export let pageIndex: number = 0;
  export let pageSize: number = 10;
  export let totalPages: number = 1;
  export let pageSizeOptions: number[] = [pageSize];
  export let showFirstLastButtons: boolean = false;

  const dispatch = createEventDispatcher();

  const gotoFirstPage = () => {
    pageIndex = 0;
    dispatchPageEvent();
  };
  const gotoLastPage = () => {
    pageIndex = totalPages - 1;
    dispatchPageEvent();
  };
  const gotoPrevPage = () => {
    pageIndex--;
    dispatchPageEvent();
  };
  const gotoNextPage = () => {
    pageIndex++;
    dispatchPageEvent();
  };
  const dispatchPageEvent = () => {
    dispatch("pagechange", {
      pageIndex,
      pageSize,
    });
  };
</script>

<div class="join">
  {#if pageSizeOptions.length > 1}
    <div class="dropdown join-item">
      <label tabindex="0" class="btn btn-primary join-item">Page Size</label>
      <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {#each pageSizeOptions as option}
          <li>
            <button
              on:click={() => {
                pageSize = option;
                dispatchPageEvent();
              }}
            >
              {option}
            </button>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
  {#if showFirstLastButtons}
    <button
      class="join-item btn btn-primary"
      disabled={pageIndex <= 0}
      on:click={gotoFirstPage}
    >
      <Icon class="text-lg" icon="mdi:chevron-double-left" />
    </button>
  {/if}
  <button
    class="join-item btn btn-primary"
    disabled={pageIndex <= 0}
    on:click={gotoPrevPage}
  >
    <Icon class="text-lg" icon="mdi:chevron-left" />
  </button>
  <button class="join-item btn btn-ghost cursor-default no-animation"
    >Page {pageIndex}</button
  >
  <button
    class="join-item btn btn-primary"
    disabled={pageIndex >= totalPages - 1}
    on:click={gotoNextPage}
  >
    <Icon class="text-lg" icon="mdi:chevron-right" />
  </button>
  {#if showFirstLastButtons}
    <button
      class="join-item btn btn-primary"
      disabled={pageIndex >= totalPages - 1}
      on:click={gotoLastPage}
    >
      <Icon class="text-lg" icon="mdi:chevron-double-right" />
    </button>
  {/if}
</div>
