import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

const Hero = () => {
	const [currentIndex, setCurrentIndex] = useState(1);
	const [hasClicked, setHasClicked] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [loadedVideos, setLoadedVideos] = useState(0);
	// We use useRef whenever we want to access a specific DOM node
	const nextVideoRef = useRef(null);
	const totalVideos = 4;

	gsap.registerPlugin(ScrollTrigger);

	const handleMiniVideoClick = () => {
		setHasClicked(true);
		setCurrentIndex((prevIndex) => prevIndex + 1);
		if (currentIndex === 4) setCurrentIndex(1);
		console.log(currentIndex);
	};

	const handleVideoLoad = () => {
		// setIsLoading(false);
		setLoadedVideos((prev) => prev + 1);
	};

	const getVideoSrc = (index) => {
		return `/videos/hero-${index}.mp4`;
	};

	useGSAP(
		() => {
			if (hasClicked) {
				gsap.set("#next-video", { visibility: "visible" });
				gsap.to("#next-video", {
					transformOrigin: "center center",
					scale: 1,
					width: "100%",
					height: "100%",
					duration: 1,
					ease: "power1.out",
					onStart: () => nextVideoRef.current.play(),
				});
				gsap.from("#current-video", {
					transformOrigin: "center center",
					scale: 0,
					duration: 1.5,
					ease: "power1.out",
				});
			}
		},
		{ dependencies: [currentIndex], revertOnUpdate: true }
	);

	useGSAP(() => {
		gsap.set("#video-frame", {
			clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
			borderRadius: "0% 0% 40% 10%",
		});
		gsap.from("#video-frame", {
			clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			borderRadius: "0% 0% 0% 0%",
			ease: "power1.inOut",
			scrollTrigger: {
				trigger: "#video-frame",
				start: "center center",
				end: "bottom center",
				scrub: true,
			},
		});
	});

	// useEffect(() => {
	// 	if (loadedVideos === totalVideos - 1) {
	// 		setIsLoading(false);
	// 	}
	// }, [loadedVideos]);

	return (
		<section className="relative w-screen overflow-x-hidden">
			{isLoading && (
				<div className="flex-center absolute z-100 h-dvh w-screen overflow-hidden bg-violet-50">
					<div className="three-body">
						<div className="three-body__dot" />
						<div className="three-body__dot" />
						<div className="three-body__dot" />
					</div>
				</div>
			)}

			<article
				id="video-frame"
				className="relative z-10 h-dvh overflow-hidden rounded-lg "
			>
				{/* VIDEOS PLAYER BACKGROUND + UI */}
				<div>
					<div className="mask-clip-path absolute-center absolute z-50 size-80 cursor-pointer overflow-hidden rounded-lg">
						<div
							onClick={handleMiniVideoClick}
							className="origin-center scale-50 opacity-0 transition-all duration-300 ease-in-out hover:scale-100 hover:opacity-100"
						>
							<video
								ref={nextVideoRef}
								src={
									currentIndex === 4
										? getVideoSrc(1)
										: getVideoSrc(currentIndex + 1)
								}
								autoPlay
								loop
								muted
								id="current-video"
								className="size-64 origin-center scale-150 object-cover object-center"
								onLoadedData={handleVideoLoad}
							/>

							{/* Click Me Button */}
							<div className="absolute mt-10 inset-0 z-40 flex items-center justify-center">
								<div className="flex-center font-zentry text-blue-75 size-32 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg animate-pulse transition-all duration-300 hover:size-[200]">
									Click Me
								</div>
							</div>
						</div>
					</div>

					{/* Hover Me Button */}
					<div className="absolute -mt-5 inset-0 z-40 flex items-center justify-center">
						<div className="flex-center font-zentry text-blue-75 size-32 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg animate-pulse transition-all duration-300 hover:size-[200]">
							Hover Me
						</div>
					</div>

					{/* Zoom in the video become the background */}
					<video
						ref={nextVideoRef}
						src={getVideoSrc(currentIndex)}
						autoPlay
						loop
						muted
						id="next-video"
						className="absolute-center invisible absolute z-20 size-64 origin-center scale-150 object-cover object-center"
						onLoadedData={handleVideoLoad}
					/>

					{/* Default Video BG */}
					<video
						src={getVideoSrc(1)}
						autoPlay
						loop
						muted
						className="absolute left-0 top-0 size-full object-cover object-center"
						onLoadedData={handleVideoLoad}
					/>

					<h1 className="absolute bottom-5 right-5 text-blue-75 special-font hero-heading z-30">
						G<b>a</b>ming
					</h1>

					<div className="absolute top-5 left-0 z-40 size-full">
						<div className="mt-25 px-5 sm:px-10">
							<h1 className="special-font hero-heading text-blue-100">
								Redefi<b>n</b>
								<b>e</b>
							</h1>

							<p className="mb-5 max-w-64 font-robert-regular text-blue-100">
								Enter The Metagame Layer <br /> Unleash the Play Economy
							</p>

							<Button
								id="watch-trailer"
								title="Watch Trailer"
								leftIcon={<TiLocationArrow />}
								containerClass="!bg-yellow-300 flex-center gap-1"
							/>
						</div>
					</div>
				</div>
			</article>

			<h1 className="absolute bottom-5 right-5 text-black-default special-font hero-heading">
				G<b>a</b>ming
			</h1>
		</section>
	);
};

export default Hero;
