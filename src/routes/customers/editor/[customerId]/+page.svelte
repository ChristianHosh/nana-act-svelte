<script lang="ts">
  import CustomerEditor from "$lib/ui/editors/CustomerEditor.svelte";

  export let data;
  export let form;
</script>

<CustomerEditor customer={data.customer} errors={form.errors}/>
