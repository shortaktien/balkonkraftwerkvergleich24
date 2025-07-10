"use client";

import { useEffect, useState } from "react";

function AmazonPrice({ asin }) {
    const [price, setPrice] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
      if (!asin || asin === "-") return;
      console.log("Preisabfrage f\xC3\xBCr", asin);
      fetch(`/api/amazon?asin=${asin}`)
        .then((res) => res.json())
        .then((data) => {
          setPrice(data.price);
        })
        .catch((err) => setError(err.message));
    }, [asin]);

    if (!asin || asin === "-") {
        return <div>Preis manuell prüfen</div>;
    }
    if (error) return <div style={{ color: "red" }}>Fehler: {error}</div>;
    if (price === undefined) return <div>Lade Preis...</div>;
    if (price === null) return <div>Preis manuell prüfen</div>;
    return <div>{price}</div>;
}

export default AmazonPrice;
