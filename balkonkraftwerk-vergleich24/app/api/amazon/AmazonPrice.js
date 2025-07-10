"use client";

import { useEffect, useState } from "react";

// Verhindert doppelte API-Aufrufe für dieselbe ASIN
const fetchMap = new Map();

// Ermittelt, ob ein gespeicherter Preis noch gültig ist
function isCacheValid(timestamp) {
  try {
    const berlinNow = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" })
    );
    const cutoff = new Date(berlinNow);
    cutoff.setHours(10, 0, 0, 0);
    if (berlinNow < cutoff) {
      cutoff.setDate(cutoff.getDate() - 1);
    }
    return timestamp >= cutoff.getTime();
  } catch {
    return false;
  }
}

function AmazonPrice({ asin }) {
    const [priceData, setPriceData] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
      if (!asin || asin === "-") return;

      if (typeof window === "undefined") return;

      let cache = {};
      try {
        const cacheStr = localStorage.getItem("amazon_price_cache");
        if (cacheStr) cache = JSON.parse(cacheStr);
      } catch (err) {
        console.log("Fehler beim Lesen aus localStorage:", err);
      }

      const cached = cache[asin];
      if (cached && isCacheValid(cached.timestamp)) {
        setPriceData({ price: cached.price, listPrice: cached.listPrice });
        return;
      }

      if (fetchMap.has(asin)) {
        fetchMap
          .get(asin)
          .then((data) => setPriceData(data))
          .catch((err) => setError(err.message));
        return;
      }

      console.log("Preisabfrage f\xC3\xBCr", asin);
      const promise = fetch(`/api/amazon?asin=${asin}`)
        .then((res) => res.json())
        .then((data) => {
          setPriceData(data);
          cache[asin] = {
            price: data.price,
            listPrice: data.listPrice,
            timestamp: Date.now(),
          };
          try {
            localStorage.setItem(
              "amazon_price_cache",
              JSON.stringify(cache)
            );
          } catch (err) {
            console.log("Fehler beim Schreiben in localStorage:", err);
          }
          return data;
        })
        .catch((err) => {
          setError(err.message);
          throw err;
        })
        .finally(() => {
          fetchMap.delete(asin);
        });
      fetchMap.set(asin, promise);
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
