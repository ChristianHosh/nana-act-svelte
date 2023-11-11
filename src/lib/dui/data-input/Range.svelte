<script lang="ts">
  import type { ColorString, SizeString } from "$lib/dui/styleConsts";

  export let max: number = 100;
  export let min: number = 0;
  export let step: number = 0;
  export let steps: boolean = false;

  export let color: ColorString = "";
  export let size: SizeString = "md";
  export let value: any;
</script>

<input
  type="range"
  class="range {$$props.class ? $$props.class : ''}"
  class:range-xs={size === "xs"}
  class:range-sm={size === "sm"}
  class:range-md={size === "md"}
  class:range-lg={size === "lg"}
  class:range-primary={color === "primary"}
  class:range-secondary={color === "secondary"}
  class:range-accent={color === "accent"}
  class:range-info={color === "info"}
  class:range-success={color === "success"}
  class:range-warning={color === "warning"}
  class:range-error={color === "error"}
  {min}
  {max}
  {step}
  {...$$restProps}
  bind:value
  on:input
/>
{#if steps}
  <div class="w-full flex justify-between text-xs px-2">
    <slot>
      {#each { length: (min + max) / step + 1 } as _measure}
        <span>|</span>
      {/each}
    </slot>

  </div>
{/if}
