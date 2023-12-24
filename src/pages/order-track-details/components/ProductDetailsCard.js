import { ProductDetailsIcon } from '../../../common/icons/order-details';
import DetailsCard from './DetailsCard';

const ProductDetailsCard = ({ productDetails = [] }) => {
  return (
    <DetailsCard heading={'Product Details'} headingIcon={ProductDetailsIcon} headingClassNames="mb-[1px]">
      <div className="w-[600px] pr-3">
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
          {productDetails?.map((product, i) => {
            return (
              <div key={i} className={`flex ${i !== 0 ? 'mt-4 border-t border-t-[#e2e2e2] pt-4' : ''}`}>
                <div className="m-0 w-full flex-1 px-2 text-xs font-medium">
                  {product?.name || 'Biker Gloves'}
                </div>
                <div className="m-0 w-full flex-1 px-2 text-xs font-medium">
                  {product?.category || 'Winter Wear>'}
                </div>
                <div className="m-0 w-full flex-1 px-2 text-xs font-medium">
                  {product?.hsn || '1234567890123'}
                </div>
                <div className="m-0 w-full flex-1 px-2 text-xs font-medium">
                  {product?.sku || '925567890123'}
                </div>
                <div className="m-0 w-full flex-1 px-2 text-xs font-medium">{product?.quantity || '20'}</div>
                <div className="m-0 w-full flex-1 px-2 text-xs font-medium">
                  {product?.unit_price || '₹250'}
                </div>
                <div className="m-0 w-full flex-1 px-2 text-xs font-medium">{product?.discount || '20'}</div>
                <div className="m-0 w-full flex-1 px-2 text-xs font-medium">{product?.tax || '0'}</div>
                <div className={`m-0 w-full flex-1 px-2 text-right text-xs font-medium`}>
                  {product?.total?.toFixed(2) || '₹1250.00'}
                </div>
              </div>
            );
          })}
          <div className={`mt-4 flex justify-end border-t border-t-[#e2e2e2] pt-4`}>
            <div className="text-start">
              <div className="flex justify-between text-xs">
                <div className="text-[#7f7f7f] min-w-[9rem] mb-1.5">{`Product Total (${productDetails?.length} Items)`}</div>
                <span className='text-[#4c4c4c] font-medium pr-2'>{`₹${'3150.00'}`}</span>
              </div>
              <div className="flex justify-between text-xs">
                <div className="text-[#7f7f7f] min-w-[9rem] mb-1.5">{`Shipping charges)`}</div>
                <span className='text-[#4c4c4c] font-medium pr-2'>{`₹${'50.00'}`}</span>
              </div>
              <div className="flex justify-between text-xs">
                <div className="text-[#7f7f7f] min-w-[9rem] mb-1.5">{`Gift Wrap`}</div>
                <span className='text-[#4c4c4c] font-medium pr-2'>{`₹${'20.00'}`}</span>
              </div>
              <div className="flex justify-between text-xs">
                <div className="text-[#7f7f7f] min-w-[9rem] mb-1.5">{`Transaction`}</div>
                <span className='text-[#4c4c4c] font-medium pr-2'>{`₹${'10.00'}`}</span>
              </div>
              <div className="flex justify-between text-xs">
                <div className="text-[#7f7f7f] min-w-[9rem] mb-1.5">{`Discount`}</div>
                <span className='text-[#4c4c4c] font-medium pr-2'>{`₹${'100.00'}`}</span>
              </div>
              <div className="flex justify-between mb-2 text-xs border-t border-t-[#e2e2e2] pt-2">
                <div className="text-[#191919] font-medium min-w-[9rem]">{`Order Total`}</div>
                <span className='text-[#191919] font-medium pr-2'>{`₹${'3150.00'}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailsCard>
  );
};

export default ProductDetailsCard;
