<script lang="ts">
    import Icon from '@iconify/svelte';

    export let data;
</script>

<div class="py-4 mb-4 border-b border-b-neutral-800 border-1">
    <h1 class="text-3xl">Customers</h1>
</div>
<div class="flex justify-center">
    <table class="table table-zebra">
        <thead>
        <tr>
            <th></th>
            <th>Full Name</th>
            <th>Handle</th>
            <th>City</th>
            <th>Address</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {#each data.currentPage.content as customer}
            <tr>
                <td>
                    <span>{customer.id}</span>
                </td>
                <td>
                    <span>{customer.fullName}</span>
                </td>
                <td>
                    <span>{customer.handle}</span>
                </td>
                <td>
                    <span>{customer.city.name}</span>
                </td>
                <td>
                    <span>{customer.address}</span>
                </td>
                <td>
                    <button class="btn btn-secondary">
                        <Icon class="text-xl" icon="mdi:pencil"/>
                    </button>
                    <button class="btn btn-error">
                        <Icon class="text-xl" icon="mdi:delete"/>
                    </button>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>

</div>
