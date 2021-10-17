import React from "react";
import YouTube from "react-youtube";
import classNames from "classnames";

import { getYoutubeIdFromURL } from "../../util/youtube-video-id";
import { media } from "./knowledge-check.prop-types";

const KnowledgeCheckImage = ({ url }) => {
  const [isZoomed, zoom] = React.useState(false);
  const handleClick = React.useCallback(
    (e) => {
      zoom(!isZoomed);
    },
    [zoom, isZoomed]
  );
  const imgClassName = React.useMemo(
    () =>
      classNames("knowledge-check__img", {
        "knowledge-check__img--zoomed": isZoomed,
      }),
    [isZoomed]
  );

  return (
    <figure className="knowledge-check__figure">
      <img src={url} alt="" className={imgClassName} onClick={handleClick} />
    </figure>
  );
};

KnowledgeCheckImage.propTypes = {
  url: media.url,
};

const KnowledgeCheckYouTube = ({ url }) => {
  const videoId = React.useMemo(() => getYoutubeIdFromURL(url), [url]);

  if (!videoId) return <pre>Missing or invalid YouTube video url: {url}</pre>;

  return (
    <div className="knowledge-check__youtube-container">
      <YouTube videoId={videoId} />
    </div>
  );
};

KnowledgeCheckYouTube.propTypes = {
  url: media.url,
};

const KnowledgeCheckError = () => {
  return <pre>Invalid or unsupported media type for question</pre>;
};

function KnowledgeCheckMedia({ type, url }) {
  const Component = React.useMemo(() => {
    switch (type) {
      case "image":
        return KnowledgeCheckImage;
      case "youtube":
        return KnowledgeCheckYouTube;
      default:
        return KnowledgeCheckError;
    }
  }, [type]);

  return (
    <div className="knowledge-check__media">
      <Component url={url} />
    </div>
  );
}

KnowledgeCheckMedia.propTypes = media;

export default KnowledgeCheckMedia;
