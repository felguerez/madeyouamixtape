const Form = ({ errorMessage, onSubmit, spotifyId }) => (
  <form onSubmit={onSubmit}>
    <label>
      <span>Name your swap group</span>
      <input
        type="text"
        name="title"
        required
        placeholder="Songs to put on at a party"
      />
    </label>
    <label>
      <span>Give it a description and theme. What's the vibe?</span>
      <input
        type="text"
        name="description"
        required
        placeholder="How to get the people going"
      />
      <input type="hidden" name="spotify_id" value={spotifyId} />
    </label>

    <div className="submit">
      <button type="submit">Create a swap group</button>
    </div>

    {errorMessage && <p className="error">{errorMessage}</p>}
    <style jsx>{`
      form {
        margin: 1rem 0 0 0;
      }
    `}</style>
  </form>
);

export default Form;
