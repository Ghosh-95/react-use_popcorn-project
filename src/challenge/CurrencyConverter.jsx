import { useEffect, useState } from "react";

export default function CurrencyConverter() {
    const [amount, setAmount] = useState(0);
    const [ownCurrency, setOwnCurrency] = useState('INR');
    const [convertTo, setConvertTo] = useState('USD');
    const [convertedAmt, setConvertedAmt] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // 

    useEffect(function () {
        const controller = new AbortController();

        try {
            async function fetchAndConvert() {
                setIsLoading(true);
                const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${ownCurrency}&to=${convertTo}`, { signal: controller.signal });
                const data = await response.json();

                setConvertedAmt(data?.rates?.[convertTo]);
                console.log(data);
                setIsLoading(false);
            };

            if (ownCurrency === convertTo) return setConvertedAmt(amount);
            fetchAndConvert();
        } catch (error) {

        }

        return () => {
            controller.abort();
        }
    }, [amount, ownCurrency, convertTo])


    return (
        <div style={{ fontSize: "2rem" }}>
            <input type="text" value={amount} onChange={e => setAmount(Number(e.target.value))} />
            <span>From: </span>
            <select disabled={isLoading} value={ownCurrency} onChange={e => setOwnCurrency(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <span>To: </span>
            <select disabled={isLoading} value={convertTo} onChange={e => setConvertTo(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <p style={{ marginBlock: "1rem" }}>
                {convertedAmt} {convertTo}
            </p>
        </div>
    );
};