import { useLoaderData, useNavigate } from "@remix-run/react";
import { useMemo } from "react";
import FormViewerWithFetcher from "~/components/form-viewer/FormViewerWithFetcher.tsx";
import SettingsRightCard from "~/layouts/section-layouts/SettingsRightCard.tsx";
import { categorySchema } from "../categorySchema.ts";
import type { loader } from "../route.tsx";
import { categoryFormDefinition } from "./category-form-definition.ts";
import ServiceBadge from "~/components/ui/service-badge.tsx";

const CategoryForm = () => {
  // console.log("CategoryForm: Render");
  const { category } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const formDefinition = useMemo(() => {
    return categoryFormDefinition();
  }, []);

  const onAddClick = () => {
    navigate("../new");
    //console.log("onAddClick: ");
  };

  // //This will reset the form when the defaultValue changes
  // //added 30/1/24 to fix issue with ProductList not updating on Service form
  // useEffect(() => {
  //   form.reset();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [service]);

  return (
    <SettingsRightCard>
      <FormViewerWithFetcher
        title={category.name === "" ? "New Category" : category.name}
        objectName="Category"
        topSummary={
          <div className="flex text-xs justify-center items-center select-none">
            <span className="mr-2">Save changes to see preview:</span>
            <ServiceBadge
              key={category.name}
              name={category.name}
              color={category.color}
              textColor={category.textColor}
            />
          </div>
        }
        dataSchema={categorySchema}
        actionUrl={`../${category?.id}`}
        buttonsTop={true}
        onAddClick={onAddClick}
        formDefinition={formDefinition}
        defaultValues={category}
      />
    </SettingsRightCard>
  );
};
export default CategoryForm;
