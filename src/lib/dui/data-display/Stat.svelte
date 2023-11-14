<script lang="ts">
  import type { ColorString } from "$lib/dui/styleConsts";
  import Icon from "@iconify/svelte";

  export let color: ColorString | string = "";
  export let icon: string | undefined = undefined;

  let _colorClass = `text-${color}`;

  console.log(_colorClass)
</script>

<div class={$$props.class} class:stat={true}>
  {#if $$slots.image}
    <div class="stat-figure text-secondary">
      <slot name="image" />
    </div>
  {/if}
  {#if icon}
    <div class="stat-figure">
      <Icon class="text-5xl {_colorClass}" {icon} />
    </div>
  {/if}
  <div class="stat-title">
    <slot name="title" />
  </div>
  <div
    class="stat-value {_colorClass}">
    <slot name="value" />
  </div>
  <div class="stat-desc">
    <slot name="description" />
  </div>
  <div class="stat-actions">
    <slot name="actions" />
  </div>
</div>
