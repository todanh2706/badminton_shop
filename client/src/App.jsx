import { Route, Routes, } from "react-router-dom";
import Home from "./pages/Home";
import Sign_in from "./pages/Sign_in";
import Sign_up from "./pages/Sign_up";
import VerifyOtp from "./pages/Verify_otp";
import My_account from "./pages/My_account";
import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Sign_in />} />
      <Route path="/signup" element={<Sign_up />} />
      <Route path="/verify" element={<VerifyOtp />} />
      <Route path="/myaccount" element={<ProtectedRoute><My_account /></ProtectedRoute>} />
    </Routes>
  );
}