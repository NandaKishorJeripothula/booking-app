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
  event_type_uuid: string;
  event_type_name: string;
  event_start_time: string;
  event_end_time: string;
  invitee_uuid: string;
  invitee_full_name: string;
  invitee_email: string;
  answer_1: string;
  utm_campaign: string;
  utm_source: string;
  utm_content: string;
}

export type RegistrationFormData = {
  name: string;
  email: string;
  mobile: string;
};
