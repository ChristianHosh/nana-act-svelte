<script lang="ts">
</script>

<div class={$$props.class} class:form-control={true}>
  {#if $$slots["top-label-text"]}
    <label for="" class="label">
      <span class="label-text">
        <slot name="top-label-text" />
      </span>
    </label>
  {/if}
  <slot />
  {#if $$slots["bottom-label-text"]}
    <label for="">
      <span class="label-text-alt">
        <slot name="bottom-label-text" />
      </span>
    </label>
  {/if}
</div>
