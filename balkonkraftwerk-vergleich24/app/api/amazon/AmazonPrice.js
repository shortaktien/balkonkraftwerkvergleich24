"use client";

import { useEffect, useState } from "react";

function AmazonPrice({ asin }) {
    const [priceData, setPriceData] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
      if (!asin || asin === "-") return;

      const cacheKey = `amazon_price_${asin}`;
      try {
        const cachedStr = localStorage.getItem(cacheKey);
        if (cachedStr) {
          const cached = JSON.parse(cachedStr);
          if (Date.now() - cached.timestamp < 24 * 60 * 60 * 1000) {
            setPriceData({ price: cached.price, listPrice: cached.listPrice });
            return;
          }
        }
      } catch (err) {
        console.log("Fehler beim Lesen aus localStorage:", err);
      }

      console.log("Preisabfrage f\xC3\xBCr", asin);
      fetch(`/api/amazon?asin=${asin}`)
        .then((res) => res.json())
        .then((data) => {
          setPriceData(data);
          try {
            localStorage.setItem(
              cacheKey,
              JSON.stringify({
                price: data.price,
                listPrice: data.listPrice,
                timestamp: Date.now(),
              })
            );
          } catch (err) {
            console.log("Fehler beim Schreiben in localStorage:", err);
          }
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
