<script lang="ts">
  import CityAutocomplete from "./CityAutocomplete.svelte";

  export let data;

  let value: any;
</script>

<div class="px-4">
    <p>value: {value}</p>
    <CityAutocomplete bind:value={value} class="w-full" inputStyleClass="w-full"/>
</div>
