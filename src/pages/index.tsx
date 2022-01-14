import type { NextPage } from "next";
import { MapPane } from "src/components/MapPane";
import MapData from "../data/mapData.json";

const Home: NextPage = () => {
  return (
    <>
      <MapPane {...MapData.soeda} zoom={10} width={800} height={600} />
      <br />
      <MapPane {...MapData.iizuka} zoom={14} width={500} height={500} />
    </>
  );
};

export default Home;
