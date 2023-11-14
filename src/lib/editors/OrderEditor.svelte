<script lang="ts">
  import type { Order, OrderSchema } from "$lib/core/models/order.model";
  import {dateProxy, intProxy, superForm} from "sveltekit-superforms/client";
  import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";
  import { orderSchema } from "$lib/core/models/order.model";
  import Icon from "@iconify/svelte";
  import FormControl from "$lib/dui/data-input/FormControl.svelte";
  import CustomerAutocomplete from "$lib/ui/components/CustomerAutocomplete.svelte";
  import Button from "$lib/dui/action/Button.svelte";
  import TextInput from "$lib/dui/data-input/TextInput.svelte";
  import Range from "$lib/dui/data-input/Range.svelte";
  import SiteAutocomplete from "$lib/ui/components/SiteAutocomplete.svelte";
  import {page} from "$app/stores";

  export let data;
  export let order: Order | undefined = undefined;

  let loading: boolean = false;
  let customerAutocompleteSearch: string = "";
  let siteAutocompleteSearch: string = "";

  const { form, errors, enhance, message } = superForm<OrderSchema>(data.form, {
    applyAction: true,
    validators: orderSchema,
    taintedMessage: "are you sure you want to exit?",
    onSubmit: () => (loading = true),
    onResult: () => (loading = false),
  });

  function handleProfitPercentageChange() {
    if ($form.usePercentage) {
      $form.profit = Number(($form.profitPercentage * $form.cost).toFixed(2));
    }
  }

  const costProxy = intProxy(form, "cost");
  const profitProxy = intProxy(form, "profit");
  const commissionProxy = intProxy(form, "commission");
  const orderDateProxy = dateProxy(form, 'orderDate', { format: 'date' });

  $form.usePercentage = false;
  $form.profitPercentage = 0.05;
  $form.commission = 0;
  $form.profit = 0;
  $form.cost = 0;
  $form.note = "";

  if (order) {
    $form.customerId = order.customer.id;
    $form.cost = order.cost;
    $form.profit = order.profit;
    $form.commission = order.commission;
    $form.site = order.site;
    $form.note = order.note;
    $form.orderDate = new Date(order.orderDate);
    customerAutocompleteSearch = order.customer.fullName;
    siteAutocompleteSearch = order.site.toString();
  }

  const forCustomer = $page.url.searchParams.get('for-customer');
  const forCustomerName = $page.url.searchParams.get('customer');
  if (forCustomer && forCustomerName){
    $form.customerId = Number(forCustomer);
    customerAutocompleteSearch = forCustomerName;
  }
</script>

<div class="flex justify-center mt-8">
  <SuperDebug data={$form} />
  <div class="w-1/2 rounded bg-neutral-content">
    <div class="py-4 px-8 border-1 border-b border-b-neutral-700">
      <h2 class="text-3xl uppercase">
        {#if order}
          Edit {order.customer.fullName}'s Order
        {:else}
          Create New Order
        {/if}
      </h2>
      <form method="post" class="flex flex-col gap-2 px-8 py-4" use:enhance>
        {#if $message}
          <div class="alert alert-error w-full">
            <Icon icon="mdi:alert" class="text-lg" />
            {$message.text}
          </div>
        {/if}
        <FormControl field="customerId">
          <span slot="top-label-text">Customer</span>
          <CustomerAutocomplete
            inputStyleClass="w-full"
            class="w-full"
            name="customerId"
            bind:value={$form.customerId}
            bind:autocompleteSearchValue={customerAutocompleteSearch}
          />
          <span slot="bottom-label-text" class="text-error">
            {#if $errors?.customerId}
              {$errors?.customerId[0]}
            {/if}
          </span>
        </FormControl>
        <FormControl field="site">
          <span slot="top-label-text">Site</span>
          <SiteAutocomplete
            inputStyleClass="w-full"
            class="w-full"
            name="site"
            bind:value={$form.site}
            bind:autocompleteSearchValue={siteAutocompleteSearch}
          />
          <span slot="bottom-label-text" class="text-error">
            {#if $errors?.site}
              {$errors?.site[0]}
            {/if}
          </span>
        </FormControl>
        <FormControl field="orderDate">
          <span slot="top-label-text">Order Date</span>
          <TextInput
            type="date"
            name="orderDate"
            bind:value={$orderDateProxy}
            color={$errors.orderDate ? "error" : ""}
            aria-invalid={$errors.orderDate ? true : undefined}
          />
          <span slot="bottom-label-text" class="text-error">
            {#if $errors?.orderDate}
              {$errors?.orderDate[0]}
            {/if}
          </span>
        </FormControl>
        <FormControl field="cost">
          <span slot="top-label-text">Cost</span>
          <TextInput
            name="cost"
            type="number"
            min="0"
            bind:value={$costProxy}
            color={$errors.cost ? "error" : ""}
            aria-invalid={$errors.cost ? true : undefined}
            on:input={handleProfitPercentageChange}
          />
          <span slot="bottom-label-text" class="text-error">
            {#if $errors?.cost}
              {$errors?.cost[0]}
            {/if}
          </span>
        </FormControl>
        <FormControl field="profit">
          <span slot="top-label-text">Profit</span>
          <TextInput
            name="profit"
            type="number"
            min="0"
            bind:value={$profitProxy}
            color={$errors.profit ? "error" : ""}
            aria-invalid={$errors.profit ? true : undefined}
            disabled={$form.usePercentage}
          />
          <span slot="bottom-label-text" class="text-error">
            {#if $errors?.profit}
              {$errors?.profit[0]}
            {/if}
          </span>
        </FormControl>
        <FormControl field="usePercentage">
          <label class="label cursor-pointer">
            <span class="label-text">Use Profit Percentage</span>
            <input
              type="checkbox"
              class="toggle"
              name="usePercentage"
              bind:checked={$form.usePercentage}
            />
          </label>
        </FormControl>
        <FormControl field="profitPercentage">
          <Range
            min={0.05}
            max={0.25}
            step={0.05}
            steps
            name="profitPercentage"
            bind:value={$form.profitPercentage}
            disabled={!$form.usePercentage}
            on:input={handleProfitPercentageChange}
          >
            <span>5%</span>
            <span>10%</span>
            <span>15%</span>
            <span>20%</span>
            <span>25%</span>
          </Range>
          <span slot="bottom-label-text" class="text-error">
            {#if $errors?.profitPercentage}
              {$errors?.profitPercentage[0]}
            {/if}
          </span>
        </FormControl>
        <FormControl field="commission">
          <span slot="top-label-text">Commission</span>
          <TextInput
            name="commission"
            type="number"
            min="0"
            bind:value={$commissionProxy}
            color={$errors.commission ? "error" : ""}
            aria-invalid={$errors.commission ? true : undefined}
          />
          <span slot="bottom-label-text" class="text-error">
            {#if $errors?.commission}
              {$errors?.commission[0]}
            {/if}
          </span>
        </FormControl>
        <Button
          {loading}
          loadingIcon="spinner"
          icon={order ? "mdi:update" : "mdi:add"}
          color="primary"
          type="submit"
          block
        >
          {#if loading}
            {#if order}
              Updating {order.customer.fullName}'s Order
            {:else}
              Creating Order
            {/if}
          {:else if order}
            Update {order.customer.fullName}'s Order
          {:else}
            Create Order
          {/if}
        </Button>
      </form>
    </div>
  </div>
</div>
