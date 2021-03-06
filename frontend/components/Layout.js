import Header from "./Header";

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <p>
                <Header />
            </p>
            { children}
            <p>
                <script data-name="BMC-Widget" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="FatimaSerra" data-description="Support me on Buy me a coffee!" data-message="Thank you for visiting. You can now buy me a coffee!" data-color="#FF5F5F" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
            </p>
        </React.Fragment>
    )
}

export default Layout;