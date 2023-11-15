<script lang="ts">
    import OrderEditor from "$lib/editors/OrderEditor.svelte";

    export let data;
</script>

<OrderEditor {data} order={data.order} />