import type { City } from "$lib/core/models/city.model";
import {z} from "zod";

export interface Customer {
  creationTimestamp: number;
  updateTimestamp: number;
  id: number;
  fullName: string;
  address: string;
  phoneNumber: string;
  handle: string;
  city: City;
}

export const CustomerSchema = z.object({
  fullName: z.string({required_error: "name is required"})
      .max(50, "name must be less than 50 characters long"),
  address: z.string({required_error: "address is required"})
      .max(100, "address must be less than 100 characters long"),
  phoneNumber: z.string({required_error: "phone number is required"})
      .min(10,"phone number must be exactly 10 characters long")
      .max(10,"phone number must be exactly 10 characters long")
      .regex(new RegExp("^[0-9]*$"), "phone number must only contain digits"),
  handle: z.string({required_error: "handle is required"})
      .max(100, "handle must be less than 100 characters long"),
  cityId: z.number({required_error: "city is required"})
})