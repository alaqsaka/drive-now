import { faker } from "@faker-js/faker";

const LOKASI_NAME = ["Jakarta", "Bogor", "Bandung", "Jogjakarta", "Bali"];

const lokasi = [...Array(5)].map((_, index) => {
	return {
		id: faker.datatype.number(10),
		name: LOKASI_NAME[index],
		deskripsi: faker.address.streetAddress() + faker.address.secondaryAddress(),
	};
});

export default lokasi;
