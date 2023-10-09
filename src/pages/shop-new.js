import dynamic from "next/dynamic";

const Shop = dynamic(() => import("@/components/Shop"), {
  ssr: false,
});

export default function ShopPage() {
  return (
    <div>
      <main>
        {/* <FaceMeshComponent></FaceMeshComponent> */}
        <Shop></Shop>
      </main>
    </div>
  );
}
