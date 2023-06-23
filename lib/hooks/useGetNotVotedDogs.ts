import { getNotVotedDogs } from "@/api/getNotVotedDogs";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";

export const useGetNotVotedDogs = (impersonateToken: string) => {
  const { data: sessionData } = useSession();

  const { data: notVotedDogs } = useQuery(
    "notVotedDogs",
    () => getNotVotedDogs(sessionData?.user.accessToken, impersonateToken),
    {
      enabled: sessionData !== undefined,
    }
  );

  return notVotedDogs;
};
