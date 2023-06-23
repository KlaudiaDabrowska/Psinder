import { useGetNotVotedDogs } from "@/lib/hooks/useGetNotVotedDogs";
import { useImpersonateDogState } from "@/lib/hooks/useImpersonateDogState";
import { DogIdContext } from "@/pages/_app";
import { DashboardTemplate } from "@/templates/DashboardTemplate";
import { useContext } from "react";

const Match = () => {
  const { dogId } = useContext(DogIdContext);

  const impersonate = useImpersonateDogState(dogId);

  const notVotedDogs = useGetNotVotedDogs(impersonate);

  console.log(notVotedDogs);

  return (
    <DashboardTemplate>
      <div>dupa</div>
    </DashboardTemplate>
  );
};

export default Match;
