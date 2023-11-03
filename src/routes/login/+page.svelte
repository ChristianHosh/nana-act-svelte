<script lang="ts">
  import { applyAction, enhance } from "$app/forms";

  export let form;

  let isSubmitting: boolean = false;
</script>

<svelte:head>
  <title>Nana - Login</title>
</svelte:head>

<div class="flex justify-center mt-8">
  <div class="w-1/2 rounded bg-neutral-content">
    <div class="py-4 px-8 border-1 border-b border-b-neutral-700">
      <h2 class="text-3xl">Login</h2>
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
      {#if form?.errorMessage}
        <div class="alert alert-error w-full">
          <span>{form?.errorMessage}</span>
        </div>
      {/if}

      <div class="form-control w-full">
        <label for="username" class="label">
          <span class="label-text">Username</span>
        </label>
        <input
          name="username"
          type="text"
          required
          class="w-full input {form?.errors?.username
            ? 'input-error'
            : 'input-bordered'}"
          value={form?.data?.username || ""}
        />
        {#if form?.errors?.username}
          <label for="username" class="label">
            <span class="label-text-alt text-error"
              >{form?.errors?.username[0]}</span
            >
          </label>
        {/if}
      </div>
      <div class="form-control w-full">
        <label for="password" class="label">
          <span class="label-text">Password</span>
        </label>
        <input
          name="password"
          type="password"
          required
          class="input {form?.errors?.password
            ? 'input-error'
            : 'input-bordered'} w-full"
        />
        {#if form?.errors?.password}
          <label for="username" class="label">
            <span class="label-text-alt text-error"
              >{form?.errors?.password[0]}</span
            >
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
          <span>Logging In</span>
        {:else}
          <span>Login</span>
        {/if}
      </button>
    </form>
  </div>
</div>
