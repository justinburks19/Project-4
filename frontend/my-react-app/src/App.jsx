import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {TypeOf} from "../pages/typeof.jsx";
import {Bang} from "../pages/bang.jsx";
export default function App() {
  const [show, setShow] = useState(true);

  return (
    <div className="flex flex-row mx-auto items-start min-h-screen bg-black justify-center">
      {/* type of explained section */}
      <div className="px-2">
      <TypeOf/>
      <Bang/>
    </div>
    </div>
  );
}
