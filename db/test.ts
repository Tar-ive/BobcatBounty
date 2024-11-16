import { db } from './index';
import { products } from './schema';

async function testDatabaseConnection() {
  try {
    // Insert a test product
    const insertedProduct = await db.insert(products).values({
      name: 'Test Product',
      description: 'A test product to verify database connection',
      quantity: 1,
      category: 'Test',
      dietary: ['[]'],
    }).returning();

    console.log('Successfully inserted test product:', insertedProduct);

    // Query all products
    const queriedProducts = await db.select().from(products);
    console.log('Successfully queried products:', queriedProducts);

    return true;
  } catch (error) {
    console.error('Database test failed:', error);
    return false;
  }
}

testDatabaseConnection()
  .then((success) => {
    console.log('Database connection test completed:', success ? 'SUCCESS' : 'FAILED');
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Unexpected error during database test:', error);
    process.exit(1);
  });
