<script lang="ts">
  import Pagination from "$lib/ui/components/Paginator.svelte";
  import Time from "svelte-time";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import Button from "$lib/dui/action/Button.svelte";
  import { currency } from "$lib/core/util.js";
  import Collapse from "$lib/dui/data-display/Collapse.svelte";
  import FormControl from "$lib/dui/data-input/FormControl.svelte";
  import TextInput from "$lib/dui/data-input/TextInput.svelte";
  import CityAutocomplete from "$lib/ui/components/CityAutocomplete.svelte";
  import CustomerAutocomplete from "$lib/ui/components/CustomerAutocomplete.svelte";
  import SiteAutocomplete from "$lib/ui/components/SiteAutocomplete.svelte";
  import StatusAutocomplete from "$lib/ui/components/StatusAutocomplete.svelte";

  export let data;

  let idParam = $page.url.searchParams.get("id");
  let cityParam = Number($page.url.searchParams.get("city"));
  let customerParam = Number($page.url.searchParams.get("customer"));
  let siteParam = $page.url.searchParams.get("site");
  let statusParam = $page.url.searchParams.get("status");

  let citySearchValue: string;
  let customerSearchValue: string;
  let siteSearchValue: string;
  let statusSearchValue: string;

  function onPageChange(event: CustomEvent) {
    let query = new URLSearchParams($page.url.searchParams.toString());

    if (event?.detail) {
      query.set("page", event.detail.pageIndex);
      query.set("size", event.detail.pageSize);
    }

    applySearchFilters(query);
  }

  function applySearchFilters(prevQuery?: URLSearchParams) {
    let query =
      prevQuery || new URLSearchParams($page.url.searchParams.toString());

    if (idParam) query.set("id", idParam);
    if (cityParam) query.set("city", cityParam.toString());
    if (customerParam) query.set("customer", customerParam.toString());
    if (siteParam) query.set("site", siteParam);
    if (statusParam) query.set("status", statusParam);

    goto(`?${query.toString()}`);
  }

  function resetSearchFilters() {
    let query = new URLSearchParams($page.url.searchParams.toString());

    idParam = "";
    citySearchValue = "";
    cityParam = 0;
    customerSearchValue = "";
    customerParam = 0;
    siteParam = "";
    siteSearchValue = "";
    statusParam = "";
    statusSearchValue = "";

    query.delete("id");
    query.delete("city");
    query.delete("customer");
    query.delete("site");
    query.delete("status");

    goto(`?${query.toString()}`);
  }
</script>

<svelte:head>
  <title>Nana - Orders</title>
</svelte:head>

<div class="px-4 py-2">
  <div
    class="mb-2 py-4 px-2 bg-neutral-content shadow shadow-black flex flex-col gap-4"
  >
    <div class="flex">
      <Button linkTo="/orders/editor" color="primary" icon="mdi:add">
        Create new order
      </Button>
    </div>
    <Collapse class="overflow-visible" color="base-200" closeable arrow>
      <span slot="title">Filter Orders</span>
      <div class="flex flex-col gap-6">
        <div class="flex gap-4">
          <FormControl field="id" class="flex-grow">
            <span slot="top-label-text">ID</span>
            <TextInput type="number" name="id" bind:value={idParam} />
          </FormControl>
          <FormControl field="city" class="flex-grow">
            <span slot="top-label-text">City</span>
            <CityAutocomplete
              inputStyleClass="w-full"
              bind:value={cityParam}
              bind:autocompleteSearchValue={citySearchValue}
            />
          </FormControl>
          <FormControl field="customer" class="flex-grow">
            <span slot="top-label-text">Customer</span>
            <CustomerAutocomplete
              inputStyleClass="w-full"
              bind:value={customerParam}
              bind:autocompleteSearchValue={customerSearchValue}
            />
          </FormControl>
          <FormControl field="site" class="flex-grow">
            <span slot="top-label-text">Site</span>
            <SiteAutocomplete
              inputStyleClass="w-full"
              bind:value={siteParam}
              bind:autocompleteSearchValue={siteSearchValue}
            />
          </FormControl>
          <FormControl field="status" class="flex-grow">
            <span slot="top-label-text">Status</span>
            <StatusAutocomplete
              inputStyleClass="w-full"
              bind:value={statusParam}
              bind:autocompleteSearchValue={statusSearchValue}
            />
          </FormControl>
        </div>
        <div class="flex gap-4">
          <Button
            color="primary"
            icon="mdi:search"
            outline
            on:click={() => applySearchFilters()}
          >
            Search
          </Button>
          <Button
            color="secondary"
            icon="mdi:clear-outline"
            outline
            on:click={() => resetSearchFilters()}
          >
            Clear
          </Button>
        </div>
      </div>
    </Collapse>
  </div>
  <div
    class="flex flex-col justify-center pt-4 shadow-md shadow-gray-500 bg-base-100/50"
  >
    <div class="flex justify-between px-4 mb-4">
      <h1 class="text-2xl">Orders</h1>
      <Pagination
        pageIndex={data.currentPage.number}
        totalPages={data.currentPage.totalPages}
        pageSize={25}
        pageSizeOptions={[10, 25, 50]}
        showFirstLastButtons={true}
        on:pagechange={(event) => onPageChange(event)}
      />
    </div>
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
          <th />
        </tr>
      </thead>
      <tbody>
        {#each data.currentPage.content as order}
          <tr>
            <td>
              <span>{order.id}</span>
            </td>
            <td>
              <span class={`badge badge-${order.site.toLowerCase()}`}>
                {order.site}
              </span>
            </td>
            <td>
              <span>{currency(order.cost)}</span>
            </td>
            <td>
              <span>{currency(order.profit)}</span>
            </td>
            <td>
              <span>{currency(order.commission)}</span>
            </td>
            <td>
              <span class={`badge badge-${order.status.toLowerCase()}`}>
                {order.status}
              </span>
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
              <a class="link" href={`/customers/${order.customer.id}`}>
                <span class="capitalize">{order.customer.fullName}</span>
              </a>
            </td>
            <td>
              <a
                class="link"
                href={`/customers?city=${order.customer.city.id}`}
              >
                <span class="capitalize">{order.customer.city.name}</span>
              </a>
            </td>
            <td>
              <Button
                linkTo={`/orders/${order.id}`}
                icon="mdi:book-open-outline"
                color="primary"
                circle
              />
            </td>
          </tr>
        {:else}
          <tr>
            <td colspan="8">
              <span class="text-error text-lg font-bold">
                No orders available
              </span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<!--suppress CssUnusedSymbol -->
<style>
  .badge-ordered {
    background-color: hsl(var(--in));
  }

  .badge-processing {
    background-color: hsl(var(--s));
  }

  .badge-completed {
    background-color: hsl(var(--su));
  }

  .badge-returned {
    background-color: hsl(var(--wa));
  }

  .badge-canceled {
    background-color: hsl(var(--er));
  }

  .badge-shein {
    background-color: #e7438c;
  }

  .badge-iherb {
    background-color: #ec4899;
  }

  .badge-asos {
    background-color: #f472b6;
  }

  .badge-next {
    background-color: #c026d3;
  }

  .badge-amazon {
    background-color: #d946ef;
  }

  .badge-modanisa {
    background-color: #e879f9;
  }

  .badge-trendiol {
    background-color: #9333ea;
  }

  .badge-ladymakeup {
    background-color: #a855f7;
  }
</style>
