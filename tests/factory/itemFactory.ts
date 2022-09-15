import { faker } from '@faker-js/faker';
import { prisma } from '../../src/database/database';


export async function __createItem(){
    const item = {
        title: faker.lorem.words(4),
        url: faker.internet.url(),
        description: faker.lorem.paragraph(1),
        amount: faker.datatype.number()
    }

    return item;
}

export function __createId(){
    const id = {
        id: faker.datatype.number()
    }

    return id;
}