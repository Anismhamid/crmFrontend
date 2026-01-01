import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {AuthProvider} from "./context/UserContext.tsx";
import {CRMProvider} from "./context/CRMContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<CRMProvider>
				<App />
			</CRMProvider>
		</AuthProvider>
	</StrictMode>,
);
