import LocationAutoComplete from "~/components/location-autocomplete/LocationAutoComplete";

const BookingsHeader = () => {
  return (
    <>
      <div className="tracking-tight ml-10 basis-1/4">
        <LocationAutoComplete />
      </div>
    </>
  );
};
export default BookingsHeader;
