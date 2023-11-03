<script lang="ts">
  import CustomerEditor from "$lib/ui/editors/CustomerEditor.svelte";

  export let form;
</script>

<CustomerEditor errors={form?.errors} headerError={form?.errorMessage}/>
