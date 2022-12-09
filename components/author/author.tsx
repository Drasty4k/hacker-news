import useSWR from "swr";
import { fetcher } from "../../pages";
import styles from "./author.module.scss";

type Props = {
  name: string;
};

type ResponseData = {
  about: string;
  created: number;
  delay: number;
  id: number;
  karma: number;
  submitted: number[];
};

const Author: React.FC<Props> = ({ name }) => {
  const { data: user, error: userError } = useSWR<ResponseData>(
    `https://hacker-news.firebaseio.com/v0/user/${name}.json`,
    fetcher
  );

  if (userError) {
    return <p>error</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <p>Author</p>
      <h3>{name}</h3>
      {/* <p>Karma score: {user.karma}</p> */}
    </div>
  );
};

export default Author;
