import type {
  appClient,
  appService,
  appTeamMember,
  appView,
  appGrouping,
} from "~/utils/types";
import { AppointmentView } from "~/utils/types";

const debug = false;

export type AppointmentType = {
  Id: string;
  Subject: string;
  StartTime: Date;
  EndTime: Date;

  IsAllDay: boolean;
  client: appClient;
  teamMember: appTeamMember;
  teamMemberId: string; //needed to match the resource in the Scheduler

  dragBetweenSlots: boolean;
  color: string;
  overlap: boolean;
  editable: boolean;
  dragInTime: boolean;
  resize: boolean;
  services: appService[];
};

export type SchedulerStateType = {
  view: appView;
  selectedDate: Date;
  teamMembers: appTeamMember[];
  appointments: AppointmentType[];
  selectedTeamMembers: appTeamMember[];
  grouping: appGrouping;
};

export const initialSchedulerState = {
  view: { view: AppointmentView.Day, startHour: "08:00", endHour: "17:00" },
  selectedDate: new Date(),
  teamMembers: [],
  appointments: [],
  selectedTeamMembers: [],
  grouping: { byGroupID: false, resources: ["Members"] },
};

export enum SchedulerStateTypes {
  view = "VIEW",
  selectedDate = "SELECTED_DATE",
  teamMembers = "TEAM_MEMBERS",
  appointments = "APPOINTMENTS",
  grouping = "GROUPING",
}

type SchedulerStatePayload = {
  [SchedulerStateTypes.view]: {
    view: appView;
  };
  [SchedulerStateTypes.selectedDate]: {
    selectedDate: Date;
  };
  [SchedulerStateTypes.teamMembers]: {
    teamMembers: appTeamMember[];
  };
  [SchedulerStateTypes.appointments]: {
    appointments: AppointmentType[];
  };
  [SchedulerStateTypes.grouping]: {
    grouping: appGrouping;
  };
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type SchedulerStateActions =
  ActionMap<SchedulerStatePayload>[keyof ActionMap<SchedulerStatePayload>];

const schedulerReducer = (
  state: SchedulerStateType,
  action: SchedulerStateActions,
) => {
  // console.log("schedulerReducer", action.type);
  switch (action.type) {
    case SchedulerStateTypes.view: {
      if (debug) console.log("schedulerReducer view", action.payload.view);
      return {
        ...state,
        view: { ...action.payload.view },
      };
    }
    case SchedulerStateTypes.selectedDate: {
      if (debug)
        console.log(
          "schedulerReducer selectedDate",
          action.payload.selectedDate,
        );
      return {
        ...state,
        selectedDate: action.payload.selectedDate,
      };
    }
    case SchedulerStateTypes.teamMembers: {
      if (debug)
        console.log("schedulerReducer teamMembers", action.payload.teamMembers);
      return {
        ...state,
        teamMembers: [...action.payload.teamMembers],
        selectedTeamMembers: [
          ...action.payload.teamMembers.filter((tm) => tm.checked),
        ],
      };
    }
    case SchedulerStateTypes.appointments: {
      if (debug)
        console.log(
          "schedulerReducer appointments",
          action.payload.appointments,
        );
      return {
        ...state,
        appointments: [...action.payload.appointments],
      };
    }
    case SchedulerStateTypes.grouping: {
      if (debug) console.log("schedulerReducer grouping", action.payload);
      return {
        ...state,
        grouping: { ...action.payload.grouping },
      };
    }
    default: {
      return state;
    }
  }
};

export default schedulerReducer;
