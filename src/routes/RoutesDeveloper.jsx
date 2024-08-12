import { devNavUrl } from "@/components/helpers/functions-general";
import Account from "@/components/pages/developers/account/Account";
import Announcement from "@/components/pages/developers/announcement/Announcement";
import Calendar from "@/components/pages/developers/calendar/Calendar";
import Client from "@/components/pages/developers/client/Client";
import Employees from "@/components/pages/developers/employees/Employees";
import Overtime from "@/components/pages/developers/overtime/Overtime";
import Overview from "@/components/pages/developers/overview/Overview";
import Department from "@/components/pages/developers/settings/department/Department";
import Notification from "@/components/pages/developers/settings/notification/Notification";
import FbsAdmin from "@/components/pages/developers/settings/users/fbsAdmin/FbsAdmin";
import Other from "@/components/pages/developers/settings/users/other/Other";
import Role from "@/components/pages/developers/settings/users/role/Role";
import System from "@/components/pages/developers/settings/users/system/System";
import User from "@/components/pages/developers/settings/users/User";
import Time from "@/components/pages/developers/time/Time";
import WorkSched from "@/components/pages/developers/workSched/WorkSched";
import Job from "@/components/pages/developers/settings/job/Job";
import JobLevel from "@/components/pages/developers/settings/job/job-level/JobLevel";
import JobTitle from "@/components/pages/developers/settings/job/job-title/JobTitle";
import Leave from "@/components/pages/developers/settings/leave/Leave";
import LeaveType from "@/components/pages/developers/settings/leave/leave-type/LeaveType";
import LeaveBenefits from "@/components/pages/developers/settings/leave/leave-benefits/LeaveBenefits";
import EmployeesList from "@/components/pages/developers/employees/employees-info/EmployeesList";
import PersonalInfo from "@/components/pages/developers/employees/employees-info/personal-info/PersonalInfo";
import Subscribers from "@/components/pages/developers/settings/subscriber/Subscribers";
import SubscribersList from "@/components/pages/developers/settings/subscriber/subscriber-list/SubscribersList";


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
    path: `${devNavUrl}/employees/view`,
    element: <EmployeesList />,
  },
  {
    path: `${devNavUrl}/employees/view/info`,
    element: <PersonalInfo />,
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
    path: `${devNavUrl}/settings/subscriber`,
    element: <Subscribers />,
  },
  {
    path: `${devNavUrl}/settings/subscriber/list`,
    element: <SubscribersList />,
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
    element: <System />,
  },
  {
    path: `${devNavUrl}/settings/users/admin`,
    element: <FbsAdmin />,
  },
  {
    path: `${devNavUrl}/settings/users/other`,
    element: <Other />,
  },
  {
    path: `${devNavUrl}/settings/users/role`,
    element: <Role />,
  },
  {
    path: `${devNavUrl}/settings/job`,
    element: <Job />,
  },
  {
    path: `${devNavUrl}/settings/job/level`,
    element: <JobLevel />,
  },
  {
    path: `${devNavUrl}/settings/job/title`,
    element: <JobTitle />,
  },
  {
    path: `${devNavUrl}/settings/leave`,
    element: <Leave />,
  },
  {
    path: `${devNavUrl}/settings/leave/type`,
    element: <LeaveType />,
  },
  {
    path: `${devNavUrl}/settings/leave/benefits`,
    element: <LeaveBenefits />,
  },

  {
    path: `${devNavUrl}/account`,
    element: <Account />,
  },
];
