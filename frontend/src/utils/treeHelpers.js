export const addChildToNode = (node) => {
  const newChild = {
    name: "New Child",
    data: "Data",
  };

  if (node.data) {
    delete node.data;
  }

  if (!node.children) {
    node.children = [];
  }

  node.children.push(newChild);

  return { ...node };
};

export const cleanTree = (node) => {
  const cleaned = {
    name: node.name,
  };

  if (node.data) {
    cleaned.data = node.data;
  }

  if (node.children?.length) {
    cleaned.children = node.children.map(cleanTree);
  }

  return cleaned;
};