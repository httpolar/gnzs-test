import { FIRST_NAMES_F, FIRST_NAMES_M, LAST_NAMES_F, LAST_NAMES_M } from "@/dataset/names";
import { takeRandomElement } from "@/lib/take-random-element";
import { RANDOM_WORDS } from "@/dataset/words";

export function generateRandomName() {
  let firstName: string;
  let lastName: string;

  if (Math.random() < 0.5) {
    firstName = takeRandomElement(FIRST_NAMES_F);
    lastName = takeRandomElement(LAST_NAMES_F);
  } else {
    firstName = takeRandomElement(FIRST_NAMES_M);
    lastName = takeRandomElement(LAST_NAMES_M);
  }

  return [firstName, lastName] as const;
}

export function generateCompanyName() {
  const word = takeRandomElement(RANDOM_WORDS);
  const form = takeRandomElement(["LLC", "GmbH", "Ltd."]);

  return `${word} ${form}`;
}
