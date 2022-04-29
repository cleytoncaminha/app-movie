/* eslint-disable react/react-in-jsx-scope */
import * as React from "react";

import { Box } from "@chakra-ui/react";
import { IAPIMovie } from "../../interface/interface";
import { observer } from "mobx-react-lite";
import Loader from "../loader";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AttributeShelf, PaginatedListShelf } from "@startapp/mobx-utils";

interface IProps {
	bannerImage: AttributeShelf<string>;
	movies: PaginatedListShelf<IAPIMovie>;
}

const Banner: React.FC<IProps> =  (props: IProps) => {

	const onChange = (e) => {
		const activeImage = props.movies.items[e].backdrop_path;
		const url = `https://image.tmdb.org/t/p/original${activeImage}`;
		props.bannerImage.setValue(url);
	};

	return (
		<Box overflowX="hidden">
			{props.movies.loader.isLoading ?
				<Loader /> :
				<Carousel
					autoPlay
					infiniteLoop
					interval={3000}
					showArrows={false}
					width="100vw"
					dynamicHeight
					showThumbs={false}
					onChange={( e )  =>  onChange(e)}
					showStatus={false}
				>
					{props.movies.items.map((movie: IAPIMovie , index: number)=>
						<Link to={`/movie/${movie.id}`} key={index}>

							<Box
								h="70vh"
								bg={`url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`}
								bgRepeat="no-repeat"
								bgSize="100% 100%"
							/>
						</Link>,
					)}
				</Carousel>}
		</Box>
	);
};

export default observer(Banner);


