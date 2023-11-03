<script lang="ts">
  import { applyAction, enhance } from "$app/forms";

  export let data;
  export let form;

  let isDeleting: boolean = false;
  $: customerProfile = data.customerProfile;
  $: customer = customerProfile.customer;
</script>

<svelte:head>
  <title>Nana - {customer.fullName}</title>
</svelte:head>

<div class="px-4 flex flex-col gap-4">
  <div class="py-4 mb-4">
    <h1 class="text-2xl">{customer.fullName}</h1>
    <table class="info-table">
      <tbody>
        <tr>
          <td class="font-medium">Address:</td>
          <td>{customer.city.name}, {customer.address}</td>
        </tr>
        <tr>
          <td class="font-medium">Phone Number:</td>
          <td>{customer.phoneNumber}</td>
        </tr>
        <tr>
          <td class="font-medium">Handle:</td>
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
      </tbody>
    </table>
  </div>
  <div>

  </div>
  <div class="rounded border-error border-2 px-4 py-2">
    <h3 class="text-2xl mb-2">Danger Zone</h3>
    <form
      method="post"
      action="?/delete"
      use:enhance={() => {
        isDeleting = true;
        return async ({ result }) => {
          isDeleting = false;
          await applyAction(result);
        };
      }}
    >
      <input name="id" type="hidden" hidden value={customer.id} />
      <button class="btn btn-error" type="submit" disabled={isDeleting}>
        {#if isDeleting}
          <span class="loading loading-spinner" />
          <span>Deleting {customer.fullName}</span>
        {:else}
          <span>Delete {customer.fullName}</span>
        {/if}
      </button>
    </form>
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
