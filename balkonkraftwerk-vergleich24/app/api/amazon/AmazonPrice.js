"use client";

import { useEffect, useState } from "react";

function AmazonPrice({ asin }) {
    const [price, setPrice] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (!asin || asin === "-") return;
      fetch(`/api/amazon?asin=${asin}`)
        .then((res) => res.json())
        .then((data) => {
          const item = data.ItemsResult?.Items[0];
          const priceInfo = item?.Offers?.Listings[0]?.Price;
          setPrice(priceInfo?.DisplayAmount);
        })
        .catch((err) => setError(err.message));
    }, [asin]);

    if (!asin || asin === "-") {
        return <div>Kein Preis gefunden</div>;
    }
    if (error) return <div style={{ color: "red" }}>Fehler: {error}</div>;
    if (!price) return <div>Lade Preis...</div>;
    return <div>{price}</div>;
}

export default AmazonPrice;
