import {fail, redirect} from "@sveltejs/kit";
import {HttpClient} from "$lib/core/api/axiosInstance";
import type {CustomerProfile} from "$lib/core/models/customerProfile.model";
import {AxiosError} from "axios";

// @ts-ignore

export async function load(event) {
    if (!event.locals.user)
        throw redirect(307, `/login?redirectTo=${event.url.pathname}`);

    let customerId = event.url.pathname.split('/')[2];

    try {
        let customerProfileResponse = await HttpClient.get<CustomerProfile>(`/customers/${customerId}`, event.locals.user);

        return {
            customerProfile: customerProfileResponse.data,
        }
    } catch (e) {
        if (e instanceof AxiosError) {
            throw fail(e.response?.status || 400)
        }
        throw fail(500)
    }

}