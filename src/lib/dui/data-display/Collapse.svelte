<script lang="ts">
  import type { ColorString } from "$lib/dui/styleConsts";

  export let color: ColorString | string = "";
  export let focusColor: ColorString = "";
  export let arrow: boolean = false;
  export let plus: boolean = false;
  export let open: boolean = false;
  export let close: boolean = false;
  export let closeable: boolean = false;

  let classes = `bg-${color} text-${color}-content group-focus:bg-${focusColor} group-focus:text-${focusColor}-content`;
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  tabindex="0"
  class={$$props.class}
  class:collapse={true}
  class:collapse-arrow={arrow}
  class:collapse-plus={plus}
  class:collapse-open={open}
  class:collapse-close={close}
>
  {#if closeable}
    <input type="checkbox" />
  {/if}
  <div class="collapse-title text-xl font-medium {classes}">
    <slot name="title" />
  </div>
  <div class="collapse-content {classes}">
    <slot />
  </div>
</div>
