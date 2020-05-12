import { useState } from "react";
import {jsx} from "@emotion/core";

const Form = ({ errorMessage, onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>Title</span>
        <input
          type="text"
          name="title"
          required
          placeholder="Give your playlist exchange a name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        <span>Description</span>
        <input
          type="text"
          name="description"
          required
          placeholder="What's the vibe?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <div className="submit">
        <button type="submit">Update swap group</button>
      </div>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
        }
        label > span {
          font-weight: 600;
        }
        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .submit {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          justify-content: space-between;
        }
        .submit > a {
          text-decoration: none;
        }
        .submit > button {
          padding: 0.5rem 1rem;
          cursor: pointer;
          background: #2E3C43;
          border-radius: 4px;
        }
        .submit > button:hover {
          border-color: #888;
        }
        .error {
          color: brown;
          margin: 1rem 0 0;
        }
        form {
          max-width: 21rem;
          padding: 1rem;
          border: 1px solid #2E3C43;
          border-radius: 4px;
        }
      `}</style>
    </form>
  );
};

export default Form;
