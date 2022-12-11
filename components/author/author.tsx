import useSWR from "swr";
import { fetcher } from "../../pages";
import { InfoIcon } from "../UI/icons";
import Tooltip from "../UI/tooltip";
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
    { fetcher, revalidateOnFocus: false }
  );

  if (userError) {
    return <p>Something went wrong with the user fetching</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <p>Author</p>
      <h3>{name}</h3>
      <Tooltip content={`Karma score: ${user.karma}`} direction="right">
        <InfoIcon className={styles.infoIcon} width={25} height={25} />
      </Tooltip>
    </div>
  );
};

export default Author;
