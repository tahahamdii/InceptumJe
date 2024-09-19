import React, { useEffect, useState } from 'react';
import '../../assets/css/Slider.css';
import BtnSlider from './BtnSlider';
import { v4 as uuidv4 } from "uuid";

const dataSlider = [
    {
        id: uuidv4(),
    },
    {
        id: uuidv4(),
    },
    {
        id: uuidv4(),
    },
    {
        id: uuidv4(),
    },
    {
        id: uuidv4(),
    },
];

export default function Slider() {

    const [slideIndex, setSlideIndex] = useState(1)

    useEffect(() => {
        // const timer = setInterval(() => {
        //     setSlideIndex(slideIndex + 1)
        //     return () => clearInterval(timer)
        // }, 5000);
        setTimeout(() =>
            nextSlide()
            , 5000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slideIndex]);

    const nextSlide = () => {
        if (slideIndex !== dataSlider.length) {
            setSlideIndex(slideIndex + 1)
        }
        else if (slideIndex === dataSlider.length) {
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if (slideIndex !== 1) {
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1) {
            setSlideIndex(dataSlider.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <div className="container-slider">
            {dataSlider.map((obj, index) => {
                return (
                    <div
                        key={obj.id}
                        className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    >
                        <img
                            src={process.env.PUBLIC_URL + `/images/img${index + 1}.jpg`} alt='our_meetings'
                        />
                    </div>
                )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"} />

            <div className="container-dots">
                {Array.from({ length: 5 }).map((item, index) => (
                    <div
                        onClick={() => moveDot(index + 1)}
                        className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    )
}