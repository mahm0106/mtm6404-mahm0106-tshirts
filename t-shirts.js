const tshirts = [
  {
    title: 'Blue T-Shirt',
    image: 'images/blue-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Bright Purple T-Shirt',
    image: 'images/bright-purple-t-shirt.jpg',
    price: 5.99,
    stock: 1,
    quantity: 1
  },
  {
    title: 'Cobalt Blue T-Shirt',
    image: 'images/cobalt-blue-t-shirt.jpg',
    price: 9.99,
    stock: 5,
    quantity: 1
  },
  {
    title: 'Green T-Shirt',
    image: 'images/green-t-shirt.jpg',
    price: 6.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Grey T-Shirt',
    image: 'images/blue-t-shirt.jpg',
    price: 4.99,
    stock: 2,
    quantity: 1
  },
  {
    title: 'Light Green T-Shirt',
    image: 'images/light-green-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Purple T-Shirt',
    image: 'images/purple-t-shirt.jpg',
    price: 7.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Red T-Shirt',
    image: 'images/red-t-shirt.jpg',
    price: 6.99,
    stock: 3,
    quantity: 1
  },
  {
    title: 'Teal T-Shirt',
    image: 'images/teal-t-shirt.jpg',
    price: 7.99,
    stock: 2,
    quantity: 1
  }
]

function QuantitySelect({ stock, quantity, onChange }) {
  return (
    <select
      value={quantity}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {Array.from({ length: stock }, (_, i) => (
        <option key={i} value={i + 1}>
          {i + 1}
        </option>
      ))}
    </select>
  );
}

function RenderTShirt({ tshirt, index, handleBuy, handleQuantityChange }) {
  return (
    <div key={index} className="tshirt-item">
      <h2>{tshirt.title}</h2>
      <img src={tshirt.image} alt={tshirt.title} />
      <p>${tshirt.price}</p>
      <p>{tshirt.stock > 0 ? `${tshirt.stock} left!` : 'Out of Stock'}</p>

      {tshirt.stock > 0 && (
        <div>
          <QuantitySelect
            stock={tshirt.stock}
            quantity={tshirt.quantity}
            onChange={(newQuantity) => handleQuantityChange(index, newQuantity)}
          />
          <button onClick={() => handleBuy(index, tshirt.quantity)}>
            Buy
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  const [tshirtData, setTshirtData] = React.useState(tshirts);

  const handleBuy = (index, quantity) => {
    setTshirtData((prevTshirts) =>
      prevTshirts.map((tshirt, i) =>
        i === index ? { ...tshirt, stock: tshirt.stock - quantity } : tshirt
      )
    );
  };

  const handleQuantityChange = (index, newQuantity) => {
    setTshirtData((prevTshirts) =>
      prevTshirts.map((tshirt, i) =>
        i === index ? { ...tshirt, quantity: newQuantity } : tshirt
      )
    );
  };

  return (
    <React.Fragment>
      <h1>T-Shirts</h1>
      <div className="tshirt-list">
        {tshirtData.map((tshirt, index) => (
          <RenderTShirt
            key={index}
            tshirt={tshirt}
            index={index}
            handleBuy={handleBuy}
            handleQuantityChange={handleQuantityChange}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
