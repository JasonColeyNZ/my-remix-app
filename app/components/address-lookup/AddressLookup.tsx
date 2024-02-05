import { Loader } from "@googlemaps/js-api-loader";
import { Combobox, Transition } from "@headlessui/react";
import parse from "autosuggest-highlight/parse/index.js";
import type { ChangeEvent } from "react";
import { Fragment, useEffect, useId, useMemo, useRef, useState } from "react";
import { MdLocationOn } from "react-icons/md/index.js";
import { debounce } from "~/utils/misc.tsx";
import { cn } from "~/utils/shadcn.utils.ts";

import type { ListOfErrors } from "../form-controls/ErrorList.tsx";
import ErrorList from "../form-controls/ErrorList.tsx";

const autocompleteService = { current: null };
const detailsService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  place_id: string;
  description: string;
  structured_formatting: StructuredFormatting;
}

function instanceOfPlaceType(object: any): object is PlaceType {
  return "place_id" in object && "description" in object;
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface PlaceDetails {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: any;
  name: string;
  formatted_phone_number: string;
}

interface AddressLookupProps {
  country: string;
  onChange: any;
  errors?: ListOfErrors;
  descriptionProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  // inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}

const AddressLookup = ({
  country,
  onChange,
  errors,
  descriptionProps,
  labelProps, // inputProps,
}: AddressLookupProps) => {
  const [value, setValue] = useState<PlaceType | "">("");
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly PlaceType[]>([]);
  const loaded = useRef(false);
  const divRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const errorId = errors?.length ? `${id}-error` : undefined;

  useEffect(() => {
    // console.log("useEffect: loaded", loaded.current);
    if (typeof window !== "undefined" && !loaded.current) {
      const loader = new Loader({
        // @ts-ignore
        apiKey: window.ENV.GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["places"],
      });
      loader.load().then(async () => {});
    }
  }, []);

  const fetchPlacePredictions = useMemo(
    () =>
      debounce(
        (
          request: {
            input: string;
            componentRestrictions: { country: string };
          },
          callback: (results?: readonly PlaceType[]) => void,
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback,
          );
        },
        400,
      ),
    [],
  );

  const fetchPlaceDetails = useMemo(
    () =>
      debounce(
        (
          request: {
            placeId: string;
            fields: string[];
          },
          callback: (results?: PlaceDetails) => void,
        ) => {
          (detailsService.current as any).getDetails(request, callback);
        },
        400,
      ),
    [],
  );

  useEffect(() => {
    // console.log("useEffect: value", value);
    let active = true;

    if (
      !detailsService.current &&
      (window as any).google &&
      (window as any).google.maps &&
      (window as any).google.maps.places
    ) {
      detailsService.current = new (
        window as any
      ).google.maps.places.PlacesService(divRef.current);
    }
    if (!detailsService.current) {
      return undefined;
    }

    if (!value) return;
    // console.log("value: ", value);

    fetchPlaceDetails(
      {
        placeId: value.place_id,
        fields: ["address_components"],
      },
      (results?: PlaceDetails) => {
        if (active) {
          if (results) {
            setValue("");
            onChange(results.address_components);
          }
        }
      },
    );

    return () => {
      active = false;
    };
  }, [onChange, value, fetchPlaceDetails]);

  useEffect(() => {
    // console.log("useEffect: inputValue", inputValue);
    let active = true;

    if (
      !autocompleteService.current &&
      (window as any).google &&
      (window as any).google.maps &&
      (window as any).google.maps.places
    ) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetchPlacePredictions(
      {
        input: inputValue,
        componentRestrictions: {
          country,
        },
      },
      (results?: readonly PlaceType[]) => {
        if (active) {
          let newOptions: readonly PlaceType[] = [];

          if (value) {
            newOptions = [value];
          }

          if (results) {
            newOptions = [...newOptions, ...results];
          }

          setOptions(newOptions);
        }
      },
    );

    return () => {
      active = false;
    };
  }, [value, inputValue, fetchPlacePredictions, country]);

  return (
    <>
      <div className="grid w-full items-center gap-1">
        <Combobox
          onChange={(option) => {
            if (instanceOfPlaceType(option)) {
              setOptions(option ? [option, ...options] : options);
              setValue(option);
            }
          }}
        >
          <Combobox.Label
            className="text-sm font-medium leading-none"
            htmlFor={id}
            {...labelProps}
          >
            {labelProps.children}
          </Combobox.Label>
          <div className="relative">
            <div
              className={cn(
                "relative cursor-default overflow-hidden bg-white text-left " +
                  " w-full sm:text-sm rounded-md ml-[-1px] p-[1px]",
              )}
            >
              <Combobox.Input
                className={cn(
                  //these are from base ShadCn input
                  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 " +
                    "text-sm shadow-sm transition-colors file:border-0 file:bg-transparent " +
                    "file:text-sm file:font-medium placeholder:text-muted-foreground " +
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring " +
                    "disabled:cursor-not-allowed disabled:opacity-50" +
                    //these are from our input
                    " focus:outline-none  " +
                    "focus:ring-primary-5 focus:border-primary-5 block w-full sm:text-sm" +
                    " border-gray-300 ",
                )}
                autoComplete="new-password"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const newValue = event.target.value;
                  // console.log("option", option);
                  setInputValue(newValue);
                }}
              />
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              // afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {options.map((option, index) => (
                  <AddressLookupItem key={index} option={option} />
                ))}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
        <div className="min-h-[20px] px-4 py-0">
          {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
        </div>
      </div>
      <div ref={divRef}></div>
    </>
  );
};

const AddressLookupItem = ({ option }: { option: PlaceType }) => {
  const matches =
    option.structured_formatting.main_text_matched_substrings || [];

  const parts = parse(
    option.structured_formatting.main_text,
    matches.map((match: any) => [match.offset, match.offset + match.length]),
  );

  // console.log("AddressLookupItem: ", option);
  return (
    <Combobox.Option
      value={option}
      className={({ active }) =>
        `relative cursor-default select-none py-2 pl-2 pr-1 ${
          active ? "bg-primary-8 text-white" : "text-gray-900"
        }`
      }
    >
      <div className="flex flex-row items-center">
        <div className="flex w-[24px]">
          <MdLocationOn className="text-primary-10" />
        </div>
        <div className="w-[calc(100% - 24px)] break-words">
          {parts.map((part, index) => (
            <span
              className={cn(part.highlight ? "font-bold" : "font-regular")}
              key={index}
            >
              {part.text}
            </span>
          ))}
          <div
          // variant="body2" color="text.secondary"
          >
            {option.structured_formatting.secondary_text}
          </div>
        </div>
      </div>
    </Combobox.Option>
  );
};

export default AddressLookup;
