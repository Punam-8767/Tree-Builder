// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App


// import MainLayout from "./layouts/MainLayout";
// import AppRoutes from "./routes/AppRoutes";

// export default function App() {
//   return (
//     <MainLayout>
//       <AppRoutes />
//     </MainLayout>
//   );
// }





// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   ChevronDown,
//   ChevronRight,
//   Plus,
//   Database,
//   FileJson,
// } from "lucide-react";

// const API = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
// });

// const DEFAULT_TREE = {
//   name: "root",
//   children: [
//     {
//       name: "child1",
//       children: [
//         {
//           name: "child1-child1",
//           data: "c1-c1 Hello",
//         },
//         {
//           name: "child1-child2",
//           data: "c1-c2 JS",
//         },
//       ],
//     },
//     {
//       name: "child2",
//       data: "c2 World",
//     },
//   ],
// };

// export default function App() {
//   const [trees, setTrees] = useState([]);
//   const [loading, setLoading] =
//     useState(true);

//   const [exportModal, setExportModal] =
//     useState(false);

//   const [exportData, setExportData] =
//     useState(null);

//   useEffect(() => {
//     fetchTrees();
//   }, []);

//   const fetchTrees = async () => {
//     try {
//       const res = await API.get("/trees");

//       if (res.data.data.length > 0) {
//         setTrees(res.data.data);
//       } else {
//         setTrees([
//           {
//             id: null,
//             tree_data: DEFAULT_TREE,
//           },
//         ]);
//       }
//     } catch (err) {
//       console.log(err);

