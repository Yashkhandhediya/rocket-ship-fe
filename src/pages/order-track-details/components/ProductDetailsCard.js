import { ProductDetailsIcon } from '../../../common/icons/order-details';
import DetailsCard from './DetailsCard';

const ProductDetailsCard = ({ productDetails = {} }) => {
  const orderTotal =
    productDetails?.total_amount +
    productDetails?.shipping_charges +
    productDetails?.gift_wrap +
    productDetails?.transaction_fees;

  return (
    <DetailsCard heading={'Product Details'} headingIcon={ProductDetailsIcon} headingClassNames="mb-[1px]">
      <div className="min-w-[600px] pr-3">
        <div className="color-[#191919] rounded-lg bg-[#fafafa] p-3 leading-4 shadow-[0_1px_1px_rgba(0,0,0,0.102)]">
          <div className="flex text-xs font-medium">
            <div className="w-full px-2">{'Name'}</div>
            <div className="w-full px-2">{'Category'}</div>
            <div className="w-full min-w-[110px] px-2">{'HSN'}</div>
            <div className="w-full px-2">{'SKU'}</div>
            <div className="w-full px-2">{'QTY'}</div>
            <div className="w-full px-2">{'Unit Price'}</div>
            <div className="w-full px-2">{'Discount'}</div>
            <div className="w-full px-2">{'Tax'}</div>
            <div className="w-full px-2 pr-3 text-right">{'Total'}</div>
          </div>
        </div>
        <div className="mb-5 mt-3 overflow-y-auto rounded-lg border border-[#efefef] bg-[#fafafa] p-3 text-[#4c4c4c]">
          {productDetails?.product_info?.map((product, i) => {
            return (
              <div key={i} className={`flex ${i !== 0 ? 'mt-4 border-t border-t-[#e2e2e2] pt-4' : ''}`}>
                <div className="m-0 w-full flex-1 px-2 text-xs font-medium">{product?.name}</div>
                <div className="m-0 w-full flex-1 px-2 text-xs font-medium">{product?.category}</div>
                <div className="m-0 w-full min-w-[110px] flex-1 px-2 text-xs font-medium">
                  {product?.hsn_code}
                </div>
                <div className="m-0 w-full flex-1 px-2 text-xs font-medium">
                  {product?.sku || '925567890123'}
                </div>
                <div className="m-0 w-full flex-1 px-2 text-xs font-medium">{product?.quantity}</div>
                <div className="m-0 w-full flex-1 px-2 text-xs font-medium">{product?.unit_price}</div>
                <div className="m-0 w-full flex-1 px-2 text-xs font-medium">{product?.discount}</div>
                <div className="m-0 w-full flex-1 px-2 text-xs font-medium">{product?.tax_rate || '-'}</div>
                <div className={`m-0 w-full flex-1 px-2 text-right text-xs font-medium`}>
                  {product?.total?.toFixed(2)}
                </div>
              </div>
            );
          })}
          <div className={`mt-4 flex justify-end border-t border-t-[#e2e2e2] pt-4`}>
            <div className="text-start">
              <div className="flex justify-between text-xs">
                <div className="mb-1.5 min-w-[9rem] text-[#7f7f7f]">{`Product Total (${productDetails?.product_info?.length} Items)`}</div>
                <span className="pr-2 font-medium text-[#4c4c4c]">{`₹${
                  productDetails?.total_amount === null ? '0' : productDetails?.total_amount
                }`}</span>
              </div>
              <div className="flex justify-between text-xs">
                <div className="mb-1.5 min-w-[9rem] text-[#7f7f7f]">{`Shipping charges)`}</div>
                <span className="pr-2 font-medium text-[#4c4c4c]">{`₹${
                  productDetails?.shipping_charges === null ? '0' : productDetails?.shipping_charges
                }`}</span>
              </div>
              <div className="flex justify-between text-xs">
                <div className="mb-1.5 min-w-[9rem] text-[#7f7f7f]">{`Gift Wrap`}</div>
                <span className="pr-2 font-medium text-[#4c4c4c]">{`₹${
                  productDetails?.gift_wrap === null ? '0' : productDetails?.gift_wrap
                }`}</span>
              </div>
              <div className="flex justify-between text-xs">
                <div className="mb-1.5 min-w-[9rem] text-[#7f7f7f]">{`Transaction`}</div>
                <span className="pr-2 font-medium text-[#4c4c4c]">{`₹${
                  productDetails?.transaction_fees === null ? '0' : productDetails?.transaction_fees
                }`}</span>
              </div>
              <div className="flex justify-between text-xs">
                <div className="mb-1.5 min-w-[9rem] text-[#7f7f7f]">{`Discount`}</div>
                <span className="pr-2 font-medium text-[#4c4c4c]">{`₹${
                  productDetails?.total_amount === null ? '0' : productDetails?.total_amount
                }`}</span>
              </div>
              <div className="mb-2 flex justify-between border-t border-t-[#e2e2e2] pt-2 text-xs">
                <div className="min-w-[9rem] font-medium text-[#191919]">{`Order Total`}</div>
                <span className="pr-2 font-medium text-[#191919]">{`₹${orderTotal}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailsCard>
  );
};

export default ProductDetailsCard;
