import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="hero">
      <h1>30 Days, 30 Commits</h1>
        <p className="description">
        A 30-day coding challenge where I build a full-featured React application, making one commit per day. Follow my progress as I demonstrate clean architecture, modern UI, and practical coding practices from setup to deployment.
        </p>

    </div>  
      {/* Text and paragraphs */}
      <p>This is a paragraph to test typography.</p>
      <small>This is small text.</small>

      {/* Inputs */}
      <input type="text" placeholder="Text input" />
      <input type="password" placeholder="Password input" />
      <textarea placeholder="Textarea input"></textarea>

      {/* Select / dropdown */}
      <select>
        <option value="">Choose an option</option>
        <option value="1">Option One</option>
        <option value="2">Option Two</option>
      </select>

      {/* Buttons */}
      <button>Click Me</button>
      <input  />

      {/* Checkboxes / radios */}
      <label>
        <input type="checkbox" /> Checkbox
      </label>
      <label>
        <input type="radio" name="radio-test" /> Radio 1
      </label>
      <label>
        <input type="radio" name="radio-test" /> Radio 2
      </label>



  </div>
  );
}