//       setTrees([
//         {
//           id: null,
//           tree_data: DEFAULT_TREE,
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cleanTree = (node) => {
//     const cleaned = {
//       name: node.name,
//     };

//     if (node.data) {
//       cleaned.data = node.data;
//     }

//     if (node.children?.length) {
//       cleaned.children =
//         node.children.map(cleanTree);
//     }

//     return cleaned;
//   };

//   const handleExport = async (tree) => {
//     const cleaned = cleanTree(
//       tree.tree_data
//     );

//     setExportData(cleaned);

//     setExportModal(true);

//     try {
//       if (tree.id) {
//         await API.put(
//           `/trees/${tree.id}`,
//           {
//             tree: cleaned,
//           }
//         );
//       } else {
//         await API.post("/trees", {
//           tree: cleaned,
//         });

//         fetchTrees();
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const refresh = () => {
//     setTrees([...trees]);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-3xl font-bold">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-10">
      
//       {/* Header */}
//       <div className="max-w-7xl mx-auto mb-12">
        
//         <div className="flex items-center gap-4 mb-4">
//           <div className="bg-blue-600 p-4 rounded-2xl shadow-2xl">
//             <Database size={35} />
//           </div>

//           <div>
//             <h1 className="text-5xl font-black">
//               AIMonk Tree Builder
//             </h1>

//             <p className="text-slate-400 mt-2 text-lg">
//               Dynamic Recursive Nested Tags Tree
//             </p>
//           </div>
//         </div>

//         <div className="h-[1px] bg-slate-700 mt-8"></div>
//       </div>

//       {/* Trees */}
//       <div className="max-w-7xl mx-auto">
//         {trees.map((tree, index) => (
//           <div
//             key={index}
//             className="mb-20"
//           >
            
//             {/* Toolbar */}
//             <div className="flex justify-end mb-6">
//               <button
//                 onClick={() =>
//                   handleExport(tree)
//                 }
//                 className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-all duration-300 px-7 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-2xl"
//               >
//                 <FileJson size={22} />
//                 Export Tree
//               </button>
//             </div>

//             {/* Tree */}
//             <TreeNode
//               node={tree.tree_data}
//               refresh={refresh}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Export Modal */}
//       {exportModal && (
//         <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-10">
          
//           <div className="w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.4)]">
            
//             {/* Modal Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-5 flex justify-between items-center">
              
//               <div>
//                 <h2 className="text-3xl font-black">
//                   Exported JSON
//                 </h2>

//                 <p className="text-blue-100 mt-1">
//                   Backend synced successfully
//                 </p>
//               </div>

//               <button
//                 onClick={() =>
//                   setExportModal(false)
//                 }
//                 className="bg-white/20 hover:bg-white/30 px-5 py-2 rounded-xl font-semibold"
//               >
//                 Close
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="p-8">
//               <pre className="bg-slate-950 rounded-2xl p-6 overflow-auto max-h-[600px] text-green-400 text-sm border border-slate-800">
//                 {JSON.stringify(
//                   exportData,
//                   null,
//                   2
//                 )}
//               </pre>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function TreeNode({
//   node,
//   refresh,
// }) {
//   const [collapsed, setCollapsed] =
//     useState(false);

//   const [editingName, setEditingName] =
//     useState(false);

//   const updateData = (value) => {
//     node.data = value;
//     refresh();
//   };

//   const updateName = (value) => {
//     node.name = value;
//     refresh();
//   };

//   const addChild = () => {
//     if (node.data) {
//       delete node.data;
//     }

//     if (!node.children) {
//       node.children = [];
//     }

//     node.children.push({
//       name: "New Child",
//       data: "Data",
//     });

//     refresh();
//   };

//   return (
//     <div className="ml-6 mt-5">
      
//       {/* Card */}
//       <div className="rounded-3xl overflow-hidden border border-slate-700 bg-slate-900 shadow-[0_0_40px_rgba(15,23,42,0.8)] hover:shadow-[0_0_50px_rgba(59,130,246,0.2)] transition-all duration-300">
        
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-5 py-4 flex justify-between items-center">
          
//           <div className="flex items-center gap-4">
            
//             {/* Collapse */}
//             <button
//               onClick={() =>
//                 setCollapsed(!collapsed)
//               }
//               className="bg-white/20 hover:bg-white/30 transition-all p-2 rounded-xl"
//             >
//               {collapsed ? (
//                 <ChevronRight size={18} />
//               ) : (
//                 <ChevronDown size={18} />
//               )}
//             </button>

//             {/* Editable Name */}
//             {editingName ? (
//               <input
//                 autoFocus
//                 defaultValue={node.name}
//                 onKeyDown={(e) => {
//                   if (
//                     e.key === "Enter"
//                   ) {
//                     updateName(
//                       e.target.value
//                     );

//                     setEditingName(
//                       false
//                     );
//                   }
//                 }}
//                 className="bg-white text-black px-4 py-2 rounded-xl font-semibold outline-none"
//               />
//             ) : (
//               <h2
//                 onClick={() =>
//                   setEditingName(true)
//                 }
//                 className="text-xl font-black cursor-pointer hover:text-blue-100 transition-all"
//               >
//                 {node.name}
//               </h2>
//             )}
//           </div>

//           {/* Add Child */}
//           <button
//             onClick={addChild}
//             className="bg-white/20 hover:bg-white/30 transition-all px-5 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-xl"
//           >
//             <Plus size={18} />
//             Add Child
//           </button>
//         </div>

//         {/* Body */}
//         {!collapsed && (
//           <div className="p-6">
            
//             {/* Data Input */}
//             {node.data && (
//               <div className="mb-5">
                
//                 <label className="block mb-3 text-slate-400 font-semibold">
//                   Data
//                 </label>

//                 <input
//                   type="text"
//                   value={node.data}
//                   onChange={(e) =>
//                     updateData(
//                       e.target.value
//                     )
//                   }
//                   className="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none rounded-2xl px-5 py-4 text-lg shadow-inner"
//                 />
//               </div>
//             )}

//             {/* Children */}
//             {node.children?.length >
//               0 && (
//               <div className="border-l-2 border-blue-500/40 pl-4">
//                 {node.children.map(
//                   (
//                     child,
//                     index
//                   ) => (
//                     <TreeNode
//                       key={index}
//                       node={child}
//                       refresh={
//                         refresh
//                       }
//                     />
//                   )
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }







// import { useEffect, useState } from "react";
// import axios from "axios";
// // import {
// //   ChevronDown,
// //   ChevronRight,
// //   Plus,
// //   Database,
// //   FileJson,
// //   Sparkles,
// // } from "lucide-react";
// import {
//   ChevronDown,
//   ChevronRight,
//   Plus,
//   Database,
//   FileJson,
//   Sparkles,
//   Copy,
//   Check,
// } from "lucide-react";
// const API = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
// });

// const DEFAULT_TREE = {
//   name: "root",
//   children: [
//     {
//       name: "child1",
//       children: [
//         {
//           name: "child1-child1",
//           data: "c1-c1 Hello",
//         },
//         {
//           name: "child1-child2",
//           data: "c1-c2 JS",
//         },
//       ],
//     },
//     {
//       name: "child2",
//       data: "c2 World",
//     },
//   ],
// };

// export default function App() {
//   const [trees, setTrees] = useState([]);
//   const [loading, setLoading] =
//     useState(true);

//   const [exportModal, setExportModal] =
//     useState(false);

//   const [exportData, setExportData] =
//     useState(null);

//   useEffect(() => {
//     fetchTrees();
//   }, []);

//   const fetchTrees = async () => {
//     try {
//       const res = await API.get("/trees");

//       if (res.data.data.length > 0) {
//         setTrees(res.data.data);
//       } else {
//         setTrees([
//           {
//             id: null,
//             tree_data: DEFAULT_TREE,
//           },
//         ]);
//       }
//     } catch (err) {
//       console.log(err);

//       setTrees([
//         {
//           id: null,
//           tree_data: DEFAULT_TREE,
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cleanTree = (node) => {
//     const cleaned = {
//       name: node.name,
//     };

//     if (node.data) {
//       cleaned.data = node.data;
//     }

//     if (node.children?.length) {
//       cleaned.children =
//         node.children.map(cleanTree);
//     }

//     return cleaned;
//   };

//   const handleExport = async (tree) => {
//     const cleaned = cleanTree(
//       tree.tree_data
//     );

//     setExportData(cleaned);

//     setExportModal(true);

//     try {
//       if (tree.id) {
//         await API.put(
//           `/trees/${tree.id}`,
//           {
//             tree: cleaned,
//           }
//         );
//       } else {
//         await API.post("/trees", {
//           tree: cleaned,
//         });

//         fetchTrees();
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const refresh = () => {
//     setTrees([...trees]);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#07111f] flex items-center justify-center">
//         <div className="text-4xl font-black text-blue-400 animate-pulse">
//           Loading Tree...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#07111f] text-white overflow-hidden">
      
//       {/* Background Glow */}
//       <div className="fixed top-[-200px] left-[-100px] w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full"></div>

//       <div className="fixed bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-indigo-500/10 blur-[140px] rounded-full"></div>

//       {/* Header */}
//       <div className="max-w-7xl mx-auto px-8 pt-14 pb-10 relative z-10">
        
//         <div className="flex items-center justify-between flex-wrap gap-6">
          
//           <div className="flex items-center gap-5">
            
//             <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.5)]">
//               <Database size={38} />
//             </div>

//             <div>
//               <h1 className="text-6xl font-black tracking-tight">
//                 AIMonk Tree Builder
//               </h1>

//               <p className="text-slate-400 mt-3 text-lg flex items-center gap-2">
//                 <Sparkles size={18} />
//                 Dynamic Recursive Tree Management System
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="mt-10 h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
//       </div>

//       {/* Trees */}
//       <div className="max-w-7xl mx-auto px-8 pb-20 relative z-10">
        
//         {trees.map((tree, index) => (
//           <div
//             key={index}
//             className="mb-16"
//           >
            
//             {/* Toolbar */}
//             <div className="flex justify-end mb-8">
              
//               <button
//                 onClick={() =>
//                   handleExport(tree)
//                 }
//                 className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-[0_10px_40px_rgba(59,130,246,0.35)]"
//               >
//                 <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all"></div>

//                 <FileJson size={22} />

//                 <span>
//                   Export Tree
//                 </span>
//               </button>
//             </div>

//             {/* Tree */}
//             <TreeNode
//               node={tree.tree_data}
//               refresh={refresh}
//               level={0}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Export Modal */}
//       {exportModal && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-8">
          
//           <div className="w-full max-w-5xl rounded-[32px] overflow-hidden border border-slate-700 bg-[#0b1627] shadow-[0_0_100px_rgba(59,130,246,0.25)]">
            
//             {/* Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 flex items-center justify-between">
              
//               <div>
//                 <h2 className="text-3xl font-black">
//                   Exported JSON
//                 </h2>

//                 <p className="text-blue-100 mt-2">
//                   Tree synced with backend successfully
//                 </p>
//               </div>

//               <button
//                 onClick={() =>
//                   setExportModal(false)
//                 }
//                 className="bg-white/20 hover:bg-white/30 transition-all px-5 py-3 rounded-2xl font-bold"
//               >
//                 Close
//               </button>
//             </div>

//             {/* Body */}
//             <div className="p-8">
              
//               <pre className="bg-[#07111f] border border-slate-800 rounded-3xl p-8 overflow-auto max-h-[650px] text-green-400 text-sm leading-7">
//                 {JSON.stringify(
//                   exportData,
//                   null,
//                   2
//                 )}
//               </pre>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function TreeNode({
//   node,
//   refresh,
//   level,
// }) {
//   const [collapsed, setCollapsed] =
//     useState(false);

//   const [editingName, setEditingName] =
//     useState(false);

//   const updateData = (value) => {
//     node.data = value;
//     refresh();
//   };

//   const updateName = (value) => {
//     node.name = value;
//     refresh();
//   };

//   const addChild = () => {
//     if (node.data) {
//       delete node.data;
//     }

//     if (!node.children) {
//       node.children = [];
//     }

//     node.children.push({
//       name: "New Child",
//       data: "Data",
//     });

//     refresh();
//   };

//   return (
//     <div
//       className={`relative ${
//         level !== 0
//           ? "ml-10 mt-5"
//           : ""
//       }`}
//     >
      
//       {/* Connector Line */}
//       {level !== 0 && (
//         <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/60 to-transparent"></div>
//       )}

//       {/* Main Card */}
//       <div className="rounded-[28px] overflow-hidden border border-slate-700/80 bg-white/5 backdrop-blur-xl shadow-[0_10px_50px_rgba(0,0,0,0.45)]">
        
//         {/* Header */}
//         <div className="bg-gradient-to-r from-[#5ea3f1] to-[#4687e8] px-5 py-4 flex items-center justify-between">
          
//           <div className="flex items-center gap-4">
            
//             {/* Collapse Button */}
//             <button
//               onClick={() =>
//                 setCollapsed(!collapsed)
//               }
//               className="w-11 h-11 rounded-xl bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center"
//             >
//               {collapsed ? (
//                 <ChevronRight size={18} />
//               ) : (
//                 <ChevronDown size={18} />
//               )}
//             </button>

//             {/* Editable Name */}
//             {editingName ? (
//               <input
//                 autoFocus
//                 defaultValue={node.name}
//                 onKeyDown={(e) => {
//                   if (
//                     e.key === "Enter"
//                   ) {
//                     updateName(
//                       e.target.value
//                     );

//                     setEditingName(
//                       false
//                     );
//                   }
//                 }}
//                 className="bg-white text-black px-4 py-2 rounded-xl font-bold outline-none shadow-lg"
//               />
//             ) : (
//               <h2
//                 onClick={() =>
//                   setEditingName(true)
//                 }
//                 className="text-xl font-black cursor-pointer tracking-wide"
//               >
//                 {node.name}
//               </h2>
//             )}
//           </div>

//           {/* Add Child */}
//           <button
//             onClick={addChild}
//             className="bg-white/20 hover:bg-white/30 transition-all px-5 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-lg"
//           >
//             <Plus size={18} />
//             Add Child
//           </button>
//         </div>

//         {/* Body */}
//         {!collapsed && (
//           <div className="bg-[#dfe7f3] p-6">
            
//             {/* Input */}
//             {node.data && (
//               <div className="mb-5">
                
//                 <label className="block text-slate-700 font-bold mb-3">
//                   Data
//                 </label>

//                 <input
//                   type="text"
//                   value={node.data}
//                   onChange={(e) =>
//                     updateData(
//                       e.target.value
//                     )
//                   }
//                   className="w-full bg-white border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 outline-none rounded-2xl px-5 py-4 text-slate-800 font-semibold shadow-inner transition-all"
//                 />
//               </div>
//             )}

//             {/* Children */}
//             {node.children?.length >
//               0 && (
//               <div className="space-y-5">
//                 {node.children.map(
//                   (
//                     child,
//                     index
//                   ) => (
//                     <TreeNode
//                       key={index}
//                       node={child}
//                       refresh={
//                         refresh
//                       }
//                       level={
//                         level + 1
//                       }
//                     />
//                   )
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import axios from "axios";

import {
  ChevronDown,
  ChevronRight,
  Plus,
  Database,
  FileJson,
  Copy,
  Check,
} from "lucide-react";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

const DEFAULT_TREE = {
  name: "root",
  children: [
    {
      name: "child1",
      children: [
        {
          name: "child1-child1",
          data: "c1-c1 Hello",
        },
        {
          name: "child1-child2",
          data: "c1-c2 JS",
        },
      ],
    },
    {
      name: "child2",
      data: "c2 World",
    },
  ],
};

export default function App() {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] =
    useState(true);

  const [exportModal, setExportModal] =
    useState(false);

  const [exportData, setExportData] =
    useState(null);

  const [copied, setCopied] =
    useState(false);

  useEffect(() => {
    fetchTrees();
  }, []);

  const fetchTrees = async () => {
    try {
      const res = await API.get("/trees");

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

      setTrees([
        {
          id: null,
          tree_data: DEFAULT_TREE,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const cleanTree = (node) => {
    const cleaned = {
      name: node.name,
    };

    if (node.data) {
      cleaned.data = node.data;
    }

    if (node.children?.length) {
      cleaned.children =
        node.children.map(cleanTree);
    }

    return cleaned;
  };

  const handleExport = async (tree) => {
    const cleaned = cleanTree(
      tree.tree_data
    );

    setExportData(cleaned);

    setExportModal(true);

    try {
      if (tree.id) {
        await API.put(
          `/trees/${tree.id}`,
          {
            tree: cleaned,
          }
        );
      } else {
        await API.post("/trees", {
          tree: cleaned,
        });

        fetchTrees();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const copyJson = async () => {
    await navigator.clipboard.writeText(
      JSON.stringify(
        exportData,
        null,
        2
      )
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const refresh = () => {
    setTrees([...trees]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07111f] flex items-center justify-center text-white text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-8">
        
        <div className="flex items-center gap-4">
          
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <Database size={26} />
          </div>

          <div>
            <h1 className="text-4xl font-black">
              AIMonk Tree Builder
            </h1>

            <p className="text-slate-400 mt-1 text-sm">
              Dynamic Recursive Nested Tags Tree
            </p>
          </div>
        </div>

        <div className="h-[1px] bg-slate-800 mt-6"></div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        
        {trees.map((tree, index) => (
          <div
            key={index}
            className="mb-10"
          >
            
            {/* Toolbar */}
            <div className="flex justify-end mb-4">
              
              <button
                onClick={() =>
                  handleExport(tree)
                }
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition-all px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg"
              >
                <FileJson size={18} />

                Export Tree
              </button>
            </div>

            {/* Tree */}
            <TreeNode
              node={tree.tree_data}
              refresh={refresh}
              level={0}
            />
          </div>
        ))}
      </div>

      {/* Export Modal */}
      {exportModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          
          <div className="w-full max-w-4xl bg-[#0d1726] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
              
              <div>
                <h2 className="text-2xl font-black">
                  Exported JSON
                </h2>

                <p className="text-blue-100 text-sm mt-1">
                  Synced with backend
                </p>
              </div>

              <div className="flex items-center gap-3">
                
                <button
                  onClick={copyJson}
                  className="bg-white/20 hover:bg-white/30 transition-all px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>

                <button
                  onClick={() =>
                    setExportModal(false)
                  }
                  className="bg-white/20 hover:bg-white/30 transition-all px-4 py-2 rounded-xl text-sm font-semibold"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              
              <pre className="bg-[#07111f] border border-slate-800 rounded-2xl p-5 overflow-auto max-h-[550px] text-green-400 text-sm leading-6">
                {JSON.stringify(
                  exportData,
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TreeNode({
  node,
  refresh,
  level,
}) {
  const [collapsed, setCollapsed] =
    useState(false);

  const [editingName, setEditingName] =
    useState(false);

  const updateData = (value) => {
    node.data = value;
    refresh();
  };

  const updateName = (value) => {
    node.name = value;
    refresh();
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

    refresh();
  };

  return (
    <div
      className={`relative ${
        level !== 0
          ? "ml-7 mt-4"
          : ""
      }`}
    >
      
      {/* Connector */}
      {level !== 0 && (
        <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-blue-500/30"></div>
      )}

      {/* Card */}
      <div className="rounded-2xl overflow-hidden border border-slate-700 bg-[#111c2d] shadow-lg">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#5ea3f1] to-[#4687e8] px-4 py-3 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            
            {/* Collapse */}
            <button
              onClick={() =>
                setCollapsed(!collapsed)
              }
              className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center"
            >
              {collapsed ? (
                <ChevronRight size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>

            {/* Name */}
            {editingName ? (
              <input
                autoFocus
                defaultValue={node.name}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter"
                  ) {
                    updateName(
                      e.target.value
                    );

                    setEditingName(
                      false
                    );
                  }
                }}
                className="bg-white text-black px-3 py-1 rounded-lg text-sm font-semibold outline-none"
              />
            ) : (
              <h2
                onClick={() =>
                  setEditingName(true)
                }
                className="text-base font-bold cursor-pointer"
              >
                {node.name}
              </h2>
            )}
          </div>

          {/* Add Child */}
          <button
            onClick={addChild}
            className="bg-white/20 hover:bg-white/30 transition-all px-3 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold"
          >
            <Plus size={16} />
            Add Child
          </button>
        </div>

        {/* Body */}
        {!collapsed && (
          <div className="bg-[#dfe7f3] p-4">
            
            {/* Data */}
            {node.data && (
              <div className="mb-4">
                
                <label className="block text-slate-700 text-sm font-semibold mb-2">
                  Data
                </label>

                <input
                  type="text"
                  value={node.data}
                  onChange={(e) =>
                    updateData(
                      e.target.value
                    )
                  }
                  className="w-full bg-white border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none rounded-xl px-4 py-3 text-sm text-slate-800"
                />
              </div>
            )}

            {/* Children */}
            {node.children?.length >
              0 && (
              <div className="space-y-4">
                {node.children.map(
                  (
                    child,
                    index
                  ) => (
                    <TreeNode
                      key={index}
                      node={child}
                      refresh={
                        refresh
                      }
                      level={
                        level + 1
                      }
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