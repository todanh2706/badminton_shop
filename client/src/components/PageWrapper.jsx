import { motion as Motion } from "framer-motion";

export default function PageWrapper({ children }) {
    return (
        <Motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="min-h-screen"
        >
            {children}
        </Motion.div>
    );
}