import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeaderSlider() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const { t } = useTranslation();

    return (
        <div className="w-full h-[500px] relative">
            {/* Custom button */}
            <div className="absolute top-1/2 left-4 z-10 -translate-y-1/2">
                <button
                    ref={prevRef}
                    className="custom-prev bg-black/50 p-3 rounded-full text-white hover:bg-black">
                    <ChevronLeft size={24} />
                </button>
            </div>

            <div className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                <button
                    ref={nextRef}
                    className="custom-next bg-black/50 p-3 rounded-full text-white hover:bg-black">
                    <ChevronRight size={24} />
                </button>
            </div>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop={true}
                className="w-full h-full"
            >
                {/* Slider 1 */}
                <SwiperSlide>
                    <div className="w-full h-full relative">
                        <img
                            src="./VA_collection.webp"
                            alt="Banner 1"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
                            <h2 className="text-4xl font-bold mb-4">{t("THE_KING'S_EQUIPMENT")}</h2>
                            <p className="mb-6 text-lg">{t("VICTOR_AXELSEN'S_COLLECTION")}</p>
                            <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-200">
                                {t("More")}
                            </button>
                        </div>

                    </div>
                </SwiperSlide>

                {/* Slider 2 */}
                <SwiperSlide>
                    <div className="w-full h-full relative">
                        <img
                            src="./882024_collection.webp"
                            alt="Banner 2"
                            className="w-full h-full objective-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
                            <h2 className="text-4xl font-bold mb-4">{t("MODERN_TACTIC")}</h2>
                            <p className="mb-6 text-lg">{t("OVERWHELMING")}</p>
                            <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-200">
                                {t("More")}
                            </button>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slider 3 */}
                <SwiperSlide>
                    <div className="w-full h-full relative">
                        <img
                            src="./99pro_gen3_collection.webp"
                            alt="Banner 2"
                            className="w-full h-full objective-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
                            <h2 className="text-4xl font-bold mb-4">{t("BE_CAUTION!!!")}</h2>
                            <p className="mb-6 text-lg">{t("PURE_POWER")}</p>
                            <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-200">
                                {t("More")}
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}