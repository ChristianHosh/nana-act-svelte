<script lang="ts">
  import Button from "$lib/dui/action/Button.svelte";
  import FormControl from "$lib/dui/data-input/FormControl.svelte";
  import TextInput from "$lib/dui/data-input/TextInput.svelte";
  import {superForm} from "sveltekit-superforms/client";
  import {LoginSchema} from "$lib/core/models/user.model";
  import Icon from "@iconify/svelte";

  // export let form;
  export let data;
  let message: string | undefined;

  const {form, errors, enhance} = superForm(data.form, {
    applyAction: true,
    validators: LoginSchema,
    taintedMessage: "are you sure you want to exit?",
    onSubmit: () => loading = true,
    onResult: ({result}) => {
      loading = false
      message = undefined
      if (result.type === 'failure'){
        message = result.data?.message;
      }
    }
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
    <form
      method="post"
      class="flex flex-col gap-2 px-8 py-4"
      use:enhance
    >
      {#if message}
        <div class="alert alert-error">
          <Icon icon="mdi:alert" class="text-lg" />
          {message}
        </div>
      {/if}
      <FormControl>
        <span slot="top-label-text">Username</span>
        <TextInput
          type="text"
          name="username"
          bind:value={$form.username}
          color={$errors.username ? "error" : ""}
        />
        <span slot="bottom-label-text" class="text-error">
          {#if ($errors?.username)}
            {$errors?.username[0]}
          {/if}
        </span>
      </FormControl>
      <FormControl>
        <span slot="top-label-text">Password</span>
        <TextInput
                type="password"
                name="password"
                required
                bind:value={$form.password}
                color={$errors.password ? "error" : ""}
        />
        <span slot="bottom-label-text" class="text-error">
          {#if ($errors.password)}
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
