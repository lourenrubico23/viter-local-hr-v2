import { devNavUrl } from "@/components/helpers/functions-general";
import FbsAdmin from "@/components/pages/developers/settings/users/fbsAdmin/FbsAdmin";
import Other from "@/components/pages/developers/settings/users/other/Other";
import Role from "@/components/pages/developers/settings/users/role/Role";
import System from "@/components/pages/developers/settings/users/system/System";
import User from "@/components/pages/developers/settings/users/User";

export const routesDeveloper = [
  {
    path: `${devNavUrl}/${devNavUrl}/settings/users`,
    element: <User />,
  },
  {
    path: `${devNavUrl}/${devNavUrl}/settings/users/system`,
    element: <System/>,
  },
  {
    path: `${devNavUrl}/${devNavUrl}/settings/users/admin`,
    element: <FbsAdmin/>,
  },
  {
    path: `${devNavUrl}/${devNavUrl}/settings/users/other`,
    element: <Other/>,
  },
  {
    path: `${devNavUrl}/${devNavUrl}/settings/users/role`,
    element: <Role/>,
  },
];
