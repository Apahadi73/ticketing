import axios from "axios";

// recieved as props to the initialProps
const buildClient = ({ req }) => {
  // window object only exists inside the browser
  if (typeof window === "undefined") {
    // We are on the server
    // preconfigures the axios for future use convenience
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: "/",
    });
  }
};

export default buildClient;
