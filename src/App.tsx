import React from "react";
import { AppRoutes } from "./routes";
import "./globalStyle/global.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./themes/theme";

const App = () => (

	<ChakraProvider theme={theme}>
		<AppRoutes />
	</ChakraProvider>
);

export default App;
