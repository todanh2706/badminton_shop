import { useTranslation } from "react-i18next";

export default function ProductCard({ product }) {
    const { i18n } = useTranslation();
    const EXCHANGE_RATE = 26000;

    let price = product.price;
    let currency = product.currency;

    if (i18n.language === "vi") {
        price *= EXCHANGE_RATE;
        currency = "VND";
    } else currency = "USD";

    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition relative">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain mb-4"
            />
            <h3 className="font-semibold text-gray-800 text-sm">{product.name}</h3>
            <p className="text-red-600 font-bold">
                {new Intl.NumberFormat(i18n.language, {
                    style: "currency",
                    currency,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                }).format(price)}
            </p>
        </div>
    );
}