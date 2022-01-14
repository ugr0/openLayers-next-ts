import type { NextPage } from "next";
import { Map } from "src/components/map";
import MapPane from "src/components/MapPane";

const Home: NextPage = () => {
  return (
    <>
      {/* <Map></Map> */}
      <MapPane />
    </>
  );
};

export default Home;
