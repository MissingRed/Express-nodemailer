import React, { useState } from "react";
import background from "../pages/background.jpg";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/Contact.css";
import Axios from "axios";

const Contact = () => {
  const style = {
    backgroundImage: `url(${background})`,
  };

  const initialInputState = { name: "", message: "" };
  const [newMessage, setNewMessage] = useState(initialInputState);

  const { name, message } = newMessage;

  const handleInputChange = (e) => {
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
  };

  const sendMessage = (e) => {
    Axios({
      method: "POST",
      url: "http://localhost:5000/send",
      data: { name, message },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.data.msg === "suc") {
        console.log("Email has been sent");
        setNewMessage(initialInputState);
      } else {
        console.log("FAILURE");
      }
    });
  };

  return (
    <>
      <div className="main-home__grid" style={style}>
        <div className="main-home__sidebar">
          <Sidebar />
        </div>
        <div className="main-about__content">
          <Navbar />
          <div className="main-contact">
            <h1>Contactame!</h1>
            <div className="form-Contact">
              <form>
                <p>Nombre</p>
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  value={name}
                />
                <p>Comentarios/Preguntas</p>
                <textarea
                  rows="4"
                  cols="50"
                  value={message}
                  onChange={handleInputChange}
                  name="message"
                />
                <button onClick={sendMessage}>Enviar Mensaje</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
