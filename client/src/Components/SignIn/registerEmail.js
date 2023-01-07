import emailjs from "@emailjs/browser";

const sendEmailUserRegisted = ({ email, name }) => {
  let templateParams = {
    to_email: email,
    to_name: name,
    subject: "Cuenta habilitada",
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
      <h2>Cuenta Habilitada</h2>
      <h3 style="font-weight: 1;">
        <h2>¡Bienvenido a ExOtaku!</h2>

        Hola ${name}, queremos darte las gracias por escogernos y te damos la
        bienvenida a nuestro sitio web. Puedes visitar nuestra página para ver
        nuestra gran variedad de ítems, tendrás acceso a tu perfil para
        compartir tus reseñas y puntuar nuestros productos.
        <br />
        <br />
        Para obtener mas información o responder tus dudas puede comunicarte
        al correo email123@email.com. Te invitamos a visitar nuestro sitio web
        para que descrubas los productos que tenemos para ti.
      </h3>
    </div>
    <div
      style="
        margin-left: auto;
        margin-right: auto;
        justify-content: center;
        font-size: 1.5vw;
        text-align: center;
        padding-bottom: 2vw;
        padding-top: 2vw;
        font-weight: 1;
        color: #3c4858;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
            color: #ddd;
            border: none;
            /*      box-shadow: 0 0.5vw 1rem rgba(143, 142, 142, 0.15) !important; */
            background: #000000;
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

export default sendEmailUserRegisted;
