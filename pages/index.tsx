import useSWR from "swr";
import NewsItem from "../components/news-item/news-item";
import styles from "./index.module.scss";

export const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Home() {
  const { data: newsIds, error: newsIdsError } = useSWR<number[]>(
    'https://hacker-news.firebaseio.com/v0/topstories.json?limitToFirst=10&orderBy="$key"',
    fetcher
  );

  if (newsIdsError) {
    return <p>error</p>;
  }

  if (!newsIds) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.newsList}>
        {newsIds?.map((id) => (
          <NewsItem key={id} id={id} />
        ))}
      </ul>
    </div>
  );
}
