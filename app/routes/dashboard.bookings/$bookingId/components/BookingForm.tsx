// import { useForm } from "@conform-to/react";
// import { getFieldsetConstraint, parse } from "@conform-to/zod";
import {
  useActionData,
  // useNavigate,
} from "@remix-run/react";
// import type { BookingItemType } from "~/models/booking.server.ts";
// import {
//   bookingSchema,
// } from "~/routes/dashboard.bookings/$bookingId/bookingSchema.ts";
import { useServices } from "~/utils/routeData/useServices.ts";

import { action, loader } from "../route.tsx";

const BookingForm = () => {
  // const { booking } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  // const navigate = useNavigate();
  // const [form, fields] = useForm({
  //   id: "booking-editor",
  //   constraint: getFieldsetConstraint(bookingSchema),
  //   // defaultValue: booking,
  //   lastSubmission:
  //     actionData?.status === "error" ? actionData.submission : undefined,
  //   onValidate({ formData }) {
  //     return parse(formData, { schema: bookingSchema });
  //   },
  // });

  // const navigate = useNavigate();
  //const locations = useLocations() || [];

  //const formContext = useFormContext("booking-form");
  // const { register, setValue, handleSubmit } = useForm({});
  const services = useServices() || [];
  // const users = useUsers() || [];
  // const clients = useClients() || [];

  // console.log("Booking Form: ", booking);

  return (
    <>
      {/* <DialogContent dividers>
        <Form method="post" {...form.props}>
          <input
            name="intent"
            // value={
            //   booking.id === "new"
            //     ? BookingFormIntent.CREATE
            //     : BookingFormIntent.UPDATE
            // }
            hidden
            readOnly
          />
          <input name="id" value={booking.id} hidden readOnly />
          <Grid container columnSpacing={{ xs: 3 }} rowSpacing={{ xs: 2 }}>
            <Grid item xs={6}>
              <Grid container columnSpacing={{ xs: 3 }} rowSpacing={{ xs: 2 }}>
                <Grid item xs={12}>
                  <Select
                    label={"Services"}
                    options={services}
                    props={fields.services}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DatePicker label={"Date"} props={fields.startDate} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              This is where the scheduler will show
            </Grid>
          </Grid>
        </Form>
      </DialogContent>
      <div className="grid gap-6 mb-2 md:grid-cols-2">
        <InputSelect
          items={users}
          label="Team Member"
          name="userId"
          selectedId={booking && booking.userId}
          required={true}
          register={register}
          setValue={setValue}
        />

        <InputSelect
          items={clients}
          label="Client"
          name="clientId"
          selectedId={booking && booking.clientId}
          required={true}
          register={register}
          setValue={setValue}
        />
      </div>

      <div className="grid gap-6 mb-2">
        <InputDateTimePeriod
          startDate={booking?.startDate}
          endDate={booking?.endDate}
          register={register}
          setValue={setValue}
        />
      </div>

      <TextField
        //error={validation.hasError("description")}
        //helperText={descriptionError}
        {...register("description")}
        name="description"
        label="Description"
        placeholder="Enter a Description"
      />
      <DialogActions sx={{}}>
        <Button
          form={form.props.id}
          type="submit"
          variant="contained"
          color="primary"
        >
          {booking.id === "new" ? "Create Booking" : "Update Booking"}
        </Button>
        <Button
          form={form.props.id}
          variant="contained"
          color="secondary"
          onClick={() => {
            return navigate("..");
          }}
        >
          {booking.id === "new" ? "Cancel" : "Back to Bookings"}
        </Button>
      </DialogActions> */}
    </>
  );
};
export default BookingForm;
