import * as seed from './seeds'
import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

async function main() {

  if (await prismaClient.alcoholic.findFirst()) {
    return;
  }

  await prismaClient.alcoholic.createMany({ data: seed.alcoholic });
  await prismaClient.area.createMany({ data: seed.area });
  await prismaClient.category.createMany({ data: seed.category });
  await prismaClient.ingredient.createMany({ data: seed.ingredient });
  await prismaClient.recipe.createMany({ data: seed.recipes });
  await prismaClient.recipeIngredient.createMany({ data: seed.recipesIngredients });
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prismaClient.$disconnect()
});