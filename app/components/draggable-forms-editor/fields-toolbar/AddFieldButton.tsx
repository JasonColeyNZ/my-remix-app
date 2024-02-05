import { useFetcher } from "@remix-run/react";
import { serialize } from "object-to-formdata";
// import { serialize } from "object-to-formdata";
import { useContext } from "react";
import { Button } from "~/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/drop-down-menu.tsx";
import type { action } from "~/routes/dashboard.settings.records/fields/route.tsx";

import { DraggableFormContext } from "../store/draggableFormContext.tsx";
// import { DraggableFormStateTypes } from "../store/draggableFormReducer.ts";
// import { AreaType } from "../types.ts";
import { toolboxControls } from "./controls.tsx";

// import { getIcon, toolboxControls } from "./controls.tsx";

// const StyledMenu = styled((props: MenuProps) => (
//   <Menu
//     elevation={0}
//     anchorOrigin={{
//       vertical: "bottom",
//       horizontal: "right",
//     }}
//     transformOrigin={{
//       vertical: "top",
//       horizontal: "right",
//     }}
//     {...props}
//   />
// ))(({ theme }) => ({
//   "& .MuiPaper-root": {
//     borderRadius: 6,
//     marginTop: theme.spacing(1),
//     minWidth: 180,
//     color:
//       theme.palette.mode === "light"
//         ? "rgb(55, 65, 81)"
//         : theme.palette.grey[300],
//     boxShadow:
//       "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
//     "& .MuiMenu-list": {
//       padding: "4px 0",
//     },
//     "& .MuiMenuItem-root": {
//       "& .MuiSvgIcon-root": {
//         fontSize: 18,
//         color: theme.palette.text.secondary,
//         marginRight: theme.spacing(1.5),
//       },
//       "&:active": {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           theme.palette.action.selectedOpacity,
//         ),
//       },
//     },
//   },
// }));

const AddFieldButton = () => {
  const { state } = useContext(DraggableFormContext);
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  const addFieldFetcher = useFetcher<typeof action>();
  // const { data, state: fetcherState } = addFieldFetcher;

  // console.log("state", state);

  // useEffect(() => {
  //   if (fetcherState === "loading" || data === undefined || !data?.field)
  //     return;
  //   //this will update state to select the field
  //   dispatch({
  //     type: DraggableFormStateTypes.selectFieldById,
  //     payload: {
  //       id: data.field.id,
  //     },
  //   });
  // }, [data, fetcherState]);

  // const handleAddFieldClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const handleAddClose = (type: string) => {
    // setAnchorEl(null);
    if (state.formState.selectedForm === null) return;
    //add field to the custom fields
    const data = {
      id: "new",
      action: "add-field",
      colSpan: "0",
      area: state.formState.selectedForm.area,
      field: {
        type: type,
        label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
        shortLabel: "",
        controlType: type,
        description: "",
        displayOptions: {},
        validation: { required: false },
      },
    };
    addFieldFetcher.submit(serialize(data), {
      method: "post",
      action: `/dashboard/settings/records/fields`,
    });
    //select the field into the context SelectedControl
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="self-end text-xs h-5 px-1 ml-auto mr-1 mb-1"
            variant="secondary"
          >
            Add Field
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Static Fields</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {toolboxControls.map((control) => (
            <DropdownMenuItem
              key={control.id}
              onClick={() => handleAddClose(control.field.fieldType)}
            >
              {control.field.label}
            </DropdownMenuItem>
          ))}
          {/* <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <Button
        boxSx={{ ml: "auto", mr: "7px", mb: "2px" }}
        sx={{ py: "0", px: "5px", fontSize: "11px" }}
        labelDefault={"Add Field"}
        url={null}
        fullWidth={false}
        size="small"
        onClick={handleAddFieldClick}
        // endIcon={<KeyboardArrowDownIcon />}
      />
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {toolboxControls.map((control) => (
          <MenuItem
            key={control.id}
            onClick={() => handleAddClose(control.fieldType)}
            disableRipple
          >
            <ListItemIcon>{getIcon(control.fieldType)}</ListItemIcon>
            <ListItemText>{control.field.label}</ListItemText>
          </MenuItem>
          // <MenuItem onClick={() => handleAddClose('datetime')} disableRipple>
          //   Date/Time
          // </MenuItem>
          // <MenuItem onClick={() => handleAddClose('number')} disableRipple>
          //   Number
          // </MenuItem>
          // <MenuItem onClick={() => handleAddClose('select')} disableRipple>
          //   Select
          // </MenuItem>
        ))}
      </StyledMenu> */}
    </>
  );
};

export default AddFieldButton;
