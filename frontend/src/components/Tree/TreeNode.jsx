import {
  ChevronRight,
  ChevronDown,
  Plus,
} from "lucide-react";

import { useState } from "react";

export default function TreeNode({
  node,
  onChange,
}) {
  const [collapsed, setCollapsed] =
    useState(false);

  const [editingName, setEditingName] =
    useState(false);

  const updateData = (value) => {
    node.data = value;
    onChange();
  };

  const updateName = (value) => {
    node.name = value;
    onChange();
  };

  const addChild = () => {
    if (node.data) {
      delete node.data;
    }

    if (!node.children) {
      node.children = [];
    }

    node.children.push({
      name: "New Child",
      data: "Data",
    });

    onChange();
  };

  return (
    <div className="ml-6 mt-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setCollapsed(!collapsed)
              }
              className="bg-white/20 p-1 rounded"
            >
              {collapsed ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {editingName ? (
              <input
                autoFocus
                defaultValue={node.name}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateName(
                      e.target.value
                    );

                    setEditingName(false);
                  }
                }}
                className="bg-white text-black px-2 py-1 rounded"
              />
            ) : (
              <h3
                onClick={() =>
                  setEditingName(true)
                }
                className="font-bold cursor-pointer"
              >
                {node.name}
              </h3>
            )}
          </div>

          <button
            onClick={addChild}
            className="bg-white/20 hover:bg-white/30 transition-all px-3 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={16} />
            Add Child
          </button>
        </div>

        {/* Body */}
        {!collapsed && (
          <div className="p-4">
            {node.data && (
              <input
                type="text"
                value={node.data}
                onChange={(e) =>
                  updateData(e.target.value)
                }
                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}

            {node.children?.length > 0 && (
              <div className="mt-4 border-l-2 border-slate-600 pl-2">
                {node.children.map(
                  (child, index) => (
                    <TreeNode
                      key={index}
                      node={child}
                      onChange={onChange}
                    />
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}