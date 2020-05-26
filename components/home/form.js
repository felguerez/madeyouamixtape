import {GRAY, lightLinearGradient} from "../../shared/styles";

const Form = ({ errorMessage, onSubmit, spotifyId }) => (
  <form onSubmit={onSubmit}>
    <h2>Make a new swap group</h2>
    <p>
      Give it a theme. Let your friends know what kinda vibe you're expecting.
      What's the genre, mood, challenge you're looking for?
    </p>
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
        padding: 2rem;
        opacity: 1;
        z-index: 10;
      }
      h2,
      p {
        margin-top: 0;
      }
    `}</style>
  </form>
);

export default Form;
