import {fail, redirect} from "@sveltejs/kit";
import {HttpClient} from "$lib/core/api/axiosInstance";
import {AxiosError} from "axios";
import type {Customer} from "$lib/core/models/customer.model";
import {CustomerSchema} from "$lib/core/models/customer.model";
import type {AxiosResponse} from "axios";

// @ts-ignore
export async function load(event) {
  const customerId = event.url.pathname.split("/")[3];

  try {
    let customerResponse = await HttpClient.get<Customer>(
        `/customers/${customerId}`,
        event.locals.user
    );

    return {
      customer: customerResponse.data,
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      throw fail(e.response?.status || 400);
    }
    throw fail(500);
  }
}

export const actions = {
  default: async (event: any) => {
    const formData = Object.fromEntries(await event.request.formData());

    const customerId = event.url.pathname.split("/")[3];

    let customerRequest = CustomerSchema.safeParse({
      fullName: formData.fullName,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      handle: formData.handle,
      cityId: Number(formData.cityId),
    });

    if (!customerRequest.success) {
      const { fieldErrors: errors } = customerRequest.error.flatten();
      return fail(400, {
        data: formData,
        errors,
        errorMessage: undefined,
      });
    }

    let customerResponse: AxiosResponse<Customer> | undefined;
    try {
      customerResponse = await HttpClient.put<Customer>(
          `/customers/${customerId}`,
          customerRequest.data,
          event.locals.user
      );
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log('error => ', e.response?.data)
        return fail(e.response?.status || 400, {
          data: formData,
          errors: undefined,
          errorMessage: e.response?.data.message,
        });
      }
      return fail(500)
    }

    if (customerResponse)
      throw redirect(307, `/customers/${customerResponse.data.id}`);
  },
};
