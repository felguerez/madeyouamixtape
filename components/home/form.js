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
  </form>
);

export default Form;
