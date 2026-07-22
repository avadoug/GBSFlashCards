import { D as __toESM, b as require_react } from "../index.js";
//#region app/components/PwaRegister.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function PwaRegister() {
	(0, import_react.useEffect)(() => {
		if ("serviceWorker" in navigator && true) navigator.serviceWorker.register("/sw.js").catch(() => void 0);
	}, []);
	return null;
}
//#endregion
export { PwaRegister };
