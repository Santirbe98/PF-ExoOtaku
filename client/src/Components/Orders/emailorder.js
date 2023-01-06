import emailjs from "@emailjs/browser";

const sendEmailOrder = ({ email, name, paymentId }) => {
  let templateParams = {
    to_email: email,
    to_name: name,
    subject: "Pedido completado",
    message_html: `
      <div style="text-align: center; justify-content: center;">
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
            text-align: left;
            font-size: 1.5vw;
            padding-left: 5vw;
            font-weight: 1;
            color: #3c4858;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          "
        >
          <h2>Estado de tu pedido</h2>
          <h4 style="font-weight: 1;">
            Querido ${name}, te informamos que tu pedido con número de pago ${paymentId} ha sido completado de manera satisfactoria y próximamente lo estaremos enviando a la dirección confirmada. 
            Puedes comunicarte al correo electrónico email123@email.com para obtener mas información.
            <br />
            <br />
            Te invitamos a visitar nuestra tienda para obtener mas información sobre los distintos productos que tenemos para ofrecer
          </h4>
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
  
        <div
          style="
            margin-left: auto;
            margin-right: auto;
            text-align: left;
            padding-left: 10%;
            font-size: 1.5vw;
            font-weight: 1;
            color: #3c4858;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          "
        >
          <div
            style="
              margin-left: auto;
              margin-right: auto;
              justify-content: center;
              font-size: 1.5vw;
              text-align: center;
              padding-bottom: 2vw;
              font-weight: 1;
              color: #3c4858;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
                sans-serif;
            "
          ></div>
        </div>
        <div
          style="
            margin-left: auto;
            margin-right: auto;
            text-align: center;
            background-color: black;
            font-size: 1.5vw;
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
              font-size: 1px;
              line-height: 24px;
              color: #737373;
              font-size: 1.7vw;
            "
          >
            <div class="container">
              <div class="row"></div>
              <hr />
            </div>
            <div class="container">
              <div class="row">
                <div class="col-md-8 col-sm-6 col-xs-12">
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

export default sendEmailOrder;
