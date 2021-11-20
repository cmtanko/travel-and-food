import React from "react";
import clsx from "classnames";
import Modal from "react-modal";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import styles from "../../styles/Video.module.css";
import { getYoutubeVideoById } from "../../lib/videos";

Modal.setAppElement("#__next");

export async function getStaticProps(context) {
  const videoId = context.params.videoid;
  const videoArray = await getYoutubeVideoById(videoId);

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {}
    },
    revalidate: 10 // In seconds
  };
}

export async function getStaticPaths() {
  const listOfVideos = ["Td_EGGd9jx8", "FuqulF8qpG4"];
  const paths = listOfVideos.map((videoid) => ({
    params: { videoid }
  }));

  return { paths, fallback: "blocking" };
}

function htmlDecode(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const Video = ({ video }) => {
  const router = useRouter();
  const videoId = router.query.videoid;
  const { title, publishTime, description, channelTitle, viewCount } = video;
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Food & Travel vlog by Suchan & Ashika"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="70%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
        ></iframe>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div>
              <span className={styles.channelTitle}>{channelTitle}</span>
              <p className={styles.title}>{title}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
