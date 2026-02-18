const Banner = (props) => {

    const name = props.name?.split(" ") ?? ["", ""];
    let fname = "", lname = name[name.length - 1]
    for (let i = 0; i + 1 < name.length; i++)
        fname += name[i] + " "

    return (
        <div className="aspect-video relative w-full lg:w-2/3 mb-5 text-black">
            <img src={props.score >= 45 ? "/banner_star.jpg" : "/banner.jpg"} className="absolute w-full object-cover" alt="" />
            <div className="w-full h-full relative z-[2]">
                <div className="absolute top-[25%] left-[7.5%] w-full sm:w-2/3 md:w-1/2">
                    <p className="numans-regular text-base sm:text-3xl">{fname.toUpperCase()}</p>
                    <p className="anton-regular text-4xl sm:text-7xl">{lname.toUpperCase()}</p>
                    <p className="-mt-4 text-[#F0EAB0] licorice-regular text-3xl sm:text-7xl">
                        {{
                            "BA": "Batsman",
                            "BO": "Bowler",
                            "AR": "All Rounder",
                            "WK": "Wicket Keeper"
                        }[props.domain]}
                    </p>
                </div>
                
                {!props.score ? <></> : (
                    <div className="absolute bottom-[5%] left-[50%]">
                        <p className="text-3xl md:text-8xl anton-regular text-center">{props.score}</p>
                        <div className="h-[5px] w-full bg-black"></div>
                        <p className="text-base sm:text-2xl numas-regular text-center">POINTS</p>
                    </div>
                )}

                {!props.order ? <></> : (
                    <img
                        className="absolute right-0 bottom-0 object-cover z-[-1] w-1/2"
                        src={`/players/${props.order}.png`} alt="" />
                )}

                <p className="absolute bottom-[20%] left-[7.5%] anton-regular text-base sm:text-3xl ">BASE PRICE: ₹{props.base_price} L</p>

                <div className="absolute bottom-[5%] left-[7.5%] w-1/2 sm:w-1/4 sm:py-2 bg-black sm:text-xl text-center text-white font-bold">
                    {props.is_domestic ? "INDIAN" : "OVERSEAS"}
                </div>
            </div>

        </div>
    )
}

export default Banner;