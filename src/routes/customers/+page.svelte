<script lang="ts">
  import Icon from "@iconify/svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import CitySelect from "$lib/ui/components/CityAutoComplete.svelte";
  import Pagination from "$lib/ui/components/Paginator.svelte";

  export let data;

  let nameSearchParam: string;
  let citySearchParam: string;
  let citySearchValue: string;

  const applySearchFilters = (event?: CustomEvent) => {
    let query = new URLSearchParams($page.url.searchParams.toString());

    if (nameSearchParam) query.set("name", nameSearchParam);
    if (citySearchParam) query.set("city", citySearchParam);

    if (event?.detail) {
      query.set("page", event.detail.pageIndex);
      query.set("size", event.detail.pageSize);
    }

    goto(`?${query.toString()}`);
  };

  const resetSearchFilters = () => {
    let query = new URLSearchParams($page.url.searchParams.toString());

    nameSearchParam = "";
    citySearchParam = "";
    citySearchValue = "";

    query.delete("name");
    query.delete("city");
    goto(`?${query.toString()}`);
  };
</script>

<svelte:head>
  <title>Nana - Customers</title>
</svelte:head>

<div class="px-4 py-2">
  <div
    class="mb-2 py-4 px-2 bg-neutral-content shadow shadow-black flex flex-col gap-4"
  >
    <div class="flex">
      <a href="/customers/editor" class="btn btn-primary">
        <Icon class="text-lg" icon="mdi:add" />
        Create New Customer
      </a>
    </div>
    <div class="flex justify-between">
      <div class="join w-1/2 flex">
        <form on:submit|preventDefault={() => applySearchFilters()}>
          <input
            placeholder="Search name or handle"
            class="input input-bordered join-item flex-1"
            type="text"
            bind:value={nameSearchParam}
          />
        </form>
        <CitySelect
          placeholderText="Filter by City"
          styleClass="join-item"
          bind:selectedValue={citySearchParam}
          bind:searchValue={citySearchValue}
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
    </div>
  </div>
  <div
    class="flex flex-col justify-center pt-4 shadow-md shadow-gray-500 bg-base-100/50"
  >
    <div class="flex justify-between px-4 mb-4">
      <h1 class="text-2xl">Customers</h1>
      <Pagination
        pageIndex={data.currentPage.number}
        totalPages={data.currentPage.totalPages}
        pageSize={2}
        pageSizeOptions={[10, 25, 50]}
        showFirstLastButtons={true}
        on:pagechange={(event) => applySearchFilters(event)}
      />
    </div>
    <table class="table table-zebra">
      <thead>
        <tr class="text-lg">
          <th>#</th>
          <th>Full Name</th>
          <th>Handle</th>
          <th>Phone</th>
          <th>City</th>
          <th>Address</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {#each data.currentPage.content as customer}
          <tr>
            <td>
              <span>{customer.id}</span>
            </td>
            <td class="capitalize">
              <span>{customer.fullName}</span>
            </td>
            <td>
              <a
                class="link"
                href="https://instagram.com/{customer.handle}/"
                target="_blank"
              >
                {customer.handle}
              </a>
            </td>
            <td>
              <span>{customer.phoneNumber}</span>
            </td>
            <td class="capitalize">
              <span>{customer.city.name}</span>
            </td>
            <td class="capitalize">
              <span>{customer.address}</span>
            </td>
            <td>
              <a
                class="btn btn-primary btn-circle"
                href={`/customers/${customer.id}`}
              >
                <Icon class="text-lg" icon="mdi:book-open-outline" />
              </a>
            </td>
          </tr>
        {:else}
          <tr>
            <td colspan="8">
              <span class="text-error text-lg font-bold">No customers available</span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
