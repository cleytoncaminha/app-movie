import * as React from "react";
import { Box } from "@chakra-ui/react";
import  Loading  from "../../components/loader";
import { observer, useLocalObservable } from "mobx-react-lite";
import { Store } from "./store";
import  Banner  from "../../components/banner";
import useImageColor from "use-image-color";
import MoviesInitial from "../../components/moviesInitial";
import NavBar from "../../components/navBar";

const Home = () => {
	const ImageUrl = "https://image.tmdb.org/t/p/w300";

	const store = useLocalObservable(() => new Store());

	const [bgColor, setBgColor] = React.useState<string>("");


	const { colors } = useImageColor(bgColor, { cors: true, colors: 5 });

	React.useEffect(()=>{
		setBgColor(store.bannerImage.value);
	}, [store.bannerImage.value]);


	return (
		<>
			{store.moviesByRated.initialLoader.isLoaded ?
				<>
					<header>
						<NavBar colors={colors} search store={store} />
					</header>
					<main>
						{store.search.value === "" ? <Banner bannerImage={store.bannerImage} movies={store.moviesByRated} /> : <></>}
						<Box bg="gray.700">
							{store.listShelf.initialLoader.isLoaded ?
								<MoviesInitial
									movieList={store.listShelf}
									imageUrl={ImageUrl}
									favorite={store.setFavorite}
								/> : <Loading />}
						</Box>
					</main>
				</> : <Loading />}
		</>
	);
};

export default observer(Home);
