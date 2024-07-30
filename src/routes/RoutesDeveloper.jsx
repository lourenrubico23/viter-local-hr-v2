import { devNavUrl } from "@/components/helpers/functions-general";
import Account from "@/components/pages/developers/account/Account";
import Announcement from "@/components/pages/developers/announcement/Announcement";
import Calendar from "@/components/pages/developers/calendar/Calendar";
import Client from "@/components/pages/developers/client/Client";
import Employees from "@/components/pages/developers/employees/Employees";
import Leave from "@/components/pages/developers/leave/Leave";
import Overtime from "@/components/pages/developers/overtime/Overtime";
import Overview from "@/components/pages/developers/overview/Overview";
import PersonalInfo from "@/components/pages/developers/employeesInfo/PersonalInfo";
import Department from "@/components/pages/developers/settings/department/Department";
import Notification from "@/components/pages/developers/settings/notification/Notification";
import FbsAdmin from "@/components/pages/developers/settings/users/fbsAdmin/FbsAdmin";
import Other from "@/components/pages/developers/settings/users/other/Other";
import Role from "@/components/pages/developers/settings/users/role/Role";
import System from "@/components/pages/developers/settings/users/system/System";
import User from "@/components/pages/developers/settings/users/User";
import Time from "@/components/pages/developers/time/Time";
import WorkSched from "@/components/pages/developers/workSched/WorkSched";


export const routesDeveloper = [
  {
    path: `${devNavUrl}/overview`,
    element: <Overview />,
  },
  {
    path: `${devNavUrl}/time`,
    element: <Time />,
  },
  {
    path: `${devNavUrl}/leave`,
    element: <Leave />,
  },
  {
    path: `${devNavUrl}/overtime`,
    element: <Overtime />,
  },
  {
    path: `${devNavUrl}/employees`,
    element: <Employees />,
  },
  {
    path: `${devNavUrl}/client`,
    element: <Client />,
  },
  {
    path: `${devNavUrl}/announcement`,
    element: <Announcement />,
  },
  {
    path: `${devNavUrl}/calendar`,
    element: <Calendar />,
  },
  {
    path: `${devNavUrl}/workSched`,
    element: <WorkSched />,
  },
  {
    path: `${devNavUrl}/settings/users`,
    element: <User />,
  },
  {
    path: `${devNavUrl}/settings/department`,
    element: <Department />,
  },
  {
    path: `${devNavUrl}/settings/notification`,
    element: <Notification />,
  },
  {
    path: `${devNavUrl}/settings/users/system`,
    element: <System/>,
  },
  {
    path: `${devNavUrl}/settings/users/admin`,
    element: <FbsAdmin/>,
  },
  {
    path: `${devNavUrl}/settings/users/other`,
    element: <Other/>,
  },
  {
    path: `${devNavUrl}/settings/users/role`,
    element: <Role/>,
  },
  {
    path: `${devNavUrl}/settings/overview`,
    element: <Overview/>,
  },
  {
    path: `${devNavUrl}/account`,
    element: <Account />,
  },
  {
    path: `${devNavUrl}/employees/info`,
    element: <PersonalInfo />,
  },
];
