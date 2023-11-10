<script lang="ts">
  import type {
    Customer,
    CustomerSchema,
  } from "$lib/core/models/customer.model";
  import CityAutoComplete from "$lib/ui/components/CityAutoComplete.svelte";
  import Button from "$lib/dui/action/Button.svelte";
  import { superForm } from "sveltekit-superforms/client";
  import { customerSchema } from "$lib/core/models/customer.model";
  import FormControl from "$lib/dui/data-input/FormControl.svelte";
  import TextInput from "$lib/dui/data-input/TextInput.svelte";
  import Icon from "@iconify/svelte";
  import type { SuperValidated } from "sveltekit-superforms";

  export let customer: Customer | undefined = undefined;
  export let data: SuperValidated<CustomerSchema>;

  let loading: boolean = false;
  let message: string | undefined;

  export const { form, errors, enhance } = superForm<typeof customerSchema>(
    data,
    {
      applyAction: true,
      validators: customerSchema,
      taintedMessage: "are you sure you want to exit?",
      onSubmit: () => (loading = true),
      onResult: ({ result }) => {
        loading = false;
        message = undefined;
        if (result.type === "failure") {
          message = result.data?.message;
        }
      },
    }
  );
</script>

<div>
  hello
  <p>{$form.fullName}</p>
  <p>{$form.phoneNumber}</p>
  <p>{$form.handle}</p>
  <p>{$form.address}</p>
  <p>{$form.cityId}</p>
</div>
<div class="flex justify-center mt-8">
  <div class="w-1/2 rounded bg-neutral-content">
    <div class="py-4 px-8 border-1 border-b border-b-neutral-700">
      <h2 class="text-3xl">
        {#if customer}
          <span>Editing {customer.fullName}</span>
        {:else}
          <span>Create Customer</span>
        {/if}
      </h2>
    </div>
    <form method="post" class="flex flex-col gap-2 px-8 py-4" use:enhance>
      {#if message}
        <div class="alert alert-error w-full">
          <Icon icon="mdi:alert" class="text-lg" />
          {message}
        </div>
      {/if}
      <FormControl>
        <span slot="top-label-text">Full Name</span>
        <TextInput
          type="text"
          bind:value={$form.fullName}
          color={$errors.fullName ? "error" : ""}
        />
        <span slot="bottom-label-text" class="text-error">
          {#if $errors.fullName}
            {$errors.fullName[0]}
          {/if}
        </span>
      </FormControl>
      <FormControl>
        <span slot="top-label-text">Phone Number</span>
        <TextInput
          type="text"
          bind:value={$form.phoneNumber}
          color={$errors.phoneNumber ? "error" : ""}
        />
        <span slot="bottom-label-text" class="text-error">
          {#if $errors.phoneNumber}
            {$errors.phoneNumber[0]}
          {/if}
        </span>
      </FormControl>
      <FormControl>
        <span slot="top-label-text">Handle</span>
        <TextInput
          type="text"
          bind:value={$form.handle}
          color={$errors.handle ? "error" : ""}
        />
        <span slot="bottom-label-text" class="text-error">
          {#if $errors.handle}
            {$errors.handle[0]}
          {/if}
        </span>
      </FormControl>
      <FormControl>
        <span slot="top-label-text">Address</span>
        <TextInput
          type="text"
          bind:value={$form.address}
          color={$errors.address ? "error" : ""}
        />
        <span slot="bottom-label-text" class="text-error">
          {#if $errors.address}
            {$errors.address[0]}
          {/if}
        </span>
      </FormControl>
      <FormControl>
        <span slot="top-label-text">City</span>
        <CityAutoComplete
          class="w-full"
          placeholderText=""
          bind:selectedValue={$form.cityId}
        />
        <span slot="bottom-label-text" class="text-error">
          {#if $errors.cityId}
            {$errors.cityId[0]}
          {/if}
        </span>
      </FormControl>
      <Button
        {loading}
        loadingIcon="spinner"
        color="primary"
        type="submit"
        block
      >
        {#if loading}
          Saving
        {:else}
          Save
        {/if}
      </Button>
    </form>
  </div>
</div>
