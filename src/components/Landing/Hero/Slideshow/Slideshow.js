import Slider from 'react-slick'

import Slide from './Slide/Slide'

const SlideShow = ({ profiles }) =>{
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
    }
    return(
        <div className='w-full mb-8'>
            <Slider {...settings}>
                {profiles?.map((profile, index) => <div>
                    <Slide
                        key={index}
                        imageUrl={profile?.image}
                        title={profile?.title}
                        description={profile?.description}
                        buttonText={profile.text}
                        link={profile?.link} />
                </div>)}
            </Slider>
        </div>
    )
}

export default SlideShow