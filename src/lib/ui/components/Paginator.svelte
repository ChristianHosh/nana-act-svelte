<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Dropdown from "$lib/dui/action/Dropdown.svelte";
  import Button from "$lib/dui/action/Button.svelte";

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
    <Dropdown class="join-item" labelStyleClass="join-item">
      <span slot="label">Page Size</span>
      {#each pageSizeOptions as pageSizeOption}
        <Button
          class="justify-start"
          color="ghost"
          size="sm"
          on:click={() => {
            pageSize = pageSizeOption;
            dispatchPageEvent();
          }}
        >
          {pageSizeOption}
        </Button>
      {/each}
    </Dropdown>
  {/if}
  {#if showFirstLastButtons}
    <Button
      class="join-item"
      color="primary"
      disabled={pageIndex <= 0}
      icon="mdi:chevron-double-left"
      on:click={gotoFirstPage}
    />
  {/if}
  <Button
    class="join-item"
    color="primary"
    disabled={pageIndex <= 0}
    icon="mdi:chevron-left"
    on:click={gotoPrevPage}
  />
  <Button class="join-item cursor-default no-animation" color="ghost">
    Page {pageIndex}
  </Button>
  <Button
    class="join-item"
    color="primary"
    disabled={pageIndex >= totalPages - 1}
    icon="mdi:chevron-right"
    on:click={gotoNextPage}
  />
  {#if showFirstLastButtons}
    <Button
      class="join-item"
      color="primary"
      disabled={pageIndex >= totalPages - 1}
      icon="mdi:chevron-double-right"
      on:click={gotoLastPage}
    />
  {/if}
</div>
