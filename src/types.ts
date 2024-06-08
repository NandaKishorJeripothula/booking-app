export type SuccessResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};
export type FailureResponse = {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id?: string;
      payment_id?: string;
    };
  };
};

export interface InviteData {
  slot: SlotConfiguration;
  details: RegistrationFormData;
}

export type RegistrationFormData = {
  name: string;
  email: string;
  mobile: string;
  privacyNotice: string;
};

export type SlotConfiguration = {
  mins: number;
  displayPrice: string;
  amoutInPaisa: number;
};

export type TViewData = {
  slots: {
    selectedSlot: SlotConfiguration;
  };
  form: {
    data: RegistrationFormData;
    payment: {
      error: FailureResponse;
      success: SuccessResponse;
    };
  };
  scheduler: {};
  event: {};
};
export type TView = keyof TViewData;
export type ValueOf<T> = T[keyof T];
