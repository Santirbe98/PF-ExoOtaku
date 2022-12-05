import { React, useState } from "react";
import s from "./About.module.css";
import img1 from "../../Resources/imagnes pag1.jpeg";
import img2 from "../../Resources/imagenes pag 2.jpeg";
import img3 from "../../Resources/uvjet-impresora-dtg-easy-tx-04-500x571.jpg";

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
    <div className={s.aboutContainer}>
      <div>
        <h1>Sobre Nosotros</h1>
      </div>
      <div>
        <img
          src="http://d3ugyf2ht6aenh.cloudfront.net/stores/001/760/094/themes/common/logo-204180220-1664550124-6d7184aec833212b57e39d5f3bd0e32d1664550125.png?0"
          width="200px"
        />
      </div>
      <div>
        <h3>Como hacemos nuestras prendas?</h3>
        <p>Nuestra ropa se realiza mediante impresoras DTG</p>
      </div>
      <div>
        <h3>Aseguramos un excelente producto 😎</h3>
      </div>
      <div>
        <h4>Especificaciones:</h4>
        <ul className={s.ulEsp}>
          <li>Utiliza tinta duopoint (USA).</li>
          <li>Es resistente a lavados y el sol</li>
          <li>Recien partir del lavado n°30 comienza a perder el brillo</li>
          <li>Su calidad es superior en compararcion con la serigrafia!</li>
          <li>Es una tinta Ecologica ya que esta compuesta con agua!</li>
          <li>Nuestros productos son 100% Algodon!</li>
        </ul>
      </div>
      <div className={s.carrouselContainer}>
        <button onClick={prevImg} disabled={actImg === 0 ? true : false}>
          ←
        </button>
        {mock.length > 0 &&
          mock.map((img, index) => {
            return (
              <div
                className={
                  actImg === index ? `${s.slide} ${s.active}` : s.slide
                }
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
        >
          →
        </button>
      </div>
    </div>
  );
}
