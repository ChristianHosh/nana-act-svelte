<script>
  import { navigating } from "$app/stores";
  import PageLoadingIndicator from "$lib/ui/components/PageLoadingIndicator.svelte";
  import Header from "$lib/ui/layout/Header.svelte";

  import "../app.css";
</script>

{#if $navigating}
  <PageLoadingIndicator />
{/if}

<Header />

<div class="px-4 mt-2">
  <slot />
</div>
