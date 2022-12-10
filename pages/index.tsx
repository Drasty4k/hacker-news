import { useEffect, useState, useRef } from "react";
import useSWR from "swr";
import NewsItem from "../components/news-item/news-item";
import { ArrowUpDownIcon } from "../components/UI/icons";
import images from "../public/assets";
import autoAnimate from "@formkit/auto-animate";
import styles from "./index.module.scss";

export const fetcher = (url: string) => fetch(url).then((r) => r.json());

const fetchNewsItem = async (newsId: number) => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${newsId}.json`
  );
  const json = await response.json();
  return json;
};

type ResponseData = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  parts: number[];
  score: number;
  text: string;
  time: number;
  title: string;
  type: string;
  url: string;
  imageSrc?: string;
};

export default function Home() {
  const { data: newsIds, error: newsIdsError } = useSWR<number[]>(
    'https://hacker-news.firebaseio.com/v0/topstories.json?limitToFirst=10&orderBy="$key"',
    { fetcher, revalidateOnFocus: false }
  );
  const [newsItems, setNewsItems] = useState<ResponseData[]>([]);
  const [order, setOrder] = useState<"Asceding" | "Descending">("Asceding");
  const [pressed, setPressed] = useState<boolean>(false);
  const parent = useRef(null);

  useEffect(() => {
    if (newsIds?.length! > 0) {
      newsIds?.map(async (id, index) => {
        const newItem = (await fetchNewsItem(id)) as ResponseData;
        newItem.imageSrc = images[`blob${index + 1}`];
        setNewsItems((prev) => [...prev, newItem]);
      });
    }
    parent.current && autoAnimate(parent.current);
  }, [newsIds]);

  const toggleSort = () => {
    setPressed((prev) => !prev);
    if (parent.current) autoAnimate(parent.current!);
    setOrder((prev) => (prev === "Asceding" ? "Descending" : "Asceding"));
  };

  if (newsIdsError) {
    return <p>error</p>;
  }

  if (!newsIds) {
    return <p>Loading...</p>;
  }

  const sortedNewsItems = newsItems.sort((a, b) => {
    return order === "Asceding" ? b.score - a.score : a.score - b.score;
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Hacker News</h1>
      <button
        onClick={toggleSort}
        className={`${styles.toggleSortBtn} ${pressed ? styles.rotate : ""}`}
      >
        <ArrowUpDownIcon
          strokeColor="#1fb65e"
          width={30}
          height={30}
          className={styles.arrowIcon}
        />
      </button>
      <ul className={styles.newsList} ref={parent}>
        {sortedNewsItems.map(({ id, time, by, title, score, url, imageSrc }) => (
          <NewsItem
            key={id}
            time={time}
            by={by}
            title={title}
            score={score}
            url={url}
            imageSrc={imageSrc}
          />
        ))}
      </ul>
    </div>
  );
}
