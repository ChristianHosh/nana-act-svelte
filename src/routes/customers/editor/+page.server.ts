import { CustomerSchema } from "$lib/core/models/customer.model";
import { fail, redirect } from "@sveltejs/kit";
import { AxiosError } from "axios";
import { HttpClient } from "$lib/core/api/axiosInstance";
import type { Customer } from "$lib/core/models/customer.model";
import type { AxiosResponse } from "axios";

// @ts-ignore
export const actions = {
  default: async (event: any) => {
    const formData = Object.fromEntries(await event.request.formData());

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
      customerResponse = await HttpClient.post<Customer>(
        "/customers",
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
