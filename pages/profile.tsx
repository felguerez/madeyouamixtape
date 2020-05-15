import { useUser } from "../lib/hooks";
import Form from "../components/profile/form";
import { useState } from "react";
import { Notification } from "../components/Notification";
import {CopyContainer} from "../shared/styles";

const Profile = () => {
  const identity = useUser();
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    event.preventDefault();

    if (error) setError("");

    const body = {
      display_name: e.currentTarget.display_name.value,
    };

    try {
      const res = await fetch(`/api/users/${identity.user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setNotification("updated swap information");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setError(error.message);
    }
  }
  return (
    <>
      <h1>{identity.user ? "Your profile" : "Loading..."}</h1>
      {notification && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
      <p>Update your info here.</p>
      {identity.user && (
        <Form
          onSubmit={handleSubmit}
          errorMessage={error}
          initialValues={{ display_name: identity.user.display_name }}
        />
      )}
    </>
  );
};

export default Profile;
