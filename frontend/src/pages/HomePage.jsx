import { useQuery } from "@tanstack/react-query";
import { launcherService } from "../services/launchers.remote.service";

export function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["launchers"],
    queryFn: launcherService.getLaunchers,
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div> error {JSON.stringify(error)}</div>;
  }

  if (data) console.log(data);

  return (
    <div className="home-page-container">
      <h1>home page</h1>
      <div className="launchrs-list">
        {data && data.map(launcher => {
            <div>
                {JSON.stringify(launcher)}
            </div>
        })}
      </div>
    </div>
  );
}
