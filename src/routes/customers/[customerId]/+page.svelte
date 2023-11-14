<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { currency } from "$lib/core/util";
  import Paginator from "$lib/ui/components/Paginator.svelte";
  import Time from "svelte-time";
  import Button from "$lib/dui/action/Button.svelte";

  export let data;

  $: customer = data.customer;

  let idParam: string;

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

    if (idParam) query.set("id", idParam);

    goto(`?${query.toString()}`);
  }

</script>

<div
  class="flex flex-col justify-center pt-4 shadow-md shadow-gray-500 bg-base-100/50"
>
  <div class="flex justify-between px-4 mb-4">
    <h1 class="text-2xl">Orders</h1>
    <Paginator
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
        <th>Amount to Pay</th>
        <th>Amount Paid</th>
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
            <span>{currency(order.cost + order.profit + order.commission)}</span>
          </td>
          <td>
              {#if order.payment}
                <span>{currency(order.payment.amount)}</span>
              {:else}
                <span class="text-error">Not Paid</span>
              {/if}
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
