import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { launcherService } from "../services/launchers.remote.service";
import { useNavigate } from "react-router";
import { queryClient } from "../App";

export function HomePage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    city: "",
    type: "",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["launchers"],
    queryFn: launcherService.getLaunchers,
  });

  const { mutate } = useMutation({
    mutationFn: launcherService.deleteLauncher,
    onSuccess: queryClient.invalidateQueries({ queryKey: ["launchers"] }),
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div> error {JSON.stringify(error)}</div>;
  }

  function handleFilter(e) {
    const { name, value } = e.target;

    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  }

  const filteredLaunchers = (data ? data : []).filter((launcher) => {
    console.log(filter.type)
    const matchesCity = launcher.city
      ?.toLowerCase()
      .includes(filter.city.toLowerCase());

    const matchesType = filter.type ? launcher.type === filter.type : true;
    return matchesCity && matchesType;
  });

  if (data) {
    return (
      <div className="home-page-container">
        <div className="filters">
          <label htmlFor="city-filter">Search by City</label>
          <input
            type="text"
            name="city"
            placeholder="Enter city name"
            onChange={handleFilter}
            value={filter.city}
          />

          <label htmlFor="type">Filter by Launcher Type</label>
          <select
            name="type"
            id="type"
            onChange={handleFilter}
            value={filter.type}
          >
            <option value="">All types</option>
            <option value="Shabab3">Sabab3</option>
            <option value="Fetah110">Fetah110</option>
            <option value="Radwan">Radwan</option>
            <option value="Kheibar">Kheibar</option>
          </select>
        </div>
        <h1>home page</h1>
        <div className="links">
          <button onClick={() => navigate("/add-launcher-page")}>
            Add Launcher
          </button>
        </div>
        <div className="launchrs-list">
          {filteredLaunchers.map((launcher) => (
            <div className="launcher-item" key={launcher._id}>
              <h3>Name: {launcher.name}</h3>
              <span>Type: {launcher.type}</span>
              <span>Longitude: {launcher?.longitude}</span>
              <span>Latitude:{launcher.latitude}</span>
              <span>City: {launcher.city}</span>

              <button
                onClick={() => navigate(`/launcher-detailes/${launcher._id}`)}
              >
                Launcher detailes
              </button>
              <button onClick={() => mutate(launcher._id)}>
                delete launcher
              </button>
            </div>
          ))}
          {!filteredLaunchers.length && (
            <div>No launchers match the current filters.</div>
          )}
        </div>
      </div>
    );
  }
}
