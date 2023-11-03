import {fail, redirect} from "@sveltejs/kit";
import {HttpClient} from "$lib/core/api/axiosInstance";
import {z} from "zod";
import type {JwtToken} from "$lib/core/models/jwtToken.model";
import type {RequestEvent} from "../../../.svelte-kit/types/src/routes/login/$types";
import {AxiosError} from "axios";

const loginRequestZ = z.object({
    username: z.string()
        .max(20, "username must be less than 20 characters long"),
    password: z.string()
        .max(20, "password must be between 8 and 20 characters long")
        .min(8, "password must be between 8 and 20 characters long")
})

/** @type {import('./$types').PageServerLoad} */
// @ts-ignore
export async function load(event) {
    if (event.locals.user) throw redirect(307, '/');
}

/** @type {import('./$types').Actions} */
export const actions = {
    // @ts-ignore
    default: async (event: RequestEvent) => {
        const redirectTo = event.url.searchParams.get('redirectTo');

        const formData = Object.fromEntries(await event.request.formData());

        let loginRequest = loginRequestZ.safeParse({
            username: formData.username,
            password: formData.password
        });

        if (!loginRequest.success) {
            const {fieldErrors: errors} = loginRequest.error.flatten();
            const {password, ...rest} = formData;
            return fail(400, {
                data: rest,
                errors,
                errorMessage: undefined,
            });
        }

        try {
            const loginResponse = await HttpClient.post<JwtToken>('auth/login',
                loginRequest.data
            );
            event.cookies.set('jwt-token', loginResponse.data.token, {path: '/'});
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.status === 401) {
                    return fail(401, {
                        data: {username: formData.username},
                        errors: {username: undefined, password: undefined},
                        errorMessage: e.response.data.message
                    })
                }
            }
            return fail(500);
        }

        if (redirectTo)
            throw redirect(307, `/${redirectTo.slice(1)}`);
        throw redirect(307, '/');

    }
}