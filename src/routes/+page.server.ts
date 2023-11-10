import { redirect } from "@sveltejs/kit";
import type {PageServerLoadEvent} from "../../.svelte-kit/types/src/routes/$types";

export async function load(event: PageServerLoadEvent) {
  if (!event.locals.user)
    throw redirect(307, `/login?redirectTo=${event.url.pathname}`);
  throw redirect(307, "/dashboard");
}