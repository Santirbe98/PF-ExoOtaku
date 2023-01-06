import emailjs from "@emailjs/browser";

const sendEmailUserDedleted = ({ email, name }) => {
  let templateParams = {
    to_email: email,
    to_name: name,
    subject: "Cuenta deshabilitada",
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
          <h2>Cuenta deshabilitada</h2>
          <h4 style="font-weight: 1;">
            Querido ${name}, lamentamos informarte que tu cuenta ha sido
            deshabilitada por actividad sospechosa (esto puede incluir comentarios
            ofensivos o comportamiento fuera de lo normal).
            <br />
            <br />
            Para obtener un informe detallado sobre las causas o reestablecer tu
            cuenta, puedes comunicarte con nosotros al correo email123@email.com
          </h4>
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

export default sendEmailUserDedleted;
