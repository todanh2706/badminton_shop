import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./components/PageWrapper";
import HomeLayout from "./components/HomeLayout";
import Home from "./pages/Home";
import Sign_in from "./pages/Sign_in";
import Sign_up from "./pages/Sign_up";
import VerifyOtp from "./pages/Verify_otp";
import MyAccount from "./pages/MyAccount";
import ProtectedRoute from "./components/ProtectedRoute";
import Accessories from "./pages/Accessories";
import Racquets from "./pages/Racquets";
import Apparels from "./pages/Apparels";
import Bags from "./pages/Bags";
import Shuttlecocks from "./pages/Shuttlecocks";
import Strings from "./pages/Strings";
import Shoes from "./pages/Shoes";


export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomeLayout />}>
          <Route index element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="accessories" element={<PageWrapper><Accessories /></PageWrapper>} />
          <Route path="racquets" element={<PageWrapper><Racquets /></PageWrapper>} />
          <Route path="apparels" element={<PageWrapper><Apparels /></PageWrapper>} />
          <Route path="bags" element={<PageWrapper><Bags /></PageWrapper>} />
          <Route path="shuttlecocks" element={<PageWrapper><Shuttlecocks /></PageWrapper>} />
          <Route path="strings" element={<PageWrapper><Strings /></PageWrapper>} />
          <Route path="shoes" element={<PageWrapper><Shoes /></PageWrapper>} />
        </Route>
        <Route path="/signin" element={<PageWrapper><Sign_in /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><Sign_up /></PageWrapper>} />
        <Route path="/verify" element={<PageWrapper><VerifyOtp /></PageWrapper>} />
        <Route path="/myaccount" element={<ProtectedRoute><PageWrapper><MyAccount /></PageWrapper></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}