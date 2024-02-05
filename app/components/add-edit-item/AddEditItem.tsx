import { useNavigation, useSubmit } from "@remix-run/react";

export type AddEditItemObject = {
  name: string;
  label?: string;
  hidden?: boolean;
  value?: string | null;
  required?: boolean;
};

interface Props {
  type?: string;
  objects: AddEditItemObject[];
  data: any;
}

const AddEditItem = ({ type, objects, data }: Props) => {
  const submit = useSubmit();
  const navigation = useNavigation();

  const fields = objects.filter((obj) => obj.name !== "id");
  const id = objects.filter((obj) => obj.name === "id");

  return <></>;

  // return (
  //   <FormContainer
  //     defaultValues={data}
  //     onSuccess={(data, e) => {
  //       submit(e?.target);
  //     }}
  //     FormProps={{
  //       id: "client-form",
  //       method: "POST",
  //     }}
  //   >
  //     <Grid container columnSpacing={1} rowGap={1} padding={1} paddingTop={0}>
  //       {id && <input type="hidden" name="id" value={id[0].value || ""} />}
  //       {fields.map((obj) => (
  //         <Grid key={obj.name} xs={12} padding={1}>
  //           <TextFieldElement
  //             label={obj.label || ""}
  //             name={obj.name}
  //             required={obj.required}
  //           />
  //         </Grid>
  //       ))}

  //       <Grid xs={6} paddingTop={2}>
  //         <SubmitButton
  //           loading={navigation.state === "submitting"}
  //           label={`Add ${type}`}
  //           labelSubmitting={`Adding ${type}...`}
  //           color="success"
  //         />
  //       </Grid>
  //       <Grid xs={6} paddingTop={2}>
  //         <Button
  //           labelDefault="Cancel"
  //           url={".."}
  //           variant={"contained"}
  //           fullWidth={true}
  //         />
  //       </Grid>
  //     </Grid>
  //   </FormContainer>
  // );
};
export default AddEditItem;
