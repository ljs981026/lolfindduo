import { motion } from "framer-motion";
import "style/loading.css";

const Loading = () => {
    return (
        <div className="loading_wrap">
            <div className="content_wrap">
                <div className="left_cannon"></div>
                <motion.div
                className="box"
                animate={{x: [0, 800]}}
                transition={{
                    duration: 2,
                    ease: "linear"
                    // repeat: Infinity,
                    // repeatDelay: 1
                }}
                />
                <div className="road"></div>
            </div>            
        </div>
      );
}

export default Loading;