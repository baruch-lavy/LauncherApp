import { useMutation } from "@tanstack/react-query";
import { launcherService } from "../services/launchers.remote.service";
import { queryClient } from "../App";
import { useRef } from "react";

export function AddLauncherPage() {
  const { mutate } = useMutation({
    mutationFn: launcherService.addLauncher,
    onSuccess: queryClient.invalidateQueries({ queryKey: ["launchers"] }),
  });


  const form = useRef(null)
  function handleSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);

    const name = formData.get("name");
    const type = formData.get("type");
    let longitude = formData.get("longitude");
    let latitude = formData.get("latitude");
    const city = formData.get("city");

    if (typeof name === "string" && typeof city === "string") {
      longitude = parseInt(longitude, 10);
      latitude = parseInt(latitude, 10);

      if (!isNaN(longitude) && !isNaN(latitude)) {
        const launcher = {
          name,
          type,
          longitude,
          latitude,
          city,
        };
        mutate(launcher);
        form.current.reset()
      }
    }
  }

  return (
    <div className="add-launcher-container">
      <h1>Add Launcher Page</h1>
      <form onSubmit={handleSubmit} ref={form}>
        <label htmlFor="name">Enter Launcher Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="enter launcher name"
        />
        <label htmlFor="type">Select the Launcher Type</label>
        <select name="type" id="type">
          <option value="Shabab3">Sabab3</option>
          <option value="Fetah110">Fetah110</option>
          <option value="Radwan">Radwan</option>
          <option value="Kheibar">Kheibar</option>
        </select>

        <label htmlFor="longitude">Enter Launcher Longtitude:</label>
        <input
          type="number"
          name="longitude"
          id="longitude"
          placeholder="enter launcher longitude"
        />

        <label htmlFor="latitude">Enter Launcher Latitude:</label>
        <input
          type="number"
          name="latitude"
          id="latitude"
          placeholder="enter launcher latitude"
        />

        <label htmlFor="city">Enter Launcher City:</label>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="enter launcher city"
        />

        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
}
