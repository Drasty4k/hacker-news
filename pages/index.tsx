import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import NewsItem from "../components/news-item/news-item";
import { ArrowUpDownIcon } from "../components/UI/icons";
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
};

export default function Home() {
  const { data: newsIds, error: newsIdsError } = useSWR<number[]>(
    'https://hacker-news.firebaseio.com/v0/topstories.json?limitToFirst=10&orderBy="$key"',
    { fetcher, revalidateOnFocus: false }
  );
  const [newsItems, setNewsItems] = useState<ResponseData[]>([]);
  const [order, setOrder] = useState<"Asceding" | "Descending">("Asceding");
  const [pressed, setPressed] = useState<boolean>(false);

  useEffect(() => {
    if (newsIds?.length! > 0) {
      newsIds?.map(async (id) => {
        const newItem = (await fetchNewsItem(id)) as ResponseData;
        setNewsItems((prev) => [...prev, newItem]);
      });
    }
  }, [newsIds]);

  const toggleSort = () => {
    setPressed((prev) => !prev);
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
      <button
        onClick={toggleSort}
        className={`${styles.toggleSortBtn} ${pressed ? styles.rotate : ""}`}
      >
        <ArrowUpDownIcon strokeColor="#1fb65e" width={30} height={30} />
      </button>
      <ul className={styles.newsList}>
        {sortedNewsItems.map(({ id, time, by, title, score, url }) => (
          <NewsItem
            key={id}
            time={time}
            by={by}
            title={title}
            score={score}
            url={url}
          />
        ))}
      </ul>
    </div>
  );
}
