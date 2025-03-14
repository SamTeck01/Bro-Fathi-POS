"use client";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ReceiptModal from "./ReceiptModal";

const OrderSummary = ({ cart, time, AMPM }) => {
  const componentRef = useRef(null);

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);
  };

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: "Receipt",
    onAfterPrint: () => console.log("Print successful"),
  });

  const receiptRef = useRef();

  return (
    <div>
      <h2>Order Summary</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - {item.quantity} × ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(2)}
          </li>
        ))}
      </ul>
      <p className="font-bold">Total: ${calculateTotal().toFixed(2)}</p>

      <button
        className="bg-green-500 text-white p-2 mt-4 rounded"
        onClick={handlePrint}
      >
        Proceed & Print Receipt
      </button>

      <div style={{ display: "none" }}>
        <ReceiptModal
          ref={receiptRef}
          isOpen={true}
          onClose={() => {}}
          cart={cart}
          time={time}
          AMPM={AMPM}
          calculateTotal={calculateTotal}
        />
      </div>
    </div>
  );
}
export default OrderSummary;
