import { faker } from "@faker-js/faker";
import { sample } from "lodash";

// ----------------------------------------------------------------------

const transaction = [...Array(24)].map((_, index) => ({
	id: faker.datatype.number(),
	avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
	name: faker.name.fullName(),
	email: faker.internet.email(),
	isVerified: faker.datatype.boolean(),
	phone: faker.phone.number("+62 ### ### ###"),
	status: sample(["PAID", "PENDING", "CANCELED"]),
}));

export default transaction;
