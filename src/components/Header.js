const Header = ({ setactive }) => {

    return (
        <ul className="flex ml-auto w-full font-bold">
            <li className="text-xs text-gray-800 ml-auto mr-6 border-b-2 border-green-400 cursor-pointer" onClick={() => setactive("Weather")}>Weather</li>
            <li className="text-xs text-gray-800 mr-6 alert-notice cursor-pointer border-b-2 hover:border-green-400" onClick={() => setactive("Alerts")}>Alerts</li>
            <li className="text-xs text-gray-800 mr-6 cursor-pointer border-b-2 hover:border-green-400" onClick={() => setactive("Map")}>Map </li>
        </ul>
    );
};

export default Header;
