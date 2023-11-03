<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import type { Customer } from "$lib/core/models/customer.model";
  import CityAutoComplete from "$lib/ui/components/CityAutoComplete.svelte";

  export let customer: Customer | undefined = undefined;
  export let errors: any;
  export let headerError: any;

  let isSubmitting: boolean = false;
  let selectedCity: string;
</script>

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
    <form
      method="post"
      class="flex flex-col gap-2 px-8 py-4"
      use:enhance={() => {
        isSubmitting = true;
        return async ({ result }) => {
          if (result.type === "failure") isSubmitting = false;

          await applyAction(result);
        };
      }}
    >
      {#if headerError}
        <div class="alert alert-error w-full">
          <span>{headerError}</span>
        </div>
      {/if}

      <div class="form-control w-full">
        <label for="fullName" class="label">
          <span class="label-text">Full Name</span>
        </label>
        <input
          name="fullName"
          type="text"
          required
          class="w-full input {errors?.fullName
            ? 'input-error'
            : 'input-bordered'}"
          value={customer?.fullName || ""}
        />
        {#if errors?.fullName}
          <label for="fullName" class="label">
            <span class="label-text-alt text-error">{errors?.fullName[0]}</span>
          </label>
        {/if}
      </div>
      <div class="form-control w-full">
        <label for="phoneNumber" class="label">
          <span class="label-text">Phone Number</span>
        </label>
        <input
          name="phoneNumber"
          type="text"
          required
          class="w-full input {errors?.phoneNumber
            ? 'input-error'
            : 'input-bordered'}"
          value={customer?.phoneNumber || ""}
        />
        {#if errors?.phoneNumber}
          <label for="phoneNumber" class="label">
            <span class="label-text-alt text-error"
              >{errors?.phoneNumber[0]}</span
            >
          </label>
        {/if}
      </div>
      <div class="form-control w-full">
        <label for="handle" class="label">
          <span class="label-text">Handle</span>
        </label>
        <input
          name="handle"
          type="text"
          required
          class="w-full input {errors?.handle
            ? 'input-error'
            : 'input-bordered'}"
          value={customer?.handle || ""}
        />
        {#if errors?.handle}
          <label for="handle" class="label">
            <span class="label-text-alt text-error">{errors?.handle[0]}</span>
          </label>
        {/if}
      </div>
      <div class="form-control w-full">
        <label for="address" class="label">
          <span class="label-text">Address</span>
        </label>
        <input
          name="address"
          type="text"
          required
          class="w-full input {errors?.address
            ? 'input-error'
            : 'input-bordered'}"
          value={customer?.address || ""}
        />
        {#if errors?.address}
          <label for="address" class="label">
            <span class="label-text-alt text-error">{errors?.address[0]}</span>
          </label>
        {/if}
      </div>
      <input type="hidden" name="cityId" hidden bind:value={selectedCity} />
      <div class="form-control">
        <label for="cityId" class="label">
          <span class="label-text">City</span>
        </label>
        <CityAutoComplete
          styleClass="w-full"
          placeholderText=""
          bind:selectedValue={selectedCity}
        />
        {#if errors?.cityId}
          <label for="cityId" class="label">
            <span class="label-text-alt text-error">{errors?.address[0]}</span>
          </label>
        {/if}
      </div>
      <button
        disabled={isSubmitting}
        class="btn btn-primary w-full"
        type="submit"
      >
        {#if isSubmitting}
          <span class="loading loading-spinner" />
          <span>Saving Customer</span>
        {:else}
          <span>Save</span>
        {/if}
      </button>
    </form>
  </div>
</div>
