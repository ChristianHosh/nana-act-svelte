import type {PageServerLoadEvent} from "../../../../.svelte-kit/types/src/routes/$types";

export async function load(event: PageServerLoadEvent) {
    console.log(event);

}