export const sortData = (orderSelection, collectionData) => {
  switch (orderSelection) {
    case "lowestToHighest":
      collectionData.sort((a, b) =>
        a.node.variants.edges[0].node.price.amount.localeCompare(
          b.node.variants.edges[0].node.price.amount
        )
      );
      break;
    case "highestToLowest":
      collectionData.sort(
        (a, b) =>
          -1 *
          a.node.variants.edges[0].node.price.amount.localeCompare(
            b.node.variants.edges[0].node.price.amount
          )
      );
      break;
    case "aToZ":
      collectionData.sort((a, b) => a.node.title.localeCompare(b.node.title));
      break;
    case "zToA":
      collectionData.sort(
        (a, b) => -1 * a.node.title.localeCompare(b.node.title)
      );
      break;
    default:
  }
  return collectionData;
};
