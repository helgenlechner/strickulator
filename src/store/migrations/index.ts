import { MigrationManifest } from "redux-persist";
import { multipleSwatches } from "./multipleSwatches";

export const migrations = {
    2: multipleSwatches,
} as MigrationManifest;