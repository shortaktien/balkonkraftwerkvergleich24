"use client";

import { useEffect, useState } from "react";

function AmazonPrice({ asin }) {
    const [priceData, setPriceData] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
      if (!asin || asin === "-") return;
      console.log("Preisabfrage f\xC3\xBCr", asin);
      fetch(`/api/amazon?asin=${asin}`)
        .then((res) => res.json())
        .then((data) => {
          setPriceData(data);
        })
        .catch((err) => setError(err.message));
    }, [asin]);

    if (!asin || asin === "-") {
        return <div>Preis manuell prüfen</div>;
    }
    if (error) return <div style={{ color: "red" }}>Fehler: {error}</div>;
    if (priceData === undefined) return <div>Lade Preis...</div>;
    if (!priceData || priceData.price === null) return <div>Preis manuell prüfen</div>;

    const { price, listPrice } = priceData;

    if (listPrice && listPrice !== price) {
        return (
          <div>
            <span style={{ color: "red", fontWeight: "bold" }}>{price}</span>{" "}
            <span style={{ textDecoration: "line-through", marginLeft: 4 }}>{listPrice}</span>
          </div>
        );
    }
    return <div>{price}</div>;
}

export default AmazonPrice;
