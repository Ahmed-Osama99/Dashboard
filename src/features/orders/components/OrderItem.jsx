const statusColor = {
  completed: "#00B69B",
  processing: "#6226EF",
  rejected: "#EF3826",
  "on hold": "#FFA756",
  "in transit": "#BA29FF",
};

const OrderItem = ({order}) => {
  return (
    <tr className="hover:bg-gray-700/30 transition-colors">
      <td className="px-6 py-4">{order.id}</td>
      <td className="px-6 py-4 font-medium text-white">{order.name}</td>
      <td className="px-6 py-4">{order.address}</td>
      <td className="px-6 py-4">{order.date}</td>
      <td className="px-6 py-4 capitalize">{order.type}</td>
      <td className="px-6 py-4 capitalize">
        <span
          style={{
            backgroundColor: statusColor[order.status],
            padding: "4px 8px",
            borderRadius: "4px",
            color: "white",
          }}
        >
          {order.status}
        </span>
      </td>
    </tr>
  );
};

export default OrderItem;
