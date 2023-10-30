import {redirect} from "@sveltejs/kit";
import type {PageServerLoadEvent} from "../../.svelte-kit/types/src/routes/$types";

// @ts-ignore
export async function load(event) {
    if (!event.locals.user)
        throw redirect(307, `/login?redirectTo=${event.url.pathname}`);
    throw redirect(307, '/dashboard')
}