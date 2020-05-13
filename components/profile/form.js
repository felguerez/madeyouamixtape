import { useState } from "react";

const Form = ({ errorMessage, onSubmit, initialValues }) => {
  const [displayName, setDisplayName] = useState(initialValues.display_name);
  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>Display name</span>
        <input
          type="text"
          name="display_name"
          required
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="What should we call you?"
        />
      </label>

      <div className="submit">
        <button type="submit">Update your info</button>
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
          background: #2e3c43;
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
          border: 1px solid #2e3c43;
          border-radius: 4px;
        }
      `}</style>
    </form>
  );
};

export default Form;
