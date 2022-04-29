import { Box, Text} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import * as React from "react";

const Loading = () =>
	(
		<Box bg="#001032" h="100vh">
			<Text color="#DDE0E3" fontSize="4xl" textAlign="center">
				Carregando ...
			</Text>
		</Box>
	);

export default observer(Loading);
