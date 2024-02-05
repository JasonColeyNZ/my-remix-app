import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useMemo, useState } from "react";

interface LocationAutoCompleteProps {
  rootUrl?: string;
}

type LocationType = {
  value: string;
  text: string;
};

const LocationAutoComplete = ({ rootUrl }: LocationAutoCompleteProps) => {
  //console.log("Render: LocationAutoComplete");
  // const navigate = useNavigate();
  const { lookupLocations, selectedLocationId } = useLoaderData<{
    lookupLocations: LocationType[];
    selectedLocationId: string;
  }>();
  const [defaultValue, setDefaultValue] = useState<LocationType>(
    (lookupLocations &&
      lookupLocations.filter(
        (option) => option.value + "" === selectedLocationId + "",
      )[0]) ||
      null,
  );

  //console.log("lookupLocations", lookupLocations);

  const [, setSearchParams] = useSearchParams();

  const showLocations = useMemo(() => {
    if (!lookupLocations) return false;
    return lookupLocations.length > 1;
  }, [lookupLocations]);

  // const defaultControlValue = useMemo(() => {
  //   return (
  //     lookupLocations.filter(
  //       (option) => option.value + "" === selectedLocationId + "",
  //     )[0] || null
  //   );
  // }, [lookupLocations, selectedLocationId]);

  return (
    // <Form ref={formRef} id="location-select" method="post">
    //   <input name="intent" value="location-select" type="hidden" />
    //   <input ref={hiddenId} id="locationId" name="locationId" type="hidden" />
    <>
      {showLocations && (
        <></>
        // <Autocomplete
        //   size={"small"}
        //   sx={[
        //     {
        //       margin: "2px",
        //       marginTop: "2px !important",
        //       width: "200px",

        //       "& .MuiAutocomplete-inputRoot": {
        //         pt: "2px !important",
        //         pb: "1px !important",
        //       },
        //     },
        //   ]}
        //   getOptionLabel={(option) => {
        //     if (!option) {
        //       return "";
        //     }
        //     return option.text;
        //   }}
        //   autoHighlight={true}
        //   autoComplete={true}
        //   multiple={false}
        //   blurOnSelect={true}
        //   disableCloseOnSelect={false}
        //   disableClearable={true}
        //   value={defaultValue}
        //   isOptionEqualToValue={(option, value) => {
        //     //console.log("isOptionEqualToValue", option, value);
        //     return option.value === value.value;
        //   }}
        //   onChange={(event, option) => {
        //     //console.log("onChange", option);
        //     setDefaultValue(option);
        //     setSearchParams((prev) => {
        //       prev.set("locationId", option?.value);
        //       prev.delete("to");
        //       return prev;
        //     });

        //     // const params = new URLSearchParams();
        //     // params.set("locationId", option?.value);
        //     // setSearchParams(params);
        //     // changeLocation(option?.value);
        //   }}
        //   renderInput={(params) => (
        //     <TextField
        //       {...params}
        //       variant={"outlined"}
        //       label={"Location"}
        //       required={false}
        //       InputLabelProps={{
        //         shrink: true,
        //       }}
        //     />
        //   )}
        //   options={lookupLocations}
        // />
      )}
    </>
  );
};
export default LocationAutoComplete;
