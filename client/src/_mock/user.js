import { faker } from "@faker-js/faker";
import { sample } from "lodash";

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
	id: faker.datatype.uuid(),
	avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
	name: faker.name.fullName(),
	email: faker.internet.email(),
	isVerified: faker.datatype.boolean(),
	status: sample(["active", "banned"]),
	phone: faker.phone.number("+62 ### ### ###"),
}));

export default users;
