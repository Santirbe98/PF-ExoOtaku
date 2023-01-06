import emailjs from "@emailjs/browser";

const sendEmailSuccess = ({
  email,
  name,
  Order,
  fecha,
  total_prod,
  total_env,
  estado,
}) => {
  let templateParams = {
    to_email: email,
    to_name: name,
    subject: "Compra exitosa",
    message_html: `
      <div>
      <div style="background-color: black;">
        <img
          style="
            display: block;
            padding-top: 2%;
            margin-left: auto;
            margin-right: auto;
          "
          title="exo Logo"
          src="https://pf-exo-otaku.vercel.app/static/media/logo.591e70fd.jpg"
          alt="exo Logo"
          width="128"
          height="128"
        />
      </div>
      <div
        style="
          margin-left: auto;
          margin-right: auto;
          text-align: center;
          font-size: 1.1vw;
          font-weight: 1;
          color: #3c4858;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        "
      >
        <h2>¡Gracias por tu compra!</h2>
        <p>
          Nos sentimos felices de que hayas escogido nuestra web para comprar
          los productos que te apasionan
        </p>
        <p>
          Puedes ver un resumen de tu orden de compra a continuación
        </p>
      </div>
      <div
        style="
          margin-left: auto;
          margin-right: auto;
          text-align: left;
          padding-left: 10%;
          font-weight: 1;
          font-size: 1.1vw;
          color: #3c4858;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        "
      >
        <ul>
          <li> Orden: ${Order} </li>
          <li> Fecha: ${fecha} </li>
          <li> Total productos: ${total_prod} </li>
          <li> Total envío: ${total_env} </li>
          <li> Estado: ${estado} </li>
        </ul>
      </div>
      <div
        style="
          margin-left: auto;
          margin-right: auto;
          text-align: left;
          padding-left: 10%;
          font-size: 1.1vw;
          font-weight: 1;
          color: #3c4858;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        "
      >
        <p style="font-size: 2000;">
          Puedes consultar a profundidad tu orden completa en tu perfil de
          nuestra web
        </p>
        <div
          style="
            margin-left: auto;
            margin-right: auto;
            justify-content: center;
            font-size: 1.1vw;
            text-align: center;
            padding-bottom: 2vw;
            font-weight: 1;
            color: #3c4858;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
          "
        >
          <a href="https://pf-exo-otaku.vercel.app/">
            <button
            style="
            font-family: PlusJakartaSans, -apple-system, BlinkMacSystemFont,
              Segoe UI, Roboto, Oxygen, Cantarell, Helvetica Neue, Ubuntu,
              sans-serif;
            font-size: 1.1vw;
            align-items: center;
            width: 11vw;
            border-radius: 2px;
            height: 3.5vw;
            padding: 0.5vw 0.8vw;
            color: #ddd;
            border: none;
            /*      box-shadow: 0 0.5vw 1rem rgba(143, 142, 142, 0.15) !important; */
            background: #000000;
            translate: -5vw 0vw;
          "
            >
              Visita nuestra web
            </button>
          </a>
        </div>
      </div>
      <div
        style="
          margin-left: auto;
          margin-right: auto;
          text-align: center;
          background-color: black;
          font-size: 1.1vw;
          font-weight: 1;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        "
      >
        <footer
          style="
            background-color: #26272b;
            padding: 0.1vw 0vw;
            font-size: 15px;
            line-height: 24px;
            color: #737373;
            font-size: 1.7vw;
          "
        >
          <div>
            <div></div>
            <hr />
          </div>
          <div>
            <div >
              <div >
                <p style="font-size: 1vw;">Contáctanos: email123@email.com</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>

      `,
  };

  emailjs
    .send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.REACT_APP_EMAILJS_USER_ID
    )
    .then(
      function (response) {
        console.log("Correo enviado con éxito: " + response.status);
      },
      function (error) {
        console.log("Error al enviar el correo: " + JSON.stringify(error));
      }
    );
};

export default sendEmailSuccess;
