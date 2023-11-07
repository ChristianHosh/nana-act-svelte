<script lang="ts">
    import type {ColorString, SizeString} from "$lib/dui/styleConsts";

    export let color: ColorString = "";
    export let size: SizeString = "md";
    export let bordered: boolean = true;
    export let value: string = "";
</script>

<input class={$$props.class}
       class:input={true}
       class:input-bordered={bordered}
       class:input-primary={color === "primary"}
       class:input-secondary={color === "secondary"}
       class:input-accent={color === "accent"}
       class:input-ghost={color === "ghost"}
       class:input-info={color === "info"}
       class:input-success={color === "success"}
       class:input-warning={color === "warning"}
       class:input-error={color === "error"}
       class:input-xs={size === "xs"}
       class:input-sm={size === "sm"}
       class:input-md={size === "md"}
       class:input-lg={size === "lg"}
       bind:value={value}
       on:focus
       on:input
       {...$$restProps}>