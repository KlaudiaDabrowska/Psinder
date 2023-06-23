import { JWT } from "next-auth/jwt";
import { apiClient } from "../config/apiClient";

export interface IToken {
  token: string;
}

export const getImpersonateDog = async (token: JWT, dogId: string) => {
  const response = await apiClient.post<IToken>(
    `/dog/${dogId}/impersonate`,
    "",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};
