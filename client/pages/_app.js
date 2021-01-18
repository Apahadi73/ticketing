// we can only run global css in this module
import "bootstrap/dist/css/bootstrap.css";

import buildClient from "../api/build-client";
import Header from "../components/header";

// this is the wrapper for every custom component in our app
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div className="container">
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  // this data is for the custom app component
  const { data } = await client.get("/api/users/currentuser");

  // invoking getinitialproprs in app component makes getinitialprops of pages component non-usable
  // so we have to pass down the ctx down the heirarchy tree to the individual components
  let pageProps = {};
  // only if the pages component has getInitialProps
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
