import type {PageServerLoadEvent} from "../../../.svelte-kit/types/src/routes/test/$types";
import type {Actions, RequestEvent} from "@sveltejs/kit";

export async function load(event: PageServerLoadEvent) {
  console.log(event);

}

export const actions: Actions = {
  default: async (event: RequestEvent) => {
    console.log(event);

  },
};