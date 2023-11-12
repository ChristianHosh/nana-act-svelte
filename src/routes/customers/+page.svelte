<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import Pagination from "$lib/ui/components/Paginator.svelte";
  import Button from "$lib/dui/action/Button.svelte";
  import Collapse from "$lib/dui/data-display/Collapse.svelte";
  import FormControl from "$lib/dui/data-input/FormControl.svelte";
  import TextInput from "$lib/dui/data-input/TextInput.svelte";
  import CityAutocomplete from "$lib/ui/components/CityAutocomplete.svelte";

  export let data;

  let nameParam = $page.url.searchParams.get("name");
  let idParam = $page.url.searchParams.get("id");
  let cityParam = Number($page.url.searchParams.get("city"));
  let citySearchValue: string;

  function onPageChange(event: CustomEvent) {
    let query = new URLSearchParams($page.url.searchParams.toString());

    if (event?.detail) {
      query.set("page", event.detail.pageIndex);
      query.set("size", event.detail.pageSize);
    }

    applySearchFilters(query);
  }

  function applySearchFilters(prevQuery?: URLSearchParams){
    let query =
      prevQuery || new URLSearchParams($page.url.searchParams.toString());

    if (nameParam) query.set("name", nameParam);
    if (idParam) query.set("id", idParam);
    if (cityParam != 0) query.set("city", cityParam.toString());

    goto(`?${query.toString()}`);
  }

  function resetSearchFilters() {
    let query = new URLSearchParams($page.url.searchParams.toString());

    nameParam = "";
    idParam = "";
    citySearchValue = "";
    cityParam = 0;

    query.delete("name");
    query.delete("city");
    query.delete("id")
    goto(`?${query.toString()}`);
  }

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
      <div class="flex flex-col gap-6">
        <div class="flex gap-4">
          <FormControl field="id">
            <span slot="top-label-text">ID</span>
            <TextInput type="number" name="id" bind:value={idParam} />
          </FormControl>
          <FormControl field="username">
            <span slot="top-label-text">Name or Handle</span>
            <TextInput type="text" name="username" bind:value={nameParam} />
          </FormControl>
          <FormControl field="city">
            <span slot="top-label-text">City</span>
            <CityAutocomplete
              bind:value={cityParam}
              bind:autocompleteSearchValue={citySearchValue}
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
      <h1 class="text-2xl">Customers</h1>
      <Pagination
        pageIndex={data.currentPage.number}
        totalPages={data.currentPage.totalPages}
        pageSize={25}
        pageSizeOptions={[10, 25, 50]}
        showFirstLastButtons
        on:pagechange={(event) => onPageChange(event)}
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
