import * as Yup from "yup";
import { errorMessages } from "./messages";
const bookingValidator = Yup.object()
  .strict(true)
  .shape({
    date: Yup.string().required(errorMessages.required("Check in/out dates")),
    numberOfGuests: Yup.number()
      .positive()
      .nullable()
      .required(errorMessages.required("Number Of Guests"))
      .moreThan(0, errorMessages.greaterThan("Number Of Guests", 0)),
    personalDetails: Yup.object()
      .strict(true)
      .required(errorMessages.required("Personal Details"))
      .shape({
        firstName: Yup.string()
          .required(errorMessages.required("First Name"))
          .min(4, errorMessages.minLengthString("First Name", 4)),
        lastName: Yup.string()
          .required(errorMessages.required("Last Name"))
          .min(4, errorMessages.minLengthString("Last Name", 4)),
        phoneNumber: Yup.string()
          .required(errorMessages.required("Phone Number"))
          .matches(
            /^([\d()\-+]){10,15}$/,
            errorMessages.validType("Phone Number")
          )
          .min(10, errorMessages.minLengthString("Phone Number", 10))
          .max(13, errorMessages.maxLengthString("Phone Number", 13)),
        email: Yup.string()
          .required(errorMessages.required("Email"))
          .matches(
            /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
            errorMessages.validType("Email")
          ),
      }),
    location: Yup.object().shape({
      billingAddress: Yup.string().required(
        errorMessages.required("Billing Address")
      ),
      billingCountry: Yup.string().required(
        errorMessages.required("Billing Country")
      ).min(2, errorMessages.required("Billing Country")),
      postalCode: Yup.string().required(errorMessages.required("Postal Code")),
      city: Yup.string().required(errorMessages.required("City")),
    }),
  });

export default bookingValidator;
