<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import CitySelect from "$lib/ui/components/CityAutoComplete.svelte";
  import Pagination from "$lib/ui/components/Paginator.svelte";
  import Button from "$lib/dui/action/Button.svelte";
  import Collapse from "$lib/dui/data-display/Collapse.svelte";

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
      <Button linkTo="/customers/editor" color="primary" icon="mdi:add" wide>
        Create New Customer
      </Button>
    </div>
    <Collapse class="overflow-visible" color="base-200" closeable arrow>
      <span slot="title">Filter Customers</span>
      <div class="flex flex-col">
        <div class="flex gap-4">
          <div class="form-control">
            <label class="label" for="username">
              <span class="label-text"> Username or Handle </span>
            </label>
            <input class="input input-bordered" type="text" name="username" />
          </div>
          <div class="form-control">
            <label class="label" for="city">
              <span class="label-text"> City </span>
            </label>
            <CitySelect
                    placeholderText=""
                    bind:selectedValue={citySearchParam}
                    bind:searchValue={citySearchValue}
                    on:selectionchange={() => applySearchFilters()}
            />
          </div>
        </div>
      </div>
    </Collapse>
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
              <Button
                linkTo={`/customers/${customer.id}`}
                color="primary"
                circle
                icon="mdi:book-open-outline"
              />
            </td>
          </tr>
        {:else}
          <tr>
            <td colspan="8">
              <span class="text-error text-lg font-bold"
                >No customers available</span
              >
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
