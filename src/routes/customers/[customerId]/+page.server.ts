import {fail, redirect} from "@sveltejs/kit";
import {HttpClient} from "$lib/core/api/axiosInstance";
import type {CustomerProfile} from "$lib/core/models/customerProfile.model";

// @ts-ignore

export async function load(event) {
    if (!event.locals.user)
        throw redirect(307, `/login?redirectTo=${event.url.pathname}`);

    let customerId = event.url.pathname.split('/')[2];

    let customerProfileResponse = await HttpClient.get<CustomerProfile>(`/customers/${customerId}`, event.locals.user);

    if (customerProfileResponse.status === 200) {
        return {
            customerProfile: customerProfileResponse.data,
        }
    }

    throw fail(customerProfileResponse.status);
}