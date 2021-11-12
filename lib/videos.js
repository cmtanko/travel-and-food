const YOUTUBE_API_KEY = 'AIzaSyDtllAkAi4F0uZwc1bDsjuMCkeShCzOI9A' ;//process.env.YOUTUBE_API_KEY;
export const getVideos = async (type = "food") => {
  const PLAYLIST = {
    food: "PLDihokjzJUJA-G6xs2lS5Y2EHHxD9Gzt7",
    travel: "PLDihokjzJUJDbFAo7duWoXpQ89SVze6RW",
    popular: "PLDihokjzJUJB2ttsZPiDlUVEsVD2v7QPW"
  };

  try {
    const reponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST[type]}&key=${YOUTUBE_API_KEY}`
    );

    const data = await reponse.json();
    if (data?.error) {
        return [];
    }
    
    return data.items.map((item) => {
      const id = item?.snippet?.resourceId?.videoId
      return {
        id,
        title: item?.snippet?.title,
        imgUrl: item?.snippet?.thumbnails?.high?.url
      };
    });
  } catch (error) {
    return [];
  }
};

export const getYoutubeVideoById = async (videoId) => {
  try {
    const reponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );

    const data = await reponse.json();
    return data.items.map((item) => {
      const id = item?.id?.videoId || item.id;
      return {
        id,
        title: item?.snippet?.title,
        imgUrl: item?.snippet?.thumbnails?.high?.url,
        description: item?.snippet?.description,
        publishTime: item?.snippet?.publishedAt,
        channelTitle: item?.snippet?.channelTitle,
        viewCount: item?.statistics?.viewCount
      };
    });
  } catch (error) {
    return [];
  }
};
