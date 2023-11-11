import type { Customer } from "$lib/core/models/customer.model";
import { z } from "zod";
import { Site, Status } from "$lib/core/consts";

export interface Order {
  creationTimestamp: number;
  updateTimestamp: number;
  id: number;
  cost: number;
  profit: number;
  commission: number;
  site: Site;
  status: Status;
  orderDate: number;
  shipDate: number;
  note: string;
  customer: Customer;
}

export const orderSchema = z.object({
  customerId: z
    .number({
      required_error: "customer is required",
      invalid_type_error: "customer is required",
    })
    .min(1, "customer is required"),
  site: z.nativeEnum(Site, {
    required_error: "site is required",
    invalid_type_error: "invalid site",
  }),
  cost: z
    .number({
      required_error: "cost is required",
      invalid_type_error: "cost is required",
    })
    .min(0, "cost must be more than 0"),
  profit: z
    .number({
      required_error: "profit is required",
      invalid_type_error: "profit is required",
    })
    .min(0, "profit must be more than 0"),
  profitPercentage: z
    .number({
      required_error: "profit percentage is required",
      invalid_type_error: "profit percentage is required",
    })
    .min(0, "profit percentage must be more than 0%")
    .max(1, "profit percentage must be less than 100%"),
  usePercentage: z.boolean({ required_error: "use percentage must be set" }),
  commission: z
    .number({
      required_error: "commission is required",
      invalid_type_error: "commission is required",
    })
    .min(0, "commission must be more than 0"),
  note: z
    .string({ required_error: "note is required" })
    .max(255, "note must be less than 255 characters"),
  orderDate: z.date({ required_error: "order date is required" }),
});

export type OrderSchema = typeof orderSchema;
