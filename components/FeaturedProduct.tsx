import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { DatabaseContext } from "../context/DatabaseContext";
import useNotificationState from "../hooks/useNotificationState";
import { ProductListing } from "../pages/product/[id]";
import unloadedImg from "../public/img/unloaded-image.png";
import Button from "./Button";
import Notification from "./Notification";

type Props = {
  product: ProductListing | null;
};

const FeaturedProduct: React.FC<Props> = ({ product }) => {
  const databaseContext = useContext(DatabaseContext);
  const [notifState, showNotif] = useNotificationState();

  function onAddToCart() {
    if (product === null || databaseContext === null) return;

    databaseContext.addToCart(product.productId, 1);

    showNotif(`Added 1 ${product.title} your cart.`, "bg-green-600");
  }

  return (
    <div className="flex flex-col p-4 border-b-2 border-green-700 sm:grid sm:grid-cols-2 sm:gap-4 sm:items-center">
      <div className="h-full relative">
        <h2 className="text-xl font-bold sm:text-2xl">{product ? product.title : "..."}</h2>
        <p className="mb-2 sm:text-lg">{product ? "$" + product.price.toFixed(2) : "..."}</p>
        <p className="h-10 truncate sm:text-lg">{product ? product.tagline : "..."}</p>
        <div className="flex flex-row mb-4 gap-2 sm:absolute sm:bottom-0 sm:mb-0">
          <Button styles="bg-green-700 text-white" onClick={onAddToCart}>
            Add To Cart
          </Button>
          <Button
            styles="bg-gray-700 text-white"
            href={product ? `product/${product.productId}` : "/"}
          >
            View Product
          </Button>
        </div>
      </div>
      <div className="w-full relative">
        <Link passHref href={product ? `product/${product.productId}` : "/"}>
          <a className="flex">
            <Image
              src={product ? product.highResImgUrl : unloadedImg}
              width={640}
              height={425}
              alt={product ? product.title : ""}
            />
          </a>
        </Link>
      </div>

      <Notification state={notifState} />
    </div>
  );
};

export default FeaturedProduct;
