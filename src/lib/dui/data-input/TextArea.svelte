<script lang="ts">
    import type {ColorString, SizeString} from "$lib/dui/styleConsts";

    export let color: ColorString = "";
    export let size: SizeString = "md";
    export let bordered: boolean = true;
    export let value: any;
</script>

<textarea class={$$props.class}
          class:textarea={true}
          class:textarea-bordered={bordered}
          class:textarea-primary={color === "primary"}
          class:textarea-secondary={color === "secondary"}
          class:textarea-accent={color === "accent"}
          class:textarea-ghost={color === "ghost"}
          class:textarea-info={color === "info"}
          class:textarea-success={color === "success"}
          class:textarea-warning={color === "warning"}
          class:textarea-error={color === "error"}
          class:textarea-xs={size === "xs"}
          class:textarea-sm={size === "sm"}
          class:textarea-md={size === "md"}
          class:textarea-lg={size === "lg"}
          bind:value={value}
          on:focus
          on:input
          on:keyup
          on:keydown
          on:keypress
          {...$$restProps}
></textarea>