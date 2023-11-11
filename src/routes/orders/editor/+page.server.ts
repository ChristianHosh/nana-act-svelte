import type {Actions, RequestEvent} from "@sveltejs/kit";
import {superValidate} from "sveltekit-superforms/server";
import {orderSchema} from "$lib/core/models/order.model";

export const actions: Actions = {
    default: async (event: RequestEvent) => {
        console.log('event')
        const form = await superValidate(event, orderSchema);

        console.log('form -> ', form.data);
    }
}