import Author from "../author/author";
import { ArrowRightIcon } from "../UI/icons";
import styles from "./news-items.module.scss";

type Props = {
  by: string;
  score: number;
  time: number;
  title: string;
  url: string;
};

const NewsItem: React.FC<Props> = ({ time, by, title, score, url }) => {
  const date = new Date(time * 1000).toLocaleDateString("en-UK");

  return (
    <li className={styles.container}>
      <div className={styles.header}>
        <Author name={by} />
        <p className={styles.timestamp}>{date}</p>
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.score}>Score: {score}</p>
      <div className={styles.readMoreBtn}>
        <a href={url} target="_blank" rel="noreferrer">
          Read more
        </a>
        <ArrowRightIcon className={styles.arrowIcon} />
      </div>
    </li>
  );
};

export default NewsItem;
