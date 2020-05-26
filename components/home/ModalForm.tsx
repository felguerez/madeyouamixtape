import Modal from "react-modal";
import Form from "./form";
import { useState } from "react";
import Router from "next/router";
import { User } from "../../lib/models/user";

type Props = { user: User; setIsOpen: (isOpen) => void };
export const ModalForm = ({ user, setIsOpen }: Props) => {
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    event.preventDefault();

    if (error) setError("");

    const body = {
      spotify_id: e.currentTarget.spotify_id.value,
      title: e.currentTarget.title.value,
      description: e.currentTarget.description.value,
    };

    try {
      const res = await fetch(`/api/users/${user.id}/swaps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push("/");
        setIsOpen(false);
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setError(error.message);
    }
  }
  return (
    <Modal
      isOpen
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          border: "none",
          padding: "0",
          boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.2)",
        },
      }}
      onRequestClose={() => setIsOpen(false)}
      contentLabel="Make a new swap group"
    >
      <Form
        errorMessage={error}
        onSubmit={handleSubmit}
        spotifyId={user.spotify_id}
      />
    </Modal>
  );
};
