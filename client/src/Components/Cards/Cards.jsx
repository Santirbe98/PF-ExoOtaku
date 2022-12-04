import { React, useEffect,useState  } from "react";
import { getProducts } from "../../Redux/Actions";
import { Card } from "../Card/Card"
import { useDispatch, useSelector } from "react-redux";
import  Paged  from "../Paged/Paged";

export function Cards() {
  let dispatch = useDispatch();
  let products = useSelector((state) => state.filterProducts);

  //PAGED LOGIC =============================================
  let componentId = 1
  const [page, setPage] = useState(1);
  const [pagePrev, setPageprev] = useState(1);
  const [pageNext, setPagenext] = useState(2);
  const [productsPage] = useState(9);
  const totalPage = page * productsPage;
  const firstPage = totalPage - productsPage;
  const ProductList = products.slice(firstPage, totalPage);

  const paged = function(pageNumber,totPages){
    setPage(pageNumber)
    let currentPage=parseInt(pageNumber)
    //Previus and Next Options
    if (currentPage>1 && currentPage<totPages) {
        setPageprev(currentPage-1);
        setPagenext(currentPage+1);
    }
    if (currentPage===1 && currentPage<totPages) {
        setPageprev(currentPage);
        setPagenext(currentPage+1);
    }   
    if (currentPage>1 && currentPage===totPages) {
        setPageprev(currentPage-1);
        setPagenext(currentPage);
    }              
  };
 //===========================================================
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <div>
        {!ProductList.length
          ? "No Products to Show"
          :ProductList.map(p=><div key={componentId ++}>
            <Card
              key={p.id}
              image={p.images[0]}
              name={p.name}
              category={p.category}
              price={p.price} />
          </div>)
        }
      </div>
      <div>
        <Paged productPage={productsPage} productList={products.length} paged={paged} pagePrev={pagePrev} pageNext={pageNext}/>
      </div>
    </div>
  );
}
