const initialInputState = { name: "", message: "" };
const [newMessage, setNewMessage] = useState(initialInputState);

const { name, message } = newMessage;

const handleInputChange = (e) => {
  setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
};

const sendMessage = (e) => {
  Axios({
    method: "POST",
    url: "http://localhost:5000/enviar",
    data: { name, message },
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.data.msg === "suc") {
      console.log("El correo fue enviado con exito");
      setNewMessage(initialInputState);
    } else {
      console.log("Error al enviar el correo");
    }
  });
};
