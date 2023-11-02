<script lang="ts">

    export let data;

    $: customerProfile = data.customerProfile;
    $: customer = customerProfile.customer;
</script>

<svelte:head>
    <title>Nana - {customer.fullName}</title>
</svelte:head>

<div class="px-4">
    <div class="py-4 mb-4">
        <h1 class="text-2xl">{customer.fullName}</h1>
    </div>
    <table class="info-table">
        <tbody>
        <tr>
            <td class="font-medium">Address:</td>
            <td>{customer.city.name}, {customer.address}</td>
        </tr>
        <tr>
            <td class="font-medium">Phone Number:</td>
            <td>{customer.phoneNumber}</td>
        </tr>
        <tr>
            <td class="font-medium">Handle:</td>
            <td>
                <a class="link" href="https://instagram.com/{customer.handle}/" target="_blank">
                    {customer.handle}
                </a>
            </td>
        </tr>
        </tbody>
    </table>

</div>

<style>
    .info-table > tbody > tr {
        padding-bottom: 0.25rem;
        border-bottom: 1px solid rgb(128, 128, 128);
    }

    .info-table > tbody > tr > td {
        padding-right: 1rem;
    }
</style>