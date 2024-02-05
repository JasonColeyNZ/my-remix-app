// import { useNavigate } from "@remix-run/react";
import { useLocales } from "remix-utils/locales/react";
import HeaderData from "~/components/typography/HeaderData";
import type { ConsentType } from "~/models/clientconsent.server";

interface ConsentHeaderProps {
  consent: ConsentType;
}

const ConsentHeader = ({ consent }: ConsentHeaderProps) => {
  // const navigate = useNavigate();
  const locales = useLocales();

  if (!consent) return null;

  return (
    <>
      <div className="flex flex-row ml-auto px-2">
        <HeaderData
          label={"Date"}
          data={
            consent.createdAt &&
            new Date(consent.createdAt).toLocaleDateString(locales)
          }
        />
        <HeaderData
          label={"Signed On"}
          data={
            consent.clientSignatureDateTime
              ? new Date(consent.clientSignatureDateTime).toLocaleDateString(
                  locales,
                )
              : "Unsigned"
          }
        />
        {/* <Button
          labelDefault={"Back"}
          // variant="contained"
          sx={{ py: "2px" }}
          url={null}
          onClick={() => {
            navigate(`/dashboard/clients/${consent.clientId}/consents`);
          }}
        /> */}
      </div>
    </>
  );
};
export default ConsentHeader;
