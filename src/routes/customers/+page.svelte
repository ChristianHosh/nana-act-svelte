<script lang="ts">
    import Icon from '@iconify/svelte';
    import {page} from "$app/stores";
    import {goto} from "$app/navigation";
    import CitySelect from "$lib/ui/components/CityAutoComplete.svelte";

    export let data;

    let nameSearchParam: string;
    let citySearchParam: string;

    const applySearchFilters = () => {
        let query = new URLSearchParams($page.url.searchParams.toString());

        if (nameSearchParam)
            query.set('name', nameSearchParam)
        if (citySearchParam)
            query.set('city', citySearchParam)

        goto(`?${query.toString()}`);
    }

    const resetSearchFilters = () => {
        let query = new URLSearchParams($page.url.searchParams.toString());

        query.delete('name');
        query.delete('city');
        goto(`?${query.toString()}`);
    }

</script>

<div class="px-4">
    <div class="py-4 mb-4 border-b border-b-neutral-800 border-1">
        <h1 class="text-2xl">Customers</h1>
    </div>
    <div class="mb-2">
        <div class="join w-1/2 flex">
            <input placeholder="Search name or handle"
                   class="input input-bordered join-item flex-1"
                   type="text"
                   bind:value={nameSearchParam}>
            <CitySelect placeholderText="Filter City" bind:selectedValue={citySearchParam}/>
            <button class="btn" on:click={applySearchFilters}>
                <Icon icon="mdi:search"/>
                Search
            </button>
            <button class="btn" on:click={resetSearchFilters}>
                <Icon icon="mdi:reset"/>
                Clear
            </button>
        </div>
    </div>
    <div class="flex justify-center">
        <table class="table table-zebra">
            <thead>
            <tr class="text-lg">
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
</div>
