import React, { useState, useRef } from "react";
import { useHistory, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import {
  Accordion,
  Col,
  Container,
  Nav,
  Row,
  Tab,
  Form,
} from "react-bootstrap";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../../firebase";
// import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
// import ReCAPTCHA from "react-google-recaptcha";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const options = {
  position: "bottom-right",
  style: {
    backgroundColor: "red",
    border: "2px solid lightgreen",
    color: "lightblue",
    fontFamily: "Menlo, monospace",
    fontSize: "20px",
    textAlign: "center",
  },
  closeStyle: {
    color: "lightcoral",
    fontSize: "16px",
  },
};

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState(""); // This will be used to show a message if the submission is successful
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showHidePassword, changeShowHidePassword] = useState(false);
  const [open, setOpen] = React.useState(true);
  // const recaptchaRef = React.createRef();
  const [error, setError] = useState(null);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((val) => localStorage.setItem("email", val))
      .catch((val) => {
        console.log(val);
      });
  };
  const APICALL = (data) => {
    console.log("test", data);
    const dataObject = {
      mail: formik.values.email,
      pass: formik.values.password,
    };
    // LoginAPI(dataObject, setLoading, setState, openSnackbar,dispatch)
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
        try {
          console.log("cb", values.email, values.password, auth);
          const res = await signInWithEmailAndPassword(auth, values.email, values.password);
          console.log("result", res);
          navigate("/");
        } catch (error) {
          console.error("Error during authentication:", error);
          const errorMessage = error.message || "An error occurred during authentication.";
          setError(errorMessage);
        }
      
        console.log("Form submitted");
      
        formik.resetForm({ values: "" });
        setSubmitted(true);
      }
      ,
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Must be a valid email")
        .required("Email is required"),
      password: yup
        .string()
        .required("Please enter your password.")
        .min(8, "Your password is too short."),
    }),
  });
  return (
    <div>
      {error != null ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
      {/* <Alert severity="error">This is an error message!</Alert> */}
      <Row className="height-vw">
        <Col
          className="col-xl-12 col-lg-12 col-md-12 col-sm-12 width-height  order-1   bg-light-black "
          xs="6"
        >
          <div className="vh-100 d-flex  justify-content-center align-items-center paddingBox">
            <h1></h1>
            <p>
              {" "}
              <a href="/Auth" className="log-in"></a>
            </p>
            <form className="resp-width" onSubmit={formik.handleSubmit}>
              <div class="form-floating mt-3">
                <input
                  type="email"
                  name="email"
                  className="form-control form-input"
                  placeholder="john@example.com"
                  id="floatingInput"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{
                    borderBottom: "1px #9F9F9F solid!important",
                    color: "#9F9F9F!important",
                  }}
                />
                <label for="floatingInput">Email</label>
                {formik.errors.name && (
                  <div className="text-danger">{formik.errors.name}</div>
                )}
              </div>
              <div className="form-floating mt-5">
                <input
                  type={showHidePassword ? "text" : "password"}
                  name="password"
                  className="form-control form-input"
                  placeholder="password"
                  id="floatingInput"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                  style={{ position: "relative" }}
                />

                <label for="floatingInput">Password</label>
                <i
                  className="bi bi-eye"
                  style={{
                    position: "absolute",
                    right: "5%",
                    bottom: `${formik.errors.password ? "30%" : "13%"}`,
                  }}
                />
                {formik.errors.password && (
                  <div className="text-danger">{formik.errors.password}</div>
                )}
                <p
                  style={{
                    position: "absolute",
                    right: "0%",
                    fontWeight: "500",
                  }}
                >
                  <a href="/password-recovery" className="log-in"></a>
                </p>
              </div>

              {console.log(formik.values)}
              <div className="d-flex justify-content-between mt-5">
                <div className="d-flex justify-content-center align-items-center margin-btn">
                  <button type="submit" className="btn btn-send">
                    {loading ? <i className="fa fa-spinner fa-spin "></i> : ""}
                    Login
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-start mt-3">
                <FcGoogle size={40} onClick={handleClick} />
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
