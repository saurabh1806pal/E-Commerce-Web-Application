export default function SummaryCard({ item }) {
  const totalPrice = item.reduce((sum, currentItem) => {
    return sum + currentItem.currentPrice;
  }, 0);
  const totalOriginalPrice = item.reduce((sum, currentItem) => {
    return sum + currentItem.originalPrice;
  }, 0);
  return (
    <div className="space-y-4 mb-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-600">
        <span className="text-gray-300">Total Items</span>
        <span className="text-xl font-bold">{item.length}</span>
      </div>

      <div className="flex justify-between items-center pb-4 border-b border-gray-600">
        <span className="text-gray-300">Total Value</span>
        <span className="text-xl font-bold">₹{totalPrice}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-green-300">Total Savings</span>
        <span className="text-xl font-bold text-green-300">
          ₹{totalOriginalPrice - totalPrice}
        </span>
      </div>
    </div>
  );
}
