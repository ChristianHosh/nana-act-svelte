<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import Time from "svelte-time";
  import Button from "$lib/dui/action/Button.svelte";

  export let data;

  let isDeleting: boolean = false;
  $: customerProfile = data.customerProfile;
  $: customer = customerProfile.customer;
</script>

<svelte:head>
  <title>Nana - {customer.fullName}</title>
</svelte:head>

<div class="px-4 flex flex-col gap-4">
  <div class="py-4 mb-4">
    <h1 class="text-2xl mb-2 capitalize">{customer.fullName}</h1>
    <table class="info-table">
      <tbody>
        <tr>
          <td class="font-medium capitalize">ID:</td>
          <td class="capitalize"># {customer.id}</td>
        </tr>
        <tr>
          <td class="font-medium capitalize">Address:</td>
          <td class="capitalize">{customer.city.name}, {customer.address}</td>
        </tr>
        <tr>
          <td class="font-medium capitalize">Phone Number:</td>
          <td>{customer.phoneNumber}</td>
        </tr>
        <tr>
          <td class="font-medium capitalize">Handle:</td>
          <td>
            <a
              class="link"
              href="https://instagram.com/{customer.handle}/"
              target="_blank"
            >
              {customer.handle}
            </a>
          </td>
        </tr>
        <tr>
          <td class="font-medium capitalize">Created At:</td>
          <td class="capitalize">
            <Time
              format="DD/MM/YYYY h:mm A"
              timestamp={customer.creationTimestamp}
            />
          </td>
        </tr>
        <tr>
          <td class="font-medium capitalize">Updated At:</td>
          <td class="capitalize">
            <Time
              format="DD/MM/YYYY h:mm A"
              timestamp={customer.updateTimestamp}
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <div
      class="mb-2 py-4 px-2 bg-neutral-content shadow shadow-black flex flex-col gap-4"
    >
      <div class="flex">
        <Button
          linkTo={`/orders/editor?for-customer=${customer.id}&customer=${customer.fullName}`}
          color="primary"
          icon="mdi:add"
        >
          Create new order
        </Button>
      </div>
    </div>
    <table />
  </div>
  <div class="rounded border-error border-2 px-4 py-2">
    <h3 class="text-2xl mb-2">Danger Zone</h3>
    <div class="flex gap-4">
      <Button
        linkTo={`/customers/editor/${customer.id}`}
        color="secondary"
        outline
        class="capitalize"
      >
        Edit '{customer.fullName}'
      </Button>
      <form
        method="post"
        action="?/delete"
        use:enhance={() => {
          isDeleting = true;
          return async ({ result }) => {
            await applyAction(result);
          };
        }}
      >
        <Button
          color="error"
          type="submit"
          loading={isDeleting}
          loadingIcon="spinner"
        >
          {#if isDeleting}
            Deleting '{customer.fullName}'
          {:else}
            Delete '{customer.fullName}'
          {/if}
        </Button>
      </form>
    </div>
  </div>
</div>

<style>
  .info-table > tbody > tr {
    padding-bottom: 0.25rem;
    border-bottom: 1px solid rgb(128, 128, 128);
  }

  .info-table > tbody > tr > td {
    padding-right: 1rem;
  }
</style>
