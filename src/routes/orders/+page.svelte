<script lang="ts">
  import Icon from "@iconify/svelte";
  import Pagination from "$lib/ui/components/Paginator.svelte";
  import Time from "svelte-time";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import CityAutoComplete from "$lib/ui/components/CityAutoComplete.svelte";
  import StatusSelect from "$lib/ui/components/StatusSelect.svelte";

  export let data;

  let orderFromSearchParam: string;
  let orderToSearchParam: string;
  let shipFromSearchParam: string;
  let shipToSearchParam: string;
  let citySearchParam: string;
  let citySearchValue: string;
  let statusSearchParam: string;
  let statusSearchValue: string;

  const applySearchFilters = (event?: CustomEvent) => {
    let query = new URLSearchParams($page.url.searchParams.toString());

    if (orderFromSearchParam) query.set("order-from", orderFromSearchParam);
    if (orderToSearchParam) query.set("order-to", orderToSearchParam);
    if (shipFromSearchParam) query.set("ship-from", shipFromSearchParam);
    if (shipToSearchParam) query.set("ship-to", shipToSearchParam);
    if (citySearchParam) query.set("city", citySearchParam);
    if (statusSearchParam) query.set("status", statusSearchParam);

    if (event?.detail) {
      query.set("page", event.detail.pageIndex);
      query.set("size", event.detail.pageSize);
    }

    goto(`?${query.toString()}`);
  };

  const resetSearchFilters = () => {
    let query = new URLSearchParams($page.url.searchParams.toString());

    citySearchParam = "";
    citySearchValue = "";
    statusSearchParam = "";
    statusSearchValue = ""
    orderFromSearchParam = "";
    orderToSearchParam = "";
    shipFromSearchParam = "";
    shipToSearchParam = "";

    query.delete("city");
    query.delete("status");

    goto(`?${query.toString()}`);
  };
</script>

<svelte:head>
  <title>Nana - Orders</title>
</svelte:head>

<div class="px-4">
  <div class="py-4 mb-4">
    <h1 class="text-2xl">Orders</h1>
  </div>
  <div
    class="mb-2 py-4 px-2 bg-neutral-content shadow shadow-black flex flex-col gap-4"
  >
    <div class="flex">
      <a href="/orders/editor" class="btn btn-primary">
        <Icon class="text-lg" icon="mdi:add" />
        Create New Order
      </a>
    </div>
    <div class="flex justify-between">
      <div class="join w-1/2 flex">
                <CityAutoComplete
                  placeholderText="Filter by City"
                  styleClass="join-item"
                  bind:selectedValue={citySearchParam}
                  bind:searchValue={citySearchValue}
                  on:selectionchange={() => applySearchFilters()}
                />
        <StatusSelect placeholderText="Filter by Status"
                      styleClass="join-item"
                      bind:selectedValue={statusSearchParam}
                      bind:searchValue={statusSearchValue}
                      on:selectionchange={() => applySearchFilters()}
                      />
        <button class="btn join-item" on:click={() => applySearchFilters()}>
          <Icon class="text-lg" icon="mdi:search" />
          Search
        </button>
        <button class="btn join-item" on:click={() => resetSearchFilters()}>
          <Icon class="text-lg" icon="mdi:backspace-outline" />
          Clear
        </button>
      </div>
      <Pagination
        pageIndex={data.currentPage.number}
        totalPages={data.currentPage.totalPages}
        pageSize={2}
        pageSizeOptions={[10, 25, 50]}
        showFirstLastButtons={true}
        on:pagechange={(event) => applySearchFilters(event)}
      />
    </div>
  </div>
  <div class="flex flex-col justify-center">
    <table class="table table-zebra">
      <thead>
        <tr class="text-lg">
          <th>#</th>
          <th>Site</th>
          <th>Cost</th>
          <th>Profit</th>
          <th>Commission</th>
          <th>Status</th>
          <th>Order Date</th>
          <th>Ship Date</th>
          <th>Customer</th>
          <th>City</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        {#each data.currentPage.content as order}
          <tr>
            <td>
              <span>{order.id}</span>
            </td>
            <td>
              <span>{order.site}</span>
            </td>
            <td>
              <span>₪ {order.cost}</span>
            </td>
            <td>
              <span>₪ {order.profit}</span>
            </td>
            <td>
              <span>₪ {order.commission}</span>
            </td>
            <td>
              <span>{order.status}</span>
            </td>
            <td>
              <span>
                <Time format="DD/MM/YYYY" timestamp={order.orderDate} />
              </span>
            </td>
            <td>
              <span class:text-error={!order.shipDate}>
                {#if order.shipDate}
                  <Time format="DD/MM/YYYY" timestamp={order.shipDate} />
                {:else}
                  Not Shipped
                {/if}
              </span>
            </td>
            <td>
              <span class="capitalize">{order.customer.fullName}</span>
            </td>
            <td>
              <span class="capitalize">{order.customer.city.name}</span>
            </td>
            <td>
              <span>{order.note}</span>
            </td>
          </tr>
        {:else}
          <tr>
            <td colspan="8">
              <span class="text-error text-lg font-bold"
                >No orders available</span
              >
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
