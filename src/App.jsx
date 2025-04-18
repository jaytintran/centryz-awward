import React from "react";
import Hero from "./components/Hero";

const App = () => {
	return (
		<main className="bg-blue-75 relative min-h-screen w-screen overflow-hidden">
			<Hero />

			<section className="z-0 min-h-screen bg-blue-500"></section>
		</main>
	);
};

export default App;
