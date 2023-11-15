<script lang="ts">
  import Time from "svelte-time";
  import Button from "$lib/dui/action/Button.svelte";
  import Stat from "$lib/dui/data-display/Stat.svelte";
  import { currency } from "$lib/core/util";

  export let data;

  let isDeleting: boolean = false;
  $: customerProfile = data.customerProfile;
  $: customer = data.customer;
</script>

<svelte:head>
  <title>Nana - {customer.fullName}</title>
</svelte:head>

<div class="px-4 flex flex-col gap-4">
  <div class="flex gap-4">
    <div>
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
    <div class="mt-12 stats shadow">
      <Stat color="success">
        <span slot="title">Paid</span>
        <span slot="value">{currency(customerProfile.paidTotal)}</span>
        <span slot="description">Total paid amount, all time</span>
      </Stat>
      <Stat color="error">
        <span slot="title">Debt</span>
        <span slot="value">{currency(customerProfile.debtTotal)}</span>
        <span slot="description">Total unpaid amount, all time</span>
      </Stat>
      <Stat color="info">
        <span slot="title">Total</span>
        <span slot="value">{currency(customerProfile.allOrdersTotal)}</span>
        <span slot="description">All orders total, last 30 days</span>
      </Stat>
      <Stat color="accent">
        <span slot="title">Cost</span>
        <span slot="value">{currency(customerProfile.allOrdersCost)}</span>
        <span slot="description">All orders cost, last 30 days</span>
      </Stat>
      <Stat color="primary">
        <span slot="title">Profit</span>
        <span slot="value">{currency(customerProfile.allOrdersProfit)}</span>
        <span slot="description">All orders profit, last 30 days</span>
      </Stat>
      <Stat color="secondary">
        <span slot="title">Commission</span>
        <span slot="value">{currency(customerProfile.allOrdersCommission)}</span
        >
        <span slot="description">All orders commission, last 30 days</span>
      </Stat>
    </div>
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

    <slot />
  </div>
  <div class="rounded border-error border-2 px-4 py-2">
    <h3 class="text-2xl mb-2">Danger Zone</h3>
    <div class="flex gap-4">
      <Button
        linkTo={`/customers/editor/${customer.id}`}
        color="secondary"
        outline
        class="capitalize"
        icon="mdi:pencil-outline"
      >
        Edit '{customer.fullName}'
      </Button>
      <Button
        linkTo={`/customers/${customer.id}/confirm-delete`}
        color="error"
        outline
        class="capitalize"
        icon="mdi:delete-outline"
      >
        Delete '{customer.fullName}'
      </Button>
    </div>
  </div>
</div>

<style>
  .info-table tr {
    padding-bottom: 0.25rem;
    border-bottom: 1px solid rgb(128, 128, 128);
  }

  .info-table td {
    padding-right: 1rem;
  }
</style>
