import { Carousel } from 'flowbite-react';
import { BACKEND_URL } from '../../utils/env.config';


const ImgContainer = ({ images }) => {
    return (
        <div className="h-96 -mt-8">
            <Carousel slide={false}>
                {images.map((item, key) => {
                    return (
                        <img src={`${BACKEND_URL}/image/get_image?file_path=${item}`} key={key} />
                    )
                }
                )}
            </Carousel>
        </div>
    )
}

export default ImgContainer
