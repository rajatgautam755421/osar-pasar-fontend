import KhaltiCheckout from "khalti-checkout-web";
import React, { useEffect } from "react";
import { makeApiRequests } from "../../helpers/apiHelper";

const KhaltiIntegration = ({ totalPrice, paymentMethod }) => {
  let config = {
    publicKey: "test_public_key_dc74e0fd57cb46cd93832aee0a507256",
    productIdentity: "1234567890",
    productName: "Drogon",
    productUrl: "http://gameofthrones.com/buy/Dragons",
    eventHandler: {
      async onSuccess() {
        // hit merchant api for initiating verfication
        await makeApiRequests({
          endpoint: "/payment/verify",
          requestBody: {
            token: "test_public_key_f97a70bfce6249a295f4a9da938b3570",
            amount: totalPrice,
          },
        });
      },

      onError(error) {
        // handle errors
        console.log(error);
      },
    },
    // one can set the order of payment options and also the payment options based on the order and items in the array
    paymentPreference: [
      "MOBILE_BANKING",
      "KHALTI",
      "EBANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  let checkout = new KhaltiCheckout(config);

  useEffect(() => {
    if (paymentMethod === "Online Payment") {
      checkout.show({ amount: totalPrice * 100 });
    }
  }, [paymentMethod]);
  return <></>;
};

export default KhaltiIntegration;
