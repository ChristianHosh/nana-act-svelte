<script lang="ts">
  import type { ColorString, SizeString } from "$lib/dui/styleConsts";

  export let color: ColorString = "";
  export let size: SizeString = "md";
  export let bordered: boolean = true;
  export let value: string = "";
  export let options: any[] = [];

  $: valueAsNumber = Number(value);
</script>

<select
  class={$$props.class}
  class:select={true}
  class:select-bordered={bordered}
  class:select-primary={color === "primary"}
  class:select-secondary={color === "secondary"}
  class:select-accent={color === "accent"}
  class:select-ghost={color === "ghost"}
  class:select-info={color === "info"}
  class:select-success={color === "success"}
  class:select-warning={color === "warning"}
  class:select-error={color === "error"}
  class:select-xs={size === "xs"}
  class:select-sm={size === "sm"}
  class:select-md={size === "md"}
  class:select-lg={size === "lg"}
  bind:value
  on:focus
  on:input
  on:keyup
  on:keydown
  on:keypress
  {...$$restProps}
>
  {#each options as option, index}
    {#if index === 0}
      <option disabled selected>{option}</option>
    {:else}
      <option value={index}>{option}</option>
    {/if}
  {:else}
    <slot />
  {/each}
</select>
