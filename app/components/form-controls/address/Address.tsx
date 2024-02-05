import { useLoaderData } from "@remix-run/react";

import AddressLookup from "../../address-lookup/AddressLookup.tsx";
import TextInput from "../text-input/TextInput.tsx";
import CountryAutoComplete from "../country-autocomplete/CountryAutoComplete.tsx";
import { getFieldsetProps, useField, getInputProps } from "@conform-to/react";
import type { AddressType } from "~/models/address.server.ts";

type AddressComponentType = {
  fieldName: string;
};

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

const getAddressUsingType = (
  address: AddressComponent[],
  type: string,
  shortName: boolean = false,
) => {
  const addressComponent = address.find((a) => a.types.includes(type));
  return shortName
    ? addressComponent?.short_name || ""
    : addressComponent?.long_name || "";
};

const AddressComponent = ({ fieldName }: AddressComponentType) => {
  let { country: UserCountry } = useLoaderData<{ country: string }>();

  const [meta, form] = useField<AddressType>(fieldName);

  const { id, streetAddress, streetAddress2, city, state, zipCode, country } =
    meta.getFieldset();

  const addressLookupOnChange = (value: any) => {
    console.log("value: ", value);
    form.update({
      name: "address.streetAddress",
      value: `${getAddressUsingType(
        value,
        "street_number",
      )} ${getAddressUsingType(value, "route")}`,
    });
    form.update({ name: "streetAddress2", value: "" });
    form.update({
      name: "address.city",
      value: getAddressUsingType(value, "locality"),
    });
    form.update({
      name: "address.state",
      value: getAddressUsingType(value, "administrative_area_level_1"),
    });
    form.update({
      name: "address.zipCode",
      value: getAddressUsingType(value, "postal_code"),
    });
    form.update({
      name: "address.country",
      value: getAddressUsingType(value, "country", true),
    });
  };

  return (
    <>
      <fieldset
        className="flex flex-1 flex-col gap-2"
        {...getFieldsetProps(meta)}
      >
        <div className="flex flex-row gap-2">
          <div className="w-full sm:w-2/3">
            <AddressLookup
              country={UserCountry}
              onChange={addressLookupOnChange}
              labelProps={{ children: "Address Lookup" }}
              // inputProps={undefined}
            />
          </div>
          <div className="w-full sm:w-1/3">
            <img
              src="/images/google_on_white.png"
              style={{ padding: "10px", width: "auto", height: "auto" }}
              alt="Google"
            />
          </div>
        </div>
        <div className="w-full">
          <input {...getInputProps(id, { type: "hidden" })} />
          <TextInput
            labelProps={{ children: "Street Address" }}
            fieldName={streetAddress.name}
            // inputProps={{
            //   ...getInputProps(streetAddress, { type: "text" }),
            // }}
            // autoValue={addressValue?.toString()}
          />
        </div>
        <div className="w-full">
          <TextInput
            labelProps={{ children: "Street Address 2" }}
            fieldName={streetAddress2.name}
            // inputProps={{ ...getInputProps(streetAddress2, { type: "text" }) }}
            // autoValue={address2Value?.toString()}
          />
        </div>
        <div className="flex flex-row gap-2">
          <div className="w-full sm:w-2/3">
            <TextInput
              labelProps={{ children: "City" }}
              fieldName={city.name}

              // inputProps={{ ...getInputProps(city, { type: "text" }) }}
              // autoValue={cityValue?.toString()}
            />
          </div>
          <div className="w-full sm:w-1/3">
            <TextInput
              labelProps={{ children: "State" }}
              fieldName={state.name}
              // inputProps={{ ...getInputProps(state, { type: "text" }) }}
              // autoValue={stateValue?.toString()}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="w-full sm:w-2/3">
            <CountryAutoComplete
              labelProps={{ children: "Country" }}
              fieldName={country.name}
              // inputProps={{ ...getInputProps(country, { type: "text" }) }}
              // autoValue={countryValue?.toString()}
            />
          </div>
          <div className="w-full sm:w-1/3">
            <TextInput
              labelProps={{ children: "Zip Code" }}
              // inputProps={{ ...getInputProps(zipCode, { type: "text" }) }}
              fieldName={zipCode.name}
              // autoValue={zipCodeValue?.toString()}
            />
          </div>
        </div>
      </fieldset>
    </>
  );
};
export default AddressComponent;
