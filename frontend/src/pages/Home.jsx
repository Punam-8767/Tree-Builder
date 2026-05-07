import { useEffect, useState } from "react";

import {
  createTree,
  getTrees,
  updateTree,
} from "../api/treeApi";

import TreeView from "../components/Tree/TreeView";
import TreeToolbar from "../components/Tree/TreeToolbar";
import ExportModal from "../components/Tree/ExportModal";
import Loader from "../components/Common/Loader";

import { DEFAULT_TREE } from "../utils/constants";
import { cleanTree } from "../utils/treeHelpers";

export default function Home() {
  const [trees, setTrees] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [exportData, setExportData] =
    useState(null);

  useEffect(() => {
    fetchTrees();
  }, []);

  const fetchTrees = async () => {
    try {
      const res = await getTrees();

      if (res.data.data.length > 0) {
        setTrees(res.data.data);
      } else {
        setTrees([
          {
            id: null,
            tree_data: DEFAULT_TREE,
          },
        ]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTreeChange = () => {
    setTrees([...trees]);
  };

  const handleExport = async (tree) => {
    const cleaned = cleanTree(
      tree.tree_data
    );

    setExportData(cleaned);

    setModalOpen(true);

    try {
      if (tree.id) {
        await updateTree(tree.id, {
          tree: cleaned,
        });
      } else {
        const res = await createTree({
          tree: cleaned,
        });

        fetchTrees();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-5xl font-black mb-3">
          AIMonk Nested Tree
        </h1>

        <p className="text-slate-400">
          Dynamic Recursive Tree Editor
        </p>
      </div>

      {trees.map((tree, index) => (
        <div
          key={index}
          className="mb-20"
        >
          <TreeToolbar
            onExport={() =>
              handleExport(tree)
            }
          />

          <TreeView
            tree={tree.tree_data}
            onChange={handleTreeChange}
          />
        </div>
      ))}

      <ExportModal
        open={modalOpen}
        onClose={() =>
          setModalOpen(false)
        }
        jsonData={exportData}
      />
    </div>
  );
}