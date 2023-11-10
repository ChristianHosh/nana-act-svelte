<script lang="ts">
  import Icon from "@iconify/svelte";
  import { superForm } from "sveltekit-superforms/client";
  import type { CustomerSchema } from "$lib/core/models/customer.model";
  import { customerSchema } from "$lib/core/models/customer.model";
  import FormControl from "$lib/dui/data-input/FormControl.svelte";
  import TextInput from "$lib/dui/data-input/TextInput.svelte";
  import Button from "$lib/dui/action/Button.svelte";
  import CityAutocomplete from "$lib/ui/components/CityAutocomplete.svelte";

  export let data;

  const { form, errors, enhance, message } = superForm<CustomerSchema>(
    data.form,
    {
      applyAction: true,
      validators: customerSchema,
      taintedMessage: "are you sure you want to exit?",
      onSubmit: () => (loading = true),
      onResult: () => (loading = false),
    }
  );

  let cityIdValue: number;
  let loading = false;

  $: () => {
    console.log("city id: ", $form.cityId);
    $form.cityId = cityIdValue;
  };
</script>

<div class="flex justify-center mt-8">
  <div class="w-1/2 rounded bg-neutral-content">
    <div class="py-4 px-8 border-1 border-b border-b-neutral-700">
      <h2 class="text-3xl uppercase">Create New Customer</h2>
    </div>
    <form method="post" class="flex flex-col gap-2 px-8 py-4" use:enhance>
      {#if $message}
        <div class="alert alert-error w-full">
          <Icon icon="mdi:alert" class="text-lg" />
          {$message.text}
        </div>
      {/if}
      <FormControl field="fullName">
        <span slot="top-label-text">Name</span>
        <TextInput
          name="fullName"
          type="text"
          bind:value={$form.fullName}
          color={$errors.fullName ? "error" : ""}
          aria-invalid={$errors.fullName ? true : undefined}
        />
        <span slot="bottom-label-text" class="text-error">
          {#if $errors?.fullName}
            {$errors?.fullName[0]}
          {/if}
        </span>
      </FormControl>
      <FormControl field="phoneNumber">
        <span slot="top-label-text">Phone Number</span>
        <TextInput
          name="phoneNumber"
          type="text"
          bind:value={$form.phoneNumber}
          color={$errors.phoneNumber ? "error" : ""}
          aria-invalid={$errors.phoneNumber ? true : undefined}
        />
        <span slot="bottom-label-text" class="text-error">
          {#if $errors?.phoneNumber}
            {$errors?.phoneNumber[0]}
          {/if}
        </span>
      </FormControl>
      <FormControl field="handle">
        <span slot="top-label-text">Handle</span>
        <TextInput
          name="handle"
          type="text"
          bind:value={$form.handle}
          color={$errors.handle ? "error" : ""}
          aria-invalid={$errors.handle ? true : undefined}
        />
        <span slot="bottom-label-text" class="text-error">
          {#if $errors?.handle}
            {$errors?.handle[0]}
          {/if}
        </span>
      </FormControl>
      <FormControl field="address">
        <span slot="top-label-text">Address</span>
        <TextInput
          name="address"
          type="text"
          bind:value={$form.address}
          color={$errors.address ? "error" : ""}
          aria-invalid={$errors.address ? true : undefined}
        />
        <span slot="bottom-label-text" class="text-error">
          {#if $errors?.address}
            {$errors?.address[0]}
          {/if}
        </span>
      </FormControl>
      <FormControl field="cityId">
        <span slot="top-label-text">City</span>
        <CityAutocomplete
          inputStyleClass="w-full"
          class="w-full"
          name="cityId"
          bind:value={$form.cityId}
        />
        <span slot="bottom-label-text" class="text-error">
          {#if $errors?.cityId}
            {$errors?.cityId[0]}
          {/if}
        </span>
      </FormControl>
      <Button
        {loading}
        loadingIcon="spinner"
        icon="mdi:add"
        color="primary"
        type="submit"
        block
      >
        {#if loading}
          Creating Customer
        {:else}
          Create Customer
        {/if}
      </Button>
    </form>
  </div>
</div>
