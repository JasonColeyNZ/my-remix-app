import { useLoaderData, useNavigate } from "@remix-run/react";
import { useMemo } from "react";
import FormViewerWithFetcher from "~/components/form-viewer/FormViewerWithFetcher.tsx";
import { Card } from "~/components/ui/card.tsx";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from "~/components/ui/dialog.tsx";

import { productSchema } from "../productSchema.ts";
import { type loader } from "../route.tsx";
import { productFormDefinition } from "./product-form-definition.ts";

const ProductForm = () => {
  const { product, productTypes, services, unitsOfMeasure } =
    useLoaderData<typeof loader>();

  const navigate = useNavigate();

  const formDefinition = useMemo(() => {
    return productFormDefinition(productTypes, services, unitsOfMeasure);
  }, [productTypes, services, unitsOfMeasure]);

  const onBackClick = () => {
    navigate("..");
  };

  const onSuccess = (data: any) => {
    // console.log("onSuccess", data);
    navigate(`..`);
  };

  return (
    <Dialog open={true}>
      <DialogPortal>
        <DialogOverlay className="flex items-center bg-primary-1/60 backdrop-blur-none">
          <Card className="flex flex-col my-auto mx-auto sm:min-h-md xs:w-full sm:w-max-lg ">
            <FormViewerWithFetcher
              title="Product"
              defaultValues={product}
              actionUrl={`../${product?.id}`}
              objectName="Product"
              buttonsTop={true}
              formDefinition={formDefinition}
              onBackClick={onBackClick}
              dataSchema={productSchema}
              onSuccess={onSuccess}
            />
          </Card>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
};

export default ProductForm;
