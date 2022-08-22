import { CheckIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/solid";
import { Product } from "@stripe/firestore-stripe-payments";

interface Props {
  products: Product[];
  selectedPlan: Product | null;
}

const Table = ({ products, selectedPlan }: Props) => {
  return (
    <table>
      <tbody className='divide-y divide-[gray]'>
        <tr className='tableRow'>
          <td className='tableDataTitle'>Monthly Price</td>
          {products.map((product) => (
            <td key={product.id} className='tableDataFeature'>
              INR{product.prices[0].unit_amount! / 100}
            </td>
          ))}
        </tr>

        <tr className='tableRow'>
          <td className='tableDataTitle'>Video Quality</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? "text-[#e50914]"
                  : "text-[gray]"
              }`}
            >
              {product.metadata.videoQuality}
            </td>
          ))}
        </tr>

        <tr className='tableRow'>
          <td className='tableDataTitle'>Resolution</td>
          {products.map((product) => (
            <td
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? "text-[#E50914]"
                  : "text-[gray]"
              }`}
              key={product.id}
            >
              {product.metadata.resolution}
            </td>
          ))}
        </tr>

        <tr className='tableRow'>
          <td className='tableDataTitle'>
            Watch on your TV, Computer, Mobile Phone and Tablet
          </td>
          {products.map((product) => (
            <td
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? "text-[#E50914]"
                  : "text-[gray]"
              }`}
              key={product.id}
            >
              {product.metadata.portability === "True" ? (
                <CheckIcon className='inline-block h-8 w-8' />
              ) : (
                <XIcon className='inline-block h-8 w-8' />
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
