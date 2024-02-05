import { Form, useLoaderData } from "@remix-run/react";
import type { loader } from "../route";

// import { roomSchema } from "../roomSchema.ts";
// import type { loader } from "../route.tsx";

const RoomDetails = () => {
  const { room } = useLoaderData<typeof loader>();
  //console.log(room);

  // const processedServices = useMemo(() => {
  //   return services.map((service: any) => {
  //     return {
  //       value: service.id,
  //       text: service.name,
  //     };
  //   });
  // }, [services]);

  // const { formContext, register, setValue, formRef } = useRHF(
  //   "room-form",
  //   roomValidation,
  //   room,
  // );

  return (
    // <FormProvider {...formContext}>
    <Form
      id="room-form"
      // ref={formRef}
      method="POST"
      style={{
        display: "flex",
        flex: "1 1 0",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* <input type="hidden" {...register("id")} /> */}
      <div className="p-3 overflow-y-auto h-full flex flex-col max-w-[500px]">
        {room.name}
        {/* <FormRow>
          <FieldOuter>
            
            <TextField
              autoFocus={true}
              // register={register}
              // setValue={setValue}
              label={"Room Name"}
              required={true}
              id={"name"}
              defaultValue={room.name}
              fieldType={""}
            />
          </FieldOuter>
        </FormRow>
        <FormRow>
          <FieldOuter>
            <AutoComplete
              // register={register}
              // setValue={setValue}
              label={"Room Services"}
              required={false}
              id={"services"}
              options={processedServices}
              // defaultValue={room.services}
              preview={true}
              multiselect={true}
              defaultValue={""}
            />
          </FieldOuter>
        </FormRow> */}
      </div>
    </Form>
    // </FormProvider>
  );
};
export default RoomDetails;
