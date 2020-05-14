import { useState } from "react";

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

    </form>
  );
};

export default Form;
