<script lang="ts">
  import Button from "$lib/dui/action/Button.svelte";
  import FormControl from "$lib/dui/data-input/FormControl.svelte";
  import TextInput from "$lib/dui/data-input/TextInput.svelte";
  import { superForm } from "sveltekit-superforms/client";
  import type { LoginSchema } from "$lib/core/models/user.model";
  import Icon from "@iconify/svelte";
  import { loginSchema } from "$lib/core/models/user.model";

  // export let form;
  export let data;

  const { form, errors, enhance, message } = superForm<LoginSchema>(data.form, {
    applyAction: true,
    validators: loginSchema,
    taintedMessage: "are you sure you want to exit?",
    onSubmit: () => (loading = true),
    onResult: () => (loading = false),
  });

  let loading: boolean = false;
</script>

<svelte:head>
  <title>Nana - Login</title>
</svelte:head>

<div class="flex justify-center mt-8">
  <div class="w-1/2 rounded bg-neutral-content">
    <div class="py-4 px-8 border-1 border-b border-b-neutral-700">
      <h2 class="text-3xl">Login</h2>
    </div>
    <form method="post" class="flex flex-col gap-2 px-8 py-4" use:enhance>
      {#if $message}
        <div class="alert alert-error w-full">
          <Icon icon="mdi:alert" class="text-lg" />
          username or password are incorrect
        </div>
      {/if}
      <FormControl field="username">
        <span slot="top-label-text">Username</span>
        <TextInput
          name="username"
          type="text"
          bind:value={$form.username}
          color={$errors.username ? "error" : ""}
          aria-invalid={$errors.username ? true : undefined}
        />
        <span slot="bottom-label-text" class="text-error">
          {#if $errors?.username}
            {$errors?.username[0]}
          {/if}
        </span>
      </FormControl>
      <FormControl field="password">
        <span slot="top-label-text">Password</span>
        <TextInput
          name="password"
          type="password"
          bind:value={$form.password}
          color={$errors.password ? "error" : ""}
          aria-invalid={$errors.password ? true : undefined}
        />
        <span slot="bottom-label-text" class="text-error">
          {#if $errors.password}
            {$errors.password[0]}
          {/if}
        </span>
      </FormControl>
      <Button
        {loading}
        loadingIcon="spinner"
        icon="mdi:login"
        color="primary"
        type="submit"
        block
      >
        {#if loading}
          Logging In
        {:else}
          Login
        {/if}
      </Button>
    </form>
  </div>
</div>
