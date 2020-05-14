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
    </form>
  );
};

export default Form;
