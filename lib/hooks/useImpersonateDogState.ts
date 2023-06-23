import { getImpersonateDog } from "@/api/getImpersonateDog";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";

export const useImpersonateDogState = (dogId: string) => {
  const { data: sessionData } = useSession();

  const { data: impersonateDog } = useQuery(
    "impersonateDog",
    () => getImpersonateDog(sessionData?.user.accessToken, dogId),
    {
      enabled: sessionData !== undefined,
    }
  );

  return impersonateDog;
};
