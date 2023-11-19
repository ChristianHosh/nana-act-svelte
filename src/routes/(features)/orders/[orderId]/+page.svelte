<script lang="ts">
  import Time from "svelte-time";
  import Button from "$lib/dui/action/Button.svelte";
  import { currency } from "$lib/core/util.js";

  export let data;

  $: order = data.order;
</script>

<svelte:head>
  <title>Nana - {order.customer.fullName}'s Order</title>
</svelte:head>

<div class="px-4 flex flex-col gap-4">
  <div class="flex">
    <div>
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
            <td>{currency(order.cost)}</td>
          </tr>
          <tr>
            <td class="font-medium capitalize">Profit:</td>
            <td>{currency(order.profit)}</td>
          </tr>
          <tr>
            <td class="font-medium capitalize">Commission:</td>
            <td>{currency(order.commission)}</td>
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
            <td class="font-medium capitalize">Note:</td>
            <td class="first-letter:capitalize">
              {order.note}
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
    <div />
  </div>
  <div class="rounded border-error border-2 px-4 py-2">
    <h3 class="text-2xl mb-2">Danger Zone</h3>
    <div class="flex gap-4">
      <Button
        linkTo={`/orders/editor/${order.id}`}
        color="secondary"
        outline
        class="capitalize"
        icon="mdi:pencil-outline"
      >
        Edit '{order.customer.fullName}'s Order'
      </Button>
      <Button
        linkTo={`/orders/${order.id}/confirm-delete`}
        color="error"
        outline
        class="capitalize"
        icon="mdi:delete-outline"
      >
        Delete '{order.customer.fullName}'s Order'
      </Button>
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
