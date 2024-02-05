import footerStyle from "./Footer.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: footerStyle,
    },
  ];
}

const Footer = ({ ...rest }) => {
  return <footer className={"footer"} {...rest} />;
};

export default Footer;
