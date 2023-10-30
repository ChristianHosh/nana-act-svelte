<script lang="ts">
    import {onMount} from "svelte";

    export let value: any;
    export let placeholder: string = '';
    export let label: string | undefined = undefined;
    export let hint: string | undefined = undefined;
    export let hide: boolean = false;

    onMount(() => {
        console.log(value, 'is-password => ', hide);
    })
</script>
<div class="form-control">
    {#if (label)}
        <label class="label" for="">
            <span class="label-text">{label}</span>
        </label>
    {/if}
    {#if (hide)}
        <input bind:value={value} type="password" placeholder="{placeholder}" class="input input-bordered w-full max-w-xs"/>
    {:else}
        <input bind:value={value} type="text" placeholder="{placeholder}" class="input input-bordered w-full max-w-xs"/>
    {/if}
    {#if (hint)}
        <label class="label" for="">
            <span class="label-text">{hint}</span>
        </label>
    {/if}
</div>