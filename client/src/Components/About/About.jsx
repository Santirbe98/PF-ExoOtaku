import { React, useState } from "react";
import s from "./About.module.css";
import img1 from "../../Resources/imagnes pag1.jpeg";
import img2 from "../../Resources/imagenes pag 2.jpeg";
import img3 from "../../Resources/uvjet-impresora-dtg-easy-tx-04-500x571.jpg";
import { NavBar } from "../NavBar/NavBar.jsx";
import { Footer } from "../Footer/Footer.jsx";

export function About() {
  let mock = [img1, img2, img3];
  const [actImg, setActImg] = useState(0);
  const quantity = mock?.length;

  const nextImg = () => {
    setActImg(actImg === quantity - 1 ? 0 : actImg + 1);
  };
  const prevImg = () => {
    setActImg(actImg === quantity ? 0 : actImg - 1);
  };

  return (
    <div>
      <NavBar />
      <div className={s.aboutContainer} key="div1">
        <div key="div2">
          <h1>Sobre Nosotros</h1>
        </div>
        <div key="div4">
          <h3>Como hacemos nuestras prendas?</h3>
          <p>Nuestra ropa se realiza mediante impresoras DTG</p>
        </div>
        <div className={s.carrouselContainer} key="div5">
          <button
            onClick={prevImg}
            disabled={actImg === 0 ? true : false}
            className={s.aboutButton}
          >
            ←
          </button>
          {mock.length > 0 &&
            mock.map((img, index) => {
              return (
                <div
                  className={
                    actImg === index ? `${s.slide} ${s.active}` : s.slide
                  }
                  key={index}
                >
                  {actImg === index && (
                    <img
                      key={index}
                      src={img}
                      alt="imagen impresora"
                      width="300px"
                    />
                  )}
                </div>
              );
            })}
          <button
            onClick={nextImg}
            disabled={actImg === quantity - 1 ? true : false}
            className={s.aboutButton}
          >
            →
          </button>
        </div>
        <div key="div8">
          <h3>Aseguramos un excelente producto 😎</h3>
        </div>
        <div className={s.specContainer} key="div9">
          <h4>Especificaciones:</h4>
          <ul className={s.ulEsp}>
            <li key={1}>Utiliza tinta duopoint (USA).</li>
            <li key={2}>Es resistente a lavados y el sol</li>
            <li key={3}>
              Recien partir del lavado n°30 comienza a perder el brillo
            </li>
            <li key={4}>
              Su calidad es superior en compararcion con la serigrafia!
            </li>
            <li key={5}>
              Es una tinta Ecologica ya que esta compuesta con agua!
            </li>
            <li key={6}>Nuestros productos son 100% Algodon!</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
