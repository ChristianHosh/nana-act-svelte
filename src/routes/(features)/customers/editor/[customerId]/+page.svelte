<script lang="ts">
  import CustomerEditor from "$lib/editors/CustomerEditor.svelte";

  export let data;
</script>

<CustomerEditor {data} customer={data.customer} />
