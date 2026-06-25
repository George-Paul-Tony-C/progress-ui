import api from "../../api/axios";

import type { ApiResponse }
from "../../types/api";

import type { Dashboard }
from "../../types/dashboard";

export async function getDashboard()
: Promise<Dashboard> {

  const response =
    await api.get<
      ApiResponse<Dashboard>
    >(
      "/dashboard"
    );

  return response.data.data;
}