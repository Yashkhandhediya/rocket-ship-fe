import { Carousel } from 'flowbite-react';

const ImgContainer = ({ images }) => {
    return (
        <div className="h-96 -mt-8">
            <Carousel slide={false}>
                {images.map((item, key) => {
                    return (
                        <img src={`http://43.252.197.60:8050/image/get_image?file_path=${item}`} key={key} />
                    )
                }
                )}
            </Carousel>
        </div>
    )
}

export default ImgContainer
