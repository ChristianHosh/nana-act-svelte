<script>
  import { navigating } from "$app/stores";
  import PageLoadingIndicator from "$lib/ui/components/PageLoadingIndicator.svelte";
  import Header from "$lib/ui/layout/Header.svelte";
</script>

{#if $navigating}
  <PageLoadingIndicator />
{/if}

<Header />

<div class="px-4">
  <slot />
</div>
