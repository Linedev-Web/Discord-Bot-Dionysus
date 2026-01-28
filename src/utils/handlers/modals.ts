import { lstatSync, readdirSync } from "node:fs";
import { ExtendedClient, Modal } from "../../types";
import path from "node:path";

export default (client: ExtendedClient) => {
    const modalsRootPath = path.join(__dirname, "../../modals");

    const handleModals = async (relativePath: string, filesName: string[]) => {
        const fullPath = path.join(modalsRootPath, relativePath);
        if (lstatSync(fullPath).isDirectory()) {
            const subFiles = readdirSync(fullPath);
            for (const subFile of subFiles) {
                const subFileName = subFile.split(".")[0];
                if (subFileName) {
                    await handleModals(path.join(relativePath, subFile), [...filesName, subFileName]);
                }
            }
        } else if ((relativePath.endsWith('.js') || (relativePath.endsWith('.ts') && !relativePath.endsWith('.d.ts')))) {
            const modalModule = await import(fullPath);
            const modal: Modal = modalModule.default || modalModule;

            const modalName = filesName.filter(f => f !== "index").join("-");
            client.modals.set(modalName, modal);
        }
    };

    if (readdirSync(modalsRootPath).length > 0) {
        readdirSync(modalsRootPath).forEach(file => {
            const fileName = file.split('.')[0];
            if (fileName) {
                handleModals(file, [fileName]);
            }
        });
    }
};
