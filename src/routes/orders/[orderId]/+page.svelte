<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import Time from "svelte-time";
  import Button from "$lib/dui/action/Button.svelte";

  export let data;

  let isDeleting: boolean = false;
  $: order = data.order;
</script>

<svelte:head>
  <title>Nana - {order.customer.fullName}'s Order</title>
</svelte:head>

<div class="px-4 flex flex-col gap-4">
  <div class="py-4 mb-4">
    <h1 class="text-2xl mb-2">
      <a class="link" href={`/customers/${order.customer.id}`}>
        {order.customer.fullName}'s
      </a>
      Order
    </h1>
    <table class="info-table">
      <tbody>
        <tr>
          <td class="font-medium capitalize">ID:</td>
          <td># {order.id}</td>
        </tr>
        <tr>
          <td class="font-medium capitalize">Cost:</td>
          <td>₪ {order.cost.toFixed(2)}</td>
        </tr>
        <tr>
          <td class="font-medium capitalize">Profit:</td>
          <td>₪ {order.profit.toFixed(2)}</td>
        </tr>
        <tr>
          <td class="font-medium capitalize">Commission:</td>
          <td>₪ {order.commission.toFixed(2)}</td>
        </tr>
        <tr>
          <td class="font-medium capitalize">Site:</td>
          <td class="capitalize">{order.site.toLowerCase()}</td>
        </tr>
        <tr>
          <td class="font-medium capitalize">Status:</td>
          <td class="capitalize">{order.status.toLowerCase()}</td>
        </tr>
        <tr>
          <td class="font-medium capitalize">Order Date:</td>
          <td class="capitalize">
            <Time format="DD/MM/YYYY" timestamp={order.orderDate} />
          </td>
        </tr>
        <tr>
          <td class="font-medium capitalize">Ship Date:</td>
          <td class="capitalize" class:text-error={!order.shipDate}>
            {#if order.shipDate}
              <Time format="DD/MM/YYYY" timestamp={order.shipDate} />
            {:else}
              Not Shipped
            {/if}
          </td>
        </tr>
        <tr>
          <td class="font-medium capitalize">Created At:</td>
          <td class="capitalize">
            <Time
              format="DD/MM/YYYY h:mm A"
              timestamp={order.creationTimestamp}
            />
          </td>
        </tr>
        <tr>
          <td class="font-medium capitalize">Updated At:</td>
          <td class="capitalize">
            <Time
              format="DD/MM/YYYY h:mm A"
              timestamp={order.updateTimestamp}
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <table />
  </div>
  <div class="rounded border-error border-2 px-4 py-2">
    <h3 class="text-2xl mb-2">Danger Zone</h3>
    <div class="flex gap-4">
      <Button
        linkTo={`/orders/editor/${order.id}`}
        color="secondary"
        outline
        class="capitalize"
      >
        Edit '{order.customer.fullName}'s Order'
      </Button>
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
        <input name="id" type="hidden" hidden value={order.id} />
        <Button
          color="error"
          type="submit"
          loading={isDeleting}
          loadingIcon="spinner"
        >
          {#if isDeleting}
            Deleting '{order.customer.fullName}'s Order'
          {:else}
            Delete '{order.customer.fullName}'s Order'
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
