import { writable, type Writable } from "svelte/store";
import type { ContractRunner } from 'ethers';

export const browserRunner: Writable<ContractRunner | null> = writable();