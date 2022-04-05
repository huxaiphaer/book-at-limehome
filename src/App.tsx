import React, { useState, useEffect } from "react";
import BookingForm from "./Components/BookingForm";
import { IBookingInfo } from "./Helper/interfaces/booking";
import { useFormik } from "formik";
import bookingValidator from "./Helper/validations/booking";
import axios from "axios";
import { API, END_POINTS } from "./Helper/constants/urls";
import SectionMessage, { SectionMessageAction } from '@atlaskit/section-message';
import moment from "moment";

const initialFormData: IBookingInfo = {
  date: moment().format("YYYY-MM-DD") + "," + moment().format("YYYY-MM-DD"),
  numberOfGuests: "",
  personalDetails: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  },
  location: {
    billingAddress: "",
    billingCountry: "x",
    postalCode: "",
    city: "",
  },
};

const App = () => {
  const [countries, setCountries] = useState<
    Array<{ country: string; code: string }>
  >([]);
  const [message, setMessage] = useState<string>("")
  const [messageType, setMessageType] = useState<string>("")
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const handleSubmit = (values: IBookingInfo) => {
    const {billingAddress, billingCountry, postalCode, city }  = values.location
    const {firstName, lastName, email, phoneNumber} = values.personalDetails
    const postData = {
      billing_address: billingAddress,
      billing_country: billingCountry,
      check_in: values.date.split(",")[0],
      check_out: values.date.split(",")[1],
      city, email,
      first_name: firstName,
      last_name: lastName,
      number_of_guests: values.numberOfGuests,
      phone_number: phoneNumber,
      postal_code: postalCode
    }
    axios.post(API + END_POINTS.POST_BOOKING, postData).then((res) => {
      setShowNotification(true)
      setMessageType("success")
      setMessage("Booking was successful")
    }).catch((error: any)  => {
      setShowNotification(true)
      setMessageType("error")
      if(error.response.status === 400) setMessage(error.response.data.email[0])
      else setMessage("Something went wrong")
    });;
  };



  const formik = useFormik<IBookingInfo>({
    initialValues: initialFormData,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema: bookingValidator,
  });

  useEffect(() => {
    axios.get(API + END_POINTS.GET_COUNTRIES).then((res: any) => {
      setCountries(res.data);
    })
  }, []);
  return (
      <>
        {
          showNotification &&
            <SectionMessage
                appearance={messageType}
                actions={[
                  <SectionMessageAction
                      onClick={() => setShowNotification(false)}
                  >
                    Dismiss
                  </SectionMessageAction>,
                ]}
            >
              <p>{message}</p>
            </SectionMessage>
        }
        <BookingForm
            formik={formik}
            countries={countries.map((country) => ({
              name: country.country,
              code: country.code,
            }))}
            onSubmit={handleSubmit}
        />
      </>
  );
};

export default App;
