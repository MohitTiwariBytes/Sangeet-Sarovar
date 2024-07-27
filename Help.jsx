import React from "react";
import "./Help.css";

const Help = () => {
  return (
    <div className="help-page-container">
      <div className="main-help-page">
        <div className="backButton">
          <button onClick={() => (window.location.href = "/")}>
            Back to home
          </button>
        </div>
        <div className="faq">
          <h1>Frequently Asked Questions</h1>
          <div className="faq-item">
            <h2>Why are some songs not showing?</h2>
            <p>
              This app uses the Jamendo API, which provides access to
              royalty-free music only. Therefore, you can only listen to songs
              that are available on Jamendo.
            </p>
          </div>
          <div className="faq-item">
            <h2>How do I search for a song?</h2>
            <p>
              You can search for songs by typing the name of the song, artist,
              or album in the search box on the main page. The results will
              update as you type.
            </p>
          </div>
          <div className="faq-item">
            <h2>How do I play a song?</h2>
            <p>
              Click the "Play" button next to the song you want to listen to.
              The song will start playing in the bottom bar.
            </p>
          </div>
          <div className="faq-item">
            <h2>Can I create a playlist?</h2>
            <p>
              Currently, this app does not support playlist creation. You can,
              however, play individual songs by searching for them.
            </p>
          </div>
          <div className="faq-item">
            <h2>Is there a mobile version of this app?</h2>
            <p>
              Sorry, this app isn't available for mobile devices at this moment
              as the developer of this app is working alone without any team,
              but it's coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
