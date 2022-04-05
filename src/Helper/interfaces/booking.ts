export interface IBookingInfo {
  date: string;
  numberOfGuests: number | string;
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  location: {
    billingAddress: string;
    billingCountry: string;
    postalCode: string;
    city: string;
  };
}
