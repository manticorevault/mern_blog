import Header from "./Header";

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <p>
                <Header />
            </p>
            { children }
            <p>
                Footer - Add the https://www.buymeacoffee.com/
            </p>
        </React.Fragment>
    )
}

export default Layout;