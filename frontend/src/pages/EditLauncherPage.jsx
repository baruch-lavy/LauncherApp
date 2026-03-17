import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { queryClient } from "../App";
import { launcherService } from "../services/launchers.remote.service";

export function EditLauncherPage() {
  const { id } = useParams();
  const [launcherToEdit, setLauncherToEdit] = useState(null);
  const navigate = useNavigate();
  const [isSuccessfullyUpdated, setIsSuccessfullyUpdated] = useState(false);

  const { mutate, error: editUserError } = useMutation({
    mutationFn: launcherService.updateLauncher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["launchers"] });
      setIsSuccessfullyUpdated(true);
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["launchers", id],
    queryFn: () => launcherService.getLauncherById(id),
  });

  useEffect(() => {
    if (!data) return;
    setLauncherToEdit(data[0]);
  }, [data]);

  console.log(launcherToEdit);

  function handleChange(e) {
    const { name, value } = e.target;

    setLauncherToEdit((prevLauncherToEdit) => ({
      ...prevLauncherToEdit,
      [name]: value,
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setLauncherToEdit((prevLauncherToEdit) => ({
      ...prevLauncherToEdit,
      [name]: value,
    }));
  }

  const form = useRef(null);
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
          isDestroyed: false,
          _id: launcherToEdit._id,
        };
        mutate(launcher);
        form.current.reset();
      }
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.response?.data}</div>;
  }

  if (editUserError) {
    return <div>{editUserError.response?.data}</div>;
  }
  if (launcherToEdit) {
    return (
      <div className="edit-launcher-container">
        {isSuccessfullyUpdated && (
          <div className="success-msg">
            <h4>Updated Successfully</h4>
            <button onClick={() => setIsSuccessfullyUpdated(false)}>X</button>
          </div>
        )}
        <form onSubmit={handleSubmit} ref={form}>
          <label htmlFor="name">Enter Launcher Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={launcherToEdit.name}
            onChange={handleChange}
            placeholder="enter launcher name"
          />
          <label htmlFor="type">Select the Launcher Type</label>
          <select
            onChange={handleChange}
            name="type"
            id="type"
            value={launcherToEdit.type}
          >
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
            value={launcherToEdit.longitude}
            onChange={handleChange}
            placeholder="enter launcher longitude"
          />

          <label htmlFor="latitude">Enter Launcher Latitude:</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            value={launcherToEdit.latitude}
            onChange={handleChange}
            placeholder="enter launcher latitude"
          />

          <label htmlFor="city">Enter Launcher City:</label>
          <input
            type="text"
            name="city"
            id="city"
            value={launcherToEdit.city}
            onChange={handleChange}
            placeholder="enter launcher city"
          />

          <button type="submit">Submit Form</button>
        </form>
      </div>
    );
  }
}
