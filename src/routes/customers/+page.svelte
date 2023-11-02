<script lang="ts">
    import Icon from '@iconify/svelte';
    import {page} from "$app/stores";
    import {goto} from "$app/navigation";
    import CitySelect from "$lib/ui/components/CityAutoComplete.svelte";
    import Pagination from "$lib/ui/components/Paginator.svelte";

    export let data;

    let nameSearchParam: string;
    let citySearchParam: string;
    let citySearchValue: string;

    const applySearchFilters = (event?: CustomEvent) => {
        let query = new URLSearchParams($page.url.searchParams.toString());

        if (nameSearchParam)
            query.set('name', nameSearchParam)
        if (citySearchParam)
            query.set('city', citySearchParam)

        if (event?.detail) {
            query.set('page', event.detail.pageIndex);
            query.set('size', event.detail.pageSize);
        }

        goto(`?${query.toString()}`);
    }

    const resetSearchFilters = () => {
        let query = new URLSearchParams($page.url.searchParams.toString());

        nameSearchParam = '';
        citySearchParam = '';
        citySearchValue = '';

        query.delete('name');
        query.delete('city');
        goto(`?${query.toString()}`);
    }

</script>

<svelte:head>
    <title>Nana - Customers</title>
</svelte:head>

<div class="px-4">
    <div class="py-4 mb-4 border-b border-b-neutral-800 border-1">
        <h1 class="text-2xl">Customers</h1>
    </div>
    <div class="mb-2 py-4 px-2 bg-neutral-content shadow shadow-black flex justify-between">
        <div class="join w-1/2 flex">
            <form on:submit|preventDefault={() => applySearchFilters()}>
                <input placeholder="Search name or handle"
                       class="input input-bordered join-item flex-1"
                       type="text"
                       bind:value={nameSearchParam}
                >
            </form>
            <CitySelect placeholderText="Filter City"
                        styleClass="join-item"
                        bind:selectedValue={citySearchParam}
                        bind:searchValue={citySearchValue}
                        on:selectionchange={() => applySearchFilters()}
            />
            <button class="btn join-item" on:click={() => applySearchFilters()}>
                <Icon class="text-lg" icon="mdi:search"/>
                Search
            </button>
            <button class="btn join-item" on:click={() => resetSearchFilters()}>
                <Icon class="text-lg" icon="mdi:backspace-outline"/>
                Clear
            </button>
        </div>
        <Pagination
                pageIndex={data.currentPage.number}
                totalPages={data.currentPage.totalPages}
                pageSize={2}
                pageSizeOptions={[10,25,50]}
                showFirstLastButtons={true}
                on:pagechange={(event) => applySearchFilters(event)}
        />
    </div>
    <div class="flex flex-col justify-center">
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
                        <button class="btn btn-secondary btn-circle">
                            <Icon class="text-xl" icon="mdi:pencil"/>
                        </button>
                        <button class="btn btn-error btn-circle">
                            <Icon class="text-xl" icon="mdi:delete"/>
                        </button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>

    </div>
</div>
