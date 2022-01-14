import type { NextPage } from "next";
import { MapPane } from "src/components/MapPane";
import MapData from "../data/mapData.json";

const Home: NextPage = () => {
  return (
    <>
      <MapPane {...MapData.soeda} />
      <br />
      <MapPane {...MapData.iizuka} />
    </>
  );
};

export default Home;
