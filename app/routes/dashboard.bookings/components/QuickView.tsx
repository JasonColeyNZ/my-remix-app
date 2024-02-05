import { Internationalization } from "@syncfusion/ej2-base";
import { Button } from "~/components/ui/button";

const headerTemplate = (props: { [key: string]: Date }): JSX.Element => {
  const intl: Internationalization = new Internationalization();

  const getHeaderTitle = (data: { [key: string]: Object }): string => {
    return data.elementType === "cell"
      ? "Add Appointment"
      : "Appointment Details";
  };

  const getHeaderDetails = (data: { [key: string]: Date }): string => {
    return (
      intl.formatDate(data.StartTime, { type: "date", skeleton: "full" }) +
      " (" +
      intl.formatDate(data.StartTime, { skeleton: "hm" }) +
      " - " +
      intl.formatDate(data.EndTime, { skeleton: "hm" }) +
      ")"
    );
  };

  return (
    <div className="quick-info-header">
      <div className="quick-info-header-content">
        <div className="quick-info-title">{getHeaderTitle(props)}</div>
        <div className="duration-text">{getHeaderDetails(props)}</div>
      </div>
    </div>
  );
};

const contentTemplate = (props: { [key: string]: string }) => {
  //we will use loaders for this data
  // const getResourceData = (data: {
  //   [key: string]: Object;
  // }): { [key: string]: Object } => {
  //   const resources: ResourcesModel = scheduleObj.current
  //     .getResourceCollections()
  //     .slice(-1)[0];
  //   const resourceData: { [key: string]: Object } = (
  //     resources.dataSource as Object[]
  //   ).filter(
  //     (resource: { [key: string]: Object }) => resource.Id === data.RoomId,
  //   )[0] as { [key: string]: Object };
  //   return resourceData;
  // };

  // const getEventType = (data: { [key: string]: string }): string => {
  //    const resourceData: { [key: string]: Object } = getResourceData(data);
  //    return resourceData.Name as string;
  //  };
  console.log();
  return (
    <div className="quick-info-content">
      {props.elementType === "cell" ? (
        <div className="e-cell-content">
          <div className="content-area">
            {/* <TextInput labelProps={{ children: "Title" }} inputProps={{}} /> */}
          </div>
          {/* <div className="content-area">
            <DropDownListComponent id="eventType" ref={eventTypeObj} dataSource={roomData} fields= placeholder="Choose Type" index={0} popupHeight="200px" />
          </div> */}
          {/* <div className="content-area">
            <TextBoxComponent id="notes" ref={notesObj} placeholder="Notes" />
          </div> */}
        </div>
      ) : (
        <div className="event-content">
          <div className="meeting-type-wrap">
            <label>Subject</label>:<span>{props.Subject}</span>
          </div>
          {/* <div className="meeting-subject-wrap">
            <label>Type</label>:
            <span>{getEventType(props)}</span>
          </div> */}
          <div className="notes-wrap">
            <label>Notes</label>:<span>{props.Description}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const footerTemplate = (props: { [key: string]: Object }): JSX.Element => {
  return (
    <div className="quick-info-footer">
      {props.elementType === "cell" ? (
        <div className="cell-footer">
          <Button
            id="more-details"
            //  cssClass="e-flat"
            content="More Details"
            //  onClick={buttonClickActions.bind(this)}
          />
          <Button
            id="add"
            //  cssClass="e-flat"
            content="Add"
            //  isPrimary={true}
            //  onClick={buttonClickActions.bind(this)}
          />
        </div>
      ) : (
        <div className="event-footer">
          <Button
            id="delete"
            //  cssClass="e-flat"
            content="Delete"
            //  onClick={buttonClickActions.bind(this)}
          />
          <Button
            id="more-details"
            //  cssClass="e-flat"
            content="More Details"
            //  isPrimary={true}
            //  onClick={buttonClickActions.bind(this).bind(this)}
          />
        </div>
      )}
    </div>
  );
};

export const quickInfoTemplates = {
  header: headerTemplate,
  content: contentTemplate,
  footer: footerTemplate,
};

// export default contentTemplate
