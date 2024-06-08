import React from 'react';
import { useCalendlyEventListener, InlineWidget } from 'react-calendly';
import { getThemeColors } from './utils';

export default (props: {
  onScheduleSuccess: (data: any) => void;
  inputPayload: {
    paymentId: string;
    mobile: string;
    source: string;
    slot: string;
    email: string;
    name: string;
  };
  url: string;
}) => {
  useCalendlyEventListener({
    // onProfilePageViewed: () => console.log('onProfilePageViewed'),
    // onDateAndTimeSelected: (data) => console.log('onDateAndTimeSelected', data),
    // onEventTypeViewed: () => console.log('onEventTypeViewed'),
    onEventScheduled: (e) => {
      // console.log(e.data.payload);
      props.onScheduleSuccess(e.data.payload);
    },
    // onPageHeightResize: (e) => console.log(e.data.payload.height),
  });
  const { primaryColor, secondaryColor, tertiaryColor, textColor, whiteColor } =
    getThemeColors();

  return (
    <InlineWidget
      url={props.url}
      pageSettings={{
        hideGdprBanner: true,
        hideEventTypeDetails: true,
        hideLandingPageDetails: true,
        backgroundColor: textColor,
        primaryColor: primaryColor,
        textColor: primaryColor,
      }}
      prefill={{
        email: props.inputPayload.email,
        name: props.inputPayload.name,
        customAnswers: {
          a1: `Contact: ${props.inputPayload.mobile} (Do not delete this). Please explain anything that would be useful before the connect!`,
        },
        // date: new Date(Date.now() + 86400000),
      }}
      utm={{
        // utmCampaign: 'Spring Sale 2019',
        utmContent: `PaymentId|${props.inputPayload.paymentId}`,
        // utmMedium: 'Ad',
        utmSource: props.inputPayload.source,
        utmTerm: props.inputPayload.slot,
      }}
    />
  );
};
