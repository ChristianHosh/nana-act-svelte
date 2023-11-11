<script lang="ts">
    import type {Pageable} from "$lib/core/models/pageable.model";
    import {createEventDispatcher, onMount} from "svelte";
    import {HttpClient} from "$lib/core/api/axiosInstance";
    import {page} from "$app/stores";
    import type {Customer} from "$lib/core/models/customer.model";
    import Autocomplete from "$lib/dui/data-input/Autocomplete.svelte";
    import TextInput from "$lib/dui/data-input/TextInput.svelte";
    import Button from "$lib/dui/action/Button.svelte";

    export let value: number = 0;
    export let name: string = "";
    export let autocompleteSearchValue: string = "";
    export let inputStyleClass: string = "";

    let loading: boolean = false;
    let pageable: Pageable<Customer>;
    let customers: Customer[] = [];
    let searchTimeout: number;

    let dispatch = createEventDispatcher();

    onMount(async () => {
        await getCustomers();
    })

    async function getCustomers() {
        loading = true;
        let param = {
            name: autocompleteSearchValue ? autocompleteSearchValue : null,
        };
        let customerResponse = await HttpClient.get<Pageable<Customer>>(
            "/customers",
            $page.data.user,
            param
        );
        loading = false;
        pageable = customerResponse.data;
        customers = pageable.content;
    }

    async function filter() {
        clearTimeout(searchTimeout);

        if (autocompleteSearchValue.length === 0) {
            await getCustomers();
            return;
        }
        if (autocompleteSearchValue.length < 3) return;

        searchTimeout = setTimeout(async () => {
            await getCustomers();
        }, 500);
    }

    async function selectCustomer(customer: Customer) {
        autocompleteSearchValue = `${customer.fullName} (${customer.city.name})`;
        value = customer.id;
        dispatch('valuechange', {value})
    }

    let _inputStyle = inputStyleClass;
</script>

<input type="hidden" name={name} hidden bind:value={value}>
<Autocomplete class={$$props.class}>
    <TextInput
            class={_inputStyle}
            slot="autocomplete-input"
            bind:value={autocompleteSearchValue}
            on:keyup={filter}
    />
    {#if loading}
        <Button
                class="justify-start"
                size="sm"
                color="ghost"
                loadingIcon="spinner"
                type="button"
                {loading}
        >
            Loading...
        </Button>
    {:else}
        {#each customers as customer}
            <Button
                    type="button"
                    class="justify-start"
                    size="sm"
                    color="ghost"
                    on:click={() => {
          selectCustomer(customer);
        }}
            >
                {customer.fullName} ({customer.city.name})
            </Button>
        {:else}
            <Button
                    type="button"
                    class="justify-start"
                    color="ghost"
                    size="sm"
                    disabled
            >
                Your search did not match any cities.
            </Button>
        {/each}
    {/if}
</Autocomplete>