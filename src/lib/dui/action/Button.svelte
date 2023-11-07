<script lang="ts">
  import type {
    ColorString,
    LoadingString,
    SizeString,
  } from "$lib/dui/styleConsts";
  import Icon from "@iconify/svelte";

  export let linkTo: string | undefined = undefined;
  export let color: ColorString = "";
  export let size: SizeString = "";
  export let outline: boolean = false;
  export let circle: boolean = false;
  export let wide: boolean = false;
  export let glass: boolean = false;
  export let block: boolean = false;
  export let active: boolean = false;
  export let icon: string | undefined = undefined;
  export let loadingIcon: LoadingString | undefined = undefined;
  export let loading: boolean = false;
</script>

{#if linkTo}
  <a
    href={linkTo}
    class={$$props.class}
    class:btn={true}
    class:btn-sm={size === "sm"}
    class:btn-xs={size === "xs"}
    class:btn-lg={size === "lg"}
    class:btn-neutral={color === "neutral"}
    class:btn-primary={color === "primary"}
    class:btn-secondary={color === "secondary"}
    class:btn-accent={color === "accent"}
    class:btn-ghost={color === "ghost"}
    class:btn-info={color === "info"}
    class:btn-success={color === "success"}
    class:btn-warning={color === "warning"}
    class:btn-error={color === "error"}
    class:btn-outline={outline}
    class:btn-circle={circle}
    class:btn-active={active}
    class:btn-block={block}
    class:btn-wide={wide}
    class:glass
    on:click
    {...$$restProps}
  >
    {#if icon}
      <Icon class="text-lg" {icon} />
    {/if}
    <slot />
  </a>
{:else}
  <button
    class={$$props.class}
    class:btn={true}
    class:btn-sm={size === "sm"}
    class:btn-xs={size === "xs"}
    class:btn-lg={size === "lg"}
    class:btn-neutral={color === "neutral"}
    class:btn-primary={color === "primary"}
    class:btn-secondary={color === "secondary"}
    class:btn-accent={color === "accent"}
    class:btn-ghost={color === "ghost"}
    class:btn-info={color === "info"}
    class:btn-success={color === "success"}
    class:btn-warning={color === "warning"}
    class:btn-error={color === "error"}
    class:btn-outline={outline}
    class:btn-circle={circle}
    class:btn-active={active}
    class:btn-block={block}
    class:btn-wide={wide}
    class:glass
    disabled={loading}
    on:click
    {...$$restProps}
  >
    {#if icon && (!loading || !loadingIcon)}
      <Icon class="text-lg" {icon} />
    {:else if loading && loadingIcon}
      <span
        class="loading"
        class:loading-spinner={loadingIcon === "spinner"}
        class:loading-dots={loadingIcon === "dots"}
        class:loading-ring={loadingIcon === "ring"}
        class:loading-ball={loadingIcon === "ball"}
        class:loading-bars={loadingIcon === "bars"}
        class:loading-infinity={loadingIcon === "infinity"}
      />
    {/if}
    <span>
      <slot />
    </span>
  </button>
{/if}
