import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "@remix-run/react";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import VList from "~/components/vertical-list/VList";
import VListItemButton from "~/components/vertical-list/VListItemButton";
// import { CommandGroup } from "~/components/ui/command.tsx";
import type { TextTemplateType } from "~/models/textTemplate.server.ts";

// interface TemplateListProps {
// }

// interface Group {
//   name: string;
//   templates: TextTemplateType[];
// }

const TemplateList = () => {
  const { templates } = useLoaderData<{ templates: TextTemplateType[] }>();
  const { templateId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  // const [groupedTemplates, setGroupedTemplates] = useState<Group[]>([]);

  useEffect(() => {
    if (!templateId) return;
    setSelectedTemplateId(templateId);
  }, [templateId]);

  // useEffect(() => {
  //   const grouped = templates.reduce(function (
  //     r: Group[],
  //     a: TextTemplateType,
  //   ) {
  //     const group = r.find((g) => g.name === a.type);
  //     if (group) {
  //       group.templates.push(a);
  //     } else {
  //       r.push({ name: a.type, templates: [a] });
  //     }
  //     return r;
  //   }, []);

  //   if (grouped.length === 0) return;
  //   //console.log(grouped);
  //   setGroupedTemplates(grouped);
  // }, [templates]);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
  ) => {
    if (!templates || templates.length === 0) return;

    const template = templates.find((t) => t.id === id);

    if (!template) return;
    let url = location.pathname;

    url = url.replace(
      new RegExp("/templates(?:/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+|)"),
      `/templates/${template.id}`,
    );
    if (url !== location.pathname) {
      navigate(url);
    }
  };
  //return null;
  return (
    <VList selectedId={selectedTemplateId}>
      {templates.map((template) => (
        <VListItemButton
          key={template.id}
          id={template.id}
          text={template.name}
          onClick={(event: any) => handleListItemClick(event, template.id)}
        />
      ))}
    </VList>

    // <VList selectedId={selectedTemplateId}>
    //   {groupedTemplates &&
    //     groupedTemplates.map((group) => (
    //       <div key={group.name}>
    //         <CommandGroup heading={group.name} />

    //         {group &&
    //           group.templates.map((template) => (
    //             <VListItemButton
    //               key={template.id}
    //               id={template.id}
    //               text={template.name}
    //               secondary={
    //                 <>
    //                   <span
    //                     className="text-xs text-primary-6 inline-block"

    //                     // color="text.secondary"
    //                   >
    //                     {template.description}
    //                   </span>
    //                 </>
    //               }
    //               onClick={(event: any) =>
    //                 handleListItemClick(event, template.id)
    //               }
    //             />
    //           ))}
    //       </div>
    //     ))}
    // </VList>
  );
};
export default TemplateList;
