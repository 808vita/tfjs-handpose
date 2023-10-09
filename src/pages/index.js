import dynamic from "next/dynamic";

const Shop = dynamic(() => import("@/components/Shop"), {
  ssr: false,
});

const ListOrders = dynamic(() => import("@/components/ListOrders"), {
  ssr: false,
});

export default function ShopPage() {
  if (typeof window !== "undefined") {
    return (
      <>
        <div className="flex justify-center content-center m-20">
          <Shop></Shop>
        </div>
        <div>{/* <ListOrders /> */}</div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-center content-center m-20">oof</div>
    </>
  );
}
