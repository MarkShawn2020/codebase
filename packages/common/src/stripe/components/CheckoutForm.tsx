"use client";

import { CURRENCY, MAX_AMOUNT, MIN_AMOUNT } from "../config";
import { AMOUNT_STEP } from "../config";
import { formatAmountForDisplay } from "../utils";
import CustomDonationInput from "./CustomDonationInput";
import { createCheckoutSession } from "../stripe.actions";
import React, { useState } from "react";

export default function CheckoutForm(): JSX.Element {
  const [loading] = useState<boolean>(false);
  const [input, setInput] = useState<{
    customDonation: number;
  }>({
    customDonation: Math.round(MAX_AMOUNT / AMOUNT_STEP),
  });

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ): void =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  return (
    <form action={createCheckoutSession}>
      <CustomDonationInput
        className="checkout-style"
        name="customDonation"
        min={MIN_AMOUNT}
        max={MAX_AMOUNT}
        step={AMOUNT_STEP}
        currency={CURRENCY}
        onChange={handleInputChange}
        value={input.customDonation}
      />
      {/* <StripeTestCards /> */}
      <button
        className="checkout-style-background"
        type="submit"
        disabled={loading}
      >
        Donate {formatAmountForDisplay(input.customDonation, CURRENCY)}
      </button>
    </form>
  );
}
