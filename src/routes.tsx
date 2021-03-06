import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Home  from "./pages/home";
import MoviesDetails from "./pages/movieDetails";

export const AppRoutes = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="movie/:id" element={<MoviesDetails />} />
		</Routes>
	</BrowserRouter>
);
