<script>
    import "./../app.css"
    import Header from "$lib/ui/layout/Header.svelte";
    import {navigating} from "$app/stores";
    import PageLoadingIndicator from "$lib/ui/components/PageLoadingIndicator.svelte";
</script>

{#if $navigating}
    <PageLoadingIndicator />
{/if}


<Header/>

<div class="px-4">
    <slot></slot>
</div>
