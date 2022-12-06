import React from "react";
import s from "./Paged.module.css";

export default function Paged({
  productPage,
  productList,
  paged,
  pagePrev,
  pageNext,
  currentPage,
}) {
  const pages = [];
  for (let i = 1; i <= Math.ceil(productList / productPage); i++) {
    pages.push(i);
  }
  return (
    <div>
      {!pages ? (
        <></>
      ) : (
        <ul className={s.liPaged}>
          <li>
            <button
              onClick={() => paged(pagePrev, pages.length)}
              style={{ width: "50px" }}
              className={s.buttonPaged}
            >
              ←
            </button>
          </li>
          {pages.map((p) => (
            <li key={p}>
              <button
                onClick={() => paged(p, pages.length)}
                className={s.buttonPaged}
              >
                {p}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => paged(pageNext, pages.length)}
              style={{ width: "50px" }}
              className={s.buttonPaged}
              disabled={currentPage === pages.length ? true : false}
            >
              →
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
