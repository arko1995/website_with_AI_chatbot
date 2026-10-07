const YouTubeShowcase = ({ playlistId }) => {
  return (
    <section className="youtube-showcase">
      <div className="youtube-showcase-heading">
        <span>SKYLINEDB3 / FILMS</span>
        <h2>See the work in motion</h2>
      </div>
      <div className="youtube-player">
        <iframe
          src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
          title="SkylineDB3 project videos"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default YouTubeShowcase;
