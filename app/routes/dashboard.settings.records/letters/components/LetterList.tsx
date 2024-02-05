import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "@remix-run/react";
import { useEffect, useState } from "react";

import type { loader } from "../route.tsx";
import VList from "~/components/vertical-list/VList.tsx";
import VListItemButton from "~/components/vertical-list/VListItemButton.tsx";

const LetterList = () => {
  const { letters } = useLoaderData<typeof loader>();
  // const { dispatch } = useContext(AppContext);
  const { letterId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLetterId, setSelectedLetterId] = useState<string>("");

  useEffect(() => {
    if (!letterId) return;
    setSelectedLetterId(letterId);
  }, [letterId]);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
  ) => {
    if (!letters || letters.length === 0) return;

    const letter = letters.find((t) => t.id === id);

    if (!letter) return;
    let url = location.pathname;

    url = url.replace(
      new RegExp("/letters(?:/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+|)"),
      `/letters/${letter.id}`,
    );

    if (url !== location.pathname) {
      // dispatch({
      //   type: NavigationTypes.saveEnabled,
      //   payload: {
      //     enabled: false,
      //   },
      // });

      //setSaveEnabled && setSaveEnabled(false);
      navigate(url);
    }
  };
  return (
    <VList selectedId={selectedLetterId}>
      {letters.map((letter) => (
        <VListItemButton
          key={letter.id}
          id={letter.id}
          text={letter.name}
          onClick={(event: any) => handleListItemClick(event, letter.id)}
        />
      ))}
    </VList>
  );
};
export default LetterList;
