const Form = ({ errorMessage, onSubmit, spotifyId }) => (
  <form onSubmit={onSubmit}>
    <label>
      <span>Title</span>
      <input
        type="text"
        name="title"
        required
        placeholder="Give your playlist exchange a name"
      />
    </label>
    <label>
      <span>Description</span>
      <input
        type="text"
        name="description"
        required
        placeholder="What's the vibe?"
      />
      <input type="hidden" name="spotify_id" value={spotifyId} />
    </label>

    <div className="submit">
      <button type="submit">Create a swap group</button>
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
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .submit > button:hover {
        border-color: #888;
      }
      .error {
        color: brown;
        margin: 1rem 0 0;
      }
    `}</style>
  </form>
);

export default Form;
