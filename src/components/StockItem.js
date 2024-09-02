const StockItem = ({ stock, onAction, actionLabel }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
    }}
  >
    <div>{stock.name}</div>
    <div>
      {stock.price}
      <button onClick={() => onAction(stock)}>{actionLabel}</button>
    </div>
  </div>
);

export default StockItem;
