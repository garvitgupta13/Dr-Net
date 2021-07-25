import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { getCurrentUser } from "../Services/authService";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { getmeToken, processPayment } from "./../Services/paymentServices";

const drawerWidth = 220;

const useStyle = makeStyles({
  container: {
    marginTop: "80px",
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    ["@media (max-width:660px)"]: {
      width: "100%",
      height: "100%",
      marginLeft: "0px"
    }
  }
});

export function Payment({ setReload = (f) => f, reload = undefined }) {
  const classes = useStyle();
  const params = useParams();
  let userid;
  const { doctorId } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const [info, setInfo] = useState({
    loading: false,
    error: "",
    success: false,
    clientToken: null,
    instance: {}
  });

  //Get logged in user details
  if (token) {
    userid = getCurrentUser()._id;
  } else {
    //TODO: Redirect to login page
    console.log("Redirect to login page");
    /*NOT WORKING
    <Redirect
      to={{
        pathname: "/patient/login"
      }}
    />;*/
  }

  const getToken = (token) => {
    getmeToken(token).then(({ data }) => {
      console.log("INFORMATION ", data);
      if (data.error) {
        setInfo({ ...data, error: data.error });
      } else {
        const clientToken = data.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy Now
            </button>
          </div>
        ) : (
          <h3>Please Login </h3>
        )}
      </div>
    );
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    console.log(info);
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        fee: doctor.doctorInfo.fees
      };
      processPayment(token, paymentData)
        .then((response) => {
          console.log("RESPONSE: ", response);
          setInfo({ ...info, success: response.success, loading: false });

          console.log("PAYMENT SUCCESSFULL");
          const orderData = {
            doctor: doctor,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount
          };

          console.log(orderData);
          setReload(!reload);
        })
        .catch((error) => {
          console.log(error);
          setInfo({ success: false, loading: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  useEffect(() => {
    //Fetch doctor (Refactor this code)
    async function fetchDoctor() {
      setIsLoading(true);
      const request = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/doctor/${doctorId}`
      );
      setDoctor(request.data.data);
      setIsLoading(false);
    }
    fetchDoctor().catch((error) => {
      setError(error);
    });

    getToken(token);
  }, []);

  if (error) {
    console.log(error);
    return <p className="centered focus">No Such Patient Exist</p>;
  }
  if (isLoading) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (!userid) {
    return <p className="centered focus">No Such Patient Exist</p>;
  }

  return (
    <Container className={classes.container}>
      <h3>Fees: {doctor.doctorInfo.fees}</h3>
      {showbtdropIn()}
    </Container>
  );
}

export default Payment;
