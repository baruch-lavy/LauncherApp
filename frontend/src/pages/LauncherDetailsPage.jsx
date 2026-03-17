import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { launcherService } from "../services/launchers.remote.service";

export function LauncherDetailesPage() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["launchers", id],
    queryFn: () => launcherService.getLauncherById(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (data) {
    const launcher = data[0];
    return (
      <div className="launcher-detailes">
        <h3>Name: {launcher.name}</h3>
        <span>Type: {launcher.type}</span>
        <span>Longitude: {launcher?.longitude}</span>
        <span>Latitude:{launcher.latitude}</span>
        <span>City: {launcher.city}</span>
      </div>
    );
  }
}
