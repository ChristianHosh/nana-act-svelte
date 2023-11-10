<script lang="ts">
  import type { PositionString } from "$lib/dui/styleConsts";

  export let position: PositionString = "bottom";
  export let open: boolean = false;
  export let hover: boolean = false;
  export let end: boolean = false;
</script>

<div
        class={$$props.class}
        class:dropdown={true}
        class:dropdown-top={position === "top"}
        class:dropdown-bottom={position === "bottom"}
        class:dropdown-left={position === "left"}
        class:dropdown-right={position === "right"}
        class:dropdown-end={end}
        class:dropdown-hover={hover}
        class:dropdown-open={open}
>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <slot name="autocomplete-input" />
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
    <slot />
  </ul>

</div>
