import Head from "next/head";

import { getVideos } from "../lib/videos";
import Banner from "../components/banner/banner";
import SectionCards from "../components/card/sectionCards";

import styles from "../styles/Home.module.css";

export async function getServerSideProps() {
  const foodVideos = await getVideos("food");
  const travelVideos = await getVideos("travel");
  const popularVideos = await getVideos("popular");

  return {
    props: {
      foodVideos,
      travelVideos,
      popularVideos
    }
  };
}

export default function Home({ travelVideos, foodVideos, popularVideos }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Travel & Food</title>
        <meta
          name="description"
          content="Food & Travel vlog by Suchan & Ashika"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner
        title="Traveling Bali"
        subTitle="Trip to remember"
        imgUrl="/static/wallpaper.jpeg"
        videoId="Td_EGGd9jx8"
      />

      <div className={styles.sectionWrapper}>
        <SectionCards
          title="Travel Videos"
          videos={travelVideos}
          size="large"
        />
        <SectionCards
          title="Popular Videos"
          videos={popularVideos}
          size="small"
        />
        <SectionCards
          title="Home Kitchen | Session 4"
          videos={foodVideos.filter((v, i) => {
            if (i >= 0 && i < 4) {
              return v;
            }
          })}
          size="small"
        />
        <SectionCards
          title="Home Kitchen | Session 3"
          videos={foodVideos.filter((v, i) => {
            if (i >= 4 && i < 12) {
              return v;
            }
          })}
          size="small"
        />

        <SectionCards
          title="Home Kitchen | Session 2"
          videos={foodVideos.filter((v, i) => {
            if (i >= 12 && i < 22) {
              return v;
            }
          })}
          size="small"
        />

        <SectionCards
          title="Home Kitchen | Session 11"
          videos={foodVideos.filter((v, i) => {
            if (i >= 22 ) {
              return v;
            }
          })}
          size="small"
        />
      </div>
    </div>
  );
}
