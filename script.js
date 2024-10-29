const TShirt = ({ tShirt, buyTShirt }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        setQuantity(Math.min(e.target.value, tShirt.stock)); // Prevent selecting more than stock
    };

    return (
        <div className="tshirt">
            <img src={tShirt.image} alt={tShirt.title} />
            <h2>{tShirt.title}</h2>
            <p>${tShirt.price.toFixed(2)}</p>
            <p>{tShirt.stock > 0 ? tShirt.stock : "Out of Stock"}</p>

            {tShirt.stock > 0 && (
                <>
                    <select value={quantity} onChange={handleQuantityChange}>
                        {[...Array(tShirt.stock).keys()].map((_, index) => (
                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                    <button onClick={() => buyTShirt(tShirt.title, quantity)}>Buy</button>
                </>
            )}
        </div>
    );
};

const TShirtList = ({ tShirts, buyTShirt }) => {
    return (
        <div className="tshirt-list">
            {tShirts.map((tShirt, index) => (
                <TShirt key={index} tShirt={tShirt} buyTShirt={buyTShirt} />
            ))}
        </div>
    );
};

const App = () => {
    const [tShirts, setTShirts] = useState(tshirts);

    const buyTShirt = (title, quantity) => {
        setTShirts(tShirts.map(tShirt => 
            tShirt.title === title ? { ...tShirt, stock: tShirt.stock - quantity } : tShirt
        ));
    };

    return (
        <div className="App">
            <h1>T-Shirt Store</h1>
            <TShirtList tShirts={tShirts} buyTShirt={buyTShirt} />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)