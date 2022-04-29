import * as React from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import  Loading  from "../../components/loader";
import { Store } from "./store";
import { Box, Button, Flex, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { BsPlay } from "react-icons/bs";
import { CgArrowLongRight} from "react-icons/cg";
import useImageColor from "use-image-color";
import NavBar from "../../components/navBar";
import useInvertColor from "../../hooks/useInvertColor";

export interface MyParams {
	id: string;
}


const MoviesDetails = () => {
	const { id } = useParams<keyof MyParams>() as MyParams;

	const moviesFavorited = JSON.parse(localStorage.getItem("moviesID"));
	const favorite: boolean = moviesFavorited.includes(parseInt(id));

	const store = useLocalObservable(() => new Store(id));
	const url: string = store.fetchModel.model.value ? `https://image.tmdb.org/t/p/original${store.fetchModel.fetchedModel.backdrop_path}` : "no image url";

	const { colors } = useImageColor(url, { cors: true, colors: 5 });

	return (
		<Box>
			{
				store.fetchModel.model.value ?
					<>
						<Box
							bg={`radial-gradient( transparent 30%, ${colors ? colors[1] : "transparent"} 95%),url(https://image.tmdb.org/t/p/original${store.fetchModel.fetchedModel.backdrop_path})`}
							bgRepeat="no-repeat"
							bgSize="100% 100%"
							h="100vh"
						>
							<NavBar colors={colors} search={false} />
							<Box
								ml={{md:"0%",lg:"20%"}}
								mt={{
									sm: 5,
									lg: 10,
									xl:20,
								}}
								maxW={{md:"100%",lg:"50%"}}
								bgGradient={colors ? `radial(${colors[2]} 60%, transparent 100%)` : "transparent"}
								opacity="0.9"
								p={30}
							>
								<Text color="#DA0217" fontSize={{sm:"3xl", md:"4xl",lg:"5xl"}}>
									{store.fetchModel.fetchedModel.popularity.toString().substring(0,2)}%
								</Text>
								<Flex>
									<Text
										color={colors ? useInvertColor(colors[2]) : "#DDE0E3"}
										fontSize={{sm:"3xl", md:"4xl",lg:"5xl"}}
										opacity="1"
										fontWeight="bold"
									>
										{store.fetchModel.fetchedModel.title}
									</Text>
									<Text
										color={colors ? useInvertColor(colors[0]) : "#DDE0E3"}
										fontSize={{sm:"3xl", md:"4xl",lg:"5xl"}}
										ml={2}
										opacity="1"
									>
										{store.fetchModel.fetchedModel.release_date.substring(0,4)}
									</Text>
								</Flex>
								<UnorderedList
									listStyleType="none"
									display="flex"
									gap="10px"
									m="0"
									p="0"
								>
									{store.fetchModel.fetchedModel.genres.map((genre) =>
										<ListItem
											fontWeight="medium"
											color={colors ? useInvertColor(colors[2]) : "#DDE0E3"}
											key={genre.id}
											textTransform="uppercase"
											fontSize={{sm:"sm", md:"lg",lg:"xl"}}
											opacity="1"
										>
											{genre.name}
										</ListItem>)}
								</UnorderedList>
								<Box mt="8" mb="8">
									<Text
										color={colors ? useInvertColor(colors[2]) : "#DDE0E3"}
										fontSize={{sm:"md", md:"lg",lg:"xl"}}
										opacity="1"
										fontWeight="bold"
									>
										{store.fetchModel.fetchedModel.overview}
									</Text>
								</Box>
								<a href={`https://www.youtube.com/results?search_query=${store.fetchModel.fetchedModel.title}`} target="_blank" rel="noreferrer">
									<Button
										borderRadius={2}
										colorScheme="teal"
										variant="outline"
										color={colors ? useInvertColor(colors[2]) : "#DDE0E3"}
									>
										<BsPlay /> TRAILLER
									</Button>
								</a>
								{favorite ? <Box>❤</Box> : ""}
							</Box>
							<Link to="/">
								<Flex
									justifyContent="flex-end"
									alignItems="center"
									gap="2"
									w="85%"
								>
									<Text fontSize="2xl"  color={colors ? useInvertColor(colors[1]) : "#DDE0E3"}>
										Home
									</Text>
									<CgArrowLongRight size="50px"  color={colors ? useInvertColor(colors[1]) : "#DDE0E3"} 	/>
								</Flex>
							</Link>
						</Box>
					</>
					: <Loading />
			}
		</Box>
	);
};

export default observer(MoviesDetails);
