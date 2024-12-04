import "./App.css";

import { ProductTile } from "./components/product-tile/product-tile.component";
import { Button } from "./button/button.component";
import { genericQuery } from "./queries/genericQuery";
import { hydrogenNode, neonNode } from "./queries/nodes";
import { useState } from "react";
import { sortData } from "./utils/helper-functions";
import { ErrorMessage } from "./error-message/error-message.component";

function App() {
  const [collectionData, setCollectionData] = useState([]);
  const [currentNode, setCurrentNode] = useState("");
  const [error, setError] = useState();
  const [displayOrder, setDisplayOrder] = useState("");

  const onClickHandler = async (node) => {
    const [data, errors] = await genericQuery(node);
    if (errors) {
      setError(errors);
      console.log("Request failed with error code: ", errors);
      return;
    }
    setCollectionData(data.node.products.edges);
    setCurrentNode(data.node.id);
  };

  console.log(collectionData);

  const onChangeHandler = (orderSelection) => {
    setDisplayOrder(orderSelection);
    setCollectionData(sortData(orderSelection, collectionData));
  };

  return (
    <div className="bg-slate-50 w-screen min-h-screen h-fit pt-10 flex flex-col align-center gap-11">
      <h2 className="text-center text-4xl">Choose a collection</h2>
      <div className="w-screen h-12 p-0 flex flex-wrap justify-center align-center gap-12">
        <Button
          onClick={onClickHandler}
          node={neonNode}
          currentNode={currentNode}
          text={"Neon"}
        />
        <Button
          onClick={onClickHandler}
          node={hydrogenNode}
          currentNode={currentNode}
          text={"Hydrogen"}
        />
      </div>

      <div className="flex flex-column flex-wrap justify-center">
        <div className="flex flex-row flex-wrap gap-5 justify-start w-11/12">
          <div className="w-11/12">
            <p>Change display order</p>
            <select
              onChange={(e) => onChangeHandler(e.target.value)}
              disabled={!collectionData.length > 0}
              className="w-fit border border-slate-200 disabled:opacity-75 disabled:border-slate-100"
            >
              <option value="">----</option>
              <option value="lowestToHighest">Lowest to highest price</option>
              <option value="highestToLowest">Highest to lowest price</option>
              <option value="aToZ">A-Z</option>
              <option value="zToA">Z-A</option>
            </select>
          </div>
          {error ? (
            <ErrorMessage />
          ) : (
            collectionData.map((product) => {
              return <ProductTile key={product.node.id} props={product.node} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
