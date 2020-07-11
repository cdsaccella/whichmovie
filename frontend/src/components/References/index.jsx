import React from "react";
import "./styles.css";

function References() {
  return (
    <div>
      <h2># References</h2>
      <article className="article-link">
        <h3 className="title">
          <a
            href="https://nostalgic-css.github.io/NES.css/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="snes-jp-logo nes-avatar is-medium"></i>
            <span>NES.css</span>
          </a>
        </h3>
      </article>
      <article className="article-link">
        <h3 className="title">
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="nes-avatar is-medium"
              alt="The Movie Database icon"
              src="https://www.themoviedb.org/assets/1/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg"
            />
            <span>The Movie Database</span>
          </a>
        </h3>
      </article>
    </div>
  );
}

export default References;
