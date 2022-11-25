import { faker } from "@faker-js/faker";
import { sample } from "lodash";

const CAR_NAME = [
	"Toyota Avanza",
	"Toyota Xenia",
	"Suzuki Ertiga",
	"Honda HRV",
	"Honda CRV",
	"Honda Civic R",
	"Toyota Rush",
	"Honda Freed",
	"Honda Brio",
	"Tesla Model T",
	"Tesla Model X",
	"Tesla Model S",
	"Hyundai Ioniq 5",
];

const cars = [...Array(12)].map((_, index) => {
	const setIndex = index + 1;

	return {
		id: faker.datatype.number(100),
		slug: CAR_NAME[index].toLowerCase().split(" ").join("-"),
		cover: `/assets/images/products/product_${setIndex}.jpg`,
		name: CAR_NAME[index],
		price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
		detail: faker.lorem.paragraphs(3),
		lokasi: [
			{
				id: 1,
				nama: "Bandung",
				jumlah: 10,
			},
			{
				id: 2,
				nama: "Jakarta",
				jumlah: 5,
			},
			{
				id: 3,
				nama: "Jogja",
				jumlah: 8,
			},
		],
		jumlahKursi: 8,
	};
});

export default cars;
