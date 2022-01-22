import type { NextPage } from "next";
import { MapPane } from "src/components/MapPane";
import MapData from "../data/mapData.json";

import styles from "src/styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>Open Layers Demo</h1>
        <MapPane {...MapData.soeda} zoom={10} width={800} height={600} />
      </div>
    </div>
  );
};

export default Home;
