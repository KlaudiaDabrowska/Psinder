import { JWT } from "next-auth/jwt";
import { apiClient } from "../config/apiClient";
import { IToken } from "./getImpersonateDog";

interface IDogsData {
  dogs: IDog[];
}

interface IDog {
  id: string;
  name: string;
  description: string;
  images: string[];
  pairedDogs: string[];
  votes: string[];
}

export const getNotVotedDogs = async (token: JWT, impersonateToken: any) => {
  const response = await apiClient.get<IDogsData>("/dog/not-voted", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      Impersonate: impersonateToken,
      Range: "units=0-10",
    },
  });
  return response.data;
};
