import TreeNode from "./TreeNode";

export default function TreeView({
  tree,
  onChange,
}) {
  return (
    <div>
      <TreeNode
        node={tree}
        onChange={onChange}
      />
    </div>
  );
}