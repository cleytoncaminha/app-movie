import * as React from "react";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { observer } from "mobx-react-lite";
import useInvertColor from "../../hooks/useInvertColor";
import { Store } from "../../pages/home/store";
import useDebounce from "../../hooks/useDebounce";

interface IProps {
	colors: string[];
	search: boolean;
	store?: Store;
}

const NavBar: React.FC<IProps> = (props: IProps) => {
	const timeForSearch = 2000;

	const [search, setSearch] = React.useState<string>("");
	const debouncedValue = useDebounce(search, timeForSearch);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.store.listShelf.initialLoader._loaded = false;
		setSearch(event.target.value);
	};

	React.useEffect(() => {
		if (props.search) {
			props.store.search.setValue(debouncedValue);
			props.store.listShelf.refreshItems();
		}
	}, [debouncedValue]);

	return (
		<Box bg={props.colors ? props.colors[1] : "#001032"} opacity="0.8">
			<Flex
				w="90%"
				margin="auto"
				justifyContent="space-between"
				p="1%"
				opacity={1}
			>
				<Text
					textTransform="uppercase"
					fontSize="xl"
					color={props.colors ? useInvertColor(props.colors[1]) : "#DDE0E3"}
				>
					ideum
				</Text>
				{props.search ?
					<Flex gap={8}>
						<Input
							onChange={(e)=> handleInputChange(e)}
							textAlign="right"
							variant="unstyled"
							placeholder="FILTER"
							color={props.colors ? useInvertColor(props.colors[1]) : "#DDE0E3"}
							_placeholder={{color: props.colors ? useInvertColor(props.colors[1]) : "#DDE0E3"}}
						/>
						<BsSearch color={props.colors ? useInvertColor(props.colors[1]) : "#DDE0E3"} size={35} />
					</Flex> : ""}
			</Flex>
		</Box>);
};

export default observer(NavBar);
