<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { page } from "$app/stores";
  import Button from "$lib/dui/action/Button.svelte";

  const customerId = $page.url.pathname.split("/")[2];
  let loading: boolean = false;
</script>

<div class="flex flex-col justify-center align-middle h-full text-center gap-4">
  <h1 class="text-error text-3xl">
    Are you sure you want to delete customer with ID: {customerId}
  </h1>
  <h2 class="text-xl">
    This customer will be removed permanently, along with all orders
  </h2>
  <div class="mt-8 flex gap-4 justify-center">
    <form
      method="post"
      use:enhance={() => {
        loading = true;
        return async ({ result }) => {
          await applyAction(result);
        };
      }}
    >
      <Button
        type="submit"
        {loading}
        loadingIcon="spinner"
        icon="mdi:delete-outline"
        outline
        color="error"
      >
        {#if loading}
          Deleting
        {:else}
          Delete
        {/if}
      </Button>
    </form>
    <Button
      linkTo={`/customers/${customerId}`}
      outline
      color="primary"
      icon="mdi:arrow-left">Cancel</Button
    >
  </div>
</div>
