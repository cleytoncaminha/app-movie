import * as React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { IMovie } from "../../interface/interface";
import { InfinityScrollShelf } from "@startapp/mobx-utils";
import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { MdOutlineFavorite} from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../loader";

interface IProps{
	movieList: InfinityScrollShelf<IMovie>;
	imageUrl: string;
	favorite: (movieID: IMovie) => string[];
}

const MoviesInitial: React.FC<IProps> = (props: IProps) => (
	<>
		<InfiniteScroll
			dataLength={props.movieList.listItems.length}
			next={props.movieList.nextPage}
			hasMore
			loader={<Loading />}
		>
			<SimpleGrid minChildWidth='400px'>
				{ props.movieList.listItems.map((movie: IMovie, index: number) => (
					<Box key={index} position="relative">
						<Box
							onClick={() => props.favorite(movie)}
							color={movie.favorite === true ? "red" : "black"}
							position="absolute"
							zIndex={3}
							fontSize="3xl"
							cursor="pointer"
							p={3}
						>
							<MdOutlineFavorite />
						</Box>
						<Link to={`/movie/${movie.id}`}>
							<Box
								position="absolute"
								width="100%"
							>

								<Text
									textAlign="end"
									fontSize="2xl"
									color="#fff"
									fontWeight="bold"
									p={2}
								>
									⭐ {movie.vote_average}
								</Text>
							</Box>
							<Image src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />

						</Link>
					</Box>),
				)}
			</SimpleGrid>
		</InfiniteScroll>
	</>
);

export default observer(MoviesInitial);
