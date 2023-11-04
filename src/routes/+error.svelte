<script>
    import { page } from '$app/stores';
</script>

<svelte:head>
    <title>{$page.status}</title>
</svelte:head>

<div class="mt-8 flex justify-center text-2xl">
    {#if $page.status === 404}
        <h1 class="align-middle">Not found!</h1>
    {:else}
        <h1 class="align-middle">Something went wrong</h1>
    {/if}
</div>