import React from "react";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from "~/components/ui/dialog.tsx";
import { Card } from "~/components/ui/card";

const AddBooking = () => {
  return (
    <Dialog open={false}>
      <DialogPortal>
        <DialogOverlay className="flex items-center bg-primary-1/60 backdrop-blur-none">
          <Card className="flex flex-col my-auto mx-auto sm:min-h-md xs:w-full sm:w-max-lg "></Card>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
};

export default AddBooking;
