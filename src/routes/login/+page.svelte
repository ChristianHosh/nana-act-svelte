<script lang="ts">
    import {enhance} from "$app/forms";
    export let form;

    $: console.log(form);
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

<div class="flex justify-center mt-8">
    <div class="w-1/2 rounded bg-neutral-800">
        <div class="py-4 px-8 border-1 border-b border-b-neutral-700">
            <h2 class="text-3xl">Login</h2>
        </div>
        <form use:enhance method="post" class="flex flex-col gap-2 px-8 py-4">
            {#if (form?.errorMessage)}
                <div class="alert alert-error w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{form?.errorMessage}</span>
                </div>
            {/if}

            <div class="form-control w-full">
                <label for="username" class="label">
                    <span class="label-text">Username</span>
                </label>
                <input name="username" type="text" required
                       class="input {form?.errors?.username ? 'input-error' : 'input-bordered'} w-full"
                       value={form?.data?.username || ""}/>
                {#if (form?.errors?.username)}
                    <label for="username" class="label">
                        <span class="label-text-alt text-error">{form?.errors?.username[0]}</span>
                    </label>
                {/if}
            </div>
            <div class="form-control w-full">
                <label for="password" class="label">
                    <span class="label-text">Password</span>
                </label>
                <input name="password" type="password" required
                       class="input {form?.errors?.password ? 'input-error' : 'input-bordered'} w-full"/>
                {#if (form?.errors?.password)}
                    <label for="username" class="label">
                        <span class="label-text-alt text-error">{form?.errors?.password[0]}</span>
                    </label>
                {/if}
            </div>

            <button class="btn btn-primary w-full" type="submit">Login</button>
        </form>
    </div>
</div>