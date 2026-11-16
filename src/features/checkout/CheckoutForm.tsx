"use client";

import { Button } from "@/components";
import { useCartStore } from "@/store/cart-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { placeOrder } from "./actions";
import { CheckoutValues, checkoutSchema } from "./schema";

const FIELDS = [
  { name: "name", label: "Full name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  {
    name: "address",
    label: "Address",
    type: "text",
    autoComplete: "street-address",
  },
  { name: "city", label: "City", type: "text", autoComplete: "address-level2" },
] as const;

const CheckoutForm = () => {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const completeOrder = useCartStore((state) => state.completeOrder);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({ resolver: zodResolver(checkoutSchema) });

  const onSubmit = async (customer: CheckoutValues) => {
    setServerError(null);

    const result = await placeOrder({
      customer,
      items: cart.map(({ id, quantity }) => ({ id, quantity })),
    });

    if (!result.ok) {
      setServerError(result.error);
      return;
    }

    completeOrder(result.order);
    router.push("/checkout/success");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full md:max-w-sm flex flex-col gap-4"
    >
      {FIELDS.map(({ name, label, type, autoComplete }) => (
        <div key={name} className="flex flex-col gap-1">
          <label htmlFor={name} className="text-xs">
            {label}
          </label>
          <input
            id={name}
            type={type}
            autoComplete={autoComplete}
            aria-invalid={errors[name] ? true : undefined}
            aria-describedby={errors[name] ? `${name}-error` : undefined}
            className="appearance-none outline-none w-full pb-1 border-b border-accent text-sm aria-invalid:border-red-500"
            {...register(name)}
          />
          {errors[name] && (
            <p
              id={`${name}-error`}
              role="alert"
              className="text-xs text-red-500"
            >
              {errors[name].message}
            </p>
          )}
        </div>
      ))}

      {serverError && (
        <p role="alert" className="text-xs text-red-500">
          {serverError}
        </p>
      )}

      <p className="text-xs">
        Demo checkout: no payment is processed and nothing is saved.
      </p>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-accent w-full h-8 md:w-32"
      >
        Place order
      </Button>
    </form>
  );
};

export default CheckoutForm;
