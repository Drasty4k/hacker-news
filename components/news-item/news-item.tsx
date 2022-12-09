import useSWR from "swr";
import { fetcher } from "../../pages/index";
import Author from "../author/author";
import { ArrowRightIcon } from "../UI/icons";
import styles from "./news-items.module.scss";

type Props = {
  id: number;
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

const NewsItem: React.FC<Props> = ({ id }) => {
  const { data: newsItem, error: newsItemsError } = useSWR<ResponseData>(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
    fetcher
  );

  if (newsItemsError) {
    return <p>error</p>;
  }

  if (!newsItem) {
    return <p>Loading...</p>;
  }

  const date = new Date(newsItem.time * 1000).toLocaleDateString("en-UK");

  return (
    <li className={styles.container}>
      <div className={styles.header}>
        <Author name={newsItem.by} />
        <p className={styles.timestamp}>{date}</p>
      </div>
      <h1 className={styles.title}>{newsItem.title}</h1>
      <p className={styles.score}>Score: {newsItem.score}</p>
      <div className={styles.readMoreBtn}>
        <a href={newsItem.url} target="_blank" rel="noreferrer">
          Read more
        </a>
        <ArrowRightIcon className={styles.arrowIcon} />
      </div>
    </li>
  );
};

export default NewsItem;
